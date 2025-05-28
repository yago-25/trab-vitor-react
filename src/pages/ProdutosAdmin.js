import { useEffect, useState } from "react";
import { api } from "../services/api";
import "./../styles/ProdutosAdmin.css";
import { useNavigate } from "react-router-dom";
import {
  FaPlus,
  FaSearch,
  FaEdit,
  FaTrash,
  FaSignOutAlt,
  FaUserCircle,
  FaArrowLeft,
} from "react-icons/fa";

function ProdutosAdmin() {
  const navigate = useNavigate();
  const nomeUsuario = localStorage.getItem("NOME_USUARIO");

  const [produtos, setProdutos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("todos");
  const [showModal, setShowModal] = useState(false);
  const [editingProduto, setEditingProduto] = useState(null);
  const [novoProduto, setNovoProduto] = useState({
    nome: "",
    quantidade: 0,
    preco: 0,
    categoria: "",
    descricao: "",
    imagem: "",
  });

  const handleLogout = () => {
    localStorage.removeItem("TOKEN_USUARIO");
    localStorage.removeItem("NOME_USUARIO");
    navigate("/login");
  };

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    try {
      const [produtosResponse, categoriasResponse] = await Promise.all([
        api.get("/produtos/010623008"),
        api.get("/categorias"),
      ]);
      setProdutos(produtosResponse.data);
      setCategorias(categoriasResponse.data);
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (produto) => {
    setEditingProduto(produto);
    setNovoProduto({
      nome: produto.nome,
      quantidade: produto.quantidade,
      preco: produto.preco,
      categoria: produto.categoria,
      descricao: produto.descricao,
      imagem: produto.imagem,
    });
    setShowModal(true);
  };

  const handleDelete = async (produto) => {
    if (window.confirm("Tem certeza que deseja excluir este produto?")) {
      try {
        await api.delete("/produtos", { data: { id: produto._id } });
        carregarDados();
      } catch (error) {
        console.error("Erro ao excluir produto:", error);
      }
    }
  };

  const handleSaveProduto = async () => {
    try {
      if (editingProduto) {
        await api.put("/produtos", {
          id: editingProduto._id,
          ...novoProduto,
        });
      } else {
        await api.post("/produtos", novoProduto);
      }
      setShowModal(false);
      setNovoProduto({
        nome: "",
        quantidade: 0,
        preco: 0,
        categoria: "",
        descricao: "",
        imagem: "",
      });
      setEditingProduto(null);
      carregarDados();
    } catch (error) {
      console.error("Erro ao salvar produto:", error);
    }
  };

  const produtosFiltrados = produtos.filter((produto) => {
    const matchesSearch =
      produto.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      produto.descricao.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "todos" || produto.categoria === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="produtos-admin-container">
      <header className="admin-header">
        <div className="header-content">
          <div className="header-left">
            <button className="back-button" onClick={() => navigate("/painel")}>
              <FaArrowLeft />
              <span>Voltar</span>
            </button>
            <h1 className="admin-title">Gerenciar Produtos</h1>
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
                placeholder="Buscar produtos por nome ou descrição..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="action-buttons">
              <select
                className="category-filter"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="todos">Todas as categorias</option>
                {categorias?.map((cat) => (
                  <option key={cat._id} value={cat.nome}>
                    {cat.nome.charAt(0).toUpperCase() + cat.nome.slice(1)}
                  </option>
                ))}
              </select>

              <button
                className="add-product-btn"
                onClick={() => {
                  setEditingProduto(null);
                  setNovoProduto({
                    nome: "",
                    quantidade: 0,
                    preco: 0,
                    categoria: "",
                    descricao: "",
                    imagem: "",
                  });
                  setShowModal(true);
                }}
              >
                <FaPlus />
                <span>Novo Produto</span>
              </button>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="loading">
            <div className="loading-spinner"></div>
            <p>Carregando produtos...</p>
          </div>
        ) : (
          <>
            {produtosFiltrados.length === 0 ? (
              <div className="no-results">
                <p>Nenhum produto encontrado</p>
              </div>
            ) : (
              <div className="produtos-grid">
                {produtosFiltrados.map((produto) => (
                  <div key={produto._id} className="produto-card">
                    <img
                      src={produto.imagem}
                      alt={produto.nome}
                      className="produto-imagem"
                    />
                    <div className="produto-info">
                      <h3 className="produto-nome">{produto.nome}</h3>
                      <p className="produto-categoria">{produto.categoria}</p>
                      <p className="produto-preco">
                        R$ {produto.preco.toFixed(2)}
                      </p>
                      <p className="produto-estoque">
                        Estoque: {produto.quantidade} unidades
                      </p>
                    </div>
                    <div className="produto-actions">
                      <button
                        className="edit-btn"
                        onClick={() => handleEdit(produto)}
                      >
                        <FaEdit />
                        <span>Editar</span>
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(produto)}
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
            <h2>{editingProduto ? "Editar Produto" : "Novo Produto"}</h2>
            <div className="modal-form">
              <div className="form-group">
                <label>Nome do Produto</label>
                <input
                  type="text"
                  value={novoProduto.nome}
                  onChange={(e) =>
                    setNovoProduto({ ...novoProduto, nome: e.target.value })
                  }
                  className="modal-input"
                  placeholder="Digite o nome do produto"
                />
              </div>

              <div className="form-group">
                <label>Descrição</label>
                <textarea
                  value={novoProduto.descricao}
                  onChange={(e) =>
                    setNovoProduto({ ...novoProduto, descricao: e.target.value })
                  }
                  className="modal-input"
                  placeholder="Digite a descrição do produto"
                  rows="3"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Preço</label>
                  <input
                    type="number"
                    value={novoProduto.preco}
                    onChange={(e) =>
                      setNovoProduto({
                        ...novoProduto,
                        preco: Number(e.target.value),
                      })
                    }
                    className="modal-input"
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                  />
                </div>

                <div className="form-group">
                  <label>Quantidade</label>
                  <input
                    type="number"
                    value={novoProduto.quantidade}
                    onChange={(e) =>
                      setNovoProduto({
                        ...novoProduto,
                        quantidade: Number(e.target.value),
                      })
                    }
                    className="modal-input"
                    placeholder="0"
                    min="0"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Categoria</label>
                <select
                  value={novoProduto.categoria}
                  onChange={(e) =>
                    setNovoProduto({ ...novoProduto, categoria: e.target.value })
                  }
                  className="modal-input"
                >
                  <option value="">Selecione uma categoria</option>
                  {categorias.map((cat) => (
                    <option key={cat._id} value={cat.nome}>
                      {cat.nome.charAt(0).toUpperCase() + cat.nome.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>URL da Imagem</label>
                <input
                  type="text"
                  value={novoProduto.imagem}
                  onChange={(e) =>
                    setNovoProduto({ ...novoProduto, imagem: e.target.value })
                  }
                  className="modal-input"
                  placeholder="https://exemplo.com/imagem.jpg"
                />
              </div>
            </div>

            <div className="modal-actions">
              <button
                className="modal-cancel"
                onClick={() => {
                  setShowModal(false);
                  setNovoProduto({
                    nome: "",
                    quantidade: 0,
                    preco: 0,
                    categoria: "",
                    descricao: "",
                    imagem: "",
                  });
                  setEditingProduto(null);
                }}
              >
                Cancelar
              </button>
              <button
                className="modal-save"
                onClick={handleSaveProduto}
                disabled={
                  !novoProduto.nome ||
                  !novoProduto.categoria ||
                  novoProduto.preco <= 0
                }
              >
                {editingProduto ? "Salvar Alterações" : "Criar Produto"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProdutosAdmin;
