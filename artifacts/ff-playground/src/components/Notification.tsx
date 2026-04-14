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

  return (
    <div className={type === "error" ? "error-notification" : "notification-toast"}>
      {message}
    </div>
  );
}
