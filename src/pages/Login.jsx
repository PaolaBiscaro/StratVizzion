import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";
import { FiLock, FiMail } from "react-icons/fi";
import { loginUser } from "../services/api/auth";

function Login() {
  const navigate = useNavigate();
  const [jiraEmail, setjiraEmail] = useState("");
  const [password, setPassword] = useState("");
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErro("");

    try {
      setLoading(true);
      const { data } = await loginUser({ jiraEmail: jiraEmail, password: password });

      localStorage.setItem("token", data.accessToken);
      localStorage.setItem("user", JSON.stringify(data.user));

      console.log("Usuário logado:", data.user);

      const routeByRole = {
        1: "/home-director",
        2: "/home-manager",
      };

      navigate(routeByRole[data.user?.role] || "/");
    } catch (error) {
      setErro("E-mail ou senha inválidos.");
      console.error("Erro no login:", error);
    } finally {
      setLoading(false);
    }
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
                <img src="src/assets/imgs/stratvizzion.png" alt="" />
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
                <span className="input-icon"><FiMail style={{ color: "#433f3f" }} /></span>
                <input
                  type="email"
                  placeholder="E-mail"
                  value={jiraEmail}
                  onChange={(e) => setjiraEmail(e.target.value)}
                  required
                />
              </div>

              <div className="input-group">
                <span className="input-icon"><FiLock style={{ color: "#433f3f" }} /></span>
                <input
                  type="password"
                  placeholder="Senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <a href="#" className="forgot-password">
                Esqueceu sua senha?
              </a>

              {erro && <p style={{ color: "red", fontSize: "14px" }}>{erro}</p>}

              <button type="submit" className="btn-primary" disabled={loading}>
                {loading ? "Entrando..." : "Iniciar Sessão"}
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