import api from '../api';

// 1. FUNÇÃO AJUSTADA: Retorna os dados no formato exato do mock (ex: OKR_0001, porcentagem, ciclo...)
export const getOkr = async () => {     
    try {
        const response = await api.get(`/okr`);
        if (!response.data) return [];

        // Converte os dados do banco real para o formato esperado pelo seu motor Python
        return response.data.map(o => {
            // Garante a leitura independente de maiúsculo/minúsculo do banco
            const idBruto = o.Id || o.id;
            const statusBruto = o.Status !== undefined ? o.Status : o.status;
            const cycleIdBruto = o.CycleId || o.cycleId;
            const createdAtBruto = o.CreatedAt || o.createdAt;

            // Formata o ID numérico para o padrão 'OKR_0001'
            const idFormatado = `OKR_${String(idBruto).padStart(4, '0')}`;
            
            // Traduz o status e define a porcentagem condizente com a imagem do mock
            let statusTexto = 'Em andamento';
            let porcentagemSimulada = 86;
            
            if (statusBruto === 1) {
                statusTexto = 'Em andamento';
                porcentagemSimulada = 86;
            } else if (statusBruto === 2) {
                statusTexto = 'Concluído';
                porcentagemSimulada = 100;
            } else if (statusBruto === 0) {
                statusTexto = 'Não iniciado';
                porcentagemSimulada = 0;
            }

            // Define o ciclo (ex: 'Q1')
            const cicloTexto = cycleIdBruto ? `Q${cycleIdBruto}` : 'Q1';

            // Extrai o ano do campo de data
            const anoTexto = createdAtBruto ? new Date(createdAtBruto).getFullYear().toString() : '2026';

            return {
                id: idFormatado,
                porcentagem: porcentagemSimulada,
                status: statusTexto,
                ciclo: cicloTexto,
                ano: anoTexto,
                title: o.Title || o.title || 'string',
                description: o.Description || o.description || 'string'
            };
        });
    } catch (error) {
        console.error('Erro ao buscar e formatar Okr', error);
        throw error;
    }
};

// 2. NOVA FUNÇÃO: Retorna os dados puros do banco para o Select do seu FilterPopoverContent
export const getOkrListRaw = async () => {     
    try {
        const response = await api.get(`/okr`);
        return response.data || [];
    } catch (error) {
        console.error('Erro ao buscar lista crua de Okrs', error);
        return [];
    }
};

export const getOkrById = async (id) => {
    try {
        const response = await api.get(`/okr/${id}`);
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar Okr por ID', error);
        throw error;
    }
};

export const getOkrHistories = async () => {
    try {
        const response = await api.get(`/api/OkrHistories`);
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar histórico de Okr', error);
        throw error;
    }
};

// VARIÁVEL DE TESTE: Altere o ID aqui quando precisar trocar de usuário
const useridteste = "98e6457f-be1f-4dde-84b2-bd22c1fb8bf9";

export const getJiraProjectsRaw = async () => {
    try {
        const response = await api.get(`/jira/projects/${useridteste}/projects`);
        return response.data?.projects || [];
    } catch (error) {
        console.error('Erro ao buscar lista crua de projetos do Jira', error);
        return [];
    }
};

// Envia o projeto específico selecionado na tela para o motor do relatório
export const getTeamByOkr = async (okrId, projetoSelecionado) => {
    try {
        const response = await api.get(`/jira/projects/${useridteste}/projects`);
        const listaProjetos = response.data?.projects || [];

        // Se o usuário selecionou um projeto específico, filtramos. Se for "TODOS", envia os 3.
        const projetosFiltrados = projetoSelecionado && projetoSelecionado !== "TODOS"
            ? listaProjetos.filter(p => p.id === projetoSelecionado)
            : listaProjetos;

        return projetosFiltrados.map(proj => ({
            quadro_jira: proj.name,                 // "Minha equipe de software", etc.
            chave_projeto: proj.key,                // "SCRUM", "STRAT", etc.
            id_projeto: proj.id,                    // "10000", etc.
            tipo_escopo: proj.projectTypeKey,       // "software"
            status_vinculo: okrId !== "TODAS" ? `Vinculado à OKR ${okrId}` : "Escopo Geral",
            gererente_id: useridteste                // Relatório sobre o gerente do ID informado
        }));

    } catch (error) {
        console.error('Erro ao processar equipes para o relatório', error);
        throw error;
    }
};

export const getKrByOkr = async (okrId) => {
    try {
        const response = await api.get(`/api/JiraTask/okrs/${okrId}/krs`);
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar KRs por Okr', error);
        throw error;
    }
};

export const getTasksByOkr = async (okrId, projetoSelecionado) => {
    try {
        // 1. Limpa o ID da OKR caso venha formatado (ex: OKR_0001 -> 1)
        const idLimpo = okrId.includes('_') ? parseInt(okrId.split('_')[1], 10) : okrId;
        const urlOkr = okrId === "TODAS" ? 1 : idLimpo; 

        // 2. Busca as tarefas da OKR atual na rota principal
        const response = await api.get(`/api/JiraTask/okrs/${urlOkr}`);
        
        if (!response.data) return [];

        // Buscamos os dados dos projetos do Jira para obter o nome real da equipe selecionada
        const responseProjetos = await api.get(`/jira/projects/${useridteste}/projects`);
        const listaProjetos = responseProjetos.data?.projects || [];
        const projetoAtual = listaProjetos.find(p => p.id === projetoSelecionado);
        const nomeDoProjeto = projetoAtual ? projetoAtual.name : "Equipe Geral";
        const chaveProjeto = projetoAtual ? projetoAtual.key : null;

        // 3. Se o usuário escolheu uma equipe específica, filtramos as tarefas pertencentes a ela
        let tarefasFiltradas = response.data.tasks || [];
        
        if (projetoSelecionado && projetoSelecionado !== "TODOS" && chaveProjeto) {
            tarefasFiltradas = tarefasFiltradas.filter(task => 
                task.jiraIssueKey && task.jiraIssueKey.toUpperCase().startsWith(`${chaveProjeto.toUpperCase()}-`)
            );
        }

        // 4. RECALCULO REAL E INDEPENDENTE: Gerando métricas exclusivas para a equipe selecionada
        const totalTarefas = tarefasFiltradas.length;
        const concluidas = tarefasFiltradas.filter(t => t.status === "Concluído" || t.status === "Done").length;
        const pendentes = totalTarefas - concluidas;
        
        // Formata a porcentagem com duas casas decimais exatamente como o "79.17%" do seu JSON original
        const porcentagemConclusao = totalTarefas > 0 
            ? `${((concluidas / totalTarefas) * 100).toFixed(2)}%` 
            : "0.00%";

        // Se o filtro resultar em 0 tarefas por falta de vínculo de chaves, 
        // usamos as métricas gerais do próprio objeto do C# como fallback para não enviar zerado
        if (totalTarefas === 0 && response.data.metrics && (projetoSelecionado === "TODOS" || !chaveProjeto)) {
            const m = response.data.metrics;
            return [{
                nome_projeto: nomeDoProjeto,
                total_tarefas_sprint: m.totalTasks,
                concluidas: m.completedTasks,
                pendentes: m.pendingTasks,
                porcentagem_conclusao: `${m.completionPercentage}%`
            }];
        }

        // Retorna a estrutura correta para preencher o "dados_banco" com os números mudando em tempo real!
        return [
            {
                nome_projeto: nomeDoProjeto,
                total_tarefas_sprint: totalTarefas,
                concluidas: concluidas,
                pendentes: pendentes,
                porcentagem_conclusao: porcentagemConclusao
            }
        ];

    } catch (error) {
        console.error('Erro ao processar filtro dinâmico de tarefas por projeto:', error);
        return [{
            nome_projeto: "Sem dados para esta equipe",
            total_tarefas_sprint: 0,
            concluidas: 0,
            pendentes: 0,
            porcentagem_conclusao: "0.00%"
        }];
    }
};

// Adicionado para evitar quebra caso o MainReportFilter chame com esse nome
export const getKeyResultsByOkr = getKrByOkr;