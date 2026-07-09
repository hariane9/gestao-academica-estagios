export function getInitials(name) {
  if (!name) return "";
  const parts = name.trim().split(" ");
  return ((parts[0] || "")[0] || "") + ((parts[parts.length - 1] || "")[0] || "");
}

export function statusStyle(status) {
  switch (status) {
    case "Aprovada": return { bg: "#E6F4EA", text: "#4F7300" };
    case "Em análise": return { bg: "#FFF4E0", text: "#966400" };
    case "Entrevista agendada": return { bg: "#E8EEFB", text: "#2952A3" };
    case "Rejeitada": return { bg: "#FBEAEA", text: "#C40000" };
    case "Em andamento": return { bg: "#E8EEFB", text: "#2952A3" };
    case "Concluído": return { bg: "#E6F4EA", text: "#4F7300" };
    case "Pendente": return { bg: "#FFF4E0", text: "#966400" };
    default: return { bg: "#F1F5F9", text: "#334155" };
  }
}

export function badgeStyle(status) {
  const st = statusStyle(status);
  return {
    display: "inline-block",
    padding: "5px 12px",
    borderRadius: "999px",
    fontSize: "12.5px",
    fontWeight: 700,
    background: st.bg,
    color: st.text
  };
}

export function notaColor(nota) {
  return nota >= 9 ? "#4F7300" : nota >= 7 ? "#2952A3" : "#966400";
}

export function formatToday() {
  const d = new Date();
  return (
    String(d.getDate()).padStart(2, "0") + "/" +
    String(d.getMonth() + 1).padStart(2, "0") + "/" +
    d.getFullYear()
  );
}
