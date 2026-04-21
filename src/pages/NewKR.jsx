import React, { useState } from "react";
import SideBar from "../components/Sidebar/SideBar";
import KRTitle from "../components/NewKRTitle/NewKRTitle";
import TextInput from "../components/TextInput/TextInput";
import SelectMenu from "../components/FloatMenu/FloatMenu";
import Button from "../components/Button/Button";

function NewKR(){
    const [titulo, setTitulo] = useState("");
      const [descricao, setDescricao] = useState("");
      const [ciclo, setCiclo] = useState("");
      const [OKR, setAno] = useState("");
      const [valor, setValor] = useState("");
      const [meta, setMeta] = useState("");
    
      const limparCampos = () => {
        setTitulo("");
        setDescricao("");
        setCiclo("");
        setAno("");
        setValor("");
        setMeta("");
      };
    return(
    <div style={{ display: "flex" }}>
        <SideBar />
        <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
            <KRTitle />
            <SelectMenu className={"OKR"}
            opcoes={[]}
            title="Selecionar OKR"
            inside="-- Selecionar --"
            value={OKR}
            onChange={(e) => setAno(e.target.value)}
          />
            <TextInput
            title="Título do Key Result"
            inside="EX: Aumentar DAU de 50k para 75k"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            />

            <TextInput
            title="Descrição"
            inside="Contexto e justificativa da Key result..."
            tamanho="103px"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            />

            <div style={{ display: "flex", gap: "3px" }}>
                <TextInput
                    title="Valor Inicial"
                    inside="0"
                    tamanho="64px"
                    value={valor}
                    onChange={(e) => setValor(e.target.value)}
                    className={"Valor"}
                />

                <TextInput
                    title="Meta"
                    inside="100"
                    tamanho="64px"
                    value={meta}
                    onChange={(e) => setMeta(e.target.value)}
                    className={"Valor"}
                />

            </div>
            <Button texto="Salvar" className="Salvar" />
            <Button texto="Limpar Campos" variante="branco" className="Limpar" onClick={limparCampos} />
        </div>

        
    </div>
    );
}
//Select menu precisa de um get para pegar todas as okr



export default NewKR;