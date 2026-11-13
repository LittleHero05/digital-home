import Image from "next/image";
import Link from "next/link";
import { Signifier } from "@/components/Signifier";
import type { Project } from "@/content/projects";

type ProjectCardProps = {
  project: Project;
  index: number;
};

// A taped note card: the project's picture as a print, then what it is, the tools, and links.
export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <article className={`project-card project-card-${(index % 4) + 1}`} aria-labelledby={`project-${project.id}`}>
      <span className="project-tape" aria-hidden="true" />
      <div className="project-print">
        <Image
          src={project.image.src}
          alt={project.image.alt}
          fill
          sizes="(max-width: 1023px) 90vw, 440px"
          style={{ objectPosition: project.image.position }}
        />
      </div>

      <p className="project-status">
        {project.award && <Signifier kind="important" />}
        {project.status}
      </p>
      <h2 id={`project-${project.id}`} className="project-title">
        <span className={project.award ? "project-title-highlight" : undefined}>{project.title}</span>
      </h2>
      {project.subtitle && <p className="project-subtitle">{project.subtitle}</p>}
      <p className="project-blurb">{project.blurb}</p>

      <ul className="project-tech" aria-label="Tools and tech">
        {project.tech.map((tool) => (
          <li key={tool}>{tool}</li>
        ))}
      </ul>

      <p className="project-links">
        {project.links.map((link) =>
          // Pages on this site open in place; other sites and files open in a new tab.
          link.href.startsWith("/") && !link.href.startsWith("/files/") ? (
            <Link key={link.href} href={link.href}>
              {link.label} →
            </Link>
          ) : (
            <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">
              {link.label} →
            </a>
          ),
        )}
      </p>
    </article>
  );
}
