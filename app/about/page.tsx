import { AboutBoard } from "@/components/AboutBoard";
import { InnerNav } from "@/components/InnerNav";
import { Spread } from "@/components/Spread";
import { aboutObjects, intro, quickFacts } from "@/content/about";

export default function AboutPage() {
  return (
    <>
      <InnerNav path={["about"]} />
      <Spread
        className="spread-about"
        left={
          <>
            <p className="page-eyebrow">a little context · brain dump</p>
            <h1 className="page-title">About</h1>
            <p className="about-intro">{intro}</p>
            <p className="about-hint">(click around: some things open a note, some flip through photos)</p>
          </>
        }
        right={
          <section className="quick-facts" aria-labelledby="quick-facts-title">
            <h2 id="quick-facts-title" className="quick-facts-title">
              quick facts
            </h2>
            <dl>
              {quickFacts.map((fact) => (
                <div key={fact.label}>
                  <dt>{fact.label}:</dt>
                  <dd>{fact.value}</dd>
                </div>
              ))}
            </dl>
          </section>
        }
        overlay={<AboutBoard objects={aboutObjects} />}
      />
    </>
  );
}
