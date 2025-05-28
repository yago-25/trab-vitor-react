import React, { useState } from "react";
import "./../styles/Login.css";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";
import { FaUser, FaLock } from 'react-icons/fa';

function Login() {
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    if (!usuario || !senha) {
      setError("Todos os campos precisam ser preenchidos.");
      return;
    }

    setLoading(true);
    setError("");

    try {   
      const response = await api.post("/login", {
        usuario,
        senha,
      });

      if (response.data.token) {
        localStorage.setItem("TOKEN_USUARIO", response.data.token);
        localStorage.setItem("NOME_USUARIO", usuario);
        navigate("/painel");
      }
    } catch (e) {
      setError("Usuário ou senha incorretos.");
      console.log("Erro ao logar: ", e);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">
          <span>🔐</span>
          Login
        </h1>

        {error && <div className="error-message">{error}</div>}

        <div className="input-group">
          <FaUser className="input-icon" />
          <input
            type="text"
            placeholder="Usuário"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            onKeyPress={handleKeyPress}
            className="login-input"
          />
        </div>

        <div className="input-group">
          <FaLock className="input-icon" />
          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            onKeyPress={handleKeyPress}
            className="login-input"
          />
        </div>

        <button 
          className="login-button" 
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Entrando..." : "Entrar"}
        </button>

        <div className="login-actions">
          <button
            className="secondary-button"
            onClick={() => navigate("/registrar")}
          >
            Criar Conta
          </button>
          <button 
            className="secondary-button"
            onClick={() => navigate("/")}
          >
            Voltar para Loja
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
