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
import {
  fazerLogin,
  listarVagas,
  candidatarVaga,
  obterEstagioAtual,
  listarAtividades,
  registrarAtividade,
  eliminarAtividade,
  listarAvaliacoes,
  lancarAvaliacao,
  extrairLista,
  extrairErro,
  ESTAGIO_PADRAO
} from "../services/api";
import { formatToday, brParaISO, isoParaBR, periodoDe, hojeISO } from "../utils/helpers";

const AppContext = createContext(null);

// ---- Mapeamentos: formato da API -> formato usado nas telas ----
// GET /vagas: { id, titulo, descricao, requisitos, localizacao, criado_em, empresa }
const mapVaga = (v) => ({
  id: v.id,
  empresa: v.empresa || v.nome_comercial || (v.empresa_id ? "Empresa #" + v.empresa_id : "Empresa"),
  area: v.titulo || "",
  descricao: v.descricao || "",
  requisitos: v.requisitos || "",
  local: v.localizacao,
  modalidade: v.modalidade,
  bolsa: v.bolsa,
  carga: v.carga,
  vagasDisp: v.vagasDisp,
  candidatado: false
});

// GET /atividades: { id, descricao, horas_dedicadas, data_registro }
const mapAtividade = (a) => ({
  id: a.id,
  data: isoParaBR(a.data_registro),
  atividade: a.descricao || "Atividade",
  horas: String(a.horas_dedicadas ?? 0),
  descricao: "",
  doServidor: true
});

// GET /avaliacoes: { id, nota, feedback, data_avaliacao }
const mapAvaliacaoAluno = (a) => ({
  id: a.id,
  periodo: periodoDe(a.data_avaliacao),
  supervisor: a.supervisor_nome || "Supervisor",
  nota: Number(a.nota),
  feedback: a.feedback || "",
  data: isoParaBR(a.data_avaliacao)
});

const mapAvaliacaoSupervisor = (estagioId) => (a) => ({
  id: a.id,
  alunoNome: a.aluno_nome || "Estágio #" + (a.estagio_id ?? estagioId),
  periodo: periodoDe(a.data_avaliacao),
  nota: Number(a.nota),
  feedback: a.feedback || "",
  data: isoParaBR(a.data_avaliacao)
});

export function AppProvider({ children }) {
  // sessão (persistida no localStorage para sobreviver a refresh/URL direta)
  const [usuario, setUsuario] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("usuario")) || null;
    } catch {
      return null;
    }
  });
  const [role, setRole] = useState(() => localStorage.getItem("role") || "aluno");
  const [estagioId, setEstagioId] = useState(() => {
    const salvo = parseInt(localStorage.getItem("estagioId"), 10);
    return isNaN(salvo) ? ESTAGIO_PADRAO : salvo;
  });
  const logado = !!usuario;

  // dados (iniciam com os mocks e são substituídos pelos dados da API quando disponíveis)
  const [vagas, setVagas] = useState(vagasIniciais);
  const [candidaturasAluno, setCandidaturasAluno] = useState(candidaturasAlunoIniciais);
  const [diario, setDiario] = useState(diarioInicial);
  const [avaliacoesAluno, setAvaliacoesAluno] = useState(avaliacoesAlunoIniciais);
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

  // Descobre o estágio ativo do aluno logado (GET /estagio-atual)
  useEffect(() => {
    if (!logado || usuario?.tipo !== "aluno" || !usuario?.id) return;
    let ativo = true;
    (async () => {
      try {
        const r = await obterEstagioAtual(usuario.id);
        const id = r.data?.estagio_id;
        if (ativo && id) {
          setEstagioId(id);
          localStorage.setItem("estagioId", String(id));
        }
      } catch (e) {
        // 404 = aluno ainda sem estágio ativo; mantém o padrão
        console.warn("GET /estagio-atual: nenhum estágio ativo encontrado.", e);
      }
    })();
    return () => {
      ativo = false;
    };
  }, [logado, usuario]);

  // Carrega os dados da API depois do login (mantém os mocks se alguma rota falhar)
  useEffect(() => {
    if (!logado) return;
    let ativo = true;

    (async () => {
      try {
        const lista = extrairLista(await listarVagas());
        if (ativo && lista) setVagas(lista.map(mapVaga));
      } catch (e) {
        console.warn("GET /vagas falhou — usando dados de exemplo.", e);
      }

      try {
        const lista = extrairLista(await listarAtividades(estagioId));
        if (ativo && lista) setDiario(lista.map(mapAtividade));
      } catch (e) {
        console.warn("GET /atividades falhou — usando dados de exemplo.", e);
      }

      try {
        const lista = extrairLista(await listarAvaliacoes(estagioId));
        if (ativo && lista) {
          setAvaliacoesAluno(lista.map(mapAvaliacaoAluno));
          setAvaliacoesSupervisor(lista.map(mapAvaliacaoSupervisor(estagioId)));
        }
      } catch (e) {
        console.warn("GET /avaliacoes falhou — usando dados de exemplo.", e);
      }
    })();

    return () => {
      ativo = false;
    };
  }, [logado, estagioId]);

  const showToast = (msg) => {
    setToast(msg);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2800);
  };

  // ---- Sessão ----

  const login = async (email, senha, roleEscolhido) => {
    const resposta = await fazerLogin(email, senha);
    const dados = resposta.data?.user || resposta.data?.usuario || resposta.data || {};
    const tipo = dados.tipo || roleEscolhido;
    const novoRole = tipo === "aluno" ? "aluno" : "supervisor";
    const sessao = {
      id: dados.id ?? null,
      nome: dados.nome || "",
      email: dados.email || email,
      tipo
    };
    setUsuario(sessao);
    setRole(novoRole);
    localStorage.setItem("usuario", JSON.stringify(sessao));
    localStorage.setItem("role", novoRole);
  };

  const logout = () => {
    setUsuario(null);
    setMobileNavOpen(false);
    localStorage.removeItem("usuario");
    localStorage.removeItem("role");
    localStorage.removeItem("estagioId");
  };

  // ---- Ações ----

  const candidatar = async (vagaId) => {
    const vaga = vagas.find((v) => v.id === vagaId);
    if (!vaga || vaga.candidatado) return;
    try {
      await candidatarVaga(vagaId, usuario?.id ?? 0);
    } catch (e) {
      console.warn("POST /candidaturas falhou.", e);
      showToast(extrairErro(e, "Erro ao enviar candidatura. Verifique o servidor."));
      return;
    }
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

  const addRegistroDiario = async (registro) => {
    const horas = Number(registro.horas);
    // Regra do backend: entre 1 e 8 horas por atividade
    if (isNaN(horas) || horas < 1 || horas > 8) {
      showToast("Registre entre 1 e 8 horas por atividade.");
      return false;
    }
    const descricaoApi = registro.descricao
      ? registro.atividade + " — " + registro.descricao
      : registro.atividade;
    try {
      await registrarAtividade({
        estagio_id: estagioId,
        descricao: descricaoApi,
        horas_dedicadas: horas,
        data_registro: brParaISO(registro.data)
      });
    } catch (e) {
      console.warn("POST /atividades falhou.", e);
      showToast(extrairErro(e, "Erro ao salvar no servidor. Tente novamente."));
      return false;
    }
    setDiario((ds) => [{ id: "d" + Date.now(), ...registro }, ...ds]);
    showToast("Registro adicionado ao diário de bordo.");
    return true;
  };

  const removerRegistroDiario = async (id) => {
    const registro = diario.find((d) => d.id === id);
    if (registro?.doServidor) {
      try {
        await eliminarAtividade(id);
      } catch (e) {
        console.warn("DELETE /atividades falhou.", e);
        showToast(extrairErro(e, "Erro ao excluir o registro."));
        return;
      }
    }
    setDiario((ds) => ds.filter((d) => d.id !== id));
    showToast("Registro removido do diário.");
  };

  const addAvaliacao = async ({ alunoId, nota, feedback }) => {
    const notaInteira = parseInt(nota, 10);
    try {
      await lancarAvaliacao({
        estagio_id: estagioId,
        nota: notaInteira,
        feedback,
        data_avaliacao: hojeISO()
      });
    } catch (e) {
      console.warn("POST /avaliacoes falhou.", e);
      showToast(extrairErro(e, "Erro ao salvar avaliação. Verifique o servidor."));
      return false;
    }
    const aluno = estagiarios.find((e) => e.id === alunoId);
    const nova = {
      id: "av" + Date.now(),
      alunoNome: aluno ? aluno.nome : "Estágio #" + estagioId,
      periodo: periodoDe(hojeISO()),
      nota: notaInteira,
      feedback,
      data: formatToday()
    };
    setAvaliacoesSupervisor((as) => [nova, ...as]);
    showToast("Avaliação registrada com sucesso.");
    return true;
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

  // Perfil: base dos mocks, sobrescrito com os dados reais do usuário logado
  const basePerfil = role === "aluno" ? perfilAluno : perfilSupervisor;
  const perfil = usuario
    ? { ...basePerfil, nome: usuario.nome || basePerfil.nome, email: usuario.email || basePerfil.email }
    : basePerfil;

  return (
    <AppContext.Provider
      value={{
        logado,
        usuario,
        role,
        perfil,
        estagioId,
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
        removerRegistroDiario,
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
