import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registrar, extrairErro } from "../services/api";
import ifpbLogo from "../assets/ifpb-logo.png";

const estiloLabel = { display: "block", fontSize: "13px", fontWeight: 600, color: "#334155", marginBottom: "6px" };
const estiloInput = { width: "100%", padding: "13px 14px", borderRadius: "10px", border: "1px solid #E2E8F0", fontSize: "14px", color: "#1E293B", background: "#F8FAFC", marginBottom: "18px" };

const TIPOS = [
  { valor: "aluno", rotulo: "Estudante" },
  { valor: "supervisor", rotulo: "Supervisor" },
  { valor: "empresa", rotulo: "Empresa" }
];

function Cadastro() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ nome: "", email: "", senha: "", confirmar: "", tipo: "aluno" });
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState(false);
  const [enviando, setEnviando] = useState(false);

  const atualizar = (campo) => (e) => {
    setForm((f) => ({ ...f, [campo]: e.target.value }));
    setErro("");
  };

  const enviar = async (e) => {
    e.preventDefault();
    if (!form.nome.trim() || !form.email.trim() || !form.senha) {
      setErro("Preencha nome, e-mail e senha.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      setErro("Informe um e-mail válido.");
      return;
    }
    if (form.senha.length < 6) {
      setErro("A senha deve ter pelo menos 6 caracteres.");
      return;
    }
    if (form.senha !== form.confirmar) {
      setErro("As senhas não coincidem.");
      return;
    }
    setEnviando(true);
    try {
      await registrar({
        nome: form.nome.trim(),
        email: form.email.trim(),
        senha: form.senha,
        tipo: form.tipo
      });
      setSucesso(true);
      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      if (err.response) {
        setErro(extrairErro(err, "Não foi possível concluir o cadastro. Verifique os dados."));
      } else {
        setErro("Não foi possível conectar ao servidor. Verifique se o backend está rodando.");
      }
    } finally {
      setEnviando(false);
    }
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
    <div style={{ minHeight: "100vh", width: "100%", display: "flex", alignItems: "center", justifyContent: "center", padding: "32px", background: "#F5F7FA" }}>
      <form onSubmit={enviar} style={{ width: "100%", maxWidth: "440px", background: "#fff", border: "1px solid #E2E8F0", borderRadius: "16px", padding: "36px", animation: "fadeIn 0.4s ease" }}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "24px" }}>
          <img src={ifpbLogo} alt="Logo IFPB" style={{ height: "44px", width: "auto" }} />
        </div>

        <div style={{ marginBottom: "8px", fontSize: "13px", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "#5C8600", textAlign: "center" }}>
          Portal do Estágio
        </div>
        <div style={{ fontSize: "24px", fontWeight: 800, color: "#1E293B", marginBottom: "28px", textAlign: "center" }}>
          Criar conta
        </div>

        {sucesso ? (
          <div style={{ background: "#E6F4EA", color: "#4F7300", fontSize: "14px", fontWeight: 600, padding: "16px", borderRadius: "10px", textAlign: "center" }}>
            Conta criada com sucesso! Redirecionando para o login...
          </div>
        ) : (
          <>
            <div style={{ display: "flex", background: "#F1F5F9", borderRadius: "10px", padding: "4px", marginBottom: "24px" }}>
              {TIPOS.map((t) => (
                <button
                  key={t.valor}
                  type="button"
                  onClick={() => setForm((f) => ({ ...f, tipo: t.valor }))}
                  style={estiloTab(form.tipo === t.valor)}
                >
                  {t.rotulo}
                </button>
              ))}
            </div>

            <label style={estiloLabel}>Nome completo</label>
            <input type="text" value={form.nome} onChange={atualizar("nome")} placeholder="Ex: Marina Souza Lima" style={estiloInput} />

            <label style={estiloLabel}>E-mail</label>
            <input type="email" value={form.email} onChange={atualizar("email")} placeholder="Ex: nome@academico.ifpb.edu.br" style={estiloInput} />

            <label style={estiloLabel}>Senha</label>
            <input type="password" value={form.senha} onChange={atualizar("senha")} placeholder="Mínimo de 6 caracteres" style={estiloInput} />

            <label style={estiloLabel}>Confirmar senha</label>
            <input type="password" value={form.confirmar} onChange={atualizar("confirmar")} placeholder="Repita a senha" style={{ ...estiloInput, marginBottom: "8px" }} />

            {erro && (
              <div style={{ background: "#FBEAEA", color: "#C40000", fontSize: "13px", padding: "10px 14px", borderRadius: "8px", margin: "12px 0 4px" }}>
                {erro}
              </div>
            )}

            <button
              type="submit"
              disabled={enviando}
              className="btn-primary"
              style={{ width: "100%", padding: "14px", fontSize: "15px", marginTop: "16px", opacity: enviando ? 0.7 : 1 }}
            >
              {enviando ? "Criando conta..." : "Criar conta"}
            </button>

            <div style={{ textAlign: "center", fontSize: "13.5px", color: "#64748B", marginTop: "20px" }}>
              Já tem conta? <Link to="/">Entrar</Link>
            </div>
          </>
        )}
      </form>
    </div>
  );
}

export default Cadastro;
