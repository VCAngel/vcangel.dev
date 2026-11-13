import { Fragment } from "preact";

import { pickCompletion } from "../commands/utils/complete.ts";
import { DIR_CLASSES } from "../commands/utils/output.tsx";
import { CompletionMatch } from "../models/command.model.ts";
import { completionMenu } from "../state/app.state.ts";

const GAP = "  ";

function MatchButton(
  { match, index, selected }: {
    match: CompletionMatch;
    index: number;
    selected: boolean;
  },
) {
  return (
    <button
      type="button"
      tabIndex={-1}
      // NOTE: Keeps focus (and the soft keyboard) on the prompt input
      onPointerDown={(e) => e.preventDefault()}
      onClick={() => pickCompletion(index)}
      className={`whitespace-pre text-left cursor-pointer ${
        selected
          ? "bg-white text-black"
          : `hover:bg-white/15 ${match.dir ? DIR_CLASSES : ""}`
      }`}
    >
      {match.label}
    </button>
  );
}

// Consecutive flags with one description share a row: -r  -R  -- Remove...
function groupByDescription(matches: CompletionMatch[]) {
  const groups: { indexes: number[]; labels: string; description: string }[] =
    [];
  matches.forEach(({ label, description = "" }, index) => {
    const last = groups.at(-1);
    if (last?.description === description) {
      last.indexes.push(index);
      last.labels += GAP + label;
    } else {
      groups.push({ indexes: [index], labels: label, description });
    }
  });
  return groups;
}

/**
 * Matches listed under the prompt by an ambiguous Tab, zsh-style
 */
export function CompletionList() {
  const menu = completionMenu.value;
  const matches = menu?.matches ?? [];
  const described = matches.some(({ description }) => description);

  const button = (index: number) => (
    <MatchButton
      match={matches[index]}
      index={index}
      selected={index === menu?.selected}
    />
  );

  const list = () => {
    if (described) {
      const groups = groupByDescription(matches);
      const width = Math.max(...groups.map(({ labels }) => labels.length));
      return (
        <ul aria-label="Completions" className="px-[2ch] pb-[1ch]">
          {groups.map(({ indexes, labels, description }) => (
            <li key={labels} className="whitespace-pre">
              {indexes.map((index, i) => (
                <Fragment key={matches[index].value}>
                  {i > 0 && GAP}
                  {button(index)}
                </Fragment>
              ))}
              {`${" ".repeat(width - labels.length)}${GAP}-- ${description}`}
            </li>
          ))}
        </ul>
      );
    }

    const width = Math.max(...matches.map(({ label }) => label.length));
    return (
      <ul
        aria-label="Completions"
        className="px-[2ch] pb-[1ch] grid gap-x-[2ch]"
        style={{ gridTemplateColumns: `repeat(auto-fill, ${width}ch)` }}
      >
        {matches.map((match, index) => (
          <li key={match.value}>{button(index)}</li>
        ))}
      </ul>
    );
  };

  // NOTE: Live region stays mounted so screen readers announce new lists
  return (
    <div id="completions" aria-live="polite" className="shrink-0">
      {menu && list()}
    </div>
  );
}
