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

function ModalNovoRegistro({ onClose }) {
  const { addRegistroDiario } = useApp();
  const [form, setForm] = useState({ data: "", atividade: "", horas: "", descricao: "" });

  const atualizar = (campo) => (e) => setForm((f) => ({ ...f, [campo]: e.target.value }));

  const salvar = async (e) => {
    e.preventDefault();
    if (!form.data || !form.atividade || !form.horas) return;
    const ok = await addRegistroDiario(form);
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
          <div style={{ fontSize: "18px", fontWeight: 800, color: "#1E293B" }}>
            Novo Registro no Diário
          </div>
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

        <label style={estiloLabel}>Data</label>
        <input type="text" value={form.data} onChange={atualizar("data")} placeholder="DD/MM/AAAA" style={estiloInput} />

        <label style={estiloLabel}>Atividade</label>
        <input type="text" value={form.atividade} onChange={atualizar("atividade")} placeholder="Ex: Reunião de alinhamento" style={estiloInput} />

        <label style={estiloLabel}>Horas dedicadas (1 a 8)</label>
        <input type="number" min="1" max="8" value={form.horas} onChange={atualizar("horas")} placeholder="Ex: 4" style={estiloInput} />

        <label style={estiloLabel}>Descrição</label>
        <textarea
          value={form.descricao}
          onChange={atualizar("descricao")}
          placeholder="Descreva as atividades realizadas..."
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
            Salvar Registro
          </button>
        </div>
      </form>
    </div>
  );
}

export default ModalNovoRegistro;
