const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  viewBox: "0 0 24 24",
};

export const MailIcon = (p) => (
  <svg {...stroke} {...p}>
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-10 6L2 7" />
  </svg>
);

export const PhoneIcon = (p) => (
  <svg {...stroke} {...p}>
    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.7 2Z" />
  </svg>
);

export const LinkedInIcon = (p) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05C20.5 8.65 21 11 21 14.1V21h-4v-6.1c0-1.45-.03-3.3-2-3.3-2 0-2.3 1.57-2.3 3.2V21H9z" />
  </svg>
);

export const GitHubIcon = (p) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.5 9.5 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2z" />
  </svg>
);

export const ArrowIcon = (p) => (
  <svg {...stroke} {...p}>
    <path d="M5 12h14" />
    <path d="m13 6 6 6-6 6" />
  </svg>
);

export const SendIcon = (p) => (
  <svg {...stroke} {...p}>
    <path d="M22 2 11 13" />
    <path d="M22 2 15 22l-4-9-9-4 20-7Z" />
  </svg>
);

export const DownloadIcon = (p) => (
  <svg {...stroke} {...p}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <path d="M7 10l5 5 5-5" />
    <path d="M12 15V3" />
  </svg>
);

export const ExternalIcon = (p) => (
  <svg {...stroke} {...p}>
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <path d="M15 3h6v6" />
    <path d="M10 14 21 3" />
  </svg>
);

export const MenuIcon = (p) => (
  <svg {...stroke} {...p}>
    <path d="M3 6h18M3 12h18M3 18h18" />
  </svg>
);

export const CloseIcon = (p) => (
  <svg {...stroke} {...p}>
    <path d="M18 6 6 18M6 6l12 12" />
  </svg>
);

/* ---------- Service card icons ---------- */
const SERVICE = {
  code: (
    <>
      <rect x="2.5" y="4" width="19" height="16" rx="2.5" />
      <path d="M8.5 10.5 6 13l2.5 2.5M15.5 10.5 18 13l-2.5 2.5" />
    </>
  ),
  phone: (
    <>
      <rect x="6" y="2.5" width="12" height="19" rx="2.5" />
      <path d="M10.5 18.5h3" />
    </>
  ),
  database: (
    <>
      <ellipse cx="12" cy="6" rx="8" ry="3.2" />
      <path d="M4 6v6c0 1.8 3.6 3.2 8 3.2s8-1.4 8-3.2V6" />
      <path d="M4 12v6c0 1.8 3.6 3.2 8 3.2s8-1.4 8-3.2v-6" />
    </>
  ),
  shield: (
    <>
      <path d="M12 2.5 4 6v6c0 5 3.4 8.4 8 9.5 4.6-1.1 8-4.5 8-9.5V6l-8-3.5Z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
};

export const ServiceIcon = ({ name, ...p }) => (
  <svg {...stroke} {...p}>
    {SERVICE[name] || SERVICE.code}
  </svg>
);

/* ---------- Tech tiles ---------- */
export function TechIcon({ tech }) {
  const { name, short, color, glyph, dark } = tech;
  return (
    <span
      title={name}
      className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-white/[0.04] transition hover:-translate-y-1 hover:border-fuchsia-500/40"
    >
      {glyph === "react" ? (
        <svg viewBox="0 0 24 24" className="h-6 w-6" style={{ color }}>
          <circle cx="12" cy="12" r="2.1" fill="currentColor" />
          <g fill="none" stroke="currentColor" strokeWidth="1.1">
            <ellipse cx="12" cy="12" rx="10" ry="4.2" />
            <ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(60 12 12)" />
            <ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(120 12 12)" />
          </g>
        </svg>
      ) : glyph === "node" ? (
        <svg viewBox="0 0 24 24" className="h-6 w-6" style={{ color }}>
          <path
            d="M12 2.2 21 7.4v9.2L12 21.8 3 16.6V7.4l9-5.2Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
          <text x="12" y="15.4" textAnchor="middle" fontSize="7" fontWeight="700" fill="currentColor">
            N
          </text>
        </svg>
      ) : (
        <span
          className="text-[13px] font-extrabold leading-none"
          style={{ color: dark ? color : color }}
        >
          {short}
        </span>
      )}
    </span>
  );
}
