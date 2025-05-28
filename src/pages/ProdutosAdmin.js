import { useEffect, useState } from "react";
import { api } from "../services/api";
import "./../styles/ProdutosAdmin.css";
import { useNavigate } from "react-router-dom";

function ProdutosAdmin() {
  const navigate = useNavigate();
  
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleLogout = () => {
    localStorage.removeItem("TOKEN_USUARIO");
    localStorage.removeItem("NOME_USUARIO");
    navigate("/login");
  };

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

  if (loading) {
    return <div className="loading">Carregando produtos...</div>;
  }

  return (
    <div className="produtos-admin-container">
      <header className="painel-header">
        <h1 className="painel-title">Painel Administrativo</h1>
        <button className="logout-button" onClick={handleLogout}>
          Sair
        </button>
      </header>
      <h2>Gerenciar Produtos</h2>
      <table className="produtos-table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Usuário</th>
            <th>Quantidade</th>
            <th>Preço</th>
            <th>Categoria</th>
            <th>Descrição</th>
            <th>Imagem</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {produtos.length === 0 ? (
            <tr>
              <td colSpan="8" style={{ textAlign: "center" }}>
                Nenhum produto encontrado
              </td>
            </tr>
          ) : (
            produtos.map((produto) => (
              <tr key={produto._id}>
                <td>{produto.nome}</td>
                <td>{produto.usuario}</td>
                <td>{produto.quantidade}</td>
                <td>R$ {produto.preco.toFixed(2)}</td>
                <td>{produto.categoria}</td>
                <td>{produto.descricao}</td>
                <td>
                  {produto.imagem ? (
                    <img
                      src={produto.imagem}
                      alt={produto.nome}
                      className="produto-imagem"
                    />
                  ) : (
                    "Sem imagem"
                  )}
                </td>
                <td>
                  <button className="btn-editar">Editar</button>
                  <button className="btn-excluir">Excluir</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ProdutosAdmin;
