import { useEffect, useRef } from "react";

export type CatState = "idle" | "smile" | "laugh" | "speech" | "dance";

interface AnimeCatProps {
  state: CatState;
  speechText?: string;
}

export default function AnimeCat({ state, speechText = "Enter Username Here!" }: AnimeCatProps) {
  const bodyRef = useRef<SVGGElement>(null);

  useEffect(() => {
    const el = bodyRef.current;
    if (!el) return;
    if (state === "dance") {
      el.style.animation = "catDance 0.4s ease-in-out infinite alternate";
    } else {
      el.style.animation = "";
    }
  }, [state]);

  const eyeStyle = state === "laugh" || state === "smile"
    ? { transform: "scaleY(0.3) translateY(2px)" }
    : {};

  const leftEyeX = 84;
  const rightEyeX = 116;
  const eyeY = 78;
  const eyeRx = 7;
  const eyeRy = state === "laugh" || state === "smile" ? 2.5 : 7;

  return (
    <div className="cat-container">
      <style>{`
        @keyframes catDance {
          0% { transform: rotate(-8deg) translateY(0px); }
          100% { transform: rotate(8deg) translateY(-8px); }
        }
        @keyframes catFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }
        @keyframes tailWag {
          0%, 100% { transform-origin: top; transform: rotate(-20deg); }
          50% { transform-origin: top; transform: rotate(20deg); }
        }
        @keyframes earTwitch {
          0%, 90%, 100% { transform: rotate(0deg); }
          93% { transform: rotate(-8deg); }
          96% { transform: rotate(5deg); }
        }
        @keyframes speechPop {
          0% { transform: scale(0) translateY(4px); opacity: 0; }
          70% { transform: scale(1.05) translateY(0); opacity: 1; }
          100% { transform: scale(1) translateY(0); opacity: 1; }
        }
        @keyframes blink {
          0%, 96%, 100% { scaleY: 1; }
          98% { transform: scaleY(0.05); }
        }
        .cat-body-wrap {
          animation: catFloat 3s ease-in-out infinite;
        }
        .cat-body-wrap.dancing {
          animation: catDance 0.35s ease-in-out infinite alternate !important;
        }
        .cat-ear-left { transform-origin: 78px 48px; animation: earTwitch 4s ease-in-out infinite; }
        .cat-ear-right { transform-origin: 122px 48px; animation: earTwitch 4.5s ease-in-out 0.5s infinite; }
        .cat-tail { transform-origin: 148px 130px; animation: tailWag 1.2s ease-in-out infinite; }
        .speech-bubble { animation: speechPop 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
      `}</style>

      <svg
        viewBox="0 0 200 200"
        width="160"
        height="160"
        xmlns="http://www.w3.org/2000/svg"
        style={{ overflow: "visible" }}
      >
        {/* Speech bubble */}
        {state === "speech" && (
          <g className="speech-bubble" transform="translate(0, -10)">
            <rect x="10" y="5" width="100" height="34" rx="10" fill="rgba(0,240,255,0.12)" stroke="rgba(0,240,255,0.4)" strokeWidth="0.8" />
            <polygon points="60,38 70,38 65,48" fill="rgba(0,240,255,0.12)" stroke="rgba(0,240,255,0.4)" strokeWidth="0.8" />
            <text x="60" y="20" textAnchor="middle" fill="rgba(0,240,255,0.9)" fontSize="6.5" fontFamily="Space Grotesk, sans-serif" fontWeight="600">
              {speechText.length > 16 ? speechText.slice(0, 16) : speechText}
            </text>
            <text x="60" y="33" textAnchor="middle" fill="rgba(0,240,255,0.9)" fontSize="6.5" fontFamily="Space Grotesk, sans-serif" fontWeight="600">
              {speechText.length > 16 ? speechText.slice(16) : ""}
            </text>
          </g>
        )}

        <g className={`cat-body-wrap${state === "dance" ? " dancing" : ""}`} ref={bodyRef as any}>
          {/* Tail */}
          <path
            className="cat-tail"
            d="M148 130 Q175 115 170 95 Q165 80 155 85"
            fill="none"
            stroke="rgba(0,200,220,0.7)"
            strokeWidth="8"
            strokeLinecap="round"
          />

          {/* Body */}
          <ellipse cx="100" cy="145" rx="42" ry="38" fill="rgba(0,30,50,0.75)" stroke="rgba(0,240,255,0.25)" strokeWidth="0.8" />

          {/* Head */}
          <ellipse cx="100" cy="88" rx="38" ry="35" fill="rgba(0,30,50,0.75)" stroke="rgba(0,240,255,0.25)" strokeWidth="0.8" />

          {/* Left ear */}
          <polygon
            className="cat-ear-left"
            points="72,58 80,28 95,55"
            fill="rgba(0,30,50,0.85)"
            stroke="rgba(0,240,255,0.3)"
            strokeWidth="0.8"
          />
          <polygon points="77,54 82,36 92,53" fill="rgba(0,240,255,0.12)" />

          {/* Right ear */}
          <polygon
            className="cat-ear-right"
            points="128,58 120,28 105,55"
            fill="rgba(0,30,50,0.85)"
            stroke="rgba(0,240,255,0.3)"
            strokeWidth="0.8"
          />
          <polygon points="123,54 118,36 108,53" fill="rgba(0,240,255,0.12)" />

          {/* Eyes */}
          <ellipse
            cx={leftEyeX}
            cy={eyeY}
            rx={eyeRx}
            ry={eyeRy}
            fill={state === "laugh" || state === "smile" ? "rgba(0,240,255,0.9)" : "rgba(200,240,255,0.95)"}
            style={eyeStyle}
          />
          <ellipse
            cx={rightEyeX}
            cy={eyeY}
            rx={eyeRx}
            ry={eyeRy}
            fill={state === "laugh" || state === "smile" ? "rgba(0,240,255,0.9)" : "rgba(200,240,255,0.95)"}
            style={eyeStyle}
          />

          {/* Pupils (only idle / dance) */}
          {state !== "laugh" && state !== "smile" && (
            <>
              <ellipse cx={leftEyeX + 1} cy={eyeY + 1} rx="4" ry="5" fill="rgba(0,10,30,0.9)" />
              <ellipse cx={rightEyeX + 1} cy={eyeY + 1} rx="4" ry="5" fill="rgba(0,10,30,0.9)" />
              <circle cx={leftEyeX - 1} cy={eyeY - 2} r="1.5" fill="rgba(200,240,255,0.8)" />
              <circle cx={rightEyeX - 1} cy={eyeY - 2} r="1.5" fill="rgba(200,240,255,0.8)" />
            </>
          )}

          {/* Nose */}
          <ellipse cx="100" cy="95" rx="3.5" ry="2.5" fill="rgba(255,150,180,0.8)" />

          {/* Whiskers */}
          <line x1="60" y1="95" x2="90" y2="97" stroke="rgba(0,240,255,0.3)" strokeWidth="0.8" />
          <line x1="60" y1="99" x2="90" y2="99" stroke="rgba(0,240,255,0.3)" strokeWidth="0.8" />
          <line x1="110" y1="97" x2="140" y2="95" stroke="rgba(0,240,255,0.3)" strokeWidth="0.8" />
          <line x1="110" y1="99" x2="140" y2="99" stroke="rgba(0,240,255,0.3)" strokeWidth="0.8" />

          {/* Mouth */}
          {state === "idle" || state === "speech" ? (
            /* Small neutral mouth */
            <path d="M94 101 Q100 106 106 101" fill="none" stroke="rgba(200,230,255,0.6)" strokeWidth="1.2" strokeLinecap="round" />
          ) : state === "smile" ? (
            /* Wide smile */
            <path d="M90 102 Q100 112 110 102" fill="none" stroke="rgba(0,240,255,0.8)" strokeWidth="1.5" strokeLinecap="round" />
          ) : state === "laugh" ? (
            /* Open grin */
            <>
              <path d="M88 102 Q100 116 112 102" fill="rgba(0,10,30,0.9)" stroke="rgba(0,240,255,0.8)" strokeWidth="1.5" strokeLinecap="round" />
              <ellipse cx="100" cy="111" rx="7" ry="4" fill="rgba(255,120,150,0.7)" />
            </>
          ) : (
            /* Dance - big grin */
            <path d="M88 102 Q100 114 112 102" fill="none" stroke="rgba(0,240,255,0.9)" strokeWidth="1.8" strokeLinecap="round" />
          )}

          {/* Blush marks (smile / laugh / dance) */}
          {(state === "smile" || state === "laugh" || state === "dance") && (
            <>
              <ellipse cx="76" cy="88" rx="7" ry="4" fill="rgba(255,100,150,0.18)" />
              <ellipse cx="124" cy="88" rx="7" ry="4" fill="rgba(255,100,150,0.18)" />
            </>
          )}

          {/* Body markings */}
          <ellipse cx="100" cy="148" rx="22" ry="18" fill="rgba(0,240,255,0.05)" stroke="rgba(0,240,255,0.12)" strokeWidth="0.5" />

          {/* Paws */}
          <ellipse cx="72" cy="175" rx="14" ry="9" fill="rgba(0,30,50,0.8)" stroke="rgba(0,240,255,0.2)" strokeWidth="0.6" />
          <ellipse cx="128" cy="175" rx="14" ry="9" fill="rgba(0,30,50,0.8)" stroke="rgba(0,240,255,0.2)" strokeWidth="0.6" />

          {/* Paw toes */}
          <ellipse cx="65" cy="178" rx="4" ry="3" fill="rgba(0,40,70,0.9)" />
          <ellipse cx="72" cy="180" rx="4" ry="3" fill="rgba(0,40,70,0.9)" />
          <ellipse cx="79" cy="178" rx="4" ry="3" fill="rgba(0,40,70,0.9)" />
          <ellipse cx="121" cy="178" rx="4" ry="3" fill="rgba(0,40,70,0.9)" />
          <ellipse cx="128" cy="180" rx="4" ry="3" fill="rgba(0,40,70,0.9)" />
          <ellipse cx="135" cy="178" rx="4" ry="3" fill="rgba(0,40,70,0.9)" />

          {/* Dance arms raised */}
          {state === "dance" && (
            <>
              <path d="M62 135 Q40 110 50 95" fill="none" stroke="rgba(0,200,220,0.6)" strokeWidth="8" strokeLinecap="round" />
              <path d="M138 135 Q160 110 150 95" fill="none" stroke="rgba(0,200,220,0.6)" strokeWidth="8" strokeLinecap="round" />
            </>
          )}
        </g>
      </svg>
    </div>
  );
}
