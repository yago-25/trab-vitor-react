import React, { useEffect, useState } from "react";
import "./../styles/Home.css";
import { api } from "../services/api";
import Header from "../components/Header/Header";

function Home() {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="home-container">
      <Header />
      <h1 className="titulo">🛒 Loja Virtual</h1>

      {loading ? (
        <div className="loading">Carregando produtos...</div>
      ) : (
        <div className="grid-produtos">
          {produtos.map((produto) => (
            <div key={produto._id} className="card-produto">
              <img
                src={produto.imagem}
                alt={produto.nome}
                className="imagem-produto"
              />
              <h2 className="nome-produto">{produto.nome}</h2>
              <p className="preco-produto">R$ {produto.preco.toFixed(2)}</p>
              <p className="descricao-produto">{produto.descricao}</p>
              <button className="btn-adicionar">Adicionar ao carrinho</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
