import axios from "axios";

// Em desenvolvimento, o Vite redireciona "/api" para
// http://localhost/gestao_estagios/public/index.php (ver vite.config.js).
const api = axios.create({
  baseURL: "/api",
  headers: { "Content-Type": "application/json" }
});

// Usado como último recurso quando o aluno ainda não tem estágio ativo
// (a rota GET /estagio-atual é quem descobre o estágio real do aluno).
export const ESTAGIO_PADRAO = 1;

// ---- Autenticação ----
export const registrar = (dados) =>
  api.post("/register", dados); // { nome, email, senha, tipo: "aluno" | "empresa" | "supervisor" }

export const fazerLogin = (email, senha) =>
  api.post("/login", { email, senha }); // resposta: { message, user: { id, nome, email, tipo } }

// ---- Empresas ----
export const listarEmpresas = () => api.get("/empresas");

export const vincularEmpresa = (dados) =>
  api.post("/empresas", dados); // { usuario_id, nome_comercial, nif, morada? }

// ---- Vagas e candidaturas ----
// GET /vagas devolve: { id, titulo, descricao, requisitos, localizacao, criado_em, empresa }
export const listarVagas = () => api.get("/vagas");

export const criarVaga = (dados) =>
  api.post("/vagas", dados); // { empresa_id, titulo, descricao, requisitos?, localizacao? }

export const candidatarVaga = (vaga_id, aluno_id) =>
  api.post("/candidaturas", { vaga_id, aluno_id });

// ---- Estágio ----
// Descobre o estágio ativo do aluno logado: { estagio_id, empresa_id, supervisor_id, status }
export const obterEstagioAtual = (aluno_id) =>
  api.get("/estagio-atual", { params: { aluno_id } });

// ---- Diário de bordo ----
// GET devolve: { id, descricao, horas_dedicadas, data_registro }
export const listarAtividades = (estagio_id) =>
  api.get("/atividades", { params: { estagio_id } });

// Regra do backend: horas_dedicadas deve ser entre 1 e 8.
export const registrarAtividade = (dados) =>
  api.post("/atividades", dados); // { estagio_id, descricao, horas_dedicadas, data_registro }

export const editarAtividade = (dados) =>
  api.put("/atividades", dados); // { id, descricao, horas_dedicadas, data_registro }

export const eliminarAtividade = (id) =>
  api.delete("/atividades", { params: { id } });

// ---- Avaliações ----
// GET devolve: { id, nota, feedback, data_avaliacao }
export const listarAvaliacoes = (estagio_id) =>
  api.get("/avaliacoes", { params: { estagio_id } });

export const lancarAvaliacao = (dados) =>
  api.post("/avaliacoes", dados); // { estagio_id, nota (0-10), feedback, data_avaliacao }

// ---- Documentos (multipart/form-data) ----
// GET devolve: { id, nome_ficheiro, caminho_ficheiro, tipo_documento, data_upload }
export const listarDocumentos = (estagio_id) =>
  api.get("/documentos", { params: { estagio_id } });

export const enviarDocumento = (estagio_id, tipo_documento, arquivo) => {
  const form = new FormData();
  form.append("estagio_id", estagio_id);
  form.append("tipo_documento", tipo_documento); // "contrato" | "relatorio" | "anexo"
  form.append("arquivo", arquivo);
  return api.post("/documentos", form, {
    headers: { "Content-Type": "multipart/form-data" }
  });
};

// Monta a URL pública de um documento (caminho_ficheiro vem como "uploads/xxx.pdf";
// o proxy do Vite redireciona /uploads para o backend)
export const urlDocumento = (caminho_ficheiro) =>
  caminho_ficheiro ? "/" + String(caminho_ficheiro).replace(/^\/+/, "") : null;

// Extrai a lista de um retorno que pode vir como array direto ou { data: [...] }
export function extrairLista(resposta) {
  if (Array.isArray(resposta.data)) return resposta.data;
  if (Array.isArray(resposta.data?.data)) return resposta.data.data;
  return null;
}

// Extrai a mensagem de erro no formato do backend ({ "error": "..." })
export function extrairErro(err, padrao) {
  return (
    err?.response?.data?.error ||
    err?.response?.data?.erro ||
    err?.response?.data?.mensagem ||
    err?.response?.data?.message ||
    padrao
  );
}

export default api;
