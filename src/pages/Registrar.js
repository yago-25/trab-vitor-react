import React, { useState } from "react";
import "./../styles/Registrar.css";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";

function Register() {
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  const handleRegister = async () => {
    if (!usuario || !senha || !confirmarSenha) {
      alert("Todos os campos precisam ser preenchidos.");
      return;
    }

    if (senha !== confirmarSenha) {
      alert("As senhas não coincidem!");
      return;
    }

    try {
      const response = await api.post("/registrar", {
        usuario,
        senha,
        confirma: confirmarSenha,
      });

      if (response.data.id) {
        alert("Cadastro criado com sucesso!");
        navigate("/login");
      }
    } catch (e) {
      alert("Erro ao cadastrar.");
      console.log("Erro ao cadastrar: ", e);
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h1 className="register-title">📝 Criar Conta</h1>

        <input
          type="text"
          placeholder="Usuário"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
          className="register-input"
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          className="register-input"
        />
        <input
          type="password"
          placeholder="Confirmar Senha"
          value={confirmarSenha}
          onChange={(e) => setConfirmarSenha(e.target.value)}
          className="register-input"
        />

        <button className="register-button" onClick={handleRegister}>
          Registrar
        </button>

        <div className="register-actions">
          <button
            className="secondary-button"
            onClick={() => navigate("/login")}
          >
            Voltar para Login
          </button>
          <button className="secondary-button" onClick={() => navigate("/")}>
            Voltar para Loja
          </button>
        </div>
      </div>
    </div>
  );
}

export default Register;
