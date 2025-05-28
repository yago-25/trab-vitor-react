import { useEffect, useState } from "react";
import { api } from "../services/api";
import "./../styles/VendasAdmin.css";
import { useNavigate } from "react-router-dom";
import {
  FaSearch,
  FaTrash,
  FaSignOutAlt,
  FaUserCircle,
  FaArrowLeft,
  FaShoppingBag,
  FaCalendarAlt,
  FaUser,
} from "react-icons/fa";

function VendasAdmin() {
  const navigate = useNavigate();
  const nomeUsuario = localStorage.getItem("NOME_USUARIO");

  const [vendas, setVendas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("TOKEN_USUARIO");
    localStorage.removeItem("NOME_USUARIO");
    navigate("/login");
  };

  useEffect(() => {
    carregarVendas();
  }, []);

  const carregarVendas = async () => {
    try {
      const response = await api.get("/venda");
      setVendas(response.data);
    } catch (error) {
      console.error("Erro ao carregar vendas:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteVenda = async (venda) => {
    if (window.confirm("Tem certeza que deseja excluir esta venda?")) {
      try {
        await api.delete("/venda", { data: { id: venda._id } });
        carregarVendas();
      } catch (error) {
        console.error("Erro ao excluir venda:", error);
      }
    }
  };

  const formatarData = (data) => {
    return new Date(data).toLocaleDateString("pt-BR");
  };

  const calcularTotalVenda = (produtos) => {
    return produtos.reduce((total, produto) => {
      return total + produto.quantidade * produto.preco;
    }, 0);
  };

  const vendasFiltradas = vendas.filter((venda) =>
    venda.nomeCliente.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="vendas-admin-container">
      <header className="admin-header">
        <div className="header-content">
          <div className="header-left">
            <button className="back-button" onClick={() => navigate("/painel")}>
              <FaArrowLeft />
              <span>Voltar</span>
            </button>
            <h1 className="admin-title">Relatório de Vendas</h1>
          </div>
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

      <main className="admin-main">
        <div className="admin-actions">
          <div className="search-filter-group">
            <div className="search-bar-admin">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="Buscar vendas por cliente..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        {loading ? (
          <div className="loading">
            <div className="loading-spinner"></div>
            <p>Carregando vendas...</p>
          </div>
        ) : (
          <>
            {vendasFiltradas.length === 0 ? (
              <div className="no-results">
                <FaShoppingBag className="no-results-icon" />
                <p>Nenhuma venda encontrada</p>
              </div>
            ) : (
              <div className="vendas-grid">
                {vendasFiltradas.map((venda) => (
                  <div key={venda._id} className="venda-card">
                    <div className="venda-header">
                      <div className="venda-cliente">
                        <FaUser className="venda-icon" />
                        <h3>{venda.nomeCliente}</h3>
                      </div>
                      <div className="venda-data">
                        <FaCalendarAlt className="venda-icon" />
                        <span>{formatarData(venda.data)}</span>
                      </div>
                    </div>
                    <div className="venda-produtos">
                      <table>
                        <thead>
                          <tr>
                            <th>Produto</th>
                            <th>Qtd</th>
                            <th>Preço</th>
                            <th>Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          {venda.produtos.map((produto, index) => (
                            <tr key={index}>
                              <td>{produto.nome}</td>
                              <td>{produto.quantidade}</td>
                              <td>R$ {produto.preco.toFixed(2)}</td>
                              <td>
                                R${" "}
                                {(produto.quantidade * produto.preco).toFixed(
                                  2
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="venda-footer">
                      <div className="venda-total">
                        <strong>Total:</strong>
                        <span>
                          R$ {calcularTotalVenda(venda.produtos).toFixed(2)}
                        </span>
                      </div>
                      <button
                        className="delete-btn"
                        onClick={() => handleDeleteVenda(venda)}
                      >
                        <FaTrash />
                        <span>Excluir</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default VendasAdmin;
