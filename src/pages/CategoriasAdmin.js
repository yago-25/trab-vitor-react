import { useEffect, useState } from "react";
import { api } from "../services/api";
import "./../styles/CategoriasAdmin.css";
import { useNavigate } from "react-router-dom";
import {
  FaPlus,
  FaSearch,
  FaEdit,
  FaTrash,
  FaSignOutAlt,
  FaUserCircle,
  FaArrowLeft,
  FaTags,
} from "react-icons/fa";

function CategoriasAdmin() {
  const navigate = useNavigate();
  const nomeUsuario = localStorage.getItem("NOME_USUARIO");

  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingCategoria, setEditingCategoria] = useState(null);
  const [newCategoria, setNewCategoria] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("TOKEN_USUARIO");
    localStorage.removeItem("NOME_USUARIO");
    navigate("/login");
  };

  useEffect(() => {
    carregarCategorias();
  }, []);

  const carregarCategorias = async () => {
    try {
      const response = await api.get("/categorias");
      setCategorias(response.data);
    } catch (error) {
      console.error("Erro ao carregar categorias:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveCategoria = async () => {
    try {
      if (editingCategoria) {
        await api.put("/categorias", {
          id: editingCategoria._id,
          nome_categoria: newCategoria,
        });
      } else {
        await api.post("/categorias", { nome_categoria: newCategoria });
      }
      setShowModal(false);
      setEditingCategoria(null);
      setNewCategoria("");
      carregarCategorias();
    } catch (error) {
      console.error("Erro ao salvar categoria:", error);
    }
  };

  const handleDeleteCategoria = async (categoria) => {
    if (window.confirm("Tem certeza que deseja excluir esta categoria?")) {
      try {
        await api.delete("/categorias", { data: { id: categoria._id } });
        carregarCategorias();
      } catch (error) {
        console.error("Erro ao excluir categoria:", error);
      }
    }
  };

  const handleEdit = (categoria) => {
    setEditingCategoria(categoria);
    setNewCategoria(categoria.nome);
    setShowModal(true);
  };

  const categoriasFiltradas = categorias.filter((categoria) =>
    categoria.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="categorias-admin-container">
      <header className="admin-header">
        <div className="header-content">
          <div className="header-left">
            <button className="back-button" onClick={() => navigate("/painel")}>
              <FaArrowLeft />
              <span>Voltar</span>
            </button>
            <h1 className="admin-title">Gerenciar Categorias</h1>
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
                placeholder="Buscar categorias..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="action-buttons">
              <button
                className="add-category-btn"
                onClick={() => {
                  setEditingCategoria(null);
                  setNewCategoria("");
                  setShowModal(true);
                }}
              >
                <FaPlus />
                <span>Nova Categoria</span>
              </button>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="loading">
            <div className="loading-spinner"></div>
            <p>Carregando categorias...</p>
          </div>
        ) : (
          <>
            {categoriasFiltradas.length === 0 ? (
              <div className="no-results">
                <FaTags className="no-results-icon" />
                <p>Nenhuma categoria encontrada</p>
              </div>
            ) : (
              <div className="categorias-grid">
                {categoriasFiltradas.map((categoria) => (
                  <div key={categoria._id} className="categoria-card">
                    <div className="categoria-info">
                      <FaTags className="categoria-icon" />
                      <h3 className="categoria-nome">
                        {categoria.nome.charAt(0).toUpperCase() +
                          categoria.nome.slice(1)}
                      </h3>
                    </div>
                    <div className="categoria-actions">
                      <button
                        className="edit-btn"
                        onClick={() => handleEdit(categoria)}
                      >
                        <FaEdit />
                        <span>Editar</span>
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => handleDeleteCategoria(categoria)}
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

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>{editingCategoria ? "Editar Categoria" : "Nova Categoria"}</h2>
            <input
              type="text"
              placeholder="Nome da categoria"
              value={newCategoria}
              onChange={(e) => setNewCategoria(e.target.value)}
              className="modal-input"
            />
            <div className="modal-actions">
              <button
                className="modal-cancel"
                onClick={() => {
                  setShowModal(false);
                  setEditingCategoria(null);
                  setNewCategoria("");
                }}
              >
                Cancelar
              </button>
              <button
                className="modal-save"
                onClick={handleSaveCategoria}
                disabled={!newCategoria.trim()}
              >
                {editingCategoria ? "Salvar" : "Criar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CategoriasAdmin;
