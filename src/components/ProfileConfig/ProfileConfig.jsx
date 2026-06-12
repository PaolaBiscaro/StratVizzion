import "./ProfileConfigCSS.css";
import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'
import { FiUser, FiMail } from "react-icons/fi";
import { SiJira } from "react-icons/si";

export default function ProfileConfig({ data, onChange }) {

    if (!data) return null;

    return (
        <div className="container">
            <div className="corpo">
                <div className="infoPessoais">
                    <div className="legenda">
                        <FiUser style={{ color: "#00D182", width: "24px", height: "24px" }} />
                        <p>Foto e nome</p>
                    </div>

                    <div className="row1">
                        <div className="grupoFoto">
                            <div className="avatarPlaceholder">
                                {data.name ? data.name.charAt(0).toUpperCase() : "U"}
                            </div>

                            <div className="acoesFoto">
                                <button className="btnAlterarFoto">Alterar Foto</button>
                                <span className="textoAjuda">JPG ou PNG. Máx 2MB.</span>
                            </div>
                        </div>

                        <div className="coluna3">
                            <label htmlFor="nomeExibicao">Nome de Exibição</label>
                            <input
                                type="text"
                                id="nomeExibicao"
                                value={data.name || ""}
                                onChange={(e) => onChange('name', e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="row2">
                        <div className="coluna1">
                            <label htmlFor="nome">Nome Completo</label>
                            <input
                                type="text"
                                id="nome"
                                value={data.name || ""}
                                onChange={(e) => onChange('name', e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="row3">
                        <div className="coluna1">
                            <label htmlFor="cargo">Cargo</label>
                            <input
                                type="text"
                                id="cargo"
                                value={data.role || ""}
                                onChange={(e) => onChange('role', e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                <div className="integracaoJira">
                    <div className="legenda">
                        <SiJira style={{
                            fill: "transparent",
                            stroke: "#00D182",
                            strokeWidth: "1.5",
                            width: "24px",
                            height: "24px"
                        }} />
                        <p>Integração com Jira</p>
                    </div>

                    <div className="row1">
                        <div className="coluna1">

                            <label htmlFor="jiraApiTokenEnc">Token do Jira</label>

                            <div className="input-com-tooltip">
                                <input
                                    type="text"
                                    id="jiraApiTokenEnc"
                                    value={data.jiraApiTokenEnc || ""}
                                    onChange={(e) => onChange('jiraApiTokenEnc', e.target.value)}
                                />

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
                        <FiMail style={{ color: "#00D182", width: "24px", height: "24px" }} />
                        <p>Contato</p>
                    </div>

                    <div className="row1">
                        <div className="coluna1">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                value={data.jiraEmail || ""}
                                onChange={(e) => onChange('jiraEmail', e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}