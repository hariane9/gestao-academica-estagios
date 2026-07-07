import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import ifpbLogo from "../assets/ifpb-logo.png";

const estiloLabel = {
  display: "block",
  fontSize: "13px",
  fontWeight: 600,
  color: "#334155",
  marginBottom: "6px"
};

const estiloInput = {
  width: "100%",
  padding: "13px 14px",
  borderRadius: "10px",
  border: "1px solid #E2E8F0",
  fontSize: "14px",
  color: "#1E293B",
  background: "#F8FAFC"
};

function Login() {
  const navigate = useNavigate();
  const { login, isMobile } = useApp();

  const [role, setRole] = useState("aluno");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  const entrar = (e) => {
    e.preventDefault();
    if (!email.trim() || !senha.trim()) {
      setErro("Preencha e-mail e senha para continuar.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setErro("Informe um e-mail válido.");
      return;
    }
    if (senha.length < 4) {
      setErro("Senha inválida. Verifique e tente novamente.");
      return;
    }
    login(role);
    navigate("/dashboard");
  };

  const estiloTab = (ativo) => ({
    flex: 1,
    padding: "10px",
    border: "none",
    borderRadius: "8px",
    fontSize: "13.5px",
    fontWeight: 700,
    cursor: "pointer",
    background: ativo ? "#fff" : "transparent",
    color: ativo ? "#4F7300" : "#64748B",
    boxShadow: ativo ? "0 1px 3px rgba(0,0,0,0.08)" : "none"
  });

  return (
    <div style={{ minHeight: "100vh", width: "100%", display: "flex", background: "#fff" }}>
      {!isMobile && (
        <div
          style={{
            width: "44%",
            minWidth: "420px",
            background: "linear-gradient(160deg,#5C8600 0%,#4F7300 100%)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "56px",
            position: "relative",
            overflow: "hidden"
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "-80px",
              right: "-80px",
              width: "280px",
              height: "280px",
              borderRadius: "50%",
              background: "rgba(255,255,255,0.06)"
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "-120px",
              left: "-60px",
              width: "320px",
              height: "320px",
              borderRadius: "50%",
              background: "rgba(255,255,255,0.05)"
            }}
          />

          <div style={{ display: "flex", alignItems: "center", gap: "12px", position: "relative", zIndex: 2 }}>
            <div
              style={{
                background: "#fff",
                borderRadius: "12px",
                padding: "8px 12px",
                display: "flex",
                alignItems: "center"
              }}
            >
              <img src={ifpbLogo} alt="Logo IFPB" style={{ height: "36px", width: "auto", display: "block" }} />
            </div>
          </div>

          <div style={{ position: "relative", zIndex: 2, color: "#fff", maxWidth: "420px" }}>
            <div
              style={{
                fontSize: "13px",
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "#B7E3BE",
                marginBottom: "16px"
              }}
            >
              Sistema de Gestão de Estágios
            </div>
            <div style={{ fontSize: "34px", fontWeight: 800, lineHeight: 1.25, marginBottom: "20px" }}>
              Conectando estudantes a oportunidades reais de mercado.
            </div>
            <div style={{ fontSize: "15px", lineHeight: 1.6, color: "#DDEFE0" }}>
              Acompanhe candidaturas, registre seu diário de bordo e receba avaliações de desempenho — tudo em
              um só lugar.
            </div>
          </div>

          <div style={{ position: "relative", zIndex: 2, display: "flex", gap: "32px", color: "#fff" }}>
            <div>
              <div style={{ fontSize: "26px", fontWeight: 800 }}>1.240+</div>
              <div style={{ fontSize: "13px", color: "#CDEAD1" }}>Estagiários ativos</div>
            </div>
            <div>
              <div style={{ fontSize: "26px", fontWeight: 800 }}>380+</div>
              <div style={{ fontSize: "13px", color: "#CDEAD1" }}>Empresas parceiras</div>
            </div>
            <div>
              <div style={{ fontSize: "26px", fontWeight: 800 }}>96%</div>
              <div style={{ fontSize: "13px", color: "#CDEAD1" }}>Satisfação</div>
            </div>
          </div>
        </div>
      )}

      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "32px",
          background: "#FFFFFF"
        }}
      >
        <form onSubmit={entrar} style={{ width: "100%", maxWidth: "400px", animation: "fadeIn 0.4s ease" }}>
          {isMobile && (
            <div style={{ display: "flex", justifyContent: "center", marginBottom: "28px" }}>
              <img src={ifpbLogo} alt="Logo IFPB" style={{ height: "56px", width: "auto" }} />
            </div>
          )}

          <div
            style={{
              marginBottom: "8px",
              fontSize: "13px",
              fontWeight: 700,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: "#5C8600"
            }}
          >
            Portal do Estágio
          </div>
          <div style={{ fontSize: "26px", fontWeight: 800, color: "#1E293B", marginBottom: "8px" }}>
            Entrar na plataforma
          </div>
          <div style={{ fontSize: "14px", color: "#64748B", marginBottom: "28px" }}>
            Use suas credenciais institucionais para acessar.
          </div>

          <div
            style={{
              display: "flex",
              background: "#F1F5F9",
              borderRadius: "10px",
              padding: "4px",
              marginBottom: "24px"
            }}
          >
            <button type="button" onClick={() => setRole("aluno")} style={estiloTab(role === "aluno")}>
              Sou Estudante
            </button>
            <button
              type="button"
              onClick={() => setRole("supervisor")}
              style={estiloTab(role === "supervisor")}
            >
              Sou Supervisor
            </button>
          </div>

          <label style={estiloLabel}>E-mail</label>
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setErro("");
            }}
            placeholder="Ex: nome@academico.ifpb.edu.br"
            style={{ ...estiloInput, marginBottom: "18px" }}
          />

          <label style={estiloLabel}>Senha</label>
          <input
            type="password"
            value={senha}
            onChange={(e) => {
              setSenha(e.target.value);
              setErro("");
            }}
            placeholder="Digite sua senha"
            style={{ ...estiloInput, marginBottom: "8px" }}
          />

          <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "20px" }}>
            <a href="#" onClick={(e) => e.preventDefault()} style={{ fontSize: "13px" }}>
              Esqueci minha senha
            </a>
          </div>

          {erro && (
            <div
              style={{
                background: "#FBEAEA",
                color: "#C40000",
                fontSize: "13px",
                padding: "10px 14px",
                borderRadius: "8px",
                marginBottom: "16px"
              }}
            >
              {erro}
            </div>
          )}

          <button type="submit" className="btn-primary" style={{ width: "100%", padding: "14px", fontSize: "15px" }}>
            Entrar
          </button>

          <div style={{ textAlign: "center", fontSize: "13px", color: "#94A3B8", marginTop: "24px" }}>
            Instituto Federal da Paraíba · Coordenação de Estágios
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
