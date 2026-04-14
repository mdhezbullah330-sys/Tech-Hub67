export default function Header() {
  return (
    <header className="w-full pt-14 pb-4 text-center relative z-10">
      <h1
        className="text-6xl md:text-7xl font-black tracking-widest mb-3"
        style={{
          fontFamily: "'Orbitron', 'Space Grotesk', monospace",
          background: "linear-gradient(135deg, #00f0ff 0%, #00aaff 50%, #00f0ff 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          filter: "drop-shadow(0 0 24px rgba(0, 240, 255, 0.45))",
          letterSpacing: "0.18em",
        }}
      >
        TALHA
      </h1>
      <h2
        className="text-base font-semibold tracking-[0.3em] uppercase mb-1"
        style={{ color: "rgba(0, 240, 255, 0.7)", fontFamily: "'Space Grotesk', sans-serif" }}
      >
        API Playground
      </h2>
      <p
        className="text-xs tracking-widest uppercase"
        style={{ color: "rgba(0, 240, 255, 0.3)", fontFamily: "'Space Grotesk', sans-serif" }}
      >
        Free Fire Developer Tools
      </p>
      <div
        className="mx-auto mt-7 w-32 h-px"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(0, 240, 255, 0.5), transparent)",
        }}
      />
    </header>
  );
}
