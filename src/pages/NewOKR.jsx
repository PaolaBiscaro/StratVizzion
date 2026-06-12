import React, { useState, useEffect } from "react";
import SideBar from "../components/Sidebar/SideBar";
import Button from "../components/Button/Button";
import MainTitle from "../components/MainTitle/MainTitle";
import "../styles/variables.css";
import FormSelect from "../components/ComponentesForm/FormSelect/FormSelect";
import FormInput from "../components/ComponentesForm/FormInput/FormInput";
import FormTextarea from "../components/ComponentesForm/FormTextarea/FormTextarea";
import SearchBar from "../components/SearchBar/SearchBar";
import AutoHighlighter from "../components/Highlighter/AutoHighlighter";
import { useSearch } from "../context/SearchContext";
import Modal from "../components/ComponentesForm/Modal/modal";
import { createOkr } from "../services/api/okrs";
import { createCycle, getCycles } from "../services/api/cycles";
import api from "../services/api/client";

const CYCLE_LABEL = { 1: "Q1", 2: "Q2", 3: "Q3", 4: "Q4" };

function NewOKR() {
  const { setBusca } = useSearch();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const cycleOptions = [
    { value: 1, label: "Q1" },
    { value: 2, label: "Q2" },
    { value: 3, label: "Q3" },
    { value: 4, label: "Q4" },
  ];

  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [tag, setTag] = useState("");
  const [cycleId, setCycleId] = useState("");
  const [managerId, setManagerId] = useState(user.id || null);

  const [cycles, setCycles] = useState([]);
  const [managers, setManagers] = useState([]);
  const [cicloEnum, setCicloEnum] = useState("");
  const [ano, setAno] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const fetchCycles = async () => {
    try {
      const { data } = await getCycles();
      setCycles(data);
    } catch (error) {
      console.error("Erro ao buscar ciclos:", error);
    }
  };

  const fetchManagers = async () => {
    try {
      const { data } = await api.get("/user");
  
      const onlyManagers = data.filter((u) => u.role?.Number() === 2);
      setManagers(onlyManagers.length > 0 ? onlyManagers : data);
    } catch (error) {
      console.error("Erro ao buscar managers:", error);
    }
  };

  useEffect(() => {
    fetchCycles();
    fetchManagers();
  }, []);

  const limparCampos = () => {
    setTitulo("");
    setDescricao("");
    setTag("");
    setCycleId("");
    setManagerId(user.id || null);
  };

  const handleCriarCiclo = async () => {
    try {
      await createCycle({
        cyclesEnum: Number(cicloEnum),
        year: Number(ano),
      });
      await fetchCycles();
      setIsOpen(false);
      setCicloEnum("");
      setAno("");
    } catch (error) {
      console.error("Erro ao criar ciclo:", error);
      window.alert("Erro ao criar ciclo.");
    }
  };

  const handleSave = async () => {
    if (!cycleId) {
      window.alert("Selecione um ciclo antes de salvar.");
      return;
    }
    if (!managerId) {
      window.alert("Selecione um manager antes de salvar.");
      return;
    }
    try {
      await createOkr({
        title: titulo,
        description: descricao,
        tag,
        cycleId: Number(cycleId),
        managerId: Number(managerId),
      });
      limparCampos();
    } catch (error) {
      console.error("Erro ao criar OKR:", error);
      window.alert("Erro ao salvar OKR.");
    }
  };

  const cycleSelectOptions = cycles.map((c) => ({
    value: c.id,
    label: `${CYCLE_LABEL[c.cyclesEnum]} / ${c.year}`,
  }));

  const managerSelectOptions = managers.map((m) => ({
    value: m.id,
    label: m.name,
  }));

  return (
    <div className="page-layout">
      <SideBar typeUser={"Director"} nameUser={user.name || "Usuário"} />
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
          tooltext={"Informe o objetivo principal da OKR."}
        />
        <FormTextarea
          title="Descrição"
          inside="Insira o contexto e justificativa do objetivo..."
          tamanho="103px"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          toolid={"descricao-okr"}
          tooltext={"Descreva o contexto atual, a justificativa da meta e o resultado esperado."}
        />
        <FormInput
          title="Tag"
          inside="EX: Crescimento, Produto, Financeiro"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          toolid={"tag-okr"}
          tooltext={"Adicione uma tag para categorizar a OKR."}
        />

        <FormSelect
          title="Ciclo"
          inside="-- Selecione um ciclo --"
          value={cycleId}
          onChange={(e) => setCycleId(e.target.value)}
          opcoes={cycleSelectOptions}
          toolid={"ciclo-okr"}
          tooltext={"Selecione o ciclo ao qual esta OKR pertence."}
        />

        <div className="ciclo">
          <button onClick={() => setIsOpen(true)} className="text-button">
            + Criar novo Ciclo
          </button>
        </div>

        <FormSelect
          title="Atribuir Manager"
          inside="-- Selecione um manager --"
          value={managerId}
          onChange={(e) => setManagerId(e.target.value)}
          opcoes={managerSelectOptions}
          toolid={"manager-okr"}
          tooltext={"Selecione o manager responsável por esta OKR."}
        />

        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Criar novo Ciclo"
        >
          <FormSelect
            title="Trimestre"
            inside="-- Selecione o trimestre --"
            value={cicloEnum}
            onChange={(e) => setCicloEnum(e.target.value)}
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
            tooltext={"Informe o ano de referência do ciclo."}
          />
          <Button texto="Criar Ciclo" onClick={handleCriarCiclo} />
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