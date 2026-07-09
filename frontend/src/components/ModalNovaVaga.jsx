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

function ModalNovaVaga({ onClose }) {
  const { publicarVaga } = useApp();
  const [form, setForm] = useState({ titulo: "", descricao: "", requisitos: "", localizacao: "" });
  const [enviando, setEnviando] = useState(false);

  const atualizar = (campo) => (e) => setForm((f) => ({ ...f, [campo]: e.target.value }));

  const salvar = async (e) => {
    e.preventDefault();
    if (!form.titulo.trim() || !form.descricao.trim()) return;
    setEnviando(true);
    const ok = await publicarVaga(form);
    setEnviando(false);
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
          <div style={{ fontSize: "18px", fontWeight: 800, color: "#1E293B" }}>Publicar Nova Vaga</div>
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

        <label style={estiloLabel}>Título da vaga</label>
        <input
          type="text"
          value={form.titulo}
          onChange={atualizar("titulo")}
          placeholder="Ex: Estágio em Desenvolvimento Web"
          style={estiloInput}
        />

        <label style={estiloLabel}>Descrição</label>
        <textarea
          value={form.descricao}
          onChange={atualizar("descricao")}
          placeholder="Descreva as atividades da vaga..."
          rows={3}
          style={{ ...estiloInput, resize: "vertical" }}
        />

        <label style={estiloLabel}>Requisitos (opcional)</label>
        <input
          type="text"
          value={form.requisitos}
          onChange={atualizar("requisitos")}
          placeholder="Ex: Conhecimentos básicos de HTML, CSS e JavaScript"
          style={estiloInput}
        />

        <label style={estiloLabel}>Localização (opcional)</label>
        <input
          type="text"
          value={form.localizacao}
          onChange={atualizar("localizacao")}
          placeholder="Ex: João Pessoa/PB ou Remoto"
          style={{ ...estiloInput, marginBottom: "22px" }}
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
          <button
            type="submit"
            disabled={enviando}
            className="btn-primary"
            style={{ flex: 1, padding: "12px", fontSize: "14px", opacity: enviando ? 0.7 : 1 }}
          >
            {enviando ? "Publicando..." : "Publicar Vaga"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ModalNovaVaga;
