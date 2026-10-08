export interface ProjectLink {
  label: string;
  url: string;
}

/**
 * work: shipped for an employer/client
 * personal: built by me, for real use
 * lab: tinkering and self-hosting, shown for the engineering, not the product
 */
export type ProjectKind = "work" | "personal" | "lab";

export interface Project {
  name: string;
  description: string;
  stack: string[];
  links: ProjectLink[];
  kind: ProjectKind;
  role?: string;
}
