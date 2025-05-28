import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import RotaAutenticada from "./RotaProtegida";
import Login from "./pages/Login";
import Painel from "./pages/Painel";
import Register from "./pages/Registrar";
import ProdutosAdmin from "./pages/ProdutosAdmin";
import CategoriasAdmin from "./pages/CategoriasAdmin";
import VendasAdmin from "./pages/VendasAdmin";
import Carrinho from "./pages/Carrinho";
import Agradecimento from "./pages/Agradecimento";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/registrar" element={<Register />} />
      <Route path="/carrinho" element={<Carrinho />} />
      <Route path="/agradecimento" element={<Agradecimento />} />
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
      <Route
        path="/admin/categorias"
        element={
          <RotaAutenticada>
            <CategoriasAdmin />
          </RotaAutenticada>
        }
      />
      <Route
        path="/admin/vendas"
        element={
          <RotaAutenticada>
            <VendasAdmin />
          </RotaAutenticada>
        }
      />
    </Routes>
  );
}

export default App;
