import React from "react";
import SideBar from "../components/Sidebar/SideBar";
import Entrada from "../components/Entrada/Entrada";
import OKRWorking from "../components/OKRWorking/OKRWorking";
import OKRConcluded from "../components/OKRConcluded/OKRConcluded";
import OKRMonitoring from "../components/OKRMonitoring/OKRMonitoring.jsx";
import { getOKR } from "../services/data/api_mock.js";
import ArcChart from "../components/OKRChart/OKRChart";
import Button from "../components/Button/Button";
import MainTitle from "../components/MainTitle/MainTitle";
import SearchBar from "../components/SearchBar/SearchBar";
import AutoHighlighter from "../components/Highlighter/AutoHighlighter";
import { useSearch } from "../context/SearchContext";


function Home() {

  const listaParaExibirOkr = getOKR();
  const { setBusca } = useSearch();

  return (
    <div className="page-layout">
      <SideBar typeUser="Director" nameUser={"Paulo"} />

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
            title="Olá, UserRequest!"
            subtitle="Acompanhe o desenvolvimento de seus projetos"
          />

          <SearchBar onSearch={(valor) => setBusca(valor)} />
        </div>


        {/* <Entrada userName="UserRequest" /> */}

        <div className="monitoring-container-okr">
          <div className="header-okr">
            <h3 className="title-card">OKR - Objetivos e Resultados-Chave</h3>
          </div>
          <div className="content-wrapper-okr">

            <div className="cards-row-okr">
              {listaParaExibirOkr.map((okr) => (
                <OKRMonitoring
                  key={okr.id}
                  id={okr.id}
                  porcentagem={okr.porcentagem}
                  prazo={okr.prazo}
                  descricao={okr.descricao}
                  botao={"Ver detalhes"}
                  rota={"/OKRDetails"}
                />
              ))}

            </div>
          </div>
        </div>

        <OKRConcluded />

      </main>
      <Button texto="Criar nova OKR" url="/NewOKR" variante="verde" className={"HomeDirector"} />

    </div>
  );
}

export default Home;

/*
    O Username precisa depois ser trocado pelo nome de usuário
    necessário da api do backend funcionando para isso
*/