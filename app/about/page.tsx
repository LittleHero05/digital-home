import { InnerNav } from "@/components/InnerNav";
import { Spread } from "@/components/Spread";

export default function AboutPage() {
  return (
    <>
      <InnerNav path={["about"]} />
      <Spread
        left={
          <>
            <div className="portrait-placeholder" role="img" aria-label="Placeholder portrait" />
            <p className="page-eyebrow">a little context</p>
            <h1 className="page-title">About</h1>
            <p className="page-blurb">[Placeholder bio] Write a few warm, specific lines about who you are and what this place holds.</p>
          </>
        }
        right={
          <div className="about-copy">
            <h2>Currently</h2>
            <ul>
              <li>[What you are learning]</li>
              <li>[What you are making]</li>
              <li>[What you are reading or noticing]</li>
            </ul>
            <h2>Elsewhere</h2>
            <p>[Add links to the places you want people to find you.]</p>
          </div>
        }
      />
    </>
  );
}