import React, { useState } from "react";
import SideBar from "../components/Sidebar/SideBar";
import Button from "../components/Button/Button";
import MainTitle from "../components/MainTitle/MainTitle";
import "../styles/variables.css"
import FormSelect from "../components/ComponentesForm/FormSelect/FormSelect";
import FormInput from "../components/ComponentesForm/FormInput/FormInput";
import "../styles/variables.css"
import FormTextarea from "../components/ComponentesForm/FormTextarea/FormTextarea"
import SearchBar from "../components/SearchBar/SearchBar";
import AutoHighlighter from "../components/Highlighter/AutoHighlighter";
import { useSearch } from "../context/SearchContext";

function NewOKR() {
   const { setBusca } = useSearch();
    //Não sei dizer se essa é a forma mais otimizada ou boa prática fazer isso, por enqunato vou deixar aqui, qualquer coisa eu migro para outra pasta mais tarde
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [ciclo, setCiclo] = useState("");
  const [ano, setAno] = useState("");

  const limparCampos = () => {
    setTitulo("");
    setDescricao("");
    setCiclo("");
    setAno("");
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
                            title="Cadastrar novo OKR"
                            subtitle="Defina o objetivo para a sua empresa"
                        />

                        <SearchBar onSearch={(valor) => setBusca(valor)} />
                    </div>

        <FormInput
          title="Título da OKR"
          inside="EX: Aumentar a retenção de usuários ativos"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />
        <FormTextarea
          title="Descrição"
          inside="Insira o contexto e Justificativa do objetivo..."
          tamanho="103px"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />
        <div className="row">
          <FormSelect
            opcoes={[{ value: "Q1", label: "Q1" }, { value: "Q2", label: "Q2" }, { value: "Q3", label: "Q3" }, { value: "Q4", label: "Q4" }]}
            title="Ciclo"
            inside="-- Selecionar --"
            value={ciclo}
            onChange={(e) => setCiclo(e.target.value)}
          />
          <FormSelect
            opcoes={[{ value: "2026", label: "2026" }, { value: "2027", label: "2027" }, { value: "2028", label: "2028" }, { value: "2029", label: "2029" }, { value: "2030", label: "2030" }]}
            title="Ano"
            inside="-- Selecionar --"
            value={ano}
            onChange={(e) => setAno(e.target.value)}
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

//Botão de Salvar deve ser implementando um método POST Posteriormente


export default NewOKR;