import { ComingSoon } from "@/components/ComingSoon";
import { ContactFooter } from "@/components/ContactFooter";
import { InnerNav } from "@/components/InnerNav";
import { ProjectCard } from "@/components/ProjectCard";
import { Spread } from "@/components/Spread";
import { projects } from "@/content/projects";
import { sectionsReady } from "@/content/site";

export default function ProjectsPage() {
  // Read like a notebook: left page top to bottom, then the right page.
  const leftPage = projects.slice(0, 2);
  const rightPage = projects.slice(2);

  return (
    <>
      <InnerNav path={["projects"]} />
      <Spread
        className="spread-projects"
        left={
          <>
            <p className="page-eyebrow">things I&apos;ve built</p>
            <h1 className="page-title">Projects</h1>
            <p className="page-blurb">A loose shelf for tools, experiments, and work in progress.</p>
            {sectionsReady.projects && (
              <div className="project-list">
                {leftPage.map((project, index) => (
                  <ProjectCard key={project.id} project={project} index={index} />
                ))}
              </div>
            )}
          </>
        }
        right={
          sectionsReady.projects ? (
            <div className="project-list">
              {rightPage.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index + leftPage.length} />
              ))}
            </div>
          ) : (
            <ComingSoon section="the projects shelf" />
          )
        }
      />
      <ContactFooter />
    </>
  );
}
