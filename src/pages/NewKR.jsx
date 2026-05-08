import React, { useState } from "react";
import SideBar from "../components/Sidebar/SideBar";
import Button from "../components/Button/Button";
import MainTitle from "../components/MainTitle/MainTitle";
import FormSelect from "../components/ComponentesForm/FormSelect/FormSelect";
import FormInput from "../components/ComponentesForm/FormInput/FormInput";
import "../styles/variables.css"
import FormTextarea from "../components/ComponentesForm/FormTextarea/FormTextarea"
import { getOKR } from "../services/data/api_mock"
import SearchBar from "../components/SearchBar/SearchBar";
import AutoHighlighter from "../components/Highlighter/AutoHighlighter";
import { useSearch } from "../context/SearchContext";

function NewKR() {
    const { setBusca } = useSearch();
    const opcoesFormatadas = React.useMemo(() => {
        return getOKR().map(okr => ({
            value: okr.id,
            label: okr.descricao
        }));
    }, []);
    const [titulo, setTitulo] = useState("");
    const [descricao, setDescricao] = useState("");
    const [OKR, setAno] = useState("");
    const [valor, setValor] = useState("");
    const [meta, setMeta] = useState("");
    const [valorType, setValorType] = useState("number");

    const limparCampos = () => {
        setTitulo("");
        setDescricao("");
        setAno("");
        setValor("");
        setMeta("");
    };

    return (
        <div className="page-layout">
            <SideBar typeUser={"Manager"} nameUser={"Kaio"}/>
            <AutoHighlighter />

            <main id="content" style={{ paddingBottom: "100px" }}>
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                    marginBottom: "40px"
                }}>
                    <MainTitle
                        title="Cadastrar nova Key Result"
                        subtitle="Defina os resultados chave para seu time"
                    />
                    <SearchBar onSearch={(valor) => setBusca(valor)} />
                </div>

                <FormSelect
                    className={"OKR"}
                    opcoes={opcoesFormatadas}
                    title="Selecionar OKR"
                    inside="-- Selecionar --"
                    value={OKR}
                    onChange={(e) => setAno(e.target.value)}
                    toolid={"select-okr"}
                    tooltext={"Selecione a OKR à qual este Key Result pertence."}
                />

                <FormInput
                    title="Título do Key Result"
                    inside="EX: Aumentar DAU de 50k para 75k"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                    toolid={"titulo-kr"}
                    tooltext={"Digite um título curto e claro para o Key Result, ex: aumentar DAU."}
                />

                <FormTextarea
                    title="Descrição"
                    inside="Insira o contexto e justificativa da Key result..."
                    tamanho="150px"
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
                    toolid={"descricao-kr"}
                    tooltext={"Explique o que esse KR mede e por que é importante (contexto e justificativa)."}
                />

                <div className="row" style={{ display: 'flex', gap: 16 }}>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                        <FormInput
                            title="Valor Inicial"
                            inside="EX: R$100.000 ou 0"
                            value={valor}
                            onChange={(e) => setValor(e.target.value)}
                            className="Valor"
                            toolid={"valor-inicial"}
                            tooltext={"Valor atual ou ponto de partida do indicador (use números)."}
                        />

                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8 }}>
                            <span style={{ fontSize: 14, color: '#4A4A4D' }}>Tipo:</span>
                            <button
                                type="button"
                                onClick={() => setValorType('number')}
                                aria-pressed={valorType === 'number'}
                                style={{
                                    padding: '6px 10px',
                                    borderRadius: 8,
                                    border: valorType === 'number' ? '2px solid #18B273' : '1px solid #D9E0E6',
                                    background: valorType === 'number' ? '#E9FBF0' : '#fff'
                                }}
                            >
                                Número
                            </button>

                            <button
                                type="button"
                                onClick={() => setValorType('percent')}
                                aria-pressed={valorType === 'percent'}
                                style={{
                                    padding: '6px 10px',
                                    borderRadius: 8,
                                    border: valorType === 'percent' ? '2px solid #18B273' : '1px solid #D9E0E6',
                                    background: valorType === 'percent' ? '#E9FBF0' : '#fff'
                                }}
                            >
                                %
                            </button>

                            <button
                                type="button"
                                onClick={() => setValorType('date')}
                                aria-pressed={valorType === 'date'}
                                style={{
                                    padding: '6px 10px',
                                    borderRadius: 8,
                                    border: valorType === 'date' ? '2px solid #18B273' : '1px solid #D9E0E6',
                                    background: valorType === 'date' ? '#E9FBF0' : '#fff'
                                }}
                            >
                                Data
                            </button>
                        </div>
                    </div>

                    <div style={{ flex: 1 }}>
                        <FormInput
                            title="Meta"
                            inside="Ex: R$200.000 ou 100"
                            value={meta}
                            onChange={(e) => setMeta(e.target.value)}
                            className="Valor"
                            toolid={"meta-kr"}
                            tooltext={"Valor alvo que define sucesso para este Key Result."}
                        />
                    </div>
                </div>
            </main>

            <div className="botoes-fixos">
                <Button texto="Limpar Campos" variante="branco" className="Limpar" onClick={limparCampos} />
                <Button texto="Salvar" className="Salvar" />
            </div>
        </div>
    );
}

export default NewKR;