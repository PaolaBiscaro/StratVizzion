import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";
import { FiLock, FiMail } from "react-icons/fi";
import { createLoginDTO } from "../utils/dtos/loginDTO";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    const loginDTO = createLoginDTO({ email, senha });

    console.log("Login DTO:", loginDTO);
    navigate("/home-director");
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-card">

          <div className="login-image-side">
            <div className="content-left">
              <div className="main-text">
                <h1>
                  Onde a execução<br />
                  encontra a<br />
                  <span className="highlight">Estratégia.</span>
                </h1>
                <p>
                Transforme cada pequena conquista em visão de futuro. No StratVizzion, ajudamos você a traduzir o progresso das suas KRs no sucesso das suas OKRs.
                </p>
              </div>

              <div className="logo-area">
                <img src="src/assets/imgs/stratvizzion.png" alt="" srcset="" />
              </div>
            </div>
          </div>

          <div className="login-form-side">
            <div className="form-header">
              <h2>Bem-Vindo!</h2>
              <p>Acompanhe o valor gerado em cada KR.</p>
            </div>

            <form className="login-form" onSubmit={handleLogin}>
              
              <div className="input-group">
                <span className="input-icon"><FiMail style={{color: "#433f3f"}}/></span>
                <input
                  type="email"
                  placeholder="E-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="input-group">
                <span className="input-icon"><FiLock style={{color: "#433f3f"}} /></span>
                <input
                  type="password"
                  placeholder="Senha"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  required
                />
              </div>

              <a href="#" className="forgot-password">
                Esqueceu sua senha?
              </a>

              <button
                type="submit"
                className="btn-primary"
                
              >
                Iniciar Sessão
              </button>

              <button
                type="button"
                className="btn-secondary"
                onClick={() => navigate("/cadastro")}
              >
                Cadastrar-se
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Login;