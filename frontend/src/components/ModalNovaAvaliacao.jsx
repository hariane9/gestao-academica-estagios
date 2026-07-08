import { useState } from "react";
import Icon from "./Icon";
import { useApp } from "../context/AppContext";

const estiloLabel = {
  display: "block",
  fontSize: "13px",
  fontWeight: 600,
  color: "#334155",
  marginBottom: "6px"
};

const estiloInput = {
  width: "100%",
  padding: "11px 14px",
  borderRadius: "9px",
  border: "1px solid #E2E8F0",
  fontSize: "14px",
  marginBottom: "14px",
  background: "#F8FAFC"
};

function ModalNovaAvaliacao({ alunoIdInicial, onClose }) {
  const { estagiarios, addAvaliacao } = useApp();
  const [form, setForm] = useState({
    alunoId: alunoIdInicial || (estagiarios[0] && estagiarios[0].id) || "",
    nota: "",
    feedback: ""
  });

  const atualizar = (campo) => (e) => setForm((f) => ({ ...f, [campo]: e.target.value }));

  const salvar = async (e) => {
    e.preventDefault();
    const nota = parseInt(form.nota, 10);
    if (!form.alunoId || form.nota === "" || !form.feedback) return;
    if (isNaN(nota) || nota < 0 || nota > 10) return;
    const ok = await addAvaliacao(form);
    if (ok) onClose();
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(15,23,42,0.45)",
        zIndex: 60,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        animation: "overlayIn 0.2s ease"
      }}
    >
      <form
        onSubmit={salvar}
        style={{
          background: "#fff",
          borderRadius: "16px",
          width: "100%",
          maxWidth: "480px",
          padding: "28px",
          boxShadow: "0 20px 50px rgba(0,0,0,0.25)"
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "20px"
          }}
        >
          <div style={{ fontSize: "18px", fontWeight: 800, color: "#1E293B" }}>Nova Avaliação</div>
          <button
            type="button"
            onClick={onClose}
            style={{
              background: "#F5F7FA",
              border: "none",
              borderRadius: "8px",
              width: "32px",
              height: "32px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer"
            }}
          >
            <Icon icon="x" size={16} color="#334155" />
          </button>
        </div>

        <label style={estiloLabel}>Estudante</label>
        <select value={form.alunoId} onChange={atualizar("alunoId")} style={estiloInput}>
          {estagiarios.map((e) => (
            <option key={e.id} value={e.id}>
              {e.nome}
            </option>
          ))}
        </select>

        <label style={estiloLabel}>Nota (número inteiro de 0 a 10)</label>
        <input
          type="number"
          step="1"
          min="0"
          max="10"
          value={form.nota}
          onChange={atualizar("nota")}
          placeholder="Ex: 9"
          style={estiloInput}
        />

        <label style={estiloLabel}>Feedback</label>
        <textarea
          value={form.feedback}
          onChange={atualizar("feedback")}
          placeholder="Descreva o desempenho do estudante..."
          rows={3}
          style={{ ...estiloInput, marginBottom: "22px", resize: "vertical" }}
        />

        <div style={{ display: "flex", gap: "10px" }}>
          <button
            type="button"
            onClick={onClose}
            style={{
              flex: 1,
              padding: "12px",
              borderRadius: "10px",
              border: "1px solid #E2E8F0",
              background: "#fff",
              color: "#475569",
              fontWeight: 700,
              fontSize: "14px",
              cursor: "pointer"
            }}
          >
            Cancelar
          </button>
          <button type="submit" className="btn-primary" style={{ flex: 1, padding: "12px", fontSize: "14px" }}>
            Salvar Avaliação
          </button>
        </div>
      </form>
    </div>
  );
}

export default ModalNovaAvaliacao;
