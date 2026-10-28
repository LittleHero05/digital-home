import { Signifier } from "@/components/Signifier";
import { contactLinks } from "@/content/contact";

// A taped strip under the spread with ways to reach me.
export function ContactFooter() {
  return (
    <footer className="contact-footer" aria-labelledby="contact-title">
      <span className="contact-tape" aria-hidden="true" />
      <h2 id="contact-title" className="contact-title">
        contact me
      </h2>
      <ul className="contact-links">
        {contactLinks.map((link) => {
          const external = !link.href.startsWith("mailto:");
          return (
            <li key={link.label}>
              <Signifier kind="task" />
              <a href={link.href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                <span className="contact-label">{link.label}</span>
                <span className="contact-handle">{link.handle}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </footer>
  );
}
