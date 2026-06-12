import api from '../services/api';

const getLoggedUserId = () => {
    try {
        const userString = localStorage.getItem('user');
        if (userString) {
            const userObj = JSON.parse(userString);
            if (userObj && userObj.id) {
                return userObj.id;
            }
        }
    } catch (error) {
        console.error("Erro ao ler o ID do usuário do localStorage", error);
    }
    // Seu ID mapeado perfeitamente a partir da imagem image_69f796.png
    return "98e6457f-be1f-4dde-84b2-bd22c1fb8bf9"; 
};


// Retorna exclusivamente o seu perfil (Paola) para o relatório
export const getAllManagers = async () => {
    try {
        const response = await api.get('/user');
        const users = response.data || [];
        
        // Filtra estritamente para trazer apenas o seu papel (Role 2)
        const managers = users.filter(u => u.role === 2 || u.Role === 2);
        return managers;
    } catch (error) {
        console.error("Erro ao buscar lista de usuários de /user", error);
        return [];
    }
};

// Mantido e corrigido para priorizar você caso esteja logada
export const getManagerData = async () => {
    try {
        const response = await api.get('/user');
        const users = response.data || [];
        const loggedUserId = getLoggedUserId();
        
        const currentUser = users.find(u => u.id === loggedUserId || u.Id === loggedUserId);
        if (currentUser) return currentUser; // Se achou você logada, retorna você!
        
        const mainDirector = users.find(u => u.role === 1 || u.Role === 1);
        return mainDirector || null;
    } catch (error) {
        console.error("Erro ao buscar dados do manager de /user", error);
        return null;
    }
};
// ==========================================
// 1. ROTAS DE OKR
// ==========================================

export const getOkr = async (managerId = null) => {
    try {
        const url = managerId ? `/okr?managerId=${managerId}` : `/okr`;
        const response = await api.get(url);
        if (!response.data) return [];

        const okrsEnriquecidas = await Promise.all(response.data.map(async (o) => {
            const idBruto = o.Id || o.id;
            const statusBruto = o.Status !== undefined ? o.Status : o.status;
            const cycleIdBruto = o.CycleId || o.cycleId;
            const createdAtBruto = o.CreatedAt || o.createdAt;

            const idFormatado = `OKR_${String(idBruto).padStart(4, '0')}`;
            const cicloTexto = cycleIdBruto ? `Q${cycleIdBruto}` : 'Q1';
            const anoTexto = createdAtBruto ? new Date(createdAtBruto).getFullYear().toString() : '2026';

            let statusTexto = 'Em andamento';
            if (statusBruto === 2) statusTexto = 'Concluído';
            if (statusBruto === 0) statusTexto = 'Não iniciado';

            let metricasJira = { totalTasks: 0, completedTasks: 0, pendingTasks: 0, completionPercentage: 0 };
            let listaTarefas = [];

            try {
                const responseTasks = await api.get(`/api/JiraTask/okrs/${idBruto}`);
                if (responseTasks.data) {
                    metricasJira = responseTasks.data.metrics || metricasJira;
                    listaTarefas = responseTasks.data.tasks || [];
                }
            } catch (error) {
                console.warn(`Métricas do Jira não encontradas para a OKR ID ${idBruto}. Usando fallback.`, error);
            }

            return {
                id: idFormatado,
                title: o.Title || o.title || 'Sem título',
                description: o.Description || o.description || 'Sem descrição',
                status: statusTexto,
                ciclo: cicloTexto,
                ano: anoTexto,
                porcentagem_conclusao_real: metricasJira.completionPercentage ? `${metricasJira.completionPercentage}%` : "0.00%",
                total_tarefas: metricasJira.totalTasks,
                tarefas_concluidas: metricasJira.completedTasks,
                tarefas_pendentes: metricasJira.pendingTasks,
                peso_total_demandas: metricasJira.totalWeight || 0,
                peso_concluido_demandas: metricasJira.completedWeight || 0,
                detalhe_tarefas: listaTarefas.map(t => ({
                    chave: t.jiraIssueKey,
                    resumo: t.summary,
                    estado: t.status,
                    responsavel: t.assigneeName || "Não atribuído",
                    prioridade: t.priority,
                    atrasada: t.isDelayed ? "Sim" : "Não",
                    key_result_associada: t.keyResultTitle
                }))
            };
        }));

        return okrsEnriquecidas;
    } catch (error) {
        console.error('Erro ao buscar e formatar Okr', error);
        throw error;
    }
};

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

// ==========================================
// 2. ROTAS DO JIRA E TAREFAS (COM MANAGER DINÂMICO)
// ==========================================

// Atualizado para aceitar o ID do manager vindo do select do Diretor
export const getJiraProjectsRaw = async (targetManagerId = null) => {
    try {
        const userId = targetManagerId || getLoggedUserId();
        const response = await api.get(`/jira/projects/${userId}/projects`);
        return response.data?.projects || [];
    } catch (error) {
        console.error('Erro ao buscar lista crua de projetos do Jira', error);
        return [];
    }
};

export const getTeamByOkr = async (okrId, projetoSelecionado, targetManagerId = null) => {
    try {
        const userId = targetManagerId || getLoggedUserId();
        const response = await api.get(`/jira/projects/${userId}/projects`);
        const listaProjetos = response.data?.projects || [];

        const projetosFiltrados = projetoSelecionado && projetoSelecionado !== "TODOS"
            ? listaProjetos.filter(p => p.id === projetoSelecionado)
            : listaProjetos;

        return projetosFiltrados.map(proj => ({
            quadro_jira: proj.name,
            chave_projeto: proj.key,
            id_projeto: proj.id,
            tipo_escopo: proj.projectTypeKey,
            status_vinculo: okrId !== "TODAS" ? `Vinculado à OKR ${okrId}` : "Escopo Geral",
            gererente_id: userId
        }));

    } catch (error) {
        console.error('Erro ao processar equipes para o relatório', error);
        throw error;
    }
};

export const getKeyResultsByOkr = async (okrId) => {
    try {
        const idLimpo = String(okrId).includes('_') ? parseInt(okrId.split('_')[1], 10) : okrId;
        const urlOkr = okrId === "TODAS" ? 1 : idLimpo;

        const response = await api.get(`/api/JiraTask/okrs/${urlOkr}`);
        if (!response.data) return [];

        const m = response.data.metrics || {};
        const listaTarefas = response.data.tasks || [];

        return [{
            total_tarefas_sprint: m.totalTasks || 0,
            concluidas: m.completedTasks || 0,
            pendentes: m.pendingTasks || 0,
            porcentagem_conclusao: m.completionPercentage ? `${m.completionPercentage}%` : "0.00%",
            peso_total: m.totalWeight || 0,
            peso_concluido: m.completedWeight || 0,
            tarefas: listaTarefas.map(t => ({
                chave: t.jiraIssueKey,
                resumo: t.summary,
                estado: t.status,
                responsavel: t.assigneeName || "Não atribuído",
                prioridade: t.priority,
                atrasada: t.isDelayed ? "Sim" : "Não",
                key_result_associada: t.keyResultTitle
            }))
        }];
    } catch (error) {
        console.error('Erro ao buscar e estruturar Key Results por Okr', error);
        return [];
    }
};

export const getKrByOkr = getKeyResultsByOkr;

export const getTasksByOkr = async (okrId, projetoSelecionado, targetManagerId = null) => {
    try {
        const userId = targetManagerId || getLoggedUserId();
        const idLimpo = okrId.includes('_') ? parseInt(okrId.split('_')[1], 10) : okrId;
        const urlOkr = okrId === "TODAS" ? 1 : idLimpo;

        const response = await api.get(`/api/JiraTask/okrs/${urlOkr}`);
        if (!response.data) return [];

        const responseProjetos = await api.get(`/jira/projects/${userId}/projects`);
        const listaProjetos = responseProjetos.data?.projects || [];
        const projetoAtual = listaProjetos.find(p => p.id === projetoSelecionado);
        const nomeDoProjeto = projetoAtual ? projetoAtual.name : "Equipe Geral";
        const chaveProjeto = projetoAtual ? projetoAtual.key : null;

        let tarefasFiltradas = response.data.tasks || [];

        if (projetoSelecionado && projetoSelecionado !== "TODOS" && chaveProjeto) {
            tarefasFiltradas = tarefasFiltradas.filter(task =>
                task.jiraIssueKey && task.jiraIssueKey.toUpperCase().startsWith(`${chaveProjeto.toUpperCase()}-`)
            );
        }

        const totalTarefas = tarefasFiltradas.length;
        const concluidas = tarefasFiltradas.filter(t => t.status === "Concluído" || t.status === "Done").length;
        const pendentes = totalTarefas - concluidas;

        const porcentagemConclusao = totalTarefas > 0
            ? `${((concluidas / totalTarefas) * 100).toFixed(2)}%`
            : "0.00%";

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