import MainLayout from "../components/MainLayout";
import { useApp } from "../context/AppContext";
import { getInitials } from "../utils/helpers";

function CampoInfo({ rotulo, valor }) {
  return (
    <div>
      <div
        style={{
          fontSize: "12px",
          fontWeight: 700,
          color: "#94A3B8",
          textTransform: "uppercase",
          marginBottom: "6px"
        }}
      >
        {rotulo}
      </div>
      <div style={{ fontSize: "14.5px", color: "#1E293B", fontWeight: 600 }}>{valor}</div>
    </div>
  );
}

function Perfil() {
  const { role, perfil, isMobile } = useApp();
  const ehAluno = role === "aluno";

  const campos = ehAluno
    ? [
        ["Curso", perfil.curso],
        ["Instituição", perfil.instituicao],
        ["Empresa do estágio", perfil.empresa],
        ["Supervisor", perfil.supervisor],
        ["Período de estágio", perfil.periodo],
        ["Turno", perfil.turno],
        ["E-mail", perfil.email],
        ["Telefone", perfil.telefone]
      ]
    : [
          ["Cargo", perfil.cargo],
          ["Registro", perfil.registro],
          ["Departamento", perfil.departamento],
          ["Instituição", perfil.instituicao],
          ["E-mail", perfil.email],
          ["Telefone", perfil.telefone]
        ];

  return (
    <MainLayout>
      <div style={{ maxWidth: "760px", animation: "fadeIn 0.3s ease" }}>
        <div
          style={{
            background: "#fff",
            border: "1px solid #E2E8F0",
            borderRadius: "14px",
            padding: isMobile ? "24px" : "32px",
            marginBottom: "20px",
            display: "flex",
            alignItems: "center",
            gap: isMobile ? "18px" : "24px",
            flexWrap: isMobile ? "wrap" : "nowrap"
          }}
        >
          <div
            style={{
              width: "88px",
              height: "88px",
              borderRadius: "50%",
              background: "#5C8600",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 800,
              fontSize: "30px",
              flexShrink: 0
            }}
          >
            {getInitials(perfil.nome)}
          </div>
          <div>
            <div style={{ fontSize: "22px", fontWeight: 800, color: "#1E293B", marginBottom: "4px" }}>
              {perfil.nome}
            </div>
            <div style={{ fontSize: "14px", color: "#64748B" }}>
              {ehAluno ? `Matrícula ${perfil.matricula} · ${perfil.curso}` : `${perfil.cargo} · ${perfil.registro}`}
            </div>
          </div>
        </div>

        <div
          style={{
            background: "#fff",
            border: "1px solid #E2E8F0",
            borderRadius: "14px",
            padding: isMobile ? "24px" : "28px",
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
            gap: isMobile ? "18px" : "22px 28px"
          }}
        >
          {campos.map(([rotulo, valor]) => (
            <CampoInfo key={rotulo} rotulo={rotulo} valor={valor} />
          ))}
        </div>
      </div>
    </MainLayout>
  );
}

export default Perfil;
