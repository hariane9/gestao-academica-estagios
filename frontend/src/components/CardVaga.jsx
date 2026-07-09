import Icon from "./Icon";
import { useApp } from "../context/AppContext";

function CardVaga({ vaga }) {
  const { candidatar } = useApp();

  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #E2E8F0",
        borderRadius: "14px",
        padding: "22px",
        display: "flex",
        flexDirection: "column",
        gap: "14px"
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "10px" }}>
        <div
          style={{
            width: "44px",
            height: "44px",
            borderRadius: "10px",
            background: "#E6F4EA",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0
          }}
        >
          <Icon icon="building" size={21} color="#5C8600" />
        </div>
        <div
          style={{
            fontSize: "12px",
            fontWeight: 700,
            color: "#2952A3",
            background: "#E8EEFB",
            padding: "4px 10px",
            borderRadius: "999px",
            whiteSpace: "nowrap"
          }}
        >
          {vaga.modalidade}
        </div>
      </div>

      <div>
        <div style={{ fontSize: "16px", fontWeight: 800, color: "#1E293B", marginBottom: "4px" }}>
          {vaga.empresa}
        </div>
        <div style={{ fontSize: "13.5px", color: "#5C8600", fontWeight: 600 }}>{vaga.area}</div>
      </div>

      <div style={{ fontSize: "13.5px", color: "#64748B", lineHeight: 1.5 }}>{vaga.descricao}</div>

      <div style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "13px", color: "#475569" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Icon icon="mapPin" size={15} color="#94A3B8" />
          {vaga.local}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Icon icon="dollar" size={15} color="#94A3B8" />
          Bolsa: {vaga.bolsa}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Icon icon="clock" size={15} color="#94A3B8" />
          {vaga.carga} · {vaga.vagasDisp} vaga(s)
        </div>
      </div>

      {vaga.candidatado ? (
        <button
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "10px",
            border: "1px solid #E2E8F0",
            background: "#F1F5F9",
            color: "#94A3B8",
            fontWeight: 700,
            fontSize: "14px",
            cursor: "default"
          }}
        >
          Candidatura enviada
        </button>
      ) : (
        <button
          onClick={() => candidatar(vaga.id)}
          className="btn-primary"
          style={{ width: "100%", padding: "12px", fontSize: "14px" }}
        >
          Candidatar-se
        </button>
      )}
    </div>
  );
}

export default CardVaga;
