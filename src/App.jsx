import { useEffect, useState } from "react";
import { profile, stats, techs, services, experience, projects, skills, education, navLinks } from "./data";
import {
  MailIcon, PhoneIcon, LinkedInIcon, GitHubIcon, ArrowIcon, SendIcon,
  DownloadIcon, ExternalIcon, MenuIcon, CloseIcon, ServiceIcon, TechIcon,
} from "./icons.jsx";

const KIND_STYLES = {
  mobile: "bg-emerald-500/10 text-emerald-300 ring-emerald-500/25",
  web: "bg-sky-500/10 text-sky-300 ring-sky-500/25",
  both: "bg-emerald-500/10 text-emerald-300 ring-emerald-500/25",
};
const KIND_LABELS = { mobile: "Mobile", web: "Web", both: "Mobile + Web" };

/* Highlights the nav link whose section is currently in view. */
function useActiveSection(ids) {
  const [active, setActive] = useState("top");
  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [ids]);
  return active;
}

/* ------------------------------------------------------------------ Nav */
// Stable across renders — passing a fresh array would re-create the observer
// on every render.
const SECTION_IDS = navLinks.map((l) => l.href.slice(1));

function Nav() {
  const active = useActiveSection(SECTION_IDS);
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#04100c]/80 backdrop-blur-xl">
      <div className="wrap flex h-16 items-center justify-between gap-4">
        <a href="#top" className="text-lg font-extrabold tracking-tight text-white">
          {profile.logoA}
          <span className="grad-text">{profile.logoB}</span>
          <span className="text-emerald-400">.</span>
        </a>

        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map((l) => {
            const on = active === l.href.slice(1);
            return (
              <a
                key={l.href}
                href={l.href}
                className={
                  "relative px-3 py-2 text-sm font-medium transition " +
                  (on ? "text-white" : "text-slate-400 hover:text-white")
                }
              >
                {l.label}
                {on && (
                  <span className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-gradient-to-r from-emerald-400 to-teal-300" />
                )}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={`mailto:${profile.email}`}
            className="hidden items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 px-4 py-2 text-[13px] font-bold text-[#04100c] transition hover:brightness-110 sm:inline-flex"
          >
            <DownloadIcon className="h-4 w-4" />
            Hire me
          </a>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 text-slate-300 lg:hidden"
          >
            {open ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-white/10 bg-[#04100c] px-5 py-3 lg:hidden">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block rounded-lg px-3 py-2.5 text-sm font-medium text-slate-300 hover:bg-white/5 hover:text-white"
            >
              {l.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}

/* ---------------------------------------------------------------- Hero */
function Avatar() {
  const [failed, setFailed] = useState(false);
  return (
    <div className="relative mx-auto w-full max-w-[19rem] lg:max-w-[22rem]">
      <div aria-hidden className="dots absolute -right-4 -top-4 h-24 w-24 rounded-xl opacity-70" />
      <div aria-hidden className="dots absolute -bottom-4 -left-4 h-24 w-24 rounded-xl opacity-70" />
      <div aria-hidden className="absolute inset-0 -z-10 rounded-full bg-gradient-to-br from-emerald-500/45 to-teal-400/35 blur-3xl" />
      <div className="rounded-full bg-gradient-to-br from-emerald-500 to-teal-400 p-1.5">
        <div className="aspect-square overflow-hidden rounded-full bg-[#07201a]">
          {failed ? (
            <div className="grid h-full w-full place-items-center">
              <span className="grad-text text-7xl font-extrabold">{profile.initial}</span>
            </div>
          ) : (
            <img
              // BASE_URL keeps this correct on GitHub Pages even when the URL
              // is hit without a trailing slash, where a relative path breaks.
              src={import.meta.env.BASE_URL + profile.photo}
              alt={profile.name}
              onError={() => setFailed(true)}
              className="h-full w-full object-cover"
            />
          )}
        </div>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden pb-14 pt-12 sm:pt-16">
      <div className="wrap grid items-center gap-12 lg:grid-cols-[1.15fr_1fr]">
        <div>
          <p className="text-lg text-slate-400 sm:text-xl">{profile.greeting}</p>

          <h1 className="grad-text mt-1 text-[clamp(2.6rem,9vw,4.6rem)] font-extrabold leading-[1.02] tracking-tight">
            {profile.name}
          </h1>

          <p className="mt-2 text-sm font-bold uppercase tracking-[0.16em] text-emerald-400 sm:text-base">
            {profile.role}
          </p>

          <p className="mt-5 max-w-[46ch] text-[15px] leading-relaxed text-slate-400 sm:text-base">
            {profile.tagline}
          </p>

          <div className="mt-7 flex flex-wrap gap-2.5">
            {techs.map((t) => (
              <TechIcon key={t.name} tech={t} />
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#projects" className="btn-grad">
              View My Work <ArrowIcon className="h-4 w-4" />
            </a>
            <a href="#contact" className="btn-ghost">
              Contact Me <SendIcon className="h-4 w-4" />
            </a>
          </div>
        </div>

        <Avatar />
      </div>

      {/* Services */}
      <div className="wrap mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((s) => (
          <div key={s.title} className="panel panel-hover p-5">
            <span className="grid h-11 w-11 place-items-center rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-300">
              <ServiceIcon name={s.icon} className="h-5 w-5" />
            </span>
            <h3 className="mt-4 font-semibold text-emerald-300">{s.title}</h3>
            <p className="mt-1.5 text-[13.5px] leading-relaxed text-slate-400">{s.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------- Section */
function Section({ id, kicker, title, sub, children }) {
  return (
    <section id={id} className="py-14 sm:py-16">
      <div className="wrap">
        <div className="mb-8">
          <div className="kicker">{kicker}</div>
          <h2 className="heading">{title}</h2>
          {sub && <p className="mt-2 max-w-[62ch] text-slate-400">{sub}</p>}
        </div>
        {children}
      </div>
    </section>
  );
}

function ProjectCard({ p }) {
  return (
    <article className="panel panel-hover group flex flex-col gap-3 p-5">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-[1.02rem] font-semibold tracking-tight text-white">
          {p.link ? (
            <a
              href={p.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-emerald-300"
            >
              {p.title}
              <ExternalIcon className="h-3.5 w-3.5 opacity-0 transition group-hover:opacity-100" />
            </a>
          ) : (
            p.title
          )}
        </h3>
        <span
          className={"flex-none rounded-full px-2.5 py-1 text-[10.5px] font-bold uppercase tracking-wider ring-1 " + KIND_STYLES[p.kind]}
        >
          {KIND_LABELS[p.kind]}
        </span>
      </div>

      <p className="-mt-1 text-[12.5px] text-slate-500">{p.meta}</p>
      <p className="text-[14.3px] leading-relaxed text-slate-400">{p.blurb}</p>

      {p.points.length > 0 && (
        <ul className="list-disc space-y-1 pl-5 text-[14px] text-slate-400">
          {p.points.map((pt) => (
            <li key={pt}>{pt}</li>
          ))}
        </ul>
      )}

      <div className="mt-auto flex flex-wrap gap-1.5 pt-1">
        {p.tags.map((t) => (
          <span key={t} className="tag">
            {t}
          </span>
        ))}
      </div>
    </article>
  );
}

function Contact() {
  const items = [
    { Icon: MailIcon, label: "Email", value: profile.email, href: `mailto:${profile.email}` },
    { Icon: PhoneIcon, label: "Phone", value: profile.phone, href: profile.phoneHref },
    { Icon: LinkedInIcon, label: "LinkedIn", value: "in/rajurekadi7", href: profile.linkedin },
    { Icon: GitHubIcon, label: "GitHub", value: "@raju-rekadi", href: profile.github },
  ];
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {items.map(({ Icon, label, value, href }) => (
        <a
          key={label}
          href={href}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel="noopener noreferrer"
          className="panel panel-hover flex items-center gap-3.5 p-4"
        >
          <span className="grid h-11 w-11 flex-none place-items-center rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-300">
            <Icon className="h-5 w-5" />
          </span>
          <span className="min-w-0">
            <span className="block text-[11px] font-semibold uppercase tracking-wider text-slate-500">{label}</span>
            <span className="block break-words text-[14.5px] font-semibold text-white">{value}</span>
          </span>
        </a>
      ))}
    </div>
  );
}

/* ----------------------------------------------------------------- App */
export default function App() {
  return (
    <div id="top">
      <Nav />
      <main>
        <Hero />

        {/* About + stats */}
        <Section id="about" kicker="About me" title="A bit about my work">
          <div className="grid gap-4 lg:grid-cols-[1.3fr_1fr]">
            <div className="panel p-6">
              <p className="text-[15px] leading-relaxed text-slate-300">{profile.about}</p>
              <p className="mt-4 text-[15px] leading-relaxed text-slate-400">
                Most of what I build runs in the field — substations, low connectivity, users who cannot
                retry a failed sync. That shapes how I work: offline-first data capture, secure storage,
                and interfaces that stay usable on a mid-range Android phone.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 content-start">
              {stats.map((s) => (
                <div key={s.label} className="panel p-4 text-center">
                  <div className="grad-text text-2xl font-extrabold">{s.value}</div>
                  <div className="mt-1 text-[12px] font-medium text-slate-400">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </Section>

        <Section id="skills" kicker="Toolkit" title="Technical skills">
          <div className="grid gap-4 md:grid-cols-3">
            {skills.map((s) => (
              <div key={s.group} className="panel p-5">
                <h3 className="mb-3 text-[13px] font-bold uppercase tracking-wider text-emerald-300">{s.group}</h3>
                <div className="flex flex-wrap gap-1.5">
                  {s.items.map((i) => (
                    <span key={i} className="tag">
                      {i}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section
          id="projects"
          kicker="Selected work"
          title="Projects"
          sub="A selection of the main systems I've built for AP TRANSCO and other clients — several serving field staff in low-connectivity environments, where offline capability and reliability matter more than polish."
        >
          <div className="grid gap-4 sm:grid-cols-2">
            {projects.map((p) => (
              <ProjectCard key={p.title} p={p} />
            ))}
          </div>
        </Section>

        <Section id="work" kicker="Experience" title="Where I've worked">
          <div className="grid gap-4">
            {experience.map((job) => (
              <article key={job.company} className="panel relative overflow-hidden p-5 pl-6">
                <span className="absolute inset-y-5 left-0 w-[3px] rounded-full bg-gradient-to-b from-emerald-400 to-teal-300" />

                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="text-[1.05rem] font-semibold tracking-tight text-white">
                    {job.role && <>{job.role} · </>}
                    <span className="grad-text">{job.company}</span>
                    {job.current && (
                      <span className="ml-2 inline-flex items-center gap-1.5 rounded-full bg-green-500/10 px-2.5 py-0.5 align-middle text-[10.5px] font-bold uppercase tracking-wider text-green-300 ring-1 ring-green-500/25">
                        <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
                        Current
                      </span>
                    )}
                  </h3>
                  <span className="whitespace-nowrap text-[12.5px] tabular-nums text-slate-500">{job.period}</span>
                </div>

                <p className="mt-1 text-[12.5px] text-slate-500">
                  {job.where}
                  {job.client && (
                    <>
                      {" · Client: "}
                      <span className="font-semibold text-emerald-300/90">{job.client}</span>
                    </>
                  )}
                </p>

                <p className="mt-2.5 text-[14.5px] leading-relaxed text-slate-400">{job.summary}</p>

                {job.link && (
                  <a
                    href={job.link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-[12.5px] font-semibold text-emerald-300 transition hover:border-emerald-400/60 hover:bg-emerald-500/20"
                  >
                    {job.link.label}
                    <ExternalIcon className="h-3.5 w-3.5" />
                  </a>
                )}

                {job.roles && (
                  <ol className="mt-4 space-y-3 border-l border-white/10 pl-4">
                    {job.roles.map((r) => (
                      <li key={r.title} className="relative">
                        <span className="absolute -left-[21px] top-1.5 h-2 w-2 rounded-full bg-emerald-400/70 ring-4 ring-emerald-500/10" />
                        <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                          <strong className="text-[14px] font-semibold text-slate-200">{r.title}</strong>
                          <span className="text-[12px] tabular-nums text-slate-500">{r.period}</span>
                        </div>
                        <p className="mt-0.5 text-[13.5px] leading-relaxed text-slate-400">{r.note}</p>
                      </li>
                    ))}
                  </ol>
                )}
              </article>
            ))}
          </div>
        </Section>

        <Section id="education" kicker="Background" title="Education">
          <div className="grid gap-3">
            {education.map((e) => (
              <div key={e.title} className="panel flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 p-4">
                <div>
                  <strong className="font-semibold text-white">{e.title}</strong>
                  <div className="text-[13.5px] text-slate-500">{e.where}</div>
                </div>
                <span className="text-[13.5px] text-slate-500">{e.when}</span>
              </div>
            ))}
          </div>
        </Section>

        <Section
          id="contact"
          kicker="Contact"
          title="Let's talk"
          sub="Open to full-stack and mobile roles. The fastest way to reach me is email."
        >
          <Contact />
        </Section>
      </main>

      <footer className="border-t border-white/10">
        <div className="wrap flex flex-wrap justify-between gap-x-5 gap-y-2 py-8 text-[13px] text-slate-500">
          <span>
            © {new Date().getFullYear()} {profile.name} · {profile.location}
          </span>
          <span>Built with React, Vite &amp; Tailwind</span>
        </div>
      </footer>
    </div>
  );
}
