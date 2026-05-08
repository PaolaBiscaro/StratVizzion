import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Cadastro.css";
import { FiLock, FiMail, FiUser } from "react-icons/fi";
import "../styles/variables.css"

function Cadastro() {
  const navigate = useNavigate();

  // Estados para controlar os inputs
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmaSenha, setConfirmaSenha] = useState("");

  const handleCadastro = (e) => {
    e.preventDefault();
    // Aqui entrará a lógica para salvar o usuário futuramente
    navigate("/"); // Manda de volta pro login após cadastrar
  };

  return (
    <div className="cadastro-page">
      <div className="cadastro-container">
        <div className="cadastro-card">

          {/* LADO ESQUERDO */}
          <div className="cadastro-image-side">
            <div className="cadastro-content-left">
              <div className="cadastro-main-text">
                <div className="cadastro-logo-area">
                  <img src="src/assets/imgs/stratvizzion2.png" alt="Logo StratVizzion" />
                </div>
              </div>
            </div>
          </div>

          {/* LADO DIREITO */}
          <div className="cadastro-form-side">
            <div className="cadastro-form-header">
              <h2>Crie sua conta</h2>
              <p>Preencha os dados abaixo para começar.</p>
            </div>

            <form className="cadastro-form" onSubmit={handleCadastro}>
              
              <div className="cadastro-input-group">
                <span className="cadastro-input-icon"><FiUser style={{color: "#433f3f"}}/></span>
                <input
                  type="text"
                  placeholder="Nome completo"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  required
                />
              </div>

              <div className="cadastro-input-group">
                <span className="cadastro-input-icon"><FiMail style={{color: "#433f3f"}}/></span>
                <input
                  type="email"
                  placeholder="E-mail corporativo"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="cadastro-input-group">
                <span className="cadastro-input-icon"><FiLock style={{color: "#433f3f"}} /></span>
                <input
                  type="password"
                  placeholder="Crie uma senha"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  required
                />
              </div>

              <div className="cadastro-input-group" style={{marginBottom: "35px"}}>
                <span className="cadastro-input-icon"><FiLock style={{color: "#433f3f"}} /></span>
                <input
                  type="password"
                  placeholder="Confirme sua senha"
                  value={confirmaSenha}
                  onChange={(e) => setConfirmaSenha(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="cadastro-btn-primary">
                Finalizar Cadastro
              </button>

              <button
                type="button"
                className="cadastro-btn-secondary"
                onClick={() => navigate("/Login")}
              >
                Já tenho uma conta
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Cadastro;