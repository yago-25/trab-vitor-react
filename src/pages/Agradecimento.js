import React from "react";
import { useNavigate } from "react-router-dom";
import "./../styles/Agradecimento.css";
import { FaCheckCircle, FaHome } from "react-icons/fa";

function Agradecimento() {
  const navigate = useNavigate();

  return (
    <div className="agradecimento-container">
      <div className="agradecimento-content">
        <FaCheckCircle className="success-icon" />
        <h1>Compra Realizada com Sucesso!</h1>
        <p>Obrigado por comprar conosco.</p>
        <button className="voltar-loja-btn" onClick={() => navigate("/")}>
          <FaHome />
          <span>Voltar para a Loja</span>
        </button>
      </div>
    </div>
  );
}

export default Agradecimento; 