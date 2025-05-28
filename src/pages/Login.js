import React, { useState } from "react";
import "./../styles/Login.css";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");

  const handleLogin = async () => {
    if (!usuario || !senha) {
      alert("Todos os campos precisam ser preenchidos.");
      return;
    }

    try {   
      const response = await api.post("/login", {
        usuario,
        senha,
      });

      if (response.data.token) {
        localStorage.setItem("TOKEN_USUARIO", response.data.token);
        localStorage.setItem("NOME_USUARIO", usuario);
        alert("Login realizado com sucesso");
        navigate("/painel");
      }
    } catch (e) {
      alert("Erro ao logar.");
      console.log("Erro ao logar: ", e);
    }
    console.log({ usuario, senha });
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">🔐 Login</h1>

        <input
          type="text"
          placeholder="Usuário"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
          className="login-input"
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          className="login-input"
        />

        <button className="login-button" onClick={handleLogin}>
          Entrar
        </button>

        <div className="login-actions">
          <button
            className="secondary-button"
            onClick={() => navigate("/registrar")}
          >
            Cadastrar
          </button>
          <button className="secondary-button" onClick={() => navigate("/")}>
            Voltar para Loja
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
