const features = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
    title: "Fast API",
    desc: "Optimized requests and caching for low-latency performance.",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
    title: "Secure System",
    desc: "Robust authentication and rate-limiting built in.",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    title: "Developer Friendly",
    desc: "Clear docs, playground, and example integrations.",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
    title: "Global Performance",
    desc: "Multi-region infrastructure for reliable uptime.",
  },
];

export default function FeaturesSection() {
  return (
    <section className="w-full max-w-5xl mx-auto px-4 py-16">
      <h2
        className="text-3xl font-bold text-center mb-3 tracking-tight"
        style={{ color: "hsl(180, 100%, 80%)" }}
      >
        Features
      </h2>
      <p className="text-center mb-12 text-sm" style={{ color: "rgba(0, 255, 255, 0.4)" }}>
        Built for speed, security, and scalability
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((f) => (
          <div key={f.title} className="feature-card group cursor-default">
            <div
              className="mb-4 w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
              style={{
                background: "rgba(0, 255, 255, 0.08)",
                color: "hsl(180, 100%, 60%)",
                border: "1px solid rgba(0, 255, 255, 0.15)",
              }}
            >
              {f.icon}
            </div>
            <h3 className="text-lg font-semibold mb-2" style={{ color: "hsl(180, 100%, 80%)" }}>
              {f.title}
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: "rgba(0, 255, 255, 0.45)" }}>
              {f.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
