import React, { useState, useEffect } from "react";
import SideBar from "../components/Sidebar/SideBar";
import Button from "../components/Button/Button";
import MainTitle from "../components/MainTitle/MainTitle";
import FormSelect from "../components/ComponentesForm/FormSelect/FormSelect";
import FormInput from "../components/ComponentesForm/FormInput/FormInput";
import "../styles/variables.css";
import FormTextarea from "../components/ComponentesForm/FormTextarea/FormTextarea";
import SearchBar from "../components/SearchBar/SearchBar";
import AutoHighlighter from "../components/Highlighter/AutoHighlighter";
import { useSearch } from "../context/SearchContext";
import { getOkrs } from "../services/api/okrs";
import { createKeyResult } from "../services/api/keyresults";
import { getJiraProjectsByUser } from "../services/api/jira"; // ← novo import

function NewKR() {
  const { setBusca } = useSearch();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [okrId, setOkrId] = useState("");
  const [valorInicial, setValorInicial] = useState("");
  const [meta, setMeta] = useState("");
  const [valorAtual, setValorAtual] = useState("");
  const [unidade, setUnidade] = useState("");
  const [limitDate, setLimitDate] = useState("");

  const [okrs, setOkrs] = useState([]);

  // ← estados Jira
  const [jiraProjects, setJiraProjects] = useState([]);
  const [jiraProjectId, setJiraProjectId] = useState("");
  const [jiraLoading, setJiraLoading] = useState(false);

  useEffect(() => {
    const fetchOkrs = async () => {
      try {
        const { data } = await getOkrs();
        setOkrs(data);
      } catch (error) {
        console.error("Erro ao buscar OKRs:", error);
      }
    };
    fetchOkrs();
  }, []);

  // ← busca projetos Jira pelo userId
  useEffect(() => {
    if (!user?.id) return;

    const fetchJiraProjects = async () => {
      setJiraLoading(true);
      try {
        const { data } = await getJiraProjectsByUser(user.id);
        setJiraProjects(data);
      } catch (error) {
        console.error("Erro ao buscar projetos Jira:", error);
      } finally {
        setJiraLoading(false);
      }
    };

    fetchJiraProjects();
  }, [user?.id]);

  const okrOptions = okrs.map((okr) => ({
    value: okr.id,
    label: okr.title,
  }));

  // ← monta as opções do select igual ao de OKR
  const jiraOptions = jiraProjects.map((project) => ({
    value: project.id,
    label: `${project.name} (${project.key})`,
  }));

  const limparCampos = () => {
    setTitulo("");
    setDescricao("");
    setOkrId("");
    setValorInicial("");
    setMeta("");
    setValorAtual("");
    setUnidade("");
    setLimitDate("");
    setJiraProjectId(""); // ← limpa o Jira também
  };

  const handleSave = async () => {
    if (!okrId) {
      window.alert("Selecione uma OKR antes de salvar.");
      return;
    }
    try {
      await createKeyResult({
        okrId: Number(okrId),
        jiraProjectId: jiraProjectId ? Number(jiraProjectId) : 0, // ← usa o valor real
        title: titulo,
        initialValue: Number(valorInicial),
        goalValue: Number(meta),
        currentValue: Number(valorAtual),
        unit: unidade,
        limitDate: limitDate ? new Date(limitDate).toISOString() : null,
        description: descricao,
      });
      limparCampos();
    } catch (error) {
      console.log("Erro detalhado:", JSON.stringify(error.response?.data));
      window.alert("Erro ao salvar Key Result.");
    }
  };

  return (
    <div className="page-layout">
      <SideBar typeUser={"Manager"} nameUser={user.name || "Usuário"} />
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
          opcoes={okrOptions}
          title="Selecionar OKR"
          inside="-- Selecionar --"
          value={okrId}
          onChange={(e) => setOkrId(e.target.value)}
          toolid={"select-okr"}
          tooltext={"Selecione a OKR à qual este Key Result pertence."}
        />

        {/* ← campo Jira, mesmo padrão do FormSelect de OKR */}
        <FormSelect
          opcoes={jiraOptions}
          title={jiraLoading ? "Projeto Jira (carregando...)" : "Projeto Jira"}
          inside="-- Selecionar projeto --"
          value={jiraProjectId}
          onChange={(e) => setJiraProjectId(e.target.value)}
          toolid={"select-jira"}
          tooltext={"Vincule este Key Result a um projeto no Jira (opcional)."}
        />

        <FormInput
          title="Título do Key Result"
          inside="EX: Aumentar DAU de 50k para 75k"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          toolid={"titulo-kr"}
          tooltext={"Digite um título curto e claro para o Key Result."}
        />

        <FormTextarea
          title="Descrição"
          inside="Insira o contexto e justificativa da Key Result..."
          tamanho="150px"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          toolid={"descricao-kr"}
          tooltext={"Explique o que esse KR mede e por que é importante."}
        />

        <div className="row" style={{ display: "flex", gap: 16 }}>
          <div style={{ flex: 1 }}>
            <FormInput
              title="Valor Inicial"
              inside="EX: 0"
              value={valorInicial}
              onChange={(e) => setValorInicial(e.target.value)}
              toolid={"valor-inicial"}
              tooltext={"Valor atual ou ponto de partida do indicador."}
            />
          </div>
          <div style={{ flex: 1 }}>
            <FormInput
              title="Meta"
              inside="EX: 100"
              value={meta}
              onChange={(e) => setMeta(e.target.value)}
              toolid={"meta-kr"}
              tooltext={"Valor alvo que define sucesso para este Key Result."}
            />
          </div>
        </div>

        <div className="row" style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
          <div style={{ flex: 1 }}>
            <FormInput
              title="Valor Atual"
              inside="EX: 25"
              value={valorAtual}
              onChange={(e) => setValorAtual(e.target.value)}
              toolid={"valor-atual"}
              tooltext={"Valor atual do indicador no momento do cadastro."}
            />
          </div>
          <div style={{ flex: 1 }}>
            <FormInput
              title="Unidade"
              inside="EX: %, R$, usuários"
              value={unidade}
              onChange={(e) => setUnidade(e.target.value)}
              toolid={"unidade-kr"}
              tooltext={"Unidade de medida do indicador."}
            />
          </div>
          <div style={{ flex: 1 }}>
            <div className="float-menu-formInput">
              <div>
                <label className="label-formInput">Data Limite</label>
              </div>
              <input
                type="date"
                value={limitDate}
                onChange={(e) => setLimitDate(e.target.value)}
                className="input-formInput"
              />
            </div>
          </div>
        </div>
      </main>

      <div className="botoes-fixos">
        <Button texto="Limpar Campos" variante="branco" className="Limpar" onClick={limparCampos} />
        <Button texto="Salvar" className="Salvar" onClick={handleSave} />
      </div>
    </div>
  );
}

export default NewKR;