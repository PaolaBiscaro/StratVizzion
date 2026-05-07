import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Cadastro.css";

function Cadastro() {
  const navigate = useNavigate();

  const handleCadastro = (e) => {
    e.preventDefault();

    // lógica de cadastro aqui

    navigate("/");
  };

  return (
    <div className="cadastro-page">


      <div className="bg-shape shape-1"></div>
      <div className="bg-shape shape-2"></div>

      <div className="cadastro-container">
        <div className="cadastro-card">


          <div className="cadastro-image">
            <div className="overlay"></div>
          </div>

          {/* FORM */}
          <div className="cadastro-form">
            <h1>Criar Conta</h1>

            <form onSubmit={handleCadastro}>
              <label>Nome</label>
              <input
                type="text"
                placeholder="Digite seu nome"
              />

              <label>Email</label>
              <input
                type="email"
                placeholder="Digite seu email"
              />

              <label>Senha</label>
              <input
                type="password"
                placeholder="Digite sua senha"
              />

              <label>Confirmar Senha</label>
              <input
                type="password"
                placeholder="Confirme sua senha"
              />

              <button
                className="btn-primary"
                type="submit"
              >
                Cadastrar
              </button>

              <button
                className="btn-secondary"
                type="button"
                onClick={() => navigate("/")}
              >
                Voltar para Login
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Cadastro;