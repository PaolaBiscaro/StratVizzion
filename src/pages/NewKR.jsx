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

    const limparCampos = () => {
        setTitulo("");
        setDescricao("");
        setAno("");
        setValor("");
        setMeta("");
    };
    return (
        
        <div className="page-layout">
            <SideBar />

                <AutoHighlighter />
                <main id="content">
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
                />

                <FormInput
                    title="Título do Key Result"
                    inside="EX: Aumentar DAU de 50k para 75k"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                />

                <FormTextarea
                    title="Descrição"
                    inside="Insira o contexto e justificativa da Key result..."
                    tamanho="150px"
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
                />

                <div className="row">
                    <FormInput
                        title="Valor Inicial"
                        inside="EX: R$100.000 ou 0"
                        value={valor}
                        onChange={(e) => setValor(e.target.value)}
                        className="Valor"
                    />

                    <FormInput
                        title="Meta"
                        inside="Ex: R$200.000 ou 100"
                        value={meta}
                        onChange={(e) => setMeta(e.target.value)}
                        className="Valor"
                    />
                </div>
                <div className="botoes-fixos">
                    <Button texto="Limpar Campos" variante="branco" className="Limpar" onClick={limparCampos} />
                    <Button texto="Salvar" className="Salvar" />
                    
                </div>
            </main>
        </div>

    );
}
//Select menu precisa de um get para pegar todas as okr



export default NewKR;