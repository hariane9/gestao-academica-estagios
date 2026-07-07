function CardVaga({ vaga }) {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "15px",
        marginBottom: "15px"
      }}
    >
      <h3>{vaga.titulo}</h3>

      <p>
        <strong>Empresa:</strong> {vaga.empresa}
      </p>

      <p>
        <strong>Local:</strong> {vaga.local}
      </p>

      <p>
        <strong>Bolsa:</strong> {vaga.bolsa}
      </p>
    </div>
  );
}

export default CardVaga;