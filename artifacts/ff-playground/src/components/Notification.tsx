import { useEffect, useState } from "react";

interface NotificationProps {
  message: string;
  type?: "success" | "error";
  onDone: () => void;
}

export default function Notification({ message, type = "success", onDone }: NotificationProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onDone();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onDone]);

  if (!visible) return null;

  const isSuccess = type === "success";

  return (
    <div
      style={{
        position: "fixed",
        bottom: "24px",
        left: "24px",
        display: "flex",
        alignItems: "center",
        gap: "10px",
        background: isSuccess ? "rgba(6, 18, 28, 0.92)" : "rgba(24, 6, 6, 0.92)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: `0.5px solid ${isSuccess ? "rgba(0, 240, 255, 0.35)" : "rgba(255, 80, 80, 0.35)"}`,
        borderRadius: "12px",
        padding: "12px 20px",
        color: isSuccess ? "rgba(0, 240, 255, 0.9)" : "rgba(255, 120, 120, 0.9)",
        fontFamily: "'Space Grotesk', sans-serif",
        fontWeight: 500,
        fontSize: "0.85rem",
        letterSpacing: "0.02em",
        zIndex: 1000,
        boxShadow: isSuccess
          ? "0 0 24px rgba(0, 240, 255, 0.12), 0 4px 20px rgba(0,0,0,0.4)"
          : "0 0 24px rgba(255, 80, 80, 0.1), 0 4px 20px rgba(0,0,0,0.4)",
        animation: "toastSlideIn 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards",
      }}
    >
      {isSuccess ? (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="8" cy="8" r="7.25" stroke="rgba(0,240,255,0.6)" strokeWidth="0.75" />
          <path d="M5 8.5L7 10.5L11 6" stroke="rgba(0,240,255,0.9)" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="8" cy="8" r="7.25" stroke="rgba(255,120,120,0.6)" strokeWidth="0.75" />
          <path d="M6 6L10 10M10 6L6 10" stroke="rgba(255,120,120,0.9)" strokeWidth="1.25" strokeLinecap="round" />
        </svg>
      )}
      {message}
    </div>
  );
}
