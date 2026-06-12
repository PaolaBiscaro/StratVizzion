import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Cadastro.css";
import { FiLock, FiMail, FiUser, FiLink } from "react-icons/fi";
import "../styles/variables.css";
import { registerUser } from "../services/api/auth";

function Cadastro() {
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmaSenha, setConfirmaSenha] = useState("");
  const [role, setRole] = useState("1");
  const [directorEmail, setDirectorEmail] = useState("");
  const [jiraEmail, setJiraEmail] = useState("");
  const [jiraApiToken, setJiraApiToken] = useState("");
  const [jiraBaseUrl, setJiraBaseUrl] = useState("");
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCadastro = async (e) => {
    e.preventDefault();
    setErro("");

    if (senha !== confirmaSenha) {
      setErro("As senhas não coincidem.");
      return;
    }

    const payload = {
      name: nome,
      password: senha,
      role: parseInt(role),
      directorEmail: directorEmail || null,
      jiraEmail: jiraEmail,
      jiraApiTokenEnc: jiraApiToken,
      jiraBaseUrl: jiraBaseUrl,
    };

    try {
      setLoading(true);
      await registerUser(payload);
      navigate("/Login");
    } catch (error) {
      setErro("Erro ao cadastrar. Verifique os dados e tente novamente.");
      console.error(error);
    } finally {
      setLoading(false);
    }
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
              <div className="cadastro-grid">

                <div className="cadastro-input-group">
                  <span className="cadastro-input-icon"><FiUser style={{ color: "#433f3f" }} /></span>
                  <input type="text" placeholder="Nome completo" value={nome} onChange={(e) => setNome(e.target.value)} required />
                </div>

                <div className="cadastro-input-group">
                  <span className="cadastro-input-icon"><FiLock style={{ color: "#433f3f" }} /></span>
                  <input type="password" placeholder="Crie uma senha" value={senha} onChange={(e) => setSenha(e.target.value)} required />
                </div>

                <div className="cadastro-input-group">
                  <span className="cadastro-input-icon"><FiLock style={{ color: "#433f3f" }} /></span>
                  <input type="password" placeholder="Confirme sua senha" value={confirmaSenha} onChange={(e) => setConfirmaSenha(e.target.value)} required />
                </div>

                <div className="cadastro-input-group">
                  <span className="cadastro-input-icon"><FiUser style={{ color: "#433f3f" }} /></span>
                  <div className="cadastro-select-wrapper">
                    <select value={role} onChange={(e) => setRole(e.target.value)} required>
                      <option value="1">Director</option>
                      <option value="2">Manager</option>
                    </select>
                  </div>
                </div>

                <div className="cadastro-input-group">
                  <span className="cadastro-input-icon"><FiMail style={{ color: "#433f3f" }} /></span>
                  <input type="email" placeholder="E-mail do Director (opcional)" value={directorEmail} onChange={(e) => setDirectorEmail(e.target.value)} />
                </div>

                <div className="cadastro-input-group">
                  <span className="cadastro-input-icon"><FiMail style={{ color: "#433f3f" }} /></span>
                  <input type="email" placeholder="E-mail do Jira" value={jiraEmail} onChange={(e) => setJiraEmail(e.target.value)} required />
                </div>

                <div className="cadastro-input-group">
                  <span className="cadastro-input-icon"><FiLock style={{ color: "#433f3f" }} /></span>
                  <input type="password" placeholder="Jira API Token" value={jiraApiToken} onChange={(e) => setJiraApiToken(e.target.value)} required />
                </div>

                <div className="cadastro-input-group cadastro-grid-full">
                  <span className="cadastro-input-icon"><FiLink style={{ color: "#433f3f" }} /></span>
                  <input type="url" placeholder="Jira Base URL (ex: https://empresa.atlassian.net)" value={jiraBaseUrl} onChange={(e) => setJiraBaseUrl(e.target.value)} required />
                </div>

              </div>

              {erro && <p style={{ color: "red", fontSize: "14px", marginTop: "12px" }}>{erro}</p>}

              <div className="cadastro-buttons">
                <button type="submit" className="cadastro-btn-primary" disabled={loading}>
                  {loading ? "Cadastrando..." : "Finalizar Cadastro"}
                </button>
                <button type="button" className="cadastro-btn-secondary" onClick={() => navigate("/Login")}>
                  Já tenho uma conta
                </button>
              </div>

            </form>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Cadastro;