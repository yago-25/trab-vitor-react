import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./../styles/Painel.css";
import {
  FaBox,
  FaList,
  FaChartBar,
  FaSignOutAlt,
  FaUserCircle,
} from "react-icons/fa";
import { api } from "../services/api";

function Painel() {
  const navigate = useNavigate();
  const nomeUsuario = localStorage.getItem("NOME_USUARIO");
  const [stats, setStats] = useState({
    totalProdutos: 0,
    totalVendas: 0,
    totalCategorias: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    try {
      const [produtosResponse, vendasResponse, categoriasResponse] =
        await Promise.all([
          api.get("/produtos/010623008"),
          api.get("/venda"),
          api.get("/categorias"),
        ]);

      setStats({
        totalProdutos: produtosResponse.data.length,
        totalVendas: vendasResponse.data.length,
        totalCategorias: categoriasResponse.data.length,
      });
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("TOKEN_USUARIO");
    localStorage.removeItem("NOME_USUARIO");
    navigate("/login");
  };

  return (
    <div className="painel-container">
      <header className="painel-header">
        <div className="header-content">
          <h1 className="painel-title">Painel Administrativo</h1>
          <div className="user-info">
            <FaUserCircle className="user-icon" />
            <span className="user-name">{nomeUsuario}</span>
            <button className="logout-button" onClick={handleLogout}>
              <FaSignOutAlt />
              <span>Sair</span>
            </button>
          </div>
        </div>
      </header>

      <main className="painel-main">
        <div className="dashboard-stats">
          {loading ? (
            <>
              <div className="stat-card loading">
                <div className="loading-spinner"></div>
              </div>
              <div className="stat-card loading">
                <div className="loading-spinner"></div>
              </div>
              <div className="stat-card loading">
                <div className="loading-spinner"></div>
              </div>
            </>
          ) : (
            <>
              <div className="stat-card">
                <h3>Total de Produtos</h3>
                <p className="stat-number">{stats.totalProdutos}</p>
              </div>
              <div className="stat-card">
                <h3>Categorias</h3>
                <p className="stat-number">{stats.totalCategorias}</p>
              </div>
              <div className="stat-card">
                <h3>Vendas do Mês</h3>
                <p className="stat-number">{stats.totalVendas}</p>
              </div>
            </>
          )}
        </div>

        <div className="dashboard-actions">
          <button
            className="action-card"
            onClick={() => navigate("/admin/produtos")}
          >
            <FaBox className="action-icon" />
            <div className="action-content">
              <h3>Gerenciar Produtos</h3>
              <p>Adicione, edite ou remova produtos da loja</p>
            </div>
          </button>

          <button
            className="action-card"
            onClick={() => navigate("/admin/categorias")}
          >
            <FaList className="action-icon" />
            <div className="action-content">
              <h3>Gerenciar Categorias</h3>
              <p>Organize as categorias dos produtos</p>
            </div>
          </button>

          <button
            className="action-card"
            onClick={() => navigate("/admin/vendas")}
          >
            <FaChartBar className="action-icon" />
            <div className="action-content">
              <h3>Relatório de Vendas</h3>
              <p>Visualize o desempenho das vendas</p>
            </div>
          </button>
        </div>

        <div className="quick-actions">
          <button className="quick-action-btn" onClick={() => navigate("/")}>
            Visualizar Loja
          </button>
          <button
            className="quick-action-btn"
            onClick={() => navigate("/admin/produtos")}
          >
            Novo Produto
          </button>
        </div>
      </main>
    </div>
  );
}

export default Painel;
