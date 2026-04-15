export default function Header() {
  return (
    <header className="w-full pt-12 pb-4 text-center relative z-10">
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "8px" }}>
        <img
          src="/talha-logo.png"
          alt="TALHA"
          style={{
            height: "clamp(80px, 12vw, 130px)",
            width: "auto",
            filter: "drop-shadow(0 0 28px rgba(190, 80, 255, 0.55)) drop-shadow(0 0 14px rgba(150, 40, 220, 0.35))",
            objectFit: "contain",
          }}
        />
      </div>
      <h2
        className="text-base font-semibold tracking-[0.3em] uppercase mb-1"
        style={{ color: "rgba(190, 80, 255, 0.75)", fontFamily: "'Space Grotesk', sans-serif" }}
      >
        API Playground
      </h2>
      <p
        className="text-xs tracking-widest uppercase"
        style={{ color: "rgba(190, 80, 255, 0.35)", fontFamily: "'Space Grotesk', sans-serif" }}
      >
        Free Fire Developer Tools
      </p>
      <div
        className="mx-auto mt-7 w-32 h-px"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(190, 80, 255, 0.55), transparent)",
        }}
      />
    </header>
  );
}
