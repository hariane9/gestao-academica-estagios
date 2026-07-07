import { useState } from "react";
import MainLayout from "../components/MainLayout";
import Icon from "../components/Icon";
import ModalNovaAvaliacao from "../components/ModalNovaAvaliacao";
import { useApp } from "../context/AppContext";
import { notaColor } from "../utils/helpers";

const estiloTh = {
  textAlign: "left",
  padding: "14px 20px",
  fontSize: "12.5px",
  fontWeight: 700,
  color: "#64748B",
  textTransform: "uppercase"
};

function Avaliacoes() {
  const { role, avaliacoesAluno, avaliacoesSupervisor } = useApp();
  const [modalAberto, setModalAberto] = useState(false);

  if (role === "supervisor") {
    return (
      <MainLayout>
        <div style={{ animation: "fadeIn 0.3s ease" }}>
          <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "18px" }}>
            <button
              onClick={() => setModalAberto(true)}
              className="btn-primary"
              style={{ padding: "11px 18px", fontSize: "14px" }}
            >
              <Icon icon="plus" size={17} color="#fff" />
              Nova Avaliação
            </button>
          </div>

          <div style={{ background: "#fff", border: "1px solid #E2E8F0", borderRadius: "14px", overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "#F8FAFC", borderBottom: "1px solid #E2E8F0" }}>
                  <th style={estiloTh}>Estudante</th>
                  <th style={estiloTh}>Período</th>
                  <th style={estiloTh}>Nota</th>
                  <th style={estiloTh}>Feedback</th>
                  <th style={estiloTh}>Data</th>
                </tr>
              </thead>
              <tbody>
                {avaliacoesSupervisor.map((a) => (
                  <tr key={a.id} style={{ borderBottom: "1px solid #F1F5F9" }}>
                    <td style={{ padding: "16px 20px", fontSize: "14px", fontWeight: 700, color: "#1E293B" }}>
                      {a.alunoNome}
                    </td>
                    <td style={{ padding: "16px 20px", fontSize: "13.5px", color: "#475569" }}>{a.periodo}</td>
                    <td style={{ padding: "16px 20px", fontSize: "15px", fontWeight: 800, color: notaColor(a.nota) }}>
                      {a.nota}
                    </td>
                    <td style={{ padding: "16px 20px", fontSize: "13px", color: "#64748B", maxWidth: "280px" }}>
                      {a.feedback}
                    </td>
                    <td style={{ padding: "16px 20px", fontSize: "13.5px", color: "#94A3B8" }}>{a.data}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {modalAberto && <ModalNovaAvaliacao onClose={() => setModalAberto(false)} />}
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div style={{ animation: "fadeIn 0.3s ease" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "760px" }}>
          {avaliacoesAluno.map((a) => (
            <div
              key={a.id}
              style={{ background: "#fff", border: "1px solid #E2E8F0", borderRadius: "14px", padding: "24px" }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "14px"
                }}
              >
                <div>
                  <div style={{ fontSize: "16px", fontWeight: 800, color: "#1E293B" }}>{a.periodo}</div>
                  <div style={{ fontSize: "13px", color: "#94A3B8" }}>
                    Avaliado por {a.supervisor} · {a.data}
                  </div>
                </div>
                <div style={{ fontSize: "26px", fontWeight: 800, color: notaColor(a.nota) }}>{a.nota}</div>
              </div>

              <div
                style={{
                  height: "8px",
                  borderRadius: "999px",
                  background: "#F1F5F9",
                  marginBottom: "16px",
                  overflow: "hidden"
                }}
              >
                <div
                  style={{
                    height: "100%",
                    borderRadius: "999px",
                    background: notaColor(a.nota),
                    width: a.nota * 10 + "%"
                  }}
                />
              </div>

              <div style={{ fontSize: "14px", color: "#475569", lineHeight: 1.6 }}>{a.feedback}</div>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}

export default Avaliacoes;
