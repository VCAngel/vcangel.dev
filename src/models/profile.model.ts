interface ProfileData {
  label: string;
  value: string;
  id?: string; // for jsx keys
  href?: string;
  desktopOnly?: boolean;
}

export type SPAProfileData = Omit<ProfileData, "id" | "value"> & {
  value: string | string[];
};
export type CLIProfileData = Omit<ProfileData, "value"> & {
  value: string | CLIProfileData[];
};

export interface Profile extends SPAProfile, CLIProfile {
  name: ProfileData;
  tagline: ProfileData;
  bio: ProfileData;
  avatar: ProfileData;
  location: ProfileData;
  uptime: ProfileData;
  os: ProfileData;
  status: ProfileData;
}

interface SPAProfile {
  skillsSPA: SPAProfileData;
  interestsSPA: SPAProfileData;
  learningSPA: SPAProfileData;
  localesSPA: SPAProfileData;
}

interface CLIProfile {
  languagesCLI: CLIProfileData;
  frontendCLI: CLIProfileData;
  backendCLI: CLIProfileData;
  toolsCLI: CLIProfileData;
  interestsCLI: CLIProfileData;
  learningCLI: CLIProfileData;
  localesCLI: CLIProfileData;
}

export interface ContactChannel {
  id: string;
  label: string; // e.g. "GitHub", padding is up to each surface
  text: string;
  href: string;
}
