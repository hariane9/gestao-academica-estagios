import { createContext, useContext, useEffect, useRef, useState } from "react";
import {
  vagas as vagasIniciais,
  candidaturasAluno as candidaturasAlunoIniciais,
  diario as diarioInicial,
  avaliacoesAluno as avaliacoesAlunoIniciais,
  estagiarios as estagiariosIniciais,
  candidaturasSupervisor as candidaturasSupervisorIniciais,
  avaliacoesSupervisor as avaliacoesSupervisorIniciais,
  perfilAluno,
  perfilSupervisor
} from "../services/mockData";
import { formatToday } from "../utils/helpers";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  // sessão (persistida no localStorage para sobreviver a refresh/URL direta)
  const [logado, setLogado] = useState(() => localStorage.getItem("logado") === "1");
  const [role, setRole] = useState(() => localStorage.getItem("role") || "aluno"); // 'aluno' | 'supervisor'

  // dados
  const [vagas, setVagas] = useState(vagasIniciais);
  const [candidaturasAluno, setCandidaturasAluno] = useState(candidaturasAlunoIniciais);
  const [diario, setDiario] = useState(diarioInicial);
  const [avaliacoesAluno] = useState(avaliacoesAlunoIniciais);
  const [estagiarios] = useState(estagiariosIniciais);
  const [candidaturasSupervisor, setCandidaturasSupervisor] = useState(candidaturasSupervisorIniciais);
  const [avaliacoesSupervisor, setAvaliacoesSupervisor] = useState(avaliacoesSupervisorIniciais);

  // UI
  const [toast, setToast] = useState(null);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 960);
  const [isDesktopWide, setIsDesktopWide] = useState(window.innerWidth >= 1180);
  const toastTimer = useRef(null);

  useEffect(() => {
    const onResize = () => {
      setIsMobile(window.innerWidth < 960);
      setIsDesktopWide(window.innerWidth >= 1180);
    };
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      clearTimeout(toastTimer.current);
    };
  }, []);

  const showToast = (msg) => {
    setToast(msg);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2800);
  };

  const login = (novoRole) => {
    setRole(novoRole);
    setLogado(true);
    localStorage.setItem("logado", "1");
    localStorage.setItem("role", novoRole);
  };

  const logout = () => {
    setLogado(false);
    setMobileNavOpen(false);
    localStorage.removeItem("logado");
    localStorage.removeItem("role");
  };

  const candidatar = (vagaId) => {
    const vaga = vagas.find((v) => v.id === vagaId);
    if (!vaga || vaga.candidatado) return;
    const novaCand = {
      id: "c" + Date.now(),
      empresa: vaga.empresa,
      cargo: vaga.area,
      data: formatToday(),
      status: "Em análise"
    };
    setVagas((vs) => vs.map((v) => (v.id === vagaId ? { ...v, candidatado: true } : v)));
    setCandidaturasAluno((cs) => [novaCand, ...cs]);
    showToast("Candidatura enviada para " + vaga.empresa + "!");
  };

  const addRegistroDiario = (registro) => {
    setDiario((ds) => [{ id: "d" + Date.now(), ...registro }, ...ds]);
    showToast("Registro adicionado ao diário de bordo.");
  };

  const addAvaliacao = ({ alunoId, nota, feedback }) => {
    const aluno = estagiarios.find((e) => e.id === alunoId);
    const nova = {
      id: "av" + Date.now(),
      alunoNome: aluno ? aluno.nome : "",
      periodo: "Julho 2026",
      nota: parseFloat(nota),
      feedback,
      data: formatToday()
    };
    setAvaliacoesSupervisor((as) => [nova, ...as]);
    showToast("Avaliação registrada com sucesso.");
  };

  const aprovarCandidatura = (id) => {
    setCandidaturasSupervisor((cs) =>
      cs.map((c) => (c.id === id ? { ...c, status: "Aprovada" } : c))
    );
    showToast("Candidatura aprovada.");
  };

  const rejeitarCandidatura = (id) => {
    setCandidaturasSupervisor((cs) =>
      cs.map((c) => (c.id === id ? { ...c, status: "Rejeitada" } : c))
    );
    showToast("Candidatura rejeitada.");
  };

  const perfil = role === "aluno" ? perfilAluno : perfilSupervisor;

  return (
    <AppContext.Provider
      value={{
        logado,
        role,
        perfil,
        vagas,
        candidaturasAluno,
        diario,
        avaliacoesAluno,
        estagiarios,
        candidaturasSupervisor,
        avaliacoesSupervisor,
        toast,
        isMobile,
        isDesktopWide,
        mobileNavOpen,
        setMobileNavOpen,
        showToast,
        login,
        logout,
        candidatar,
        addRegistroDiario,
        addAvaliacao,
        aprovarCandidatura,
        rejeitarCandidatura
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useApp() {
  return useContext(AppContext);
}
