import React, { useState, useEffect } from 'react';
import SideBar from '../components/Sidebar/SideBar.jsx';
import MainTitle from '../components/MainTitle/MainTitle.jsx';
import SearchBar from "../components/SearchBar/SearchBar";
import AutoHighlighter from "../components/Highlighter/AutoHighlighter";
import { useSearch } from "../context/SearchContext";
import TeamStats from '../components/TeamStats/TeamStats.jsx';
import OKRMonitoring from '../components/OKRMonitoring/OKRMonitoring.jsx';
import FilterHome from '../components/FilterHome/FilterHome.jsx';
import MembersPanel from '../components/MembersPanel/MembersPanel.jsx';
import Button from '../components/Button/Button.jsx';
import { getUsers } from "../services/api/user";
import { getJiraProjects, getOkrsDropdown, getOkrMetrics, syncJiraTasks} from "../services/api/manager";

import '../styles/HomeManager.css';
import '../styles/variables.css';

const HomeManager = () => {
  const { setBusca } = useSearch();
  const [mostrarConcluidas, setMostrarConcluidas] = useState(false);
  const [ordenarMaior, setOrdenarMaior] = useState(false);
  const [trimestre, setTrimestre] = useState('Todos');
  const [ano, setAno] = useState('2026');

  const [userData, setUserData] = useState(null);
  const [okrsList, setOkrsList] = useState([]);
  const [projetosJira, setProjetosJira] = useState([]);
  const [projetoSelecionado, setProjetoSelecionado] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOkrId, setSelectedOkrId] = useState("");
  const [isSyncing, setIsSyncing] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0); // Faltava esse estado para o botão de sync funcionar!

  useEffect(() => {
    const carregarDadosIniciais = async () => {
      try {
        const userResponse = await getUsers();
        const user = userResponse.data;
        setUserData(user);

        if (user && user.id && user.jiraBaseUrl) {
          const [projetosResponse, okrsResponse] = await Promise.all([
            getJiraProjects(user.id, user.jiraBaseUrl),
            // AQUI ESTÁ A MUDANÇA: Passamos o user.id como managerId!
            getOkrsDropdown(user.id) 
          ]);

          const listaProjetos = projetosResponse.data?.projects || [];
          setProjetosJira(listaProjetos);

          if (listaProjetos.length > 0) {
            setProjetoSelecionado(listaProjetos[0].name);
          }

          const listaOkrsExtraida = okrsResponse.data || [];

          const okrsComProgresso = await Promise.all(
            listaOkrsExtraida.map(async (okr) => {
              try {
                const historyResponse = await getOkrMetrics(okr.id);
                const historico = historyResponse.data && historyResponse.data.length > 0
                  ? historyResponse.data[0]
                  : null;

                return {
                  ...okr,
                  progressPercentage: historico ? historico.progressPercentage : 0
                };
              } catch (error) {
                console.error(`Erro ao buscar histórico da OKR ${okr.id}:`, error);
                return { ...okr, progressPercentage: 0 };
              }
            })
          );

          setOkrsList(okrsComProgresso);
        }
      } catch (error) {
        console.error("Erro ao carregar os dados da Home:", error);
      } finally {
        setIsLoading(false);
      }
    };

    carregarDadosIniciais();
  }, [refreshTrigger]); // Adicionei o refreshTrigger aqui para recarregar a lista caso o gerente clique em sincronizar

  const traduzirCiclo = (id) => {
    const ciclos = {
      1: "Q1",
      2: "Q2",
      3: "Q3",
      4: "Q4",
    };

    return ciclos[id] || id;
  };

  const handleSync = async () => {
        setIsSyncing(true); // Muda o botão para "Sincronizando..."
        try {
            await syncJiraTasks(selectedOkrId); // Usa o selectedOkrId ou outro ID dependendo do que for sincronizar
            setRefreshTrigger(prev => prev + 1);
        } catch (error) {
            console.error("Erro ao sincronizar tarefas com o Jira:", error);
        } finally {
            setIsSyncing(false);
        }
    };

  let okrsFiltradas = okrsList.filter((okr) => {
    const okrAno = okr.createdAt ? String(okr.createdAt).substring(0, 4) : '2026';

    const okrCiclo = traduzirCiclo(okr.cycleId);

    const okrStatus = okr.status;

    if (okrAno !== ano) return false;

    if (trimestre !== "Todos" && okrCiclo !== trimestre) return false;

    const isConcluida = okrStatus === 2 || okrStatus === 3;

    if (mostrarConcluidas) {
      return isConcluida;
    } else {
      return !isConcluida;
    }
  });

  if (ordenarMaior) {
    okrsFiltradas.sort((a, b) => {
      const valA = a.porcentagem || a.progressPercentage || 0;
      const valB = b.porcentagem || b.progressPercentage || 0;
      return valB - valA;
    });
  }

  if (isLoading) return <div>Carregando dashboard...</div>;

  const primeiroNome = userData?.name ? userData.name.split(" ")[0] : "Usuário";


  return (
    <div className="dashboard-layout">
      <SideBar />

      <main className="dashboard-main">
        <AutoHighlighter />

        <div className="dashboard-header">
          <MainTitle
            title={`Olá, ${primeiroNome}!`}
            subtitle="Acompanhe o desenvolvimento de seus projetos"
          />
          <div className="header-actions">
            <SearchBar onSearch={(valor) => setBusca(valor)} />
          </div>
        </div>

        <div className="dashboard-content-wrapper">
          <div className="dashboard-left-column">

            <TeamStats
              equipeNome={projetoSelecionado}
              okrs={okrsList}
              selectedOkrId={selectedOkrId}
              setSelectedOkrId={setSelectedOkrId}
            />

            <div className="home-okr-header">
              <h3 className="home-okr-title">Visualização das OKR's - 2026</h3>
              <FilterHome
                mostrarConcluidas={mostrarConcluidas}
                setMostrarConcluidas={setMostrarConcluidas}
                ordenarMaior={ordenarMaior}
                setOrdenarMaior={setOrdenarMaior}
                trimestre={trimestre}
                setTrimestre={setTrimestre}
                ano={ano}
                setAno={setAno}
              />
            </div>

            <div className="monitoring-container-okr">
              <div className="home-cards-grid">
                {okrsFiltradas.length > 0 ? (
                  okrsFiltradas.map((okr) => {
                    const anoCriacao = okr.createdAt ? String(okr.createdAt).substring(0, 4) : '2026';

                    return (
                      <OKRMonitoring
                        key={okr.id}
                        porcentagem={Math.round(okr.progressPercentage || 0)}
                        prazo={`${traduzirCiclo(okr.cycleId)}/${okr.createdAt ? String(okr.createdAt).substring(0, 4) : '2026'}`}
                        descricao={okr.description || "OKR sem descrição"}
                        botao="Ver detalhes"
                        titulo={okr.title || "OKR sem título"}
                      />
                    );
                  })
                ) : (
                  <p style={{ padding: "20px", color: "#666" }}>Nenhuma OKR encontrada para estes filtros.</p>
                )}
              </div>
            </div>
          </div>

          <div className="dashboard-right-column">
            <MembersPanel okrId={selectedOkrId} />
            <div className="home-btn-wrapper">
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomeManager;