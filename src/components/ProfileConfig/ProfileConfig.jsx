import "./ProfileConfigCSS.css";
import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'
import { FiUser, FiMail } from "react-icons/fi";
import { SiJira } from "react-icons/si";

/*Tem que estalar a biblioteca para o tooltip funcionar: npm install react-tooltip*/


export default function ProfileConfig() {
  return (
    <div className="container">
        <div className="header">
            <div className="headerEsquerda">
                <h1>Edição de Perfil</h1>
                <h3>Dados que aparecem no seu perfil dentro do sistema.</h3>
            </div>

            <div className="headerDireita">
                <input
                type="text"
                className="inputPesquisa"
                placeholder="Pesquise algo..."
                />
            </div>
        </div>
            <div className="corpo">
                
                <div className="infoPessoais">
                    <div className="legenda"> 
                        <FiUser style={{color: "#00D182", width: "24px", height: "24px"}}/>
                        <p>Foto e nome</p>
                    </div>

                    <div className="row1">
                        <div className="grupoFoto">
                            <div className="avatarPlaceholder">PP</div>
                    
                            <div className="acoesFoto">
                                <button className="btnAlterarFoto">Alterar Foto</button>
                                <span className="textoAjuda">JPG ou PNG. Máx 2MB.</span>
                            </div>
                        </div>

                        <div className="coluna3">
                            <label htmlFor="nomeExibicao">Nome de Exibição</label>
                            <input type="text" id="nomeExibicao"/>
                        </div>
                    </div>

                    <div className="row2">
                        <div className="coluna1">
                            <label htmlFor="nome">Nome</label>
                            <input type="text" id="nome" />
                        </div>
                        <div className="coluna2">
                            <label htmlFor="sobrenome">Sobrenome</label>
                            <input type="text" id="sobrenome" />
                        </div>
                    </div>

                    <div className="row3">
                        <div className="coluna1">
                            <label htmlFor="cargo">Cargo</label>
                            <input type="text" id="cargo" />
                        </div>
                    </div>
                </div>

                <div className="integracaoJira">
                    <div className="legenda">
                            <SiJira  style={{fill: "transparent",  
                                stroke: "#00D182",    
                                strokeWidth: "1.5",   
                                width: "24px", 
                                height: "24px"}}/>
                        <p>Integração com Jira</p> 
                    </div>

                    <div className="row1">
                        <div className="coluna1">

                            <label htmlFor="jiraToken">Token do Jira</label>
                            
                            <div className="input-com-tooltip">
                                <input type="text" id="jiraToken" />
                                
                                <span 
                                    className="tooltip-icon"
                                    data-tooltip-id="meu-tooltip" 
                                    data-tooltip-content="Informe o Token do Jira para realizar a integração das plataformas."
                                >
                                    ?
                                </span>
                            </div>
                        
                            <Tooltip id="meu-tooltip" place="top" style={{ zIndex: 9999 }} />
                        </div>
                    </div>
                </div>

                <div className="contato">
                    <div className="legenda">
                            <FiMail style={{color: "#00D182", width: "24px", height: "24px"}}/>
                            <p>Contato</p>
                    </div>
                    
                    <div className="row1">
                        <div className="coluna1">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" />
                        </div>
                    </div>
                </div>
        </div>
    </div> 
  );
}