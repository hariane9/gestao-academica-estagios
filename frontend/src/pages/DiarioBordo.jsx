import { useState } from "react";
import MainLayout from "../components/MainLayout";
import Icon from "../components/Icon";
import ModalNovoRegistro from "../components/ModalNovoRegistro";
import { useApp } from "../context/AppContext";

const MESES = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];

function construirCalendario(diario) {
  const hoje = new Date();
  const ano = hoje.getFullYear();
  const mes = hoje.getMonth();
  const primeiroDia = new Date(ano, mes, 1).getDay();
  const diasNoMes = new Date(ano, mes + 1, 0).getDate();

  const diasComRegistro = new Set(
    diario
      .filter((d) => {
        const partes = d.data.split("/");
        return parseInt(partes[1], 10) === mes + 1 && parseInt(partes[2], 10) === ano;
      })
      .map((d) => parseInt(d.data.split("/")[0], 10))
  );

  const celulas = [];
  for (let i = 0; i < primeiroDia; i++) celulas.push({ vazia: true, chave: "v" + i });
  for (let dia = 1; dia <= diasNoMes; dia++) {
    const ehHoje = dia === hoje.getDate();
    const temRegistro = diasComRegistro.has(dia);
    let bg = "transparent";
    let cor = "#334155";
    if (ehHoje) {
      bg = "#5C8600";
      cor = "#fff";
    } else if (temRegistro) {
      bg = "#E6F4EA";
      cor = "#4F7300";
    }
    celulas.push({ vazia: false, chave: "d" + dia, dia, bg, cor });
  }

  return { rotuloMes: MESES[mes] + " " + ano, celulas };
}

function DiarioBordo() {
  const { diario, isMobile, removerRegistroDiario } = useApp();
  const [modalAberto, setModalAberto] = useState(false);
  const [registroEditando, setRegistroEditando] = useState(null);

  const calendario = construirCalendario(diario);

  return (
    <MainLayout>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1.6fr 1fr",
          gap: "24px",
          alignItems: "start",
          animation: "fadeIn 0.3s ease"
        }}
      >
        <div>
          <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "18px" }}>
            <button
              onClick={() => setModalAberto(true)}
              className="btn-primary"
              style={{ padding: "11px 18px", fontSize: "14px" }}
            >
              <Icon icon="plus" size={17} color="#fff" />
              Novo Registro
            </button>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            {diario.map((item) => (
              <div
                key={item.id}
                style={{
                  background: "#fff",
                  border: "1px solid #E2E8F0",
                  borderRadius: "14px",
                  padding: "20px"
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "8px"
                  }}
                >
                  <div style={{ fontSize: "15px", fontWeight: 800, color: "#1E293B" }}>{item.atividade}</div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <div
                      style={{
                        fontSize: "12.5px",
                        fontWeight: 700,
                        color: "#5C8600",
                        background: "#E6F4EA",
                        padding: "4px 10px",
                        borderRadius: "999px"
                      }}
                    >
                      {item.horas}h
                    </div>
                    <button
                      onClick={() => setRegistroEditando(item)}
                      title="Editar registro"
                      style={{
                        background: "#F5F7FA",
                        border: "none",
                        borderRadius: "7px",
                        width: "26px",
                        height: "26px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        color: "#5C8600"
                      }}
                    >
                      <Icon icon="edit" size={13} color="currentColor" />
                    </button>
                    <button
                      onClick={() => removerRegistroDiario(item.id)}
                      title="Excluir registro"
                      style={{
                        background: "#F5F7FA",
                        border: "none",
                        borderRadius: "7px",
                        width: "26px",
                        height: "26px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        color: "#94A3B8"
                      }}
                    >
                      <Icon icon="x" size={13} color="currentColor" />
                    </button>
                  </div>
                </div>
                <div style={{ fontSize: "13px", color: "#94A3B8", marginBottom: item.descricao ? "10px" : 0 }}>{item.data}</div>
                {item.descricao && (
                  <div style={{ fontSize: "13.5px", color: "#475569", lineHeight: 1.5 }}>{item.descricao}</div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            background: "#fff",
            border: "1px solid #E2E8F0",
            borderRadius: "14px",
            padding: "22px",
            position: "sticky",
            top: 0
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
            <Icon icon="calendar" size={18} color="#5C8600" />
            <div style={{ fontSize: "15px", fontWeight: 800, color: "#1E293B" }}>{calendario.rotuloMes}</div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: "6px", marginBottom: "6px" }}>
            {["D", "S", "T", "Q", "Q", "S", "S"].map((d, i) => (
              <div key={i} style={{ textAlign: "center", fontSize: "11px", fontWeight: 700, color: "#94A3B8" }}>
                {d}
              </div>
            ))}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: "6px" }}>
            {calendario.celulas.map((celula) =>
              celula.vazia ? (
                <div key={celula.chave} />
              ) : (
                <div
                  key={celula.chave}
                  style={{
                    aspectRatio: "1",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "8px",
                    fontSize: "12.5px",
                    fontWeight: 600,
                    background: celula.bg,
                    color: celula.cor
                  }}
                >
                  {celula.dia}
                </div>
              )
            )}
          </div>

          <div
            style={{
              marginTop: "18px",
              paddingTop: "16px",
              borderTop: "1px solid #F1F5F9",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "12.5px",
              color: "#64748B"
            }}
          >
            <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#5C8600" }} />
            Dias com registro de atividade
          </div>
        </div>
      </div>

      {(modalAberto || registroEditando) && (
        <ModalNovoRegistro
          registro={registroEditando}
          onClose={() => {
            setModalAberto(false);
            setRegistroEditando(null);
          }}
        />
      )}
    </MainLayout>
  );
}

export default DiarioBordo;
