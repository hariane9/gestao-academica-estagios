import { useState } from "react";
import MainLayout from "../components/MainLayout";
import ModalNovaAvaliacao from "../components/ModalNovaAvaliacao";
import { useApp } from "../context/AppContext";
import { badgeStyle, getInitials } from "../utils/helpers";

function Estagiarios() {
  const { estagiarios } = useApp();
  const [alunoParaAvaliar, setAlunoParaAvaliar] = useState(null);

  return (
    <MainLayout>
      <div style={{ animation: "fadeIn 0.3s ease" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))",
            gap: "18px"
          }}
        >
          {estagiarios.map((e) => {
            const pct = Math.round((e.horasCumpridas / e.horasTotal) * 100);
            return (
              <div
                key={e.id}
                style={{ background: "#fff", border: "1px solid #E2E8F0", borderRadius: "14px", padding: "20px" }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "14px" }}>
                  <div
                    style={{
                      width: "44px",
                      height: "44px",
                      borderRadius: "50%",
                      background: "#5C8600",
                      color: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 700,
                      fontSize: "15px",
                      flexShrink: 0
                    }}
                  >
                    {getInitials(e.nome)}
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: "14.5px", fontWeight: 800, color: "#1E293B" }}>{e.nome}</div>
                    <div style={{ fontSize: "12.5px", color: "#94A3B8" }}>{e.matricula}</div>
                  </div>
                </div>

                <div style={{ fontSize: "13px", color: "#475569", marginBottom: "4px" }}>{e.empresa}</div>
                <div style={{ fontSize: "12.5px", color: "#94A3B8", marginBottom: "12px" }}>{e.curso}</div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "6px"
                  }}
                >
                  <span style={{ fontSize: "12px", color: "#64748B", fontWeight: 600 }}>
                    {e.horasCumpridas}h / {e.horasTotal}h
                  </span>
                  <span style={badgeStyle(e.statusEstagio)}>{e.statusEstagio}</span>
                </div>

                <div
                  style={{
                    height: "7px",
                    borderRadius: "999px",
                    background: "#F1F5F9",
                    overflow: "hidden",
                    marginBottom: "14px"
                  }}
                >
                  <div
                    style={{ height: "100%", borderRadius: "999px", background: "#5C8600", width: pct + "%" }}
                  />
                </div>

                <button
                  onClick={() => setAlunoParaAvaliar(e.id)}
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "9px",
                    border: "1px solid #5C8600",
                    background: "#fff",
                    color: "#5C8600",
                    fontWeight: 700,
                    fontSize: "13.5px",
                    cursor: "pointer"
                  }}
                >
                  Avaliar
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {alunoParaAvaliar && (
        <ModalNovaAvaliacao alunoIdInicial={alunoParaAvaliar} onClose={() => setAlunoParaAvaliar(null)} />
      )}
    </MainLayout>
  );
}

export default Estagiarios;
