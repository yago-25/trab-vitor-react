import React, { useEffect, useState } from "react";
import "./../styles/Home.css";
import { api } from "../services/api";
import Header from "../components/Header/Header";
import { useNavigate } from "react-router-dom";
import {
  FaShoppingCart,
  FaPlus,
  FaMinus,
  FaTimes,
  FaCheck,
} from "react-icons/fa";

function Home() {
  const navigate = useNavigate();
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [carrinho, setCarrinho] = useState([]);
  const [carrinhoAberto, setCarrinhoAberto] = useState(false);
  const [produtosAdicionados, setProdutosAdicionados] = useState({});

  useEffect(() => {
    async function carregarProdutos() {
      try {
        const response = await api.get("/produtos/010623008");
        setProdutos(response.data);
      } catch (error) {
        console.error("Erro ao carregar produtos:", error);
      } finally {
        setLoading(false);
      }
    }

    carregarProdutos();
  }, []);

  const adicionarAoCarrinho = (produto) => {
    const itemExistente = carrinho.find((item) => item._id === produto._id);
    if (itemExistente) {
      setCarrinho(
        carrinho.map((item) =>
          item._id === produto._id
            ? { ...item, quantidade: item.quantidade + 1 }
            : item
        )
      );
    } else {
      setCarrinho([...carrinho, { ...produto, quantidade: 1 }]);
    }
    setCarrinhoAberto(true);

    setProdutosAdicionados({ ...produtosAdicionados, [produto._id]: true });
    setTimeout(() => {
      setProdutosAdicionados({ ...produtosAdicionados, [produto._id]: false });
    }, 2000);
  };

  const removerDoCarrinho = (produtoId) => {
    setCarrinho(carrinho.filter((item) => item._id !== produtoId));
  };

  const atualizarQuantidade = (produtoId, delta) => {
    setCarrinho(
      carrinho
        .map((item) => {
          if (item._id === produtoId) {
            const novaQuantidade = item.quantidade + delta;
            return novaQuantidade > 0
              ? { ...item, quantidade: novaQuantidade }
              : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const calcularTotal = () => {
    return carrinho.reduce(
      (total, item) => total + item.quantidade * item.preco,
      0
    );
  };

  const irParaCheckout = () => {
    navigate("/carrinho", { state: { carrinho } });
  };

  const produtosFiltrados = produtos.filter(
    (produto) =>
      produto.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      produto.descricao.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="home-container">
      <Header />
      <main className="main-content">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Buscar produtos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        {loading ? (
          <div className="loading">
            <div className="loading-spinner"></div>
            <p>Carregando produtos...</p>
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
                  <h3>{produto.nome}</h3>
                  <p className="produto-descricao">{produto.descricao}</p>
                  <p className="produto-preco">R$ {produto.preco.toFixed(2)}</p>
                  <button
                    className="adicionar-btn"
                    onClick={() => adicionarAoCarrinho(produto)}
                    id={`btn-${produto._id}`}
                  >
                    {produtosAdicionados[produto._id] ? (
                      <>
                        <FaCheck />
                        Adicionado!
                      </>
                    ) : (
                      <>
                        <FaShoppingCart />
                        Adicionar ao carrinho
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {carrinhoAberto && (
          <div className="carrinho-sidebar">
            <div className="carrinho-header">
              <h2>
                <FaShoppingCart /> Carrinho
              </h2>
              <button
                className="fechar-carrinho"
                onClick={() => setCarrinhoAberto(false)}
              >
                <FaTimes />
              </button>
            </div>

            {carrinho.length === 0 ? (
              <p className="carrinho-vazio">Seu carrinho está vazio</p>
            ) : (
              <>
                <div className="carrinho-items">
                  {carrinho.map((item) => (
                    <div key={item._id} className="carrinho-item">
                      <img
                        src={item.imagem}
                        alt={item.nome}
                        className="item-imagem"
                      />
                      <div className="item-info">
                        <h4>{item.nome}</h4>
                        <p>R$ {(item.quantidade * item.preco).toFixed(2)}</p>
                        <div className="quantidade-controles">
                          <button
                            onClick={() => atualizarQuantidade(item._id, -1)}
                          >
                            <FaMinus />
                          </button>
                          <span>{item.quantidade}</span>
                          <button
                            onClick={() => atualizarQuantidade(item._id, 1)}
                          >
                            <FaPlus />
                          </button>
                        </div>
                      </div>
                      <button
                        className="remover-item"
                        onClick={() => removerDoCarrinho(item._id)}
                      >
                        <FaTimes />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="carrinho-footer">
                  <div className="carrinho-total">
                    <strong>Total:</strong>
                    <span>R$ {calcularTotal().toFixed(2)}</span>
                  </div>
                  <button className="finalizar-compra" onClick={irParaCheckout}>
                    Finalizar Compra
                  </button>
                </div>
              </>
            )}
          </div>
        )}

        <button
          className={`carrinho-flutuante ${carrinhoAberto ? "hidden" : ""}`}
          onClick={() => setCarrinhoAberto(true)}
        >
          <FaShoppingCart />
          {carrinho.length > 0 && (
            <span className="carrinho-badge">{carrinho.length}</span>
          )}
        </button>
      </main>
    </div>
  );
}

export default Home;
