import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Vagas from "./pages/Vagas";
import Candidaturas from "./pages/Candidaturas";
import DiarioBordo from "./pages/DiarioBordo";
import Perfil from "./pages/Perfil";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/vagas" element={<Vagas />} />
        <Route path="/candidaturas" element={<Candidaturas />} />
        <Route path="/diario" element={<DiarioBordo />} />
        <Route path="/perfil" element={<Perfil />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;