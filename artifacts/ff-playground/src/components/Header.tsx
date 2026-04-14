export default function Header() {
  return (
    <header className="w-full pt-12 pb-4 text-center relative z-10">
      <h1
        className="text-5xl md:text-6xl font-black tracking-wider mb-3"
        style={{
          fontFamily: "'Inter', monospace",
          color: "hsl(180, 100%, 50%)",
          textShadow: "0 0 40px rgba(0, 255, 255, 0.4), 0 0 80px rgba(0, 255, 255, 0.15)",
          letterSpacing: "0.15em",
        }}
      >
        WOTAXX
      </h1>
      <h2
        className="text-lg font-semibold tracking-widest uppercase mb-1"
        style={{ color: "hsl(180, 100%, 85%)" }}
      >
        API Playground
      </h2>
      <p
        className="text-sm tracking-wider"
        style={{ color: "rgba(0, 255, 255, 0.4)" }}
      >
        Free Fire Developer Tools
      </p>
      <div
        className="mx-auto mt-6 w-48 h-px"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(0, 255, 255, 0.4), transparent)",
        }}
      />
    </header>
  );
}
