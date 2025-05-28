import { Navigate } from "react-router-dom";

function RotaAutenticada({ children }) {
  const token = localStorage.getItem("TOKEN_USUARIO");

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default RotaAutenticada;