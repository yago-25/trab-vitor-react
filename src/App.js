import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import RotaAutenticada from "./RotaProtegida";
import Login from "./pages/Login";
import Painel from "./pages/Painel";
import Register from "./pages/Registrar";
import ProdutosAdmin from "./pages/ProdutosAdmin";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/registrar" element={<Register />} />
      <Route
        path="/painel"
        element={
          <RotaAutenticada>
            <Painel />
          </RotaAutenticada>
        }
      />
      <Route
        path="/admin/produtos"
        element={
          <RotaAutenticada>
            <ProdutosAdmin />
          </RotaAutenticada>
        }
      />
    </Routes>
  );
}

export default App;
