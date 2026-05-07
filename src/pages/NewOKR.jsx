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
          toolId={"titulo"}
          toolText={"Digite o objetivo final que você deseja EX: Aumentar retenção de usuários ativos"}
        />
        <FormTextarea
          title="Descrição"
          inside="Insira o contexto e Justificativa do objetivo..."
          tamanho="103px"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          toolId={"descricao"}
          toolText={"Descreva os objetivos da sua meta, o contexto atual e o porque atingir essa meta"}
        />
        <FormSelect title="Selecione um Título" />

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
          <FormInput title="Titulo do Ciclo" />
          <FormSelect title="Ciclo" />
          <FormInput title="Ano" />
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