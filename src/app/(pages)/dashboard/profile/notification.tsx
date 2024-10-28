import React, { useEffect } from "react";

type NotificationProps = {
  message: string;
  duration: number;
  onClose: () => void;
  type: "success" | "error"; // New prop for notification type
};

const Notification: React.FC<NotificationProps> = ({
  message,
  duration,
  onClose,
  type,
}) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div
      className={`fixed bottom-4 left-4 py-2 px-4 rounded flex items-center ${
        type === "success" ? "bg-green-500" : "bg-red-900"
      } text-white text-sm font-bold font-titulos`}
    >
      <span className="mr-2">{type === "success" ? "✔️" : "❌"}</span>
      {message}
    </div>
  );
};

export default Notification;
