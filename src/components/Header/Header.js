/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="header">
      <div className="logo">🛍️ Loja Virtual</div>
      <nav className="nav">
        <Link to="/login" className='login'>Entrar como Admin</Link>
      </nav>
    </header>
  );
}

export default Header;
