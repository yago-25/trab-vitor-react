import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./../styles/Carrinho.css";
import { api } from "../services/api";
import {
  FaShoppingCart,
  FaCreditCard,
  FaBarcode,
  FaMoneyBill,
  FaArrowLeft,
} from "react-icons/fa";
import { FaPix } from "react-icons/fa6";

function Carrinho() {
  const navigate = useNavigate();
  const location = useLocation();
  const carrinho = location.state?.carrinho || [];
  const [nomeCliente, setNomeCliente] = useState("");
  const [metodoPagamento, setMetodoPagamento] = useState("");
  const [loading, setLoading] = useState(false);

  const metodosPagamento = [
    { id: "credito", nome: "Cartão de Crédito", icon: <FaCreditCard /> },
    { id: "boleto", nome: "Boleto Bancário", icon: <FaBarcode /> },
    { id: "dinheiro", nome: "Dinheiro", icon: <FaMoneyBill /> },
    { id: "pix", nome: "PIX", icon: <FaPix /> },
  ];

  const calcularTotal = () => {
    return carrinho.reduce(
      (total, item) => total + item.quantidade * item.preco,
      0
    );
  };

  const handleFinalizarCompra = async () => {
    if (!nomeCliente || !metodoPagamento) {
      alert("Por favor, preencha todos os campos");
      return;
    }

    setLoading(true);

    try {
      const venda = {
        nomeCliente,
        usuario: localStorage.getItem("NOME_USUARIO") || "Cliente",
        data: new Date().toISOString().split("T")[0],
        produtos: carrinho.map(({ nome, quantidade, preco }) => ({
          nome,
          quantidade,
          preco,
        })),
      };

      await api.post("/venda", venda);
      navigate("/agradecimento");
    } catch (error) {
      console.error("Erro ao finalizar compra:", error);
      alert("Erro ao finalizar a compra. Por favor, tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  if (carrinho.length === 0) {
    return (
      <div className="carrinho-container">
        <header className="carrinho-header">
          <button className="back-button" onClick={() => navigate("/")}>
            <FaArrowLeft />
            <span>Voltar para a Loja</span>
          </button>
          <h1>Carrinho</h1>
        </header>
        <div className="carrinho-vazio">
          <FaShoppingCart className="carrinho-icon" />
          <p>Seu carrinho está vazio</p>
          <button className="voltar-loja-btn" onClick={() => navigate("/")}>
            Voltar para a Loja
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="carrinho-container">
      <header className="carrinho-header">
        <button className="back-button" onClick={() => navigate("/")}>
          <FaArrowLeft />
          <span>Voltar para a Loja</span>
        </button>
        <h1>Finalizar Compra</h1>
      </header>

      <main className="carrinho-content">
        <div className="carrinho-items">
          <h2>Itens no Carrinho</h2>
          {carrinho.map((item, index) => (
            <div key={index} className="carrinho-item">
              <img src={item.imagem} alt={item.nome} className="item-imagem" />
              <div className="item-info">
                <h3>{item.nome}</h3>
                <p className="item-quantidade">Quantidade: {item.quantidade}</p>
                <p className="item-preco">
                  R$ {(item.quantidade * item.preco).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
          <div className="carrinho-total">
            <strong>Total:</strong>
            <span>R$ {calcularTotal().toFixed(2)}</span>
          </div>
        </div>

        <div className="checkout-form">
          <h2>Dados para Entrega</h2>
          <div className="form-group">
            <label>Nome Completo</label>
            <input
              type="text"
              value={nomeCliente}
              onChange={(e) => setNomeCliente(e.target.value)}
              placeholder="Digite seu nome completo"
              required
            />
          </div>

          <div className="form-group">
            <label>Método de Pagamento</label>
            <div className="metodos-pagamento">
              {metodosPagamento.map((metodo) => (
                <button
                  key={metodo.id}
                  className={`metodo-btn ${
                    metodoPagamento === metodo.id ? "selected" : ""
                  }`}
                  onClick={() => setMetodoPagamento(metodo.id)}
                >
                  {metodo.icon}
                  <span>{metodo.nome}</span>
                </button>
              ))}
            </div>
          </div>

          <button
            className="finalizar-compra-btn"
            onClick={handleFinalizarCompra}
            disabled={loading || !nomeCliente || !metodoPagamento}
          >
            {loading ? (
              <div className="loading-spinner"></div>
            ) : (
              "Finalizar Compra"
            )}
          </button>
        </div>
      </main>
    </div>
  );
}

export default Carrinho;
