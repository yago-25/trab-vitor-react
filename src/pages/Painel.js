import React from "react";
import { useNavigate } from "react-router-dom";
import "./../styles/Painel.css";

function Painel() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("TOKEN_USUARIO");
    localStorage.removeItem("NOME_USUARIO");
    navigate("/login");
  };

  return (
    <div className="painel-container">
      <header className="painel-header">
        <h1 className="painel-title">Painel Administrativo</h1>
        <button className="logout-button" onClick={handleLogout}>
          Sair
        </button>
      </header>

      <main className="painel-main">
        <button
          className="painel-btn"
          onClick={() => navigate("/admin/produtos")}
        >
          🛍️ Gerenciar Produtos
        </button>
        <button
          className="painel-btn"
          onClick={() => navigate("/admin/categorias")}
        >
          🗂️ Gerenciar Categorias
        </button>
        <button
          className="painel-btn"
          onClick={() => navigate("/admin/vendas")}
        >
          📦 Ver Vendas
        </button>
      </main>
    </div>
  );
}

export default Painel;
