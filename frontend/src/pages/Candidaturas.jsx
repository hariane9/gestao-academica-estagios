import { useState } from "react";
import MainLayout from "../components/MainLayout";
import Icon from "../components/Icon";
import { useApp } from "../context/AppContext";
import { badgeStyle } from "../utils/helpers";

const estiloTabela = {
  background: "#fff",
  border: "1px solid #E2E8F0",
  borderRadius: "14px",
  overflowX: "auto"
};

const estiloTh = {
  textAlign: "left",
  padding: "14px 20px",
  fontSize: "12.5px",
  fontWeight: 700,
  color: "#64748B",
  textTransform: "uppercase",
  letterSpacing: "0.04em"
};

function Candidaturas() {
  const { role, candidaturasAluno, candidaturasSupervisor, aprovarCandidatura, rejeitarCandidatura } = useApp();
  const [filtroStatus, setFiltroStatus] = useState("Todas");
  const [busca, setBusca] = useState("");

  if (role === "supervisor") {
    return (
      <MainLayout>
        <div style={{ animation: "fadeIn 0.3s ease" }}>
          <div style={estiloTabela}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "#F8FAFC", borderBottom: "1px solid #E2E8F0" }}>
                  <th style={estiloTh}>Estudante</th>
                  <th style={estiloTh}>Empresa / Vaga</th>
                  <th style={estiloTh}>Data</th>
                  <th style={estiloTh}>Status</th>
                  <th style={estiloTh}>Ações</th>
                </tr>
              </thead>
              <tbody>
                {candidaturasSupervisor.map((c) => (
                  <tr key={c.id} style={{ borderBottom: "1px solid #F1F5F9" }}>
                    <td style={{ padding: "16px 20px", fontSize: "14px", fontWeight: 700, color: "#1E293B" }}>
                      {c.alunoNome}
                    </td>
                    <td style={{ padding: "16px 20px", fontSize: "13.5px", color: "#475569" }}>
                      {c.empresa}
                      <br />
                      <span style={{ color: "#94A3B8", fontSize: "12.5px" }}>{c.vaga}</span>
                    </td>
                    <td style={{ padding: "16px 20px", fontSize: "13.5px", color: "#475569" }}>{c.data}</td>
                    <td style={{ padding: "16px 20px" }}>
                      <span style={badgeStyle(c.status)}>{c.status}</span>
                    </td>
                    <td style={{ padding: "16px 20px" }}>
                      {c.status === "Em análise" && (
                        <div style={{ display: "flex", gap: "8px" }}>
                          <button
                            onClick={() => aprovarCandidatura(c.id)}
                            className="btn-primary"
                            style={{ padding: "7px 14px", borderRadius: "8px", fontSize: "12.5px" }}
                          >
                            Aprovar
                          </button>
                          <button
                            onClick={() => rejeitarCandidatura(c.id)}
                            style={{
                              padding: "7px 14px",
                              borderRadius: "8px",
                              border: "1px solid #E2E8F0",
                              background: "#fff",
                              color: "#C40000",
                              fontSize: "12.5px",
                              fontWeight: 700,
                              cursor: "pointer"
                            }}
                          >
                            Rejeitar
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </MainLayout>
    );
  }

  const statuses = ["Todas", "Em análise", "Entrevista agendada", "Aprovada", "Rejeitada"];

  const candidaturasFiltradas = candidaturasAluno.filter(
    (c) =>
      (filtroStatus === "Todas" || c.status === filtroStatus) &&
      c.empresa.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <MainLayout>
      <div style={{ animation: "fadeIn 0.3s ease" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginBottom: "20px",
            overflowX: "auto",
            paddingBottom: "4px"
          }}
        >
          {statuses.map((st) => (
            <button
              key={st}
              onClick={() => setFiltroStatus(st)}
              className={"chip" + (st === filtroStatus ? " active" : "")}
            >
              {st}
            </button>
          ))}
        </div>

        <div style={{ position: "relative", maxWidth: "380px", marginBottom: "20px" }}>
          <div style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)" }}>
            <Icon icon="search" size={17} color="#94A3B8" />
          </div>
          <input
            type="text"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Buscar por empresa..."
            style={{
              width: "100%",
              padding: "11px 14px 11px 40px",
              borderRadius: "10px",
              border: "1px solid #E2E8F0",
              fontSize: "14px",
              background: "#fff"
            }}
          />
        </div>

        <div style={estiloTabela}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#F8FAFC", borderBottom: "1px solid #E2E8F0" }}>
                <th style={estiloTh}>Empresa</th>
                <th style={estiloTh}>Vaga</th>
                <th style={estiloTh}>Data</th>
                <th style={estiloTh}>Status</th>
              </tr>
            </thead>
            <tbody>
              {candidaturasFiltradas.map((c) => (
                <tr key={c.id} style={{ borderBottom: "1px solid #F1F5F9" }}>
                  <td style={{ padding: "16px 20px", fontSize: "14px", fontWeight: 700, color: "#1E293B" }}>
                    {c.empresa}
                  </td>
                  <td style={{ padding: "16px 20px", fontSize: "13.5px", color: "#475569" }}>{c.cargo}</td>
                  <td style={{ padding: "16px 20px", fontSize: "13.5px", color: "#475569" }}>{c.data}</td>
                  <td style={{ padding: "16px 20px" }}>
                    <span style={badgeStyle(c.status)}>{c.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </MainLayout>
  );
}

export default Candidaturas;
