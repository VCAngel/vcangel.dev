export interface Profile {
  name: string;
  tagline: string;
  bio: string;
  avatar: string;
  location: { text: string; href: string };
  skills: string[];
  interests: string[];
}

export interface ContactChannel {
  id: string;
  label: string; // e.g. "GitHub", padding is up to each surface
  text: string;
  href: string;
}
