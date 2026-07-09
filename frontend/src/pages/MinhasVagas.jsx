import { useState } from "react";
import MainLayout from "../components/MainLayout";
import Icon from "../components/Icon";
import ModalNovaVaga from "../components/ModalNovaVaga";
import { useApp } from "../context/AppContext";

const estiloLabel = {
  display: "block",
  fontSize: "13px",
  fontWeight: 600,
  color: "#334155",
  marginBottom: "6px"
};

const estiloInput = {
  width: "100%",
  padding: "11px 14px",
  borderRadius: "9px",
  border: "1px solid #E2E8F0",
  fontSize: "14px",
  marginBottom: "14px",
  background: "#F8FAFC"
};

// Formulário exibido enquanto a empresa ainda não completou o vínculo
function FormularioVinculo() {
  const { vincularMinhaEmpresa } = useApp();
  const [form, setForm] = useState({ nome_comercial: "", nif: "", morada: "" });
  const [enviando, setEnviando] = useState(false);

  const atualizar = (campo) => (e) => setForm((f) => ({ ...f, [campo]: e.target.value }));

  const salvar = async (e) => {
    e.preventDefault();
    if (!form.nome_comercial.trim() || !form.nif.trim()) return;
    setEnviando(true);
    await vincularMinhaEmpresa(form);
    setEnviando(false);
  };

  return (
    <form
      onSubmit={salvar}
      style={{
        background: "#fff",
        border: "1px solid #E2E8F0",
        borderRadius: "14px",
        padding: "28px",
        maxWidth: "520px",
        animation: "fadeIn 0.3s ease"
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
        <Icon icon="building" size={20} color="#5C8600" />
        <div style={{ fontSize: "17px", fontWeight: 800, color: "#1E293B" }}>
          Complete o perfil da empresa
        </div>
      </div>
      <div style={{ fontSize: "13.5px", color: "#64748B", marginBottom: "22px", lineHeight: 1.5 }}>
        Para publicar vagas, primeiro informe os dados da sua empresa. Isso só precisa ser feito uma vez.
      </div>

      <label style={estiloLabel}>Nome comercial</label>
      <input
        type="text"
        value={form.nome_comercial}
        onChange={atualizar("nome_comercial")}
        placeholder="Ex: Tech Solutions Ltda"
        style={estiloInput}
      />

      <label style={estiloLabel}>CNPJ / NIF</label>
      <input
        type="text"
        value={form.nif}
        onChange={atualizar("nif")}
        placeholder="Ex: 12.345.678/0001-90"
        style={estiloInput}
      />

      <label style={estiloLabel}>Endereço (opcional)</label>
      <input
        type="text"
        value={form.morada}
        onChange={atualizar("morada")}
        placeholder="Ex: Av. Epitácio Pessoa, 1000 — João Pessoa/PB"
        style={{ ...estiloInput, marginBottom: "22px" }}
      />

      <button
        type="submit"
        disabled={enviando}
        className="btn-primary"
        style={{ width: "100%", padding: "13px", fontSize: "14.5px", opacity: enviando ? 0.7 : 1 }}
      >
        {enviando ? "Salvando..." : "Salvar dados da empresa"}
      </button>
    </form>
  );
}

function MinhasVagas() {
  const { vagas, minhaEmpresa } = useApp();
  const [modalAberto, setModalAberto] = useState(false);

  // Sem vínculo ainda: mostra o formulário de cadastro da empresa
  if (!minhaEmpresa) {
    return (
      <MainLayout>
        <FormularioVinculo />
      </MainLayout>
    );
  }

  const minhasVagas = vagas.filter((v) => v.empresa === minhaEmpresa.nome_comercial);

  return (
    <MainLayout>
      <div style={{ animation: "fadeIn 0.3s ease" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "12px",
            flexWrap: "wrap",
            marginBottom: "22px"
          }}
        >
          <div>
            <div style={{ fontSize: "16px", fontWeight: 800, color: "#1E293B" }}>
              {minhaEmpresa.nome_comercial}
            </div>
            <div style={{ fontSize: "13px", color: "#94A3B8" }}>
              {minhasVagas.length} vaga(s) publicada(s)
            </div>
          </div>
          <button
            onClick={() => setModalAberto(true)}
            className="btn-primary"
            style={{ padding: "11px 18px", fontSize: "14px" }}
          >
            <Icon icon="plus" size={17} color="#fff" />
            Nova Vaga
          </button>
        </div>

        {minhasVagas.length === 0 ? (
          <div
            style={{
              background: "#fff",
              border: "1px dashed #CBD5E1",
              borderRadius: "14px",
              padding: "40px",
              textAlign: "center",
              color: "#94A3B8",
              fontSize: "14px"
            }}
          >
            Nenhuma vaga publicada ainda. Clique em <b>Nova Vaga</b> para divulgar a primeira!
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill,minmax(320px,1fr))",
              gap: "20px"
            }}
          >
            {minhasVagas.map((vaga) => (
              <div
                key={vaga.id}
                style={{
                  background: "#fff",
                  border: "1px solid #E2E8F0",
                  borderRadius: "14px",
                  padding: "22px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px"
                }}
              >
                <div
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "10px",
                    background: "#E6F4EA",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  <Icon icon="briefcase" size={21} color="#5C8600" />
                </div>
                <div style={{ fontSize: "16px", fontWeight: 800, color: "#1E293B" }}>{vaga.area}</div>
                <div style={{ fontSize: "13.5px", color: "#64748B", lineHeight: 1.5 }}>
                  {vaga.descricao}
                </div>
                {vaga.requisitos && (
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "8px", fontSize: "13px", color: "#475569" }}>
                    <Icon icon="clipboardCheck" size={15} color="#94A3B8" />
                    <span>Requisitos: {vaga.requisitos}</span>
                  </div>
                )}
                {vaga.local && (
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "#475569" }}>
                    <Icon icon="mapPin" size={15} color="#94A3B8" />
                    {vaga.local}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {modalAberto && <ModalNovaVaga onClose={() => setModalAberto(false)} />}
    </MainLayout>
  );
}

export default MinhasVagas;
