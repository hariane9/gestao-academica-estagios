import { useLocation } from "react-router-dom";
import Icon from "./Icon";
import { useApp } from "../context/AppContext";
import { getInitials } from "../utils/helpers";

function Header() {
  const location = useLocation();
  const { role, perfil, isMobile, isDesktopWide, setMobileNavOpen } = useApp();

  const titulos = {
    "/dashboard": "Dashboard",
    "/vagas": "Vagas Disponíveis",
    "/candidaturas": role === "supervisor" ? "Candidaturas Recebidas" : "Minhas Candidaturas",
    "/diario": "Diário de Bordo",
    "/avaliacoes": role === "supervisor" ? "Avaliações de Estagiários" : "Avaliações",
    "/estagiarios": "Estagiários",
    "/documentos": "Documentos",
    "/perfil": "Meu Perfil"
  };

  return (
    <header
      style={{
        height: "72px",
        minHeight: "72px",
        background: "#fff",
        borderBottom: "1px solid #E2E8F0",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 28px",
        position: "sticky",
        top: 0,
        zIndex: 10
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        {isMobile && (
          <button
            onClick={() => setMobileNavOpen(true)}
            style={{ background: "none", border: "none", cursor: "pointer", padding: "6px", color: "#334155" }}
          >
            <Icon icon="menu" size={22} color="#334155" />
          </button>
        )}
        <div style={{ fontSize: "20px", fontWeight: 800, color: "#1E293B" }}>
          {titulos[location.pathname] || ""}
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
        <button
          style={{
            background: "#F5F7FA",
            border: "none",
            borderRadius: "10px",
            width: "38px",
            height: "38px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            color: "#334155",
            position: "relative"
          }}
        >
          <Icon icon="bell" size={19} color="#334155" />
          <div
            style={{
              position: "absolute",
              top: "8px",
              right: "9px",
              width: "7px",
              height: "7px",
              borderRadius: "50%",
              background: "#FE0000"
            }}
          />
        </button>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            paddingLeft: "16px",
            borderLeft: "1px solid #E2E8F0"
          }}
        >
          <div
            style={{
              width: "38px",
              height: "38px",
              borderRadius: "50%",
              background: "#5C8600",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 700,
              fontSize: "14px"
            }}
          >
            {getInitials(perfil.nome)}
          </div>
          {isDesktopWide && (
            <div>
              <div style={{ fontSize: "13.5px", fontWeight: 700, color: "#1E293B" }}>{perfil.nome}</div>
              <div style={{ fontSize: "12px", color: "#94A3B8" }}>
                {role === "supervisor" ? "Supervisor" : "Estudante"}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
