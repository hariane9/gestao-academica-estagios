import { useState } from "react";
import MainLayout from "../components/MainLayout";
import CardVaga from "../components/CardVaga";
import Icon from "../components/Icon";
import { useApp } from "../context/AppContext";

function Vagas() {
  const { vagas } = useApp();
  const [filtroArea, setFiltroArea] = useState("Todas");
  const [busca, setBusca] = useState("");

  const areas = ["Todas", ...Array.from(new Set(vagas.map((v) => v.area)))];

  const vagasFiltradas = vagas.filter(
    (v) =>
      (filtroArea === "Todas" || v.area === filtroArea) &&
      (v.empresa.toLowerCase().includes(busca.toLowerCase()) ||
        v.area.toLowerCase().includes(busca.toLowerCase()))
  );

  return (
    <MainLayout>
      <div style={{ animation: "fadeIn 0.3s ease" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginBottom: "20px",
            overflowX: "auto",
            paddingBottom: "4px"
          }}
        >
          {areas.map((area) => (
            <button
              key={area}
              onClick={() => setFiltroArea(area)}
              className={"chip" + (area === filtroArea ? " active" : "")}
            >
              {area}
            </button>
          ))}
        </div>

        <div style={{ position: "relative", maxWidth: "420px", marginBottom: "24px" }}>
          <div
            style={{
              position: "absolute",
              left: "14px",
              top: "50%",
              transform: "translateY(-50%)",
              color: "#94A3B8"
            }}
          >
            <Icon icon="search" size={17} color="#94A3B8" />
          </div>
          <input
            type="text"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Buscar por empresa ou área..."
            style={{
              width: "100%",
              padding: "11px 14px 11px 40px",
              borderRadius: "10px",
              border: "1px solid #E2E8F0",
              fontSize: "14px",
              background: "#fff"
            }}
          />
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill,minmax(320px,1fr))",
            gap: "20px"
          }}
        >
          {vagasFiltradas.map((vaga) => (
            <CardVaga key={vaga.id} vaga={vaga} />
          ))}
        </div>
      </div>
    </MainLayout>
  );
}

export default Vagas;
