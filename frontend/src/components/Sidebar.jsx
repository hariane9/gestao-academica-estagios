import { useLocation, useNavigate } from "react-router-dom";
import Icon from "./Icon";
import { useApp } from "../context/AppContext";
import ifpbLogo from "../assets/ifpb-logo.png";

const itensAluno = [
  { path: "/dashboard", label: "Dashboard", icon: "home" },
  { path: "/vagas", label: "Vagas", icon: "briefcase" },
  { path: "/candidaturas", label: "Candidaturas", icon: "clipboard" },
  { path: "/diario", label: "Diário de Bordo", icon: "book" },
  { path: "/avaliacoes", label: "Avaliações", icon: "star" },
  { path: "/documentos", label: "Documentos", icon: "clipboardCheck" },
  { path: "/perfil", label: "Perfil", icon: "user" }
];

const itensSupervisor = [
  { path: "/dashboard", label: "Dashboard", icon: "home" },
  { path: "/estagiarios", label: "Estagiários", icon: "briefcase" },
  { path: "/candidaturas", label: "Candidaturas", icon: "clipboard" },
  { path: "/avaliacoes", label: "Avaliações", icon: "star" },
  { path: "/documentos", label: "Documentos", icon: "clipboardCheck" },
  { path: "/perfil", label: "Perfil", icon: "user" }
];

const itensEmpresa = [
  { path: "/minhas-vagas", label: "Minhas Vagas", icon: "briefcase" },
  { path: "/perfil", label: "Perfil", icon: "user" }
];

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { role, logout, isMobile, mobileNavOpen, setMobileNavOpen } = useApp();

  const itens =
    role === "supervisor" ? itensSupervisor : role === "empresa" ? itensEmpresa : itensAluno;

  const irPara = (path) => {
    setMobileNavOpen(false);
    navigate(path);
  };

  const sair = () => {
    logout();
    navigate("/");
  };

  const estiloSidebar = {
    width: "260px",
    minWidth: "260px",
    background: "#fff",
    borderRight: "1px solid #E2E8F0",
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    position: isMobile ? "fixed" : "sticky",
    top: 0,
    ...(isMobile && {
      zIndex: 40,
      left: mobileNavOpen ? 0 : "-280px",
      transition: "left 0.25s ease",
      boxShadow: mobileNavOpen ? "8px 0 24px rgba(0,0,0,0.12)" : "none"
    })
  };

  return (
    <aside style={estiloSidebar}>
      <div
        style={{
          padding: "24px 20px",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          borderBottom: "1px solid #EEF2F6"
        }}
      >
        <img src={ifpbLogo} alt="Logo IFPB" style={{ height: "28px", width: "auto" }} />
        <div style={{ fontSize: "13px", fontWeight: 700, color: "#1E293B", lineHeight: 1.3 }}>
          Portal do
          <br />
          Estágio
        </div>
      </div>

      <nav style={{ flex: 1, padding: "16px 12px", display: "flex", flexDirection: "column", gap: "4px" }}>
        {itens.map((item) => {
          const ativo = location.pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => irPara(item.path)}
              className={"nav-btn" + (ativo ? " active" : "")}
            >
              <Icon icon={item.icon} size={19} color={ativo ? "#5C8600" : "#64748B"} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div style={{ padding: "16px 12px", borderTop: "1px solid #EEF2F6" }}>
        <button onClick={sair} className="logout-btn">
          <Icon icon="logout" size={19} color="currentColor" />
          <span>Sair</span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
