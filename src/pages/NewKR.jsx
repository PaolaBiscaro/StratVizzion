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
  const [valorType, setValorType] = useState("number");

  const [okrs, setOkrs] = useState([]);

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

  const okrOptions = okrs.map((okr) => ({
    value: okr.id,
    label: okr.title,
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
    setValorType("number");
  };

  const handleSave = async () => {
    if (!okrId) {
      window.alert("Selecione uma OKR antes de salvar.");
      return;
    }
    try {
      await createKeyResult({
        okrId: Number(okrId),
        title: titulo,
        initialValue: Number(valorInicial),
        goalValue: Number(meta),
        currentValue: Number(valorAtual),
        unit: unidade,
        limitDate: limitDate || null,
        description: descricao,
      });
      limparCampos();
    } catch (error) {
      console.error("Erro ao criar Key Result:", error);
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
          <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
            <FormInput
              title="Valor Inicial"
              inside="EX: 0"
              value={valorInicial}
              onChange={(e) => setValorInicial(e.target.value)}
              toolid={"valor-inicial"}
              tooltext={"Valor atual ou ponto de partida do indicador."}
            />

            <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 8 }}>
              <span style={{ fontSize: 14, color: "#4A4A4D" }}>Tipo:</span>
              {[
                { key: "number", label: "Número" },
                { key: "percent", label: "%" },
                { key: "date", label: "Data" },
              ].map(({ key, label }) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setValorType(key)}
                  aria-pressed={valorType === key}
                  style={{
                    padding: "6px 10px",
                    borderRadius: 8,
                    border: valorType === key ? "2px solid #18B273" : "1px solid #D9E0E6",
                    background: valorType === key ? "#E9FBF0" : "#fff",
                    cursor: "pointer",
                  }}
                >
                  {label}
                </button>
              ))}
            </div>
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

        <div className="row" style={{ display: "flex", gap: 16, marginTop: 16 }}>
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
            <FormInput
              title="Data Limite"
              inside=""
              type="date"
              value={limitDate}
              onChange={(e) => setLimitDate(e.target.value)}
              toolid={"data-limite-kr"}
              tooltext={"Data limite para atingir este Key Result."}
            />
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