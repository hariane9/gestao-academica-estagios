import Icon from "./Icon";
import { useApp } from "../context/AppContext";

function Toast() {
  const { toast } = useApp();

  if (!toast) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: "28px",
        left: "50%",
        transform: "translateX(-50%)",
        background: "#1E293B",
        color: "#fff",
        padding: "14px 22px",
        borderRadius: "12px",
        fontSize: "14px",
        fontWeight: 600,
        boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        gap: "10px",
        animation: "fadeIn 0.25s ease"
      }}
    >
      <Icon icon="check" size={17} color="#4ADE80" />
      {toast}
    </div>
  );
}

export default Toast;
