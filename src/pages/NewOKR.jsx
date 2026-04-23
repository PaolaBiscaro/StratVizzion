import React, { useState } from "react";
import SideBar from "../components/Sidebar/SideBar";
import OKRTitle from "../components/NewOkrTitle/NewOKRTitle";
import TextInput from "../components/TextInput/TextInput";
import SelectMenu from "../components/FloatMenu/FloatMenu";
import Button from "../components/Button/Button";

function NewOKR() {
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
    <div style={{ display: "flex" }}>
      <SideBar />
      <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
        <OKRTitle />
        <TextInput
          title="Título da OKR"
          inside="EX:Aumentar a retenção de usuários ativos"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />
        <TextInput
          title="Descrição"
          inside="Contexto e Justificativa do objetivo..."
          tamanho="103px"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />
        <div style={{ display: "flex", gap: "3px" }}>
          <SelectMenu
            opcoes={[{ value: "Q1", label: "Q1" }, { value: "Q2", label: "Q2" }, { value: "Q3", label: "Q3" }, { value: "Q4", label: "Q4" }]}
            title="Ciclo"
            inside="-- Selecionar --"
            value={ciclo}
            onChange={(e) => setCiclo(e.target.value)}
          />
          <SelectMenu
            opcoes={[{ value: "2026", label: "2026" }, { value: "2027", label: "2027" }, { value: "2028", label: "2028" }, { value: "2029", label: "2029" }, { value: "2030", label: "2030" }]}
            title="Ano"
            inside="-- Selecionar --"
            value={ano}
            onChange={(e) => setAno(e.target.value)}
          />
        </div>
        <div className="botoes-fixos">
          <Button texto="Salvar" className="Salvar" />
          <Button texto="Limpar Campos" variante="branco" className="Limpar" onClick={limparCampos} />
        </div>
      </div>
    </div>
  );
}

//Botão de Salvar deve ser implementando um método POST Posteriormente


export default NewOKR;