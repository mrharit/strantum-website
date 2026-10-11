import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { CurrentYear } from "@/components/layout/CurrentYear";
import { Todo } from "@/components/ui/Todo";
import { companyLinks, legalLinks, services, solutions } from "@/content/nav";
import { site } from "@/lib/site";

const linkClass =
  "inline-block py-1 text-[0.9375rem] text-ivory-muted transition-colors duration-300 hover:text-ivory motion-reduce:transition-none";

function Column({
  title,
  links,
}: {
  title: string;
  links: { href: string; title: string }[];
}) {
  return (
    <nav aria-label={title}>
      <h2 className="eyebrow">{title}</h2>
      <ul className="mt-5 grid gap-1">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className={linkClass}>
              {l.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function Footer() {
  const { contact } = site;

  return (
    <footer className="grain surface-raised border-t border-line">
      <div className="container-page py-16 md:py-20">
        <div className="grid gap-14 lg:grid-cols-[1.5fr_1.25fr_1fr_1fr] lg:gap-10">
          <div>
            <Link href="/" className="inline-block">
              <Logo variant="on-ink" size="md" />
            </Link>
            <p className="mt-6 max-w-xs text-[0.9375rem] leading-relaxed text-ivory-muted">
              {site.mission}
            </p>

            <dl className="mt-8 grid gap-5 text-[0.9375rem]">
              <div>
                <dt className="eyebrow">Office</dt>
                <dd className="mt-1.5 text-ivory-muted">
                  {contact.address ?? <Todo>office address</Todo>}
                </dd>
              </div>
              <div>
                <dt className="eyebrow">Email</dt>
                <dd className="mt-1.5 text-ivory-muted">
                  {contact.email ? (
                    <a
                      href={`mailto:${contact.email}`}
                      className="transition-colors hover:text-ivory"
                    >
                      {contact.email}
                    </a>
                  ) : (
                    <Todo>email</Todo>
                  )}
                </dd>
              </div>
              <div>
                <dt className="eyebrow">Phone</dt>
                <dd className="mt-1.5 text-ivory-muted">
                  {contact.phone ? (
                    <a
                      href={`tel:${contact.phone.replace(/\s/g, "")}`}
                      className="transition-colors hover:text-ivory"
                    >
                      {contact.phone}
                    </a>
                  ) : (
                    <Todo>phone</Todo>
                  )}
                </dd>
              </div>
              <div>
                <dt className="eyebrow">LinkedIn</dt>
                <dd className="mt-1.5 text-ivory-muted">
                  {contact.linkedin ? (
                    <a
                      href={contact.linkedin}
                      rel="noopener noreferrer"
                      target="_blank"
                      className="transition-colors hover:text-ivory"
                    >
                      STRANTUM on LinkedIn
                    </a>
                  ) : (
                    <Todo>LinkedIn URL</Todo>
                  )}
                </dd>
              </div>
            </dl>
          </div>

          <Column title="Services" links={services} />
          <Column title="Solutions" links={solutions} />
          <Column title="Company" links={companyLinks} />
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-line pt-6 text-[0.8125rem] text-ivory-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © <CurrentYear /> {site.name} — {site.tagline}. All rights
            reserved.
          </p>
          <ul className="flex items-center gap-6">
            {legalLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="py-1 transition-colors duration-300 hover:text-ivory motion-reduce:transition-none"
                >
                  {l.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
