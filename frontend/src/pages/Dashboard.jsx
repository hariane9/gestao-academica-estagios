import { Navigate } from "react-router-dom";
import MainLayout from "../components/MainLayout";
import Icon from "../components/Icon";
import { useApp } from "../context/AppContext";
import { badgeStyle } from "../utils/helpers";
import { prazosAluno, prazosSupervisor } from "../services/mockData";

const estiloCard = {
  background: "#fff",
  border: "1px solid #E2E8F0",
  borderRadius: "14px",
  padding: "22px",
  boxShadow: "0 1px 2px rgba(15,23,42,0.04)"
};

const estiloPainel = {
  background: "#fff",
  border: "1px solid #E2E8F0",
  borderRadius: "14px",
  padding: "24px"
};

function CardKpi({ icon, iconBg, iconColor, valor, label }) {
  return (
    <div style={estiloCard}>
      <div
        style={{
          width: "42px",
          height: "42px",
          borderRadius: "10px",
          background: iconBg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "14px"
        }}
      >
        <Icon icon={icon} size={20} color={iconColor} />
      </div>
      <div style={{ fontSize: "28px", fontWeight: 800, color: "#1E293B" }}>{valor}</div>
      <div style={{ fontSize: "13.5px", color: "#64748B", fontWeight: 600 }}>{label}</div>
    </div>
  );
}

function PainelPrazos({ prazos }) {
  return (
    <div style={estiloPainel}>
      <div style={{ fontSize: "16px", fontWeight: 800, color: "#1E293B", marginBottom: "18px" }}>
        Próximos prazos
      </div>
      {prazos.map((item, i) => (
        <div key={i} style={{ padding: "12px 0", borderBottom: "1px solid #F1F5F9" }}>
          <div
            style={{
              display: "inline-block",
              padding: "3px 10px",
              borderRadius: "999px",
              background: "#F1F5F9",
              color: "#475569",
              fontSize: "11px",
              fontWeight: 700,
              marginBottom: "6px"
            }}
          >
            {item.tag}
          </div>
          <div style={{ fontSize: "13.5px", fontWeight: 600, color: "#1E293B", marginBottom: "2px" }}>
            {item.titulo}
          </div>
          <div style={{ fontSize: "12.5px", color: "#94A3B8" }}>{item.data}</div>
        </div>
      ))}
    </div>
  );
}

function Dashboard() {
  const {
    role,
    isMobile,
    vagas,
    candidaturasAluno,
    diario,
    avaliacoesAluno,
    estagiarios,
    candidaturasSupervisor,
    avaliacoesSupervisor
  } = useApp();

  const gradeDuasColunas = {
    display: "grid",
    gridTemplateColumns: isMobile ? "1fr" : "1.4fr 1fr",
    gap: "20px"
  };

  const gradeKpis = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
    gap: "20px",
    marginBottom: "28px"
  };

  // Empresa tem a própria página inicial
  if (role === "empresa") {
    return <Navigate to="/minhas-vagas" replace />;
  }

  if (role === "supervisor") {
    const pendentes = candidaturasSupervisor.filter((c) => c.status === "Em análise").length;

    return (
      <MainLayout>
        <div style={{ animation: "fadeIn 0.3s ease" }}>
          <div style={gradeKpis}>
            <CardKpi icon="user" iconBg="#E6F4EA" iconColor="#5C8600" valor={estagiarios.length} label="Estagiários ativos" />
            <CardKpi icon="briefcase" iconBg="#E8EEFB" iconColor="#2952A3" valor={vagas.length} label="Vagas ativas" />
            <CardKpi icon="clipboard" iconBg="#FFF4E0" iconColor="#966400" valor={pendentes} label="Candidaturas pendentes" />
            <CardKpi icon="star" iconBg="#E6F4EA" iconColor="#5C8600" valor={avaliacoesSupervisor.length} label="Avaliações registradas" />
          </div>

          <div style={gradeDuasColunas}>
            <div style={estiloPainel}>
              <div style={{ fontSize: "16px", fontWeight: 800, color: "#1E293B", marginBottom: "18px" }}>
                Atividade recente
              </div>
              {candidaturasSupervisor.slice(0, 4).map((c) => (
                <div
                  key={c.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "14px",
                    padding: "12px 0",
                    borderBottom: "1px solid #F1F5F9"
                  }}
                >
                  <div style={{ fontSize: "14px", fontWeight: 600, color: "#1E293B" }}>
                    {c.alunoNome} — candidatura em {c.empresa}
                  </div>
                  <span style={badgeStyle(c.status)}>{c.status}</span>
                </div>
              ))}
            </div>

            <PainelPrazos prazos={prazosSupervisor} />
          </div>
        </div>
      </MainLayout>
    );
  }

  const horasTotais = diario.reduce((soma, d) => soma + parseFloat(d.horas || 0), 0).toFixed(0);
  const mediaNotas = avaliacoesAluno.length
    ? (avaliacoesAluno.reduce((soma, a) => soma + a.nota, 0) / avaliacoesAluno.length).toFixed(1)
    : "-";

  return (
    <MainLayout>
      <div style={{ animation: "fadeIn 0.3s ease" }}>
        <div style={gradeKpis}>
          <CardKpi icon="briefcase" iconBg="#E6F4EA" iconColor="#5C8600" valor={vagas.length} label="Vagas disponíveis" />
          <CardKpi icon="clipboard" iconBg="#E8EEFB" iconColor="#2952A3" valor={candidaturasAluno.length} label="Candidaturas enviadas" />
          <CardKpi icon="clock" iconBg="#FFF4E0" iconColor="#966400" valor={horasTotais + "h"} label="Horas de estágio" />
          <CardKpi icon="star" iconBg="#E6F4EA" iconColor="#5C8600" valor={mediaNotas} label="Média de avaliações" />
        </div>

        <div style={gradeDuasColunas}>
          <div style={estiloPainel}>
            <div style={{ fontSize: "16px", fontWeight: 800, color: "#1E293B", marginBottom: "18px" }}>
              Atividades recentes
            </div>
            {diario.slice(0, 4).map((item) => (
              <div
                key={item.id}
                style={{ display: "flex", gap: "14px", padding: "12px 0", borderBottom: "1px solid #F1F5F9" }}
              >
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "9px",
                    background: "#F5F7FA",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0
                  }}
                >
                  <Icon icon="book" size={16} color="#5C8600" />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: "14px", fontWeight: 600, color: "#1E293B" }}>{item.atividade}</div>
                  <div style={{ fontSize: "12.5px", color: "#94A3B8" }}>
                    {item.data} · {item.horas}h
                  </div>
                </div>
              </div>
            ))}
          </div>

          <PainelPrazos prazos={prazosAluno} />
        </div>
      </div>
    </MainLayout>
  );
}

export default Dashboard;

