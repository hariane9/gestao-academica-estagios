import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AppProvider } from "./context/AppContext";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import Documentos from "./pages/Documentos";
import Dashboard from "./pages/Dashboard";
import Vagas from "./pages/Vagas";
import Candidaturas from "./pages/Candidaturas";
import DiarioBordo from "./pages/DiarioBordo";
import Avaliacoes from "./pages/Avaliacoes";
import Estagiarios from "./pages/Estagiarios";
import Perfil from "./pages/Perfil";

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/documentos" element={<Documentos />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/vagas" element={<Vagas />} />
          <Route path="/candidaturas" element={<Candidaturas />} />
          <Route path="/diario" element={<DiarioBordo />} />
          <Route path="/avaliacoes" element={<Avaliacoes />} />
          <Route path="/estagiarios" element={<Estagiarios />} />
          <Route path="/perfil" element={<Perfil />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
