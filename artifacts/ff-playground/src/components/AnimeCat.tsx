import { motion, AnimatePresence } from "framer-motion";

export type CatState = "idle" | "smile" | "laugh" | "speech" | "dance" | "success";

interface AnimeCatProps {
  state: CatState;
}

export default function AnimeCat({ state }: AnimeCatProps) {
  const isDance = state === "dance";
  const isSmile = state === "smile" || state === "success";
  const isLaugh = state === "laugh";

  // Dance step cycle using time
  return (
    <div style={{ position: "relative" }}>
      {/* Cat SVG body with state-driven animation */}
      <motion.div
        animate={
          isDance
            ? {
                rotate: [-14, 14, -12, 12, -8, 8, -14, 14, -10, 10, 0],
                y: [0, -18, 0, -22, 0, -16, 0, -20, 0, -14, 0],
                x: [-6, 6, -8, 8, -4, 4, -6, 6, -4, 4, 0],
                scaleX: [1, 1.06, 0.94, 1.06, 0.94, 1],
              }
            : isSmile
            ? { y: [0, -3, 0], rotate: [-1, 1, -1] }
            : { y: [0, -4, 0], rotate: 0 }
        }
        transition={
          isDance
            ? { duration: 0.52, repeat: 8, ease: "easeInOut" }
            : isSmile
            ? { duration: 1.2, repeat: Infinity, ease: "easeInOut" }
            : { duration: 3, repeat: Infinity, ease: "easeInOut" }
        }
      >
        <svg
          viewBox="0 0 200 220"
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
            animate={isDance ? {
              d: [
                "M148 148 Q176 130 170 106 Q166 90 154 96",
                "M148 148 Q185 118 175 96 Q168 78 155 85",
                "M148 148 Q168 140 164 118 Q162 100 152 108",
                "M148 148 Q185 118 175 96 Q168 78 155 85",
                "M148 148 Q176 130 170 106 Q166 90 154 96",
              ]
            } : {
              d: [
                "M148 148 Q176 130 170 106 Q166 90 154 96",
                "M148 148 Q180 122 172 100 Q166 84 154 90",
                "M148 148 Q176 130 170 106 Q166 90 154 96",
              ]
            }}
            transition={isDance
              ? { duration: 0.52, repeat: 8, ease: "easeInOut" }
              : { duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Body */}
          <ellipse cx="100" cy="150" rx="43" ry="38" fill="rgba(4,12,26,0.9)" stroke="rgba(190,80,255,0.18)" strokeWidth="0.8" />

          {/* Head */}
          <ellipse cx="100" cy="82" rx="40" ry="37" fill="rgba(4,12,26,0.9)" stroke="rgba(190,80,255,0.18)" strokeWidth="0.8" />

          {/* Ears */}
          <motion.polygon
            points="70,54 78,22 96,52"
            fill="rgba(4,12,26,0.94)"
            stroke="rgba(190,80,255,0.22)" strokeWidth="0.8"
            animate={{ rotate: isDance ? [-8, 8, -8] : [0, -5, 0] }}
            style={{ transformOrigin: "78px 48px" }}
            transition={{ duration: isDance ? 0.52 : 3.5, repeat: Infinity, ease: "easeInOut" }}
          />
          <polygon points="75,50 81,32 92,49" fill="rgba(190,80,255,0.07)" />
          <motion.polygon
            points="130,54 122,22 104,52"
            fill="rgba(4,12,26,0.94)"
            stroke="rgba(190,80,255,0.22)" strokeWidth="0.8"
            animate={{ rotate: isDance ? [8, -8, 8] : [0, 5, 0] }}
            style={{ transformOrigin: "122px 48px" }}
            transition={{ duration: isDance ? 0.52 : 4, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
          />
          <polygon points="125,50 119,32 108,49" fill="rgba(190,80,255,0.07)" />

          {/* ---- EYES ---- */}
          {/* SMILE: half-closed happy eyes */}
          {isSmile && (
            <>
              {/* Left eye happy arc */}
              <path d="M77 78 Q84 70 91 78" fill="none" stroke="rgba(210,160,255,0.95)" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M77 78 Q84 74 91 78" fill="rgba(190,80,255,0.06)" />
              {/* Right eye happy arc */}
              <path d="M109 78 Q116 70 123 78" fill="none" stroke="rgba(210,160,255,0.95)" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M109 78 Q116 74 123 78" fill="rgba(190,80,255,0.06)" />
              {/* Blush */}
              <ellipse cx="73" cy="85" rx="9" ry="5" fill="rgba(255,130,180,0.18)" />
              <ellipse cx="127" cy="85" rx="9" ry="5" fill="rgba(255,130,180,0.18)" />
            </>
          )}

          {/* LAUGH: covering/squeezing eyes in exaggerated laughter, paws raise up */}
          {isLaugh && !isDance && (
            <>
              {/* X eyes — laughing so hard */}
              <path d="M78 72 L88 82 M88 72 L78 82" stroke="rgba(210,160,255,0.9)" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M110 72 L120 82 M120 72 L110 82" stroke="rgba(210,160,255,0.9)" strokeWidth="2.5" strokeLinecap="round" />
              {/* Blush */}
              <ellipse cx="72" cy="86" rx="10" ry="6" fill="rgba(255,100,160,0.22)" />
              <ellipse cx="128" cy="86" rx="10" ry="6" fill="rgba(255,100,160,0.22)" />
              {/* Tears of joy */}
              <motion.ellipse cx="74" cy="90" rx="2" ry="3.5" fill="rgba(150,200,255,0.6)"
                animate={{ y: [0, 6, 0] }} transition={{ duration: 0.6, repeat: Infinity }} />
              <motion.ellipse cx="126" cy="90" rx="2" ry="3.5" fill="rgba(150,200,255,0.6)"
                animate={{ y: [0, 6, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }} />
            </>
          )}

          {/* IDLE / SPEECH / DANCE: normal eyes */}
          {!isSmile && !isLaugh && (
            <>
              <ellipse cx="84" cy="74" rx="7" ry="7" fill="rgba(210,235,255,0.95)" />
              <ellipse cx="116" cy="74" rx="7" ry="7" fill="rgba(210,235,255,0.95)" />
              <ellipse cx="85" cy="75" rx="4" ry="5" fill="rgba(4,12,26,0.95)" />
              <ellipse cx="117" cy="75" rx="4" ry="5" fill="rgba(4,12,26,0.95)" />
              <circle cx="83" cy="72" r="1.5" fill="rgba(255,255,255,0.8)" />
              <circle cx="115" cy="72" r="1.5" fill="rgba(255,255,255,0.8)" />
            </>
          )}

          {/* Nose */}
          <ellipse cx="100" cy="90" rx="3.5" ry="2.5" fill="rgba(255,150,190,0.8)" />

          {/* Whiskers */}
          <line x1="57" y1="88" x2="89" y2="90" stroke="rgba(190,80,255,0.2)" strokeWidth="0.8" />
          <line x1="57" y1="93" x2="89" y2="92" stroke="rgba(190,80,255,0.2)" strokeWidth="0.8" />
          <line x1="111" y1="90" x2="143" y2="88" stroke="rgba(190,80,255,0.2)" strokeWidth="0.8" />
          <line x1="111" y1="92" x2="143" y2="93" stroke="rgba(190,80,255,0.2)" strokeWidth="0.8" />

          {/* Mouth */}
          <AnimatePresence mode="wait">
            {!isSmile && !isLaugh && !isDance && (
              <motion.path key="neutral" d="M94 96 Q100 101 106 96"
                fill="none" stroke="rgba(200,160,255,0.5)" strokeWidth="1.2" strokeLinecap="round"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
            )}
            {isSmile && (
              <motion.path key="smile" d="M88 97 Q100 110 112 97"
                fill="none" stroke="rgba(210,160,255,0.85)" strokeWidth="1.8" strokeLinecap="round"
                initial={{ opacity: 0, pathLength: 0 }} animate={{ opacity: 1, pathLength: 1 }}
                exit={{ opacity: 0 }} transition={{ duration: 0.3 }} />
            )}
            {isLaugh && !isDance && (
              <motion.g key="laugh" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <path d="M86 96 Q100 115 114 96" fill="rgba(4,12,26,0.95)"
                  stroke="rgba(210,160,255,0.9)" strokeWidth="1.8" strokeLinecap="round" />
                <ellipse cx="100" cy="108" rx="9" ry="6" fill="rgba(255,120,160,0.7)" />
                {/* Tongue */}
                <ellipse cx="100" cy="112" rx="5" ry="3.5" fill="rgba(255,160,180,0.8)" />
              </motion.g>
            )}
            {isDance && (
              <motion.path key="dance-mouth" d="M87 96 Q100 112 113 96"
                fill="none" stroke="rgba(210,160,255,0.9)" strokeWidth="1.8" strokeLinecap="round"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
            )}
          </AnimatePresence>

          {/* LAUGH arms — paws half-raised to mouth as if covering/laughing hard */}
          <AnimatePresence>
            {isLaugh && !isDance && (
              <motion.g key="laugh-arms"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              >
                {/* Left paw covering mouth area */}
                <motion.path
                  d="M62 128 Q52 108 58 92"
                  fill="none" stroke="rgba(150,55,210,0.75)" strokeWidth="9" strokeLinecap="round"
                  animate={{ d: ["M62 128 Q52 108 58 92", "M62 128 Q48 105 54 88", "M62 128 Q52 108 58 92"] }}
                  transition={{ duration: 0.4, repeat: Infinity }}
                />
                {/* Right paw covering mouth area */}
                <motion.path
                  d="M138 128 Q148 108 142 92"
                  fill="none" stroke="rgba(150,55,210,0.75)" strokeWidth="9" strokeLinecap="round"
                  animate={{ d: ["M138 128 Q148 108 142 92", "M138 128 Q152 105 146 88", "M138 128 Q148 108 142 92"] }}
                  transition={{ duration: 0.4, repeat: Infinity, delay: 0.2 }}
                />
                {/* Laugh particles */}
                {["HA", "HA", "😂"].map((txt, i) => (
                  <motion.text key={i} x={72 + i * 22} y={56 - i * 8} fontSize={i === 2 ? "14" : "10"}
                    textAnchor="middle" fill="rgba(210,160,255,0.8)"
                    fontFamily="'Space Grotesk', sans-serif" fontWeight="700"
                    animate={{ y: [56 - i * 8, 42 - i * 8, 56 - i * 8], opacity: [0.8, 1, 0.8] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                  >{txt}</motion.text>
                ))}
              </motion.g>
            )}
          </AnimatePresence>

          {/* DANCE arms — high-energy windmill/raised */}
          <AnimatePresence>
            {isDance && (
              <motion.g key="dance-arms"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              >
                <motion.path
                  d="M62 128 Q38 105 44 80"
                  fill="none" stroke="rgba(150,55,210,0.7)" strokeWidth="8" strokeLinecap="round"
                  animate={{ d: [
                    "M62 128 Q38 105 44 80",
                    "M62 128 Q28 100 36 72",
                    "M62 128 Q42 118 36 100",
                    "M62 128 Q28 100 36 72",
                    "M62 128 Q38 105 44 80",
                  ]}}
                  transition={{ duration: 0.52, repeat: 8, ease: "easeInOut" }}
                />
                <motion.path
                  d="M138 128 Q162 105 156 80"
                  fill="none" stroke="rgba(150,55,210,0.7)" strokeWidth="8" strokeLinecap="round"
                  animate={{ d: [
                    "M138 128 Q162 105 156 80",
                    "M138 128 Q172 100 164 72",
                    "M138 128 Q158 118 164 100",
                    "M138 128 Q172 100 164 72",
                    "M138 128 Q162 105 156 80",
                  ]}}
                  transition={{ duration: 0.52, repeat: 8, ease: "easeInOut", delay: 0.26 }}
                />

                {/* Stars + notes */}
                {[
                  { x: -28, y: -42, s: "★", c: "rgba(190,80,255,0.9)" },
                  { x: 28, y: -38, s: "♪", c: "rgba(220,140,255,0.9)" },
                  { x: -8, y: -60, s: "★", c: "rgba(255,100,200,0.9)" },
                  { x: 18, y: -55, s: "♫", c: "rgba(190,80,255,0.8)" },
                  { x: -22, y: -22, s: "✦", c: "rgba(220,120,255,0.7)" },
                  { x: 32, y: -20, s: "★", c: "rgba(255,80,180,0.8)" },
                ].map((item, i) => (
                  <motion.text key={i}
                    x={100 + item.x} y={70 + item.y}
                    fontSize="13" textAnchor="middle" fill={item.c}
                    animate={{
                      scale: [0.7, 1.3, 0.7],
                      opacity: [0.5, 1, 0.5],
                      rotate: [-15, 15, -15],
                      y: [70 + item.y, 70 + item.y - 10, 70 + item.y],
                    }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.1 }}
                    style={{ transformOrigin: `${100 + item.x}px ${70 + item.y}px` }}
                  >{item.s}</motion.text>
                ))}
              </motion.g>
            )}
          </AnimatePresence>

          {/* IDLE arms */}
          {!isDance && !isLaugh && (
            <>
              <path d="M62 128 Q56 138 58 152" fill="none" stroke="rgba(150,55,210,0.5)" strokeWidth="8" strokeLinecap="round" />
              <path d="M138 128 Q144 138 142 152" fill="none" stroke="rgba(150,55,210,0.5)" strokeWidth="8" strokeLinecap="round" />
            </>
          )}

          {/* Body markings */}
          <ellipse cx="100" cy="152" rx="22" ry="18" fill="rgba(190,80,255,0.04)" stroke="rgba(190,80,255,0.1)" strokeWidth="0.5" />

          {/* Paws */}
          <ellipse cx="72" cy="180" rx="14" ry="8" fill="rgba(4,12,26,0.86)" stroke="rgba(190,80,255,0.14)" strokeWidth="0.6" />
          <ellipse cx="128" cy="180" rx="14" ry="8" fill="rgba(4,12,26,0.86)" stroke="rgba(190,80,255,0.14)" strokeWidth="0.6" />
          {[65, 72, 79].map((cx, i) => <ellipse key={i} cx={cx} cy={183} rx="3.5" ry="2.5" fill="rgba(4,22,46,0.9)" />)}
          {[121, 128, 135].map((cx, i) => <ellipse key={i} cx={cx} cy={183} rx="3.5" ry="2.5" fill="rgba(4,22,46,0.9)" />)}
        </svg>
      </motion.div>
    </div>
  );
}
