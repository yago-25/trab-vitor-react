import React, { useState } from "react";
import "./../styles/Registrar.css";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";
import { FaUser, FaLock, FaLockOpen } from 'react-icons/fa';

function Register() {
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async () => {
    if (!usuario || !senha || !confirmarSenha) {
      setError("Todos os campos precisam ser preenchidos.");
      return;
    }

    if (senha !== confirmarSenha) {
      setError("As senhas não coincidem!");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await api.post("/registrar", {
        usuario,
        senha,
        confirma: confirmarSenha,
      });

      if (response.data.id) {
        navigate("/login");
      }
    } catch (e) {
      setError("Erro ao criar conta. Tente novamente.");
      console.log("Erro ao cadastrar: ", e);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleRegister();
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h1 className="register-title">
          <span>📝</span>
          Criar Conta
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
            className="register-input"
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
            className="register-input"
          />
        </div>

        <div className="input-group">
          <FaLockOpen className="input-icon" />
          <input
            type="password"
            placeholder="Confirmar Senha"
            value={confirmarSenha}
            onChange={(e) => setConfirmarSenha(e.target.value)}
            onKeyPress={handleKeyPress}
            className="register-input"
          />
        </div>

        <button 
          className="register-button"
          onClick={handleRegister}
          disabled={loading}
        >
          {loading ? "Criando conta..." : "Criar Conta"}
        </button>

        <div className="register-actions">
          <button
            className="secondary-button"
            onClick={() => navigate("/login")}
          >
            Fazer Login
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

export default Register;
