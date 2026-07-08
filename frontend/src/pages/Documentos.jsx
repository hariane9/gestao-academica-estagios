import { useEffect, useRef, useState } from "react";
import MainLayout from "../components/MainLayout";
import Icon from "../components/Icon";
import { useApp } from "../context/AppContext";
import { listarDocumentos, enviarDocumento, extrairLista, extrairErro, urlDocumento } from "../services/api";
import { isoParaBR } from "../utils/helpers";

const estiloLabel = { display: "block", fontSize: "13px", fontWeight: 600, color: "#334155", marginBottom: "6px" };
const estiloTh = { textAlign: "left", padding: "14px 20px", fontSize: "12.5px", fontWeight: 700, color: "#64748B", textTransform: "uppercase" };

const TIPOS_DOCUMENTO = [
  { valor: "contrato", rotulo: "Contrato" },
  { valor: "relatorio", rotulo: "Relatório" },
  { valor: "anexo", rotulo: "Anexo" }
];

const rotuloTipo = (valor) => {
  const t = TIPOS_DOCUMENTO.find((x) => x.valor === valor);
  return t ? t.rotulo : valor || "Documento";
};

function Documentos() {
  const { showToast, estagioId } = useApp();
  const [documentos, setDocumentos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erroLista, setErroLista] = useState(false);
  const [tipoDocumento, setTipoDocumento] = useState("contrato");
  const [arquivo, setArquivo] = useState(null);
  const [enviando, setEnviando] = useState(false);
  const [versaoLista, setVersaoLista] = useState(0);
  const inputArquivoRef = useRef(null);

  const recarregar = () => setVersaoLista((v) => v + 1);

  useEffect(() => {
    let ativo = true;
    (async () => {
      try {
        const lista = extrairLista(await listarDocumentos(estagioId));
        if (ativo) {
          setDocumentos(lista || []);
          setErroLista(false);
        }
      } catch (e) {
        console.warn("GET /documentos falhou.", e);
        if (ativo) setErroLista(true);
      } finally {
        if (ativo) setCarregando(false);
      }
    })();
    return () => {
      ativo = false;
    };
  }, [versaoLista, estagioId]);

  const selecionarArquivo = (e) => {
    const f = e.target.files && e.target.files[0];
    if (f && !f.name.toLowerCase().endsWith(".pdf")) {
      showToast("Apenas arquivos PDF são aceitos.");
      e.target.value = "";
      setArquivo(null);
      return;
    }
    setArquivo(f || null);
  };

  const enviar = async (e) => {
    e.preventDefault();
    if (!arquivo) {
      showToast("Selecione um arquivo PDF para enviar.");
      return;
    }
    setEnviando(true);
    try {
      await enviarDocumento(estagioId, tipoDocumento, arquivo);
      showToast("Documento enviado com sucesso.");
      setArquivo(null);
      if (inputArquivoRef.current) inputArquivoRef.current.value = "";
      recarregar();
    } catch (err) {
      console.warn("POST /documentos falhou.", err);
      showToast(extrairErro(err, "Erro ao enviar documento. Verifique o servidor."));
    } finally {
      setEnviando(false);
    }
  };

  return (
    <MainLayout>
      <div style={{ maxWidth: "860px", animation: "fadeIn 0.3s ease" }}>
        {/* Formulário de upload */}
        <form
          onSubmit={enviar}
          style={{ background: "#fff", border: "1px solid #E2E8F0", borderRadius: "14px", padding: "24px", marginBottom: "24px" }}
        >
          <div style={{ fontSize: "16px", fontWeight: 800, color: "#1E293B", marginBottom: "18px" }}>
            Enviar documento
          </div>

          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", alignItems: "flex-end" }}>
            <div style={{ flex: "1 1 180px" }}>
              <label style={estiloLabel}>Tipo de documento</label>
              <select
                value={tipoDocumento}
                onChange={(e) => setTipoDocumento(e.target.value)}
                style={{ width: "100%", padding: "11px 14px", borderRadius: "9px", border: "1px solid #E2E8F0", fontSize: "14px", background: "#F8FAFC" }}
              >
                {TIPOS_DOCUMENTO.map((t) => (
                  <option key={t.valor} value={t.valor}>
                    {t.rotulo}
                  </option>
                ))}
              </select>
            </div>

            <div style={{ flex: "2 1 260px" }}>
              <label style={estiloLabel}>Arquivo (PDF)</label>
              <input
                ref={inputArquivoRef}
                type="file"
                accept="application/pdf,.pdf"
                onChange={selecionarArquivo}
                style={{ width: "100%", padding: "9px", borderRadius: "9px", border: "1px solid #E2E8F0", fontSize: "13.5px", background: "#F8FAFC" }}
              />
            </div>

            <button
              type="submit"
              disabled={enviando}
              className="btn-primary"
              style={{ padding: "11px 20px", fontSize: "14px", opacity: enviando ? 0.7 : 1 }}
            >
              <Icon icon="download" size={16} color="#fff" />
              {enviando ? "Enviando..." : "Enviar"}
            </button>
          </div>
        </form>

        {/* Lista de documentos */}
        <div style={{ background: "#fff", border: "1px solid #E2E8F0", borderRadius: "14px", overflowX: "auto" }}>
          {carregando ? (
            <div style={{ padding: "28px", fontSize: "14px", color: "#94A3B8", textAlign: "center" }}>
              Carregando documentos...
            </div>
          ) : erroLista ? (
            <div style={{ padding: "28px", fontSize: "14px", color: "#966400", textAlign: "center" }}>
              Não foi possível carregar os documentos. Verifique se o backend está rodando.
            </div>
          ) : documentos.length === 0 ? (
            <div style={{ padding: "28px", fontSize: "14px", color: "#94A3B8", textAlign: "center" }}>
              Nenhum documento enviado ainda.
            </div>
          ) : (
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "#F8FAFC", borderBottom: "1px solid #E2E8F0" }}>
                  <th style={estiloTh}>Arquivo</th>
                  <th style={estiloTh}>Tipo</th>
                  <th style={estiloTh}>Data de envio</th>
                </tr>
              </thead>
              <tbody>
                {documentos.map((doc, i) => (
                  <tr key={doc.id ?? i} style={{ borderBottom: "1px solid #F1F5F9" }}>
                    <td style={{ padding: "16px 20px", fontSize: "14px", fontWeight: 600, color: "#1E293B" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <Icon icon="clipboardCheck" size={17} color="#5C8600" />
                        {doc.caminho_ficheiro ? (
                          <a href={urlDocumento(doc.caminho_ficheiro)} target="_blank" rel="noreferrer">
                            {doc.nome_ficheiro || "Documento " + (i + 1)}
                          </a>
                        ) : (
                          doc.nome_ficheiro || "Documento " + (i + 1)
                        )}
                      </div>
                    </td>
                    <td style={{ padding: "16px 20px" }}>
                      <span style={{ display: "inline-block", padding: "5px 12px", borderRadius: "999px", fontSize: "12.5px", fontWeight: 700, background: "#E6F4EA", color: "#4F7300" }}>
                        {rotuloTipo(doc.tipo_documento)}
                      </span>
                    </td>
                    <td style={{ padding: "16px 20px", fontSize: "13.5px", color: "#475569" }}>
                      {isoParaBR(doc.data_upload || doc.created_at || doc.data) || "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </MainLayout>
  );
}

export default Documentos;
