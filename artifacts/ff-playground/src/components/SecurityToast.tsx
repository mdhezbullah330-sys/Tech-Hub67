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
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [visible, onDone]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, x: 60, scale: 0.92 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 60, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 340, damping: 26 }}
          style={{
            position: "fixed",
            top: "24px",
            right: "24px",
            zIndex: 9999,
            display: "flex",
            alignItems: "flex-start",
            gap: "14px",
            background: "rgba(6, 2, 16, 0.88)",
            backdropFilter: "blur(18px)",
            border: "0.5px solid rgba(190, 80, 255, 0.35)",
            borderRadius: "16px",
            padding: "16px 20px",
            maxWidth: "340px",
            boxShadow: "0 24px 60px rgba(0,0,0,0.55), 0 0 0 0.5px rgba(190,80,255,0.15), 0 0 28px rgba(190,80,255,0.08)",
          }}
        >
          {/* Shield Icon */}
          <motion.div
            animate={{ scale: [1, 1.15, 1], rotate: [0, -4, 4, 0] }}
            transition={{ duration: 0.7, repeat: 3, ease: "easeInOut" }}
            style={{
              flexShrink: 0,
              width: 38,
              height: 38,
              borderRadius: "10px",
              background: "rgba(190, 80, 255, 0.1)",
              border: "0.5px solid rgba(190, 80, 255, 0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "18px",
            }}
          >
            🛡️
          </motion.div>

          <div>
            <p style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: "0.8rem",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: "rgba(190, 80, 255, 0.95)",
              margin: "0 0 4px 0",
            }}>
              Content Protected
            </p>
            <p style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "0.75rem",
              color: "rgba(200, 160, 255, 0.65)",
              margin: 0,
              lineHeight: 1.5,
            }}>
              This action is not allowed by the owner.
            </p>

            {/* Progress bar */}
            <motion.div
              initial={{ width: "100%" }}
              animate={{ width: "0%" }}
              transition={{ duration: 3, ease: "linear" }}
              style={{
                marginTop: "10px",
                height: "2px",
                borderRadius: "2px",
                background: "linear-gradient(90deg, rgba(190,80,255,0.8), rgba(140,40,200,0.4))",
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
