import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ScratchIntroProps {
  onDone: () => void;
}

const scratches = [
  "M 120 80 Q 300 180 480 120",
  "M 200 60 Q 350 200 600 100",
  "M 80 140 Q 280 220 520 160",
  "M 160 100 Q 400 240 650 130",
  "M 240 70 Q 420 200 700 110",
];

export default function ScratchIntro({ onDone }: ScratchIntroProps) {
  const [phase, setPhase] = useState<"scratching" | "exiting">("scratching");
  const [visibleScratches, setVisibleScratches] = useState<number[]>([]);
  const [pawX, setPawX] = useState(150);
  const [pawY, setPawY] = useState(120);

  useEffect(() => {
    // Animate paw and add scratches sequentially
    const timings = [400, 900, 1400, 1900, 2400];
    const pawPositions = [
      { x: 140, y: 100 },
      { x: 220, y: 80 },
      { x: 160, y: 150 },
      { x: 200, y: 110 },
      { x: 260, y: 90 },
    ];

    timings.forEach((t, i) => {
      setTimeout(() => {
        setVisibleScratches((prev) => [...prev, i]);
        setPawX(pawPositions[i].x);
        setPawY(pawPositions[i].y);
      }, t);
    });

    // Start exit phase
    setTimeout(() => {
      setPhase("exiting");
      setTimeout(onDone, 700);
    }, 3400);
  }, [onDone]);

  return (
    <AnimatePresence>
      {phase === "scratching" && (
        <motion.div
          key="scratch-intro"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.6, ease: [0.7, 0, 0.84, 0] }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 100,
            background: "radial-gradient(ellipse at 30% 50%, #05081a 0%, #020408 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          {/* Background grid */}
          <svg
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.07 }}
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#00f0ff" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>

          {/* Scratch lines */}
          <svg
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
            viewBox="0 0 800 450"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              <filter id="glow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            {scratches.map((d, i) => (
              <motion.path
                key={i}
                d={d}
                fill="none"
                stroke={i % 2 === 0 ? "rgba(0,240,255,0.7)" : "rgba(160,80,255,0.65)"}
                strokeWidth={1.5}
                strokeLinecap="round"
                filter="url(#glow)"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={
                  visibleScratches.includes(i)
                    ? { pathLength: 1, opacity: [0, 1, 1, 0.6] }
                    : { pathLength: 0, opacity: 0 }
                }
                transition={{ duration: 0.35, ease: "easeOut" }}
              />
            ))}

            {/* Glass crack lines */}
            {visibleScratches.length >= 3 && (
              <>
                <motion.line
                  x1="300" y1="140" x2="380" y2="280"
                  stroke="rgba(255,255,255,0.15)" strokeWidth="0.8"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                  transition={{ delay: 0.1, duration: 0.4 }}
                />
                <motion.line
                  x1="380" y1="280" x2="440" y2="380"
                  stroke="rgba(255,255,255,0.1)" strokeWidth="0.5"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                />
                <motion.line
                  x1="300" y1="140" x2="220" y2="320"
                  stroke="rgba(255,255,255,0.1)" strokeWidth="0.5"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                  transition={{ delay: 0.15, duration: 0.4 }}
                />
              </>
            )}
          </svg>

          {/* Cat with scratch animation */}
          <motion.div
            style={{ position: "relative", zIndex: 10 }}
            animate={{ x: [0, 20, -10, 25, -5, 0], y: [0, -8, 4, -6, 2, 0] }}
            transition={{ duration: 2.4, ease: "easeInOut", repeat: 0 }}
          >
            <ScratchCat pawX={pawX} pawY={pawY} scratchCount={visibleScratches.length} />
          </motion.div>

          {/* Label */}
          <motion.div
            style={{
              position: "absolute",
              bottom: "15%",
              left: "50%",
              transform: "translateX(-50%)",
              fontFamily: "'Orbitron', monospace",
              fontSize: "0.75rem",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "rgba(0,240,255,0.4)",
            }}
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 1.2, repeat: Infinity }}
          >
            Initializing Security Gate...
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ScratchCat({ scratchCount }: { pawX: number; pawY: number; scratchCount: number }) {
  const isScratching = scratchCount > 0;
  return (
    <svg viewBox="0 0 200 220" width="220" height="220" xmlns="http://www.w3.org/2000/svg" style={{ overflow: "visible" }}>
      {/* Body */}
      <ellipse cx="100" cy="158" rx="44" ry="40" fill="rgba(4,12,28,0.9)" stroke="rgba(0,240,255,0.2)" strokeWidth="0.8" />
      {/* Head */}
      <ellipse cx="100" cy="88" rx="40" ry="37" fill="rgba(4,12,28,0.9)" stroke="rgba(0,240,255,0.2)" strokeWidth="0.8" />
      {/* Ears */}
      <polygon points="70,58 78,24 96,56" fill="rgba(4,12,28,0.95)" stroke="rgba(0,240,255,0.25)" strokeWidth="0.8" />
      <polygon points="75,54 81,34 93,53" fill="rgba(0,240,255,0.06)" />
      <polygon points="130,58 122,24 104,56" fill="rgba(4,12,28,0.95)" stroke="rgba(0,240,255,0.25)" strokeWidth="0.8" />
      <polygon points="125,54 119,34 107,53" fill="rgba(0,240,255,0.06)" />

      {/* Eyes - angry/determined while scratching */}
      {isScratching ? (
        <>
          {/* Furrowed angry eyes */}
          <path d="M76 74 Q84 70 92 74" fill="none" stroke="rgba(0,240,255,0.4)" strokeWidth="1.2" />
          <path d="M108 74 Q116 70 124 74" fill="none" stroke="rgba(0,240,255,0.4)" strokeWidth="1.2" />
          <ellipse cx="84" cy="77" rx="6" ry="6" fill="rgba(200,230,255,0.9)" />
          <ellipse cx="116" cy="77" rx="6" ry="6" fill="rgba(200,230,255,0.9)" />
          <ellipse cx="85" cy="78" rx="3.5" ry="4.5" fill="rgba(4,12,28,0.95)" />
          <ellipse cx="117" cy="78" rx="3.5" ry="4.5" fill="rgba(4,12,28,0.95)" />
          {/* Angry eyebrows */}
          <line x1="74" y1="70" x2="90" y2="73" stroke="rgba(0,240,255,0.6)" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="110" y1="73" x2="126" y2="70" stroke="rgba(0,240,255,0.6)" strokeWidth="1.5" strokeLinecap="round" />
        </>
      ) : (
        <>
          <ellipse cx="84" cy="77" rx="7" ry="7" fill="rgba(200,230,255,0.9)" />
          <ellipse cx="116" cy="77" rx="7" ry="7" fill="rgba(200,230,255,0.9)" />
          <ellipse cx="85" cy="78" rx="4" ry="5" fill="rgba(4,12,28,0.95)" />
          <ellipse cx="117" cy="78" rx="4" ry="5" fill="rgba(4,12,28,0.95)" />
          <circle cx="83" cy="75" r="1.5" fill="rgba(255,255,255,0.8)" />
          <circle cx="115" cy="75" r="1.5" fill="rgba(255,255,255,0.8)" />
        </>
      )}

      {/* Nose */}
      <ellipse cx="100" cy="93" rx="3.5" ry="2.5" fill="rgba(255,150,180,0.8)" />

      {/* Mouth - grin while scratching */}
      {isScratching ? (
        <path d="M88 98 Q100 108 112 98" fill="none" stroke="rgba(0,240,255,0.7)" strokeWidth="1.5" strokeLinecap="round" />
      ) : (
        <path d="M94 98 Q100 103 106 98" fill="none" stroke="rgba(200,230,255,0.5)" strokeWidth="1.2" strokeLinecap="round" />
      )}

      {/* Whiskers */}
      <line x1="58" y1="93" x2="90" y2="95" stroke="rgba(0,240,255,0.25)" strokeWidth="0.8" />
      <line x1="58" y1="97" x2="90" y2="97" stroke="rgba(0,240,255,0.25)" strokeWidth="0.8" />
      <line x1="110" y1="95" x2="142" y2="93" stroke="rgba(0,240,255,0.25)" strokeWidth="0.8" />
      <line x1="110" y1="97" x2="142" y2="97" stroke="rgba(0,240,255,0.25)" strokeWidth="0.8" />

      {/* Left arm raised for scratching */}
      <motion.g
        animate={isScratching ? {
          rotate: [-20, 20, -20, 20, -20],
          x: [0, 8, 0, 8, 0],
          y: [0, -4, 0, -4, 0],
        } : {}}
        transition={{ duration: 0.45, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "60px 130px" }}
      >
        <path d="M62 128 Q30 100 20 72" fill="none" stroke="rgba(0,200,220,0.65)" strokeWidth="9" strokeLinecap="round" />
        {/* Claws */}
        <path d="M20 72 L12 60 M20 72 L18 58 M20 72 L26 61" stroke="rgba(0,240,255,0.8)" strokeWidth="1.5" strokeLinecap="round" />
      </motion.g>

      {/* Right arm */}
      <path d="M138 128 Q155 145 150 165" fill="none" stroke="rgba(0,200,220,0.5)" strokeWidth="8" strokeLinecap="round" />

      {/* Tail */}
      <motion.path
        d="M148 155 Q178 138 172 112 Q168 95 155 100"
        fill="none"
        stroke="rgba(0,200,220,0.6)"
        strokeWidth="8"
        strokeLinecap="round"
        animate={{ d: [
          "M148 155 Q178 138 172 112 Q168 95 155 100",
          "M148 155 Q182 130 174 108 Q168 90 156 96",
          "M148 155 Q178 138 172 112 Q168 95 155 100",
        ]}}
        transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Paws */}
      <ellipse cx="72" cy="188" rx="15" ry="9" fill="rgba(4,12,28,0.85)" stroke="rgba(0,240,255,0.15)" strokeWidth="0.6" />
      <ellipse cx="128" cy="188" rx="15" ry="9" fill="rgba(4,12,28,0.85)" stroke="rgba(0,240,255,0.15)" strokeWidth="0.6" />

      {/* Scratch particle effects */}
      {scratchCount >= 2 && (
        <>
          <motion.circle cx="25" cy="70" r="2" fill="rgba(0,240,255,0.7)"
            animate={{ scale: [1, 1.5, 0], opacity: [1, 0.8, 0] }}
            transition={{ duration: 0.4, repeat: Infinity, repeatDelay: 0.3 }}
          />
          <motion.circle cx="35" cy="62" r="1.5" fill="rgba(160,80,255,0.7)"
            animate={{ scale: [1, 2, 0], opacity: [1, 0.6, 0] }}
            transition={{ duration: 0.35, repeat: Infinity, repeatDelay: 0.4, delay: 0.1 }}
          />
          <motion.circle cx="15" cy="78" r="1" fill="rgba(0,240,255,0.5)"
            animate={{ scale: [1, 1.8, 0], opacity: [1, 0.5, 0] }}
            transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 0.25, delay: 0.2 }}
          />
        </>
      )}
    </svg>
  );
}
