import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SecurityToastProps {
  visible: boolean;
  onDone: () => void;
}

export default function SecurityToast({ visible, onDone }: SecurityToastProps) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (visible) {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(onDone, 3000);
    }
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [visible, onDone]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, x: 80, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 80, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 360, damping: 28 }}
          style={{
            position: "fixed",
            bottom: "24px",
            right: "24px",
            zIndex: 9999,
            display: "flex",
            alignItems: "flex-start",
            gap: "13px",
            background: "rgba(10, 2, 4, 0.94)",
            backdropFilter: "blur(22px)",
            borderRadius: "16px",
            padding: "16px 20px 14px",
            maxWidth: "320px",
            border: "0.5px solid rgba(255, 60, 90, 0.4)",
            boxShadow: "0 0 0 1px rgba(255, 60, 90, 0.08), 0 24px 60px rgba(0,0,0,0.6)",
            animation: "securityPulse 1.2s ease-in-out infinite",
          }}
        >
          {/* Animated shield */}
          <motion.div
            animate={{
              scale: [1, 1.18, 1, 1.12, 1],
              rotate: [0, -6, 6, -4, 0],
            }}
            transition={{ duration: 0.8, repeat: Infinity, repeatDelay: 0.6 }}
            style={{
              flexShrink: 0,
              width: 40,
              height: 40,
              borderRadius: "10px",
              background: "rgba(255, 50, 80, 0.12)",
              border: "0.5px solid rgba(255, 60, 90, 0.4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "19px",
              boxShadow: "0 0 18px rgba(255, 50, 80, 0.3)",
            }}
          >
            🛡️
          </motion.div>

          <div style={{ flex: 1 }}>
            <p style={{
              fontFamily: "'Orbitron', monospace",
              fontWeight: 700,
              fontSize: "0.72rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "rgba(255, 100, 120, 0.95)",
              margin: "0 0 3px 0",
            }}>
              Content Protected
            </p>
            <p style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "0.73rem",
              color: "rgba(255, 160, 175, 0.65)",
              margin: 0,
              lineHeight: 1.5,
            }}>
              This action is not allowed by the owner.
            </p>

            {/* Progress drain bar */}
            <motion.div
              initial={{ width: "100%" }}
              animate={{ width: "0%" }}
              transition={{ duration: 3, ease: "linear" }}
              style={{
                marginTop: "10px",
                height: "2px",
                borderRadius: "2px",
                background: "linear-gradient(90deg, rgba(255,60,90,0.9), rgba(200,30,60,0.4))",
                boxShadow: "0 0 6px rgba(255,60,90,0.5)",
              }}
            />
          </div>

          {/* Pulsing red border glow overlay */}
          <motion.div
            animate={{ opacity: [0, 0.6, 0] }}
            transition={{ duration: 1.2, repeat: Infinity }}
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "16px",
              border: "1px solid rgba(255, 60, 90, 0.5)",
              pointerEvents: "none",
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
