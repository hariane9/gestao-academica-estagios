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

const MESES = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];

// "DD/MM/AAAA" -> "AAAA-MM-DD" (formato aceito pela API)
export function brParaISO(dataBR) {
  const partes = String(dataBR).split("/");
  if (partes.length !== 3) return dataBR;
  const [d, m, a] = partes;
  return `${a}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`;
}

// "AAAA-MM-DD" (ou datetime) -> "DD/MM/AAAA"
export function isoParaBR(iso) {
  if (!iso) return "";
  const [a, m, d] = String(iso).slice(0, 10).split("-");
  if (!d) return String(iso);
  return `${d}/${m}/${a}`;
}

// "AAAA-MM-DD" -> "Julho 2026" (rótulo de período das avaliações)
export function periodoDe(iso) {
  if (!iso) return "";
  const [a, m] = String(iso).slice(0, 10).split("-");
  const idx = parseInt(m, 10) - 1;
  return (MESES[idx] || "") + " " + a;
}

export function hojeISO() {
  const d = new Date();
  return (
    d.getFullYear() + "-" +
    String(d.getMonth() + 1).padStart(2, "0") + "-" +
    String(d.getDate()).padStart(2, "0")
  );
}

export function formatToday() {
  const d = new Date();
  return (
    String(d.getDate()).padStart(2, "0") + "/" +
    String(d.getMonth() + 1).padStart(2, "0") + "/" +
    d.getFullYear()
  );
}
