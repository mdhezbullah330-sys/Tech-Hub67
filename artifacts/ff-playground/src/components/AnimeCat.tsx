import { motion, AnimatePresence } from "framer-motion";

export type CatState = "idle" | "smile" | "laugh" | "speech" | "dance" | "success";

interface AnimeCatProps {
  state: CatState;
}

export default function AnimeCat({ state }: AnimeCatProps) {
  const isDance = state === "dance";
  const isSmile = state === "smile" || state === "success";
  const isLaugh = state === "laugh";
  const isSpeech = state === "speech";

  return (
    <div style={{ position: "relative" }}>
      {/* Speech bubble */}
      <AnimatePresence>
        {isSpeech && (
          <motion.div
            key="speech"
            initial={{ opacity: 0, scale: 0.7, y: 6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            style={{
              position: "absolute",
              bottom: "calc(100% - 10px)",
              left: "50%",
              transform: "translateX(-50%)",
              background: "rgba(5, 10, 22, 0.92)",
              backdropFilter: "blur(8px)",
              border: "0.5px solid rgba(190,80,255,0.35)",
              borderRadius: "12px",
              padding: "8px 14px",
              whiteSpace: "nowrap",
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "0.72rem",
              fontWeight: 600,
              color: "rgba(190,80,255,0.9)",
              letterSpacing: "0.02em",
              zIndex: 20,
              boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
              pointerEvents: "none",
            }}
          >
            Hey! Enter your username here!
            <div style={{
              position: "absolute",
              bottom: -6,
              left: "50%",
              transform: "translateX(-50%)",
              width: 0,
              height: 0,
              borderLeft: "6px solid transparent",
              borderRight: "6px solid transparent",
              borderTop: "6px solid rgba(190,80,255,0.35)",
            }} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cat body */}
      <motion.div
        animate={
          isDance
            ? { rotate: [-10, 10, -10, 10, -10], y: [0, -12, 0, -14, 0, -10, 0], x: [0, 4, -4, 4, -4, 0] }
            : { rotate: 0, y: [0, -4, 0], x: 0 }
        }
        transition={
          isDance
            ? { duration: 0.55, repeat: Infinity, ease: "easeInOut" }
            : { duration: 3, repeat: Infinity, ease: "easeInOut" }
        }
      >
        <svg
          viewBox="0 0 200 210"
          width="150"
          height="150"
          xmlns="http://www.w3.org/2000/svg"
          style={{ overflow: "visible" }}
        >
          {/* Tail */}
          <motion.path
            d="M148 148 Q176 130 170 106 Q166 90 154 96"
            fill="none"
            stroke="rgba(150,55,210,0.65)"
            strokeWidth="8"
            strokeLinecap="round"
            animate={{ d: [
              "M148 148 Q176 130 170 106 Q166 90 154 96",
              "M148 148 Q180 122 172 100 Q166 84 154 90",
              "M148 148 Q176 130 170 106 Q166 90 154 96",
            ]}}
            transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Body */}
          <ellipse cx="100" cy="150" rx="43" ry="38" fill="rgba(4,12,26,0.88)" stroke="rgba(190,80,255,0.18)" strokeWidth="0.8" />

          {/* Head */}
          <ellipse cx="100" cy="82" rx="40" ry="37" fill="rgba(4,12,26,0.88)" stroke="rgba(190,80,255,0.18)" strokeWidth="0.8" />

          {/* Left ear */}
          <motion.polygon
            points="70,54 78,22 96,52"
            fill="rgba(4,12,26,0.92)"
            stroke="rgba(190,80,255,0.22)" strokeWidth="0.8"
            animate={{ rotate: [0, -5, 0] }}
            style={{ transformOrigin: "78px 48px" }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          />
          <polygon points="75,50 81,32 92,49" fill="rgba(190,80,255,0.07)" />

          {/* Right ear */}
          <motion.polygon
            points="130,54 122,22 104,52"
            fill="rgba(4,12,26,0.92)"
            stroke="rgba(190,80,255,0.22)" strokeWidth="0.8"
            animate={{ rotate: [0, 5, 0] }}
            style={{ transformOrigin: "122px 48px" }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          />
          <polygon points="125,50 119,32 108,49" fill="rgba(190,80,255,0.07)" />

          {/* Eyes */}
          <motion.ellipse
            cx="84" cy="74"
            animate={{
              ry: isSmile || isLaugh ? 2.5 : 7,
              fill: isSmile || isLaugh ? "rgba(190,80,255,0.9)" : "rgba(210,235,255,0.95)"
            }}
            rx={7} ry={7}
            transition={{ duration: 0.2 }}
          />
          <motion.ellipse
            cx="116" cy="74"
            animate={{
              ry: isSmile || isLaugh ? 2.5 : 7,
              fill: isSmile || isLaugh ? "rgba(190,80,255,0.9)" : "rgba(210,235,255,0.95)"
            }}
            rx={7} ry={7}
            transition={{ duration: 0.2 }}
          />

          {/* Pupils (only when eyes are open) */}
          {!isSmile && !isLaugh && (
            <>
              <ellipse cx="85" cy="75" rx="4" ry="5" fill="rgba(4,12,26,0.95)" />
              <ellipse cx="117" cy="75" rx="4" ry="5" fill="rgba(4,12,26,0.95)" />
              <circle cx="83" cy="72" r="1.5" fill="rgba(255,255,255,0.8)" />
              <circle cx="115" cy="72" r="1.5" fill="rgba(255,255,255,0.8)" />
            </>
          )}

          {/* Nose */}
          <ellipse cx="100" cy="88" rx="3.5" ry="2.5" fill="rgba(255,150,180,0.8)" />

          {/* Whiskers */}
          <line x1="57" y1="88" x2="89" y2="90" stroke="rgba(190,80,255,0.2)" strokeWidth="0.8" />
          <line x1="57" y1="93" x2="89" y2="92" stroke="rgba(190,80,255,0.2)" strokeWidth="0.8" />
          <line x1="111" y1="90" x2="143" y2="88" stroke="rgba(190,80,255,0.2)" strokeWidth="0.8" />
          <line x1="111" y1="92" x2="143" y2="93" stroke="rgba(190,80,255,0.2)" strokeWidth="0.8" />

          {/* Mouth */}
          <AnimatePresence mode="wait">
            {!isSmile && !isLaugh && (
              <motion.path
                key="neutral"
                d="M94 95 Q100 100 106 95"
                fill="none" stroke="rgba(200,230,255,0.5)" strokeWidth="1.2" strokeLinecap="round"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              />
            )}
            {isSmile && (
              <motion.path
                key="smile"
                d="M89 96 Q100 108 111 96"
                fill="none" stroke="rgba(190,80,255,0.85)" strokeWidth="1.6" strokeLinecap="round"
                initial={{ opacity: 0, pathLength: 0 }} animate={{ opacity: 1, pathLength: 1 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              />
            )}
            {isLaugh && (
              <motion.g key="laugh"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              >
                <path d="M87 95 Q100 112 113 95" fill="rgba(4,12,26,0.95)" stroke="rgba(190,80,255,0.85)" strokeWidth="1.6" strokeLinecap="round" />
                <ellipse cx="100" cy="107" rx="8" ry="5" fill="rgba(255,120,150,0.65)" />
              </motion.g>
            )}
          </AnimatePresence>

          {/* Blush (smile / laugh / dance / success) */}
          <AnimatePresence>
            {(isSmile || isLaugh || isDance) && (
              <motion.g key="blush" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <ellipse cx="73" cy="82" rx="8" ry="5" fill="rgba(255,100,150,0.15)" />
                <ellipse cx="127" cy="82" rx="8" ry="5" fill="rgba(255,100,150,0.15)" />
              </motion.g>
            )}
          </AnimatePresence>

          {/* Dance arms raised */}
          <AnimatePresence>
            {isDance && (
              <motion.g key="arms"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.path
                  d="M62 128 Q38 105 45 85"
                  fill="none" stroke="rgba(150,55,210,0.65)" strokeWidth="8" strokeLinecap="round"
                  animate={{ d: ["M62 128 Q38 105 45 85", "M62 128 Q32 100 40 78", "M62 128 Q38 105 45 85"] }}
                  transition={{ duration: 0.55, repeat: Infinity }}
                />
                <motion.path
                  d="M138 128 Q162 105 155 85"
                  fill="none" stroke="rgba(150,55,210,0.65)" strokeWidth="8" strokeLinecap="round"
                  animate={{ d: ["M138 128 Q162 105 155 85", "M138 128 Q168 100 160 78", "M138 128 Q162 105 155 85"] }}
                  transition={{ duration: 0.55, repeat: Infinity, delay: 0.27 }}
                />
                {/* Stars */}
                {[[-20, -30], [20, -25], [-10, -50], [15, -48], [0, -60]].map(([sx, sy], i) => (
                  <motion.text key={i} x={100 + sx} y={70 + sy} fontSize="12" textAnchor="middle"
                    animate={{ scale: [0.8, 1.3, 0.8], opacity: [0.6, 1, 0.6], rotate: [0, 15, -15, 0] }}
                    transition={{ duration: 0.7, repeat: Infinity, delay: i * 0.12 }}
                    fill={i % 2 === 0 ? "rgba(190,80,255,0.9)" : "rgba(160,80,255,0.9)"}
                    style={{ transformOrigin: `${100 + sx}px ${70 + sy}px` }}
                  >★</motion.text>
                ))}
              </motion.g>
            )}
          </AnimatePresence>

          {/* Body markings */}
          <ellipse cx="100" cy="152" rx="22" ry="18" fill="rgba(190,80,255,0.04)" stroke="rgba(190,80,255,0.1)" strokeWidth="0.5" />

          {/* Paws */}
          <ellipse cx="72" cy="180" rx="14" ry="8" fill="rgba(4,12,26,0.85)" stroke="rgba(190,80,255,0.14)" strokeWidth="0.6" />
          <ellipse cx="128" cy="180" rx="14" ry="8" fill="rgba(4,12,26,0.85)" stroke="rgba(190,80,255,0.14)" strokeWidth="0.6" />
          <ellipse cx="65" cy="183" rx="3.5" ry="2.5" fill="rgba(4,22,46,0.9)" />
          <ellipse cx="72" cy="185" rx="3.5" ry="2.5" fill="rgba(4,22,46,0.9)" />
          <ellipse cx="79" cy="183" rx="3.5" ry="2.5" fill="rgba(4,22,46,0.9)" />
          <ellipse cx="121" cy="183" rx="3.5" ry="2.5" fill="rgba(4,22,46,0.9)" />
          <ellipse cx="128" cy="185" rx="3.5" ry="2.5" fill="rgba(4,22,46,0.9)" />
          <ellipse cx="135" cy="183" rx="3.5" ry="2.5" fill="rgba(4,22,46,0.9)" />
        </svg>
      </motion.div>
    </div>
  );
}
