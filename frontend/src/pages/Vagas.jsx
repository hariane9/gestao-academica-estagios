import MainLayout from "../components/MainLayout";
import CardVaga from "../components/CardVaga";
import { vagas } from "../services/mockData";

function Vagas() {
  return (
    <MainLayout>
      <h1>Vagas Disponíveis</h1>

      {vagas.map((vaga) => (
        <CardVaga
          key={vaga.id}
          vaga={vaga}
        />
      ))}
    </MainLayout>
  );
}

export default Vagas;