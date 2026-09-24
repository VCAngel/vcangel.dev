import {
  isUser,
  LOGIN_USERS,
  SU_PASSPHRASE,
  SU_WELCOME,
  SUDO_EGGS,
  SUDO_GROUPS,
  USERS,
} from "../../data/users.ts";
import { CommandExecutor } from "../../models/command.model.ts";
import { currentDirectory } from "../../state/app.state.ts";
import {
  currentUser,
  effectiveUser,
  logoutUser,
  pendingPrompt,
  runAsRoot,
  sessionExited,
  switchUser,
} from "../../state/session.state.ts";
import { executeCommand } from "../registry.tsx";
import { textResponse } from "../utils/output.tsx";

export const usersCommand: CommandExecutor = (_args, fullCommand) =>
  textResponse(fullCommand, [LOGIN_USERS.join(" ")], "users");

export const groupsCommand: CommandExecutor = (args, fullCommand) => {
  const lines = (args.length ? args : [effectiveUser()]).map((name) => {
    if (!isUser(name)) return `groups: '${name}': no such user`;
    const groups = USERS[name].groups.join(" ");
    return args.length ? `${name} : ${groups}` : groups;
  });
  return textResponse(fullCommand, lines, "groups");
};

// su [-] [user] → masked password prompt (see islands/terminal/SecretPrompt)
export const suCommand: CommandExecutor = (args, fullCommand) => {
  const target = args.find((arg) => !arg.startsWith("-")) ?? "root";

  if (!isUser(target)) {
    return textResponse(
      fullCommand,
      [`su: user ${target} does not exist`],
      "su",
    );
  }
  if (target === currentUser.value) {
    return textResponse(fullCommand, [], "su");
  }
  // Root (via sudo) and the passwordless guest account skip the prompt
  if (effectiveUser() === "root" || target === "guest") {
    switchUser(target, currentDirectory.value);
    return textResponse(fullCommand, [], "su");
  }
  if (target === "root") {
    return textResponse(
      fullCommand,
      ["su: root account is locked. Nice try though ( •̀ω•́ )σ"],
      "su",
    );
  }

  pendingPrompt.value = {
    label: "Password:",
    onSubmit: (password) => {
      if (password !== SU_PASSPHRASE) {
        return textResponse("", ["su: Authentication failure"], "su_fail");
      }
      switchUser(target, currentDirectory.value);
      return textResponse("", [SU_WELCOME], "su_welcome");
    },
  };

  return textResponse(fullCommand, [], "su");
};

export const sudoCommand: CommandExecutor = (args, fullCommand) => {
  const route = currentDirectory.value;
  const user = effectiveUser();

  if (!args.length) {
    return textResponse(fullCommand, ["usage: sudo command"], "sudo");
  }
  if (!USERS[user].groups.some((group) => SUDO_GROUPS.includes(group))) {
    return textResponse(
      fullCommand,
      [`${user} is not in the sudoers file. This incident will be reported.`],
      "sudo",
    );
  }
  // Root shell
  if (args[0] === "-i" || args[0] === "-s") {
    switchUser("root", route);
    return textResponse(fullCommand, [], "sudo");
  }

  // Raw text after "sudo" keeps the inner command's quoting intact
  const inner = fullCommand.trim().replace(/^\S+\s+/, "");
  const egg = SUDO_EGGS[inner];
  if (egg) return textResponse(fullCommand, [egg], "sudo_egg");

  const result = runAsRoot(() => executeCommand(inner, route));
  return { ...result, command: fullCommand, route };
};

// Logs out of su'd users first; as guest it closes the tab (or tries to)
export const exitCommand: CommandExecutor = (_args, fullCommand) => {
  const response = textResponse(fullCommand, [], "exit");
  const previous = logoutUser();

  if (previous) {
    currentDirectory.value = previous.cwd;
  } else {
    // Only works for script-opened tabs, otherwise ExitScreen takes over
    globalThis.close?.();
    sessionExited.value = true;
  }
  return response;
};
