import React, { useState } from "react"; 
import SideBar from "../components/Sidebar/SideBar";
import Button from "../components/Button/Button";
import MainTitle from "../components/MainTitle/MainTitle";
import "../styles/variables.css"
import FormSelect from "../components/ComponentesForm/FormSelect/FormSelect";
import FormInput from "../components/ComponentesForm/FormInput/FormInput";
import FormTextarea from "../components/ComponentesForm/FormTextarea/FormTextarea"
import SearchBar from "../components/SearchBar/SearchBar";
import AutoHighlighter from "../components/Highlighter/AutoHighlighter";
import { useSearch } from "../context/SearchContext";
import Modal from "../components/ComponentesForm/Modal/modal";

function NewOKR() {
  const { setBusca } = useSearch();
  const cycleOptions = [
    { value: "Q1", label: "Q1" },
    { value: "Q2", label: "Q2" },
    { value: "Q3", label: "Q3" },
    { value: "Q4", label: "Q4" },
  ];

  const [titulo, setTitulo] = useState("");
  const [cycleTitle, setCicloTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [ciclo, setCiclo] = useState("");
  const [ano, setAno] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const limparCampos = () => {
    setTitulo("");
    setDescricao("");
    setCiclo("");
    setAno("");
    setCicloTitulo("");
  };

  const handleSave = async () => {
    try {
      await criarOKR({
        title: titulo,
        description: descricao,
        cycle_id: `${ciclo}-${ano}`,
      });
      limparCampos();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="page-layout">
      <SideBar typeUser={"Director"} nameUser={"Paulo"} />
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
          toolid={"titulo-okr"}
          tooltext={"Informe o objetivo principal da OKR. Exemplo: aumentar retencao, receita ou satisfacao do cliente."}
        />
        <FormTextarea
          title="Descrição"
          inside="Insira o contexto e Justificativa do objetivo..."
          tamanho="103px"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          toolid={"descricao-okr"}
          tooltext={"Descreva o contexto atual, a justificativa da meta e o resultado esperado no fim do ciclo."}
        />
        <FormInput
          title="Título do Ciclo"
          inside="EX: Ciclo Comercial 2026"
          value={cycleTitle}
          onChange={(e) => setCicloTitulo(e.target.value)}
          toolid={"titulo-ciclo-principal"}
          tooltext={"Nome do ciclo ao qual a OKR pertence. Exemplo: Ciclo de Crescimento 2026."}
        />

        <div className="ciclo">
          <button onClick={() => setIsOpen(true)} className="text-button">
            Criar novo Ciclo
          </button>
        </div>

        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Criar novo Ciclo"
        >
          <FormInput
            title="Titulo do Ciclo"
            inside="EX: Ciclo de Produto"
            value={cycleTitle}
            onChange={(e) => setCicloTitulo(e.target.value)}
            toolid={"titulo-ciclo-modal"}
            tooltext={"Defina um nome para identificar este ciclo. Exemplo: Ciclo de Produto 2026."}
          />
          <FormSelect
            title="Ciclo"
            inside="-- Selecione o trimestre --"
            value={ciclo}
            onChange={(e) => setCiclo(e.target.value)}
            opcoes={cycleOptions}
            toolid={"ciclo-trimestre"}
            tooltext={"Selecione o trimestre do ciclo: Q1, Q2, Q3 ou Q4."}
          />
          <FormInput
            title="Ano"
            inside="EX: 2026"
            value={ano}
            onChange={(e) => setAno(e.target.value)}
            toolid={"ano-ciclo"}
            tooltext={"Informe o ano de referencia do ciclo. Exemplo: 2026."}
          />
          <Button texto="Criar novo Ciclo" />
        </Modal>

        <div className="botoes-fixos">
          <Button texto="Limpar Campos" variante="branco" className="Limpar" onClick={limparCampos} />
          <Button texto="Salvar" className="Salvar" onClick={handleSave} />
        </div>
      </main>
    </div>
  );
}

export default NewOKR;