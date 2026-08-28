// Everything the site renders lives here. Edit this file to update the site —
// no component changes needed.

export const profile = {
  name: "Raju Rekadi",
  initial: "R",
  logoA: "Raju",
  logoB: "Rekadi",
  greeting: "Hello, I'm",
  role: "FULL STACK DEVELOPER",
  tagline:
    "I build responsive web applications and the APIs behind them, and love turning requirements into real-world solutions.",
  location: "Vijayawada, Andhra Pradesh",
  email: "rajurekadi7@gmail.com",
  phone: "+91 95024 58428",
  phoneHref: "tel:+919502458428",
  linkedin: "https://www.linkedin.com/in/rajurekadi7",
  github: "https://github.com/raju-rekadi",
  // Drop a square photo at public/profile.jpeg and it will be used automatically.
  photo: "profile.jpeg",
  available: true,
  about:
    "A full-stack developer with 7+ years of experience building React and Node web platforms — bill tracking, single sign-on, asset and reporting systems used across Andhra Pradesh — alongside the React Native apps that feed them. Currently a Senior Software Engineer at OM Systems and Services, working on-site for AP TRANSCO.",
};

export const stats = [
  { value: "7+", label: "Years Experience" },
  // Career total across Nyros and AP TRANSCO. The Projects section shows the
  // main ones only, so this is deliberately higher than the card count.
  { value: "12+", label: "Projects Delivered" },
  { value: "20+", label: "Technologies" },
  { value: "3", label: "Companies" },
];

// Brand-coloured tiles in the hero. `short` is what gets drawn for anything
// without a dedicated glyph in <TechIcon />.
export const techs = [
  { name: "React", short: "R", color: "#61DAFB", glyph: "react" },
  { name: "JavaScript", short: "JS", color: "#F7DF1E", glyph: "js" },
  { name: "Next.js", short: "N", color: "#e5e7eb", glyph: "nextjs" },
  { name: "Node.js", short: "N", color: "#5FA04E", glyph: "node" },
  { name: "Express.js", short: "ex", color: "#e5e7eb", glyph: "express" },
  // Official mark from public/tech/ — see `img` handling in TechIcon.
  { name: "PostgreSQL", short: "PG", color: "#6BA7DC", img: "tech/postgresql.svg" },
  { name: "Tailwind CSS", short: "TW", color: "#38BDF8", glyph: "tailwind" },
  { name: "React Native", short: "RN", color: "#61DAFB", glyph: "reactnative" },
];

export const services = [
  {
    title: "Web Development",
    icon: "code",
    body: "Responsive React and Next.js applications with role-based dashboards, built mobile-first and accessible.",
  },
  {
    title: "Backend Development",
    icon: "database",
    body: "Secure, scalable Node.js and Express REST APIs with PostgreSQL schema design and reporting queries.",
  },
  {
    title: "Auth & Access Control",
    icon: "shield",
    body: "Keycloak single sign-on across an application suite, JWT sessions and fine-grained role-based access.",
  },
  {
    title: "Mobile Development",
    icon: "phone",
    body: "Cross-platform React Native apps with offline sync, camera, maps and secure device storage.",
  },
];

export const experience = [
  {
    role: "Senior Software Engineer",
    company: "OM Systems and Services Pvt Ltd",
    period: "Feb 2026 — Present",
    where: "Vijayawada, Andhra Pradesh · On-site",
    client: "AP TRANSCO",
    current: true,
    summary:
      "Full-stack development for state power-utility systems — bill tracking, single sign-on, SIM and asset management platforms used across Andhra Pradesh. Own features end to end, from database schema design through the React front end.",
  },
  {
    role: "Senior Software Engineer",
    company: "In2IT Enterprise Business Services",
    period: "Jul 2023 — Jan 2026 · 2 yrs 7 mos",
    where: "Vijayawada, Andhra Pradesh · On-site",
    client: "AP TRANSCO",
    summary:
      "Built and shipped the AP TRANSCO web and mobile suite — bill tracking, SSO, SIM management, substation monitoring and employee ID issuance. Worked across REST APIs, PostgreSQL schema design and Android delivery.",
  },
  {
    company: "Nyros Technologies",
    period: "Mar 2019 — May 2023 · 4 yrs 3 mos",
    where: "Kakinada, Andhra Pradesh",
    summary:
      "Progressed from trainee to Senior Development Engineer across four years, working on client projects in both frontend and backend roles.",
    link: { href: "https://rajurekadi7.netlify.app", label: "My portfolio from this period" },
    roles: [
      {
        title: "Senior Development Engineer",
        period: "Feb 2022 — May 2023 · Remote",
        note: "Led frontend and backend delivery across client projects, owning features end to end.",
      },
      {
        title: "Junior Development Engineer",
        period: "Sep 2019 — Feb 2022 · On-site",
        note: "Real-time projects after training — a CRM mobile application and a financial website.",
      },
      {
        title: "Trainee",
        period: "Mar 2019 — Aug 2019 · On-site",
        note: "Six months of training in JavaScript, CSS and web fundamentals.",
      },
    ],
  },
];

// kind: "mobile" | "web" | "both"  ·  order here is the order shown on the site
export const projects = [
  {
    title: "Bill Tracking System",
    kind: "web",
    meta: "AP TRANSCO",
    blurb:
      "End-to-end bill lifecycle tracking, from vendor submission through engineering approval to accounts settlement.",
    points: [
      "Role-based access across 10 distinct login types — vendors, engineers, accounts management and admin",
      "Each role sees only its own stage of a bill's progress, with its own permissions",
      "Full audit trail as a bill moves between departments",
    ],
    tags: ["React", "Node.js", "Express", "PostgreSQL", "Role-based access"],
  },
  {
    title: "SSO & Admin Dashboard",
    kind: "web",
    meta: "AP TRANSCO",
    blurb:
      "Single sign-on across the entire application suite, built on Keycloak — one login carries a user into every AP TRANSCO app.",
    points: [
      "Centralised identity for all applications instead of per-app accounts",
      "Admin dashboard for managing realms, roles, clients and user access",
      "JWT-backed sessions with fine-grained role mapping per application",
    ],
    tags: ["Keycloak", "OAuth2 / OIDC", "React", "Node.js", "JWT"],
  },
  {
    title: "SIM Management Application",
    kind: "web",
    meta: "AP TRANSCO",
    blurb:
      "Upload a monthly SIM bill and the system extracts every line of data, stores it, and turns it into manageable records.",
    points: [
      "Bill upload with automatic data extraction — no manual entry of line items",
      "Extracted records stored and reconciled against employee SIM allocations",
      "Role-based access for Super Admins and Pay Unit Admins",
      "Dashboards for SIM usage, monthly bills and employee-wise summaries, with downloads",
    ],
    tags: ["Next.js", "React", "Tailwind CSS", "Node.js", "PostgreSQL"],
  },
  {
    title: "Employee ID Card App",
    kind: "mobile",
    meta: "AP TRANSCO",
    blurb:
      "Capture an employee's photo and details on a phone, then generate and print their official ID card.",
    points: [
      "In-app image capture with employee information entry",
      "Card generation from the captured data, ready for printing",
      "Replaces the paper-form-and-studio-photo process for staff onboarding",
    ],
    tags: ["React Native", "Node.js", "JWT", "Secure storage"],
  },
  {
    title: "Survey Platform",
    kind: "both",
    meta: "AP TRANSCO",
    blurb:
      "Field survey collection on mobile paired with a web console for building surveys and reviewing submissions — one data model serving both clients.",
    points: [],
    tags: ["React Native", "React", "Node.js", "Express", "PostgreSQL"],
  },
  {
    title: "SSHMI Mobile App",
    kind: "mobile",
    meta: "AP TRANSCO",
    blurb: "Real-time monitoring and reporting across every substation in Andhra Pradesh.",
    points: [
      "24-hour readings entry with the current hour gated open",
      "Offline data capture with automatic sync when connectivity returns",
      "Logbook and tripping entries, plus dynamic chart-based reports",
    ],
    tags: ["React Native", "Context API", "Java Microservices", "Gifted Charts", "NetInfo"],
  },
  {
    title: "Student Results Portal",
    kind: "web",
    meta: "Side project · Open source",
    blurb:
      "A results viewer for a B.Sc. Computer Science batch — six semesters of marks with automatic SGPA and CGPA calculation, search and per-semester breakdowns.",
    points: [],
    tags: ["React", "Tailwind CSS", "GitHub Pages", "Jest"],
    link: "https://raju-rekadi.github.io/taskapp/",
  },
];

export const skills = [
  {
    group: "Frontend & Web",
    items: [
      "React", "Next.js", "JavaScript ES6+", "Redux", "Context API",
      "Tailwind CSS", "HTML", "CSS", "Axios", "Formik + Yup", "Recharts",
    ],
  },
  {
    group: "Backend & Data",
    items: [
      "Node.js", "Express.js", "REST APIs", "PostgreSQL", "MySQL",
      "Schema design", "JWT", "Keycloak", "OAuth2 / OIDC",
    ],
  },
  {
    group: "Mobile & Tooling",
    items: [
      "React Native", "React Navigation", "React Native Maps", "Android Studio",
      "Xcode", "Git", "Postman", "Jest", "VS Code", "AsyncStorage", "Keychain",
    ],
  },
];

export const education = [
  {
    title: "B.Tech, Electronics & Communication Engineering",
    where: "KIET College of Engineering · JNTUK",
    when: "2018 · 63%",
  },
  { title: "Intermediate (MPC)", where: "Sri Ravi Junior College · BIE, Andhra Pradesh", when: "2014 · 78%" },
  { title: "SSC", where: "ZPP High School · Board of Secondary Education", when: "2012 · GPA 8.8" },
];

export const navLinks = [
  { href: "#top", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#work", label: "Experience" },
  { href: "#contact", label: "Contact" },
];
