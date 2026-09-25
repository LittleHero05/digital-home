export type Project = {
  title: string;
  blurb: string;
  tags: string[];
  status: string;
};

export const projects: Project[] = [
  {
    title: "[Project one]",
    blurb: "A short description of something you made and why it matters.",
    tags: ["web", "ongoing"],
    status: "placeholder",
  },
  {
    title: "[Project two]",
    blurb: "Another small build, experiment, or collaboration to document here.",
    tags: ["tool", "finished"],
    status: "placeholder",
  },
  {
    title: "[Project three]",
    blurb: "A future project note waiting for its real words and links.",
    tags: ["idea"],
    status: "placeholder",
  },
];