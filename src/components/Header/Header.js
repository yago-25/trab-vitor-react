/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";

function Header() {
  return (
    <header className="header">
      <Link to="/" className="logo">
        <span className="logo-icon">🛍️</span>
        <span className="logo-text">Loja Virtual</span>
      </Link>

      <nav className="nav">
        <div className="nav-actions">
          <Link to="/login" className="nav-button">
            <FaUser />
            <span className="button-text">Entrar</span>
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Header;
