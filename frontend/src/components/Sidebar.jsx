import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div>
      <h3>Estágios</h3>

      <ul>
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>

        <li>
          <Link to="/vagas">Vagas</Link>
        </li>

        <li>
          <Link to="/candidaturas">Candidaturas</Link>
        </li>

        <li>
          <Link to="/diario">Diário</Link>
        </li>

        <li>
          <Link to="/perfil">Perfil</Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;