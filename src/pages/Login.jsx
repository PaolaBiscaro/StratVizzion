import React from "react";
import "../styles/Login.css";

function Login() {
  return (
    <div className="login-container">

      {/* FORMAS DE FUNDO */}
      <div className="background-shape shape-1"></div>
      <div className="background-shape shape-2"></div>

      <div className="login-card">
        
        {/* LADO ESQUERDO - IMAGEM */}
        <div className="login-image-side">
          <div className="login-overlay"></div>
          <div className="circle circle-top"></div>
          <div className="circle circle-bottom"></div>
        </div>

        {/* LADO DIREITO - FORM */}
        <div className="login-form-side">
          <h1>Iniciar Sessão</h1>

          <form className="login-form">
            <label>Email</label>
            <input type="email" placeholder="Digite seu email" />

            <label>Senha</label>
            <input type="password" placeholder="Digite sua senha" />

            <a href="#" className="forgot-password">
              Esqueceu sua senha?
            </a>

            <button type="submit" className="btn-primary">
              Iniciar Sessão
            </button>

            <button type="button" className="btn-secondary">
              Cadastrar-se
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}

export default Login;