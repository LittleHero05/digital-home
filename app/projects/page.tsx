import { Spread } from "@/components/Spread";
import { InnerNav } from "@/components/InnerNav";
import { projects } from "@/content/projects";

export default function ProjectsPage() {
  return (
    <>
      <InnerNav path={["projects"]} />
      <Spread
        left={
          <>
            <p className="page-eyebrow">things I&apos;ve built</p>
            <h1 className="page-title">Projects</h1>
            <p className="page-blurb">A loose shelf for tools, experiments, and work in progress.</p>
          </>
        }
        right={
          <div className="note-grid">
            {projects.map((project, index) => (
              <article className={`note-card note-card-${index + 1}`} key={project.title}>
                <p className="note-label">{project.status}</p>
                <h2>{project.title}</h2>
                <p>{project.blurb}</p>
                <p className="note-tags">{project.tags.join(" / ")}</p>
              </article>
            ))}
          </div>
        }
      />
    </>
  );
}