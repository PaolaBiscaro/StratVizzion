import api from '../services/api';

// VARIÁVEL DE TESTE: Altere o ID aqui quando precisar trocar de usuário
const useridteste = "98e6457f-be1f-4dde-84b2-bd22c1fb8bf9";

// ==========================================
// 1. ROTAS DE OKR (Enriquecidas para o Relatório)
// ==========================================

export const getOkr = async () => {
    try {
        const response = await api.get(`/okr`);
        if (!response.data) return [];

        // Usamos Promise.all para buscar as tarefas e métricas de todas as OKRs em paralelo
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

            // 🔥 Chamada complementar à rota ideal que você descobriu (image_cacde9.png)
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

            // Retornamos o objeto com TODOS os metadados de negócio + volumetria real do Jira
            return {
                id: idFormatado,
                title: o.Title || o.title || 'Sem título',
                description: o.Description || o.description || 'Sem descrição',
                status: statusTexto,
                ciclo: cicloTexto,
                ano: anoTexto,
                // Injeção de dados analíticos para encorpar a análise do motor IA
                porcentagem_conclusao_real: metricasJira.completionPercentage ? `${metricasJira.completionPercentage}%` : "0.00%",
                total_tarefas: metricasJira.totalTasks,
                tarefas_concluidas: metricasJira.completedTasks,
                tarefas_pendentes: metricasJira.pendingTasks,
                peso_total_demandas: metricasJira.totalWeight || 0,
                peso_concluido_demandas: metricasJira.completedWeight || 0,
                // Lista resumida de demandas mapeadas para o Python ler as tabelas analíticas
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

// Retorna os dados puros do banco para o Select do seu FilterPopoverContent
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
// 2. ROTAS DO JIRA E TAREFAS
// ==========================================

export const getJiraProjectsRaw = async () => {
    try {
        const response = await api.get(`/jira/projects/${useridteste}/projects`);
        return response.data?.projects || [];
    } catch (error) {
        console.error('Erro ao buscar lista crua de projetos do Jira', error);
        return [];
    }
};

export const getTeamByOkr = async (okrId, projetoSelecionado) => {
    try {
        const response = await api.get(`/jira/projects/${useridteste}/projects`);
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
            gererente_id: useridteste
        }));

    } catch (error) {
        console.error('Erro ao processar equipes para o relatório', error);
        throw error;
    }
};
export const getKeyResultsByOkr = async (okrId) => {
    try {
        // Remove caracteres extras de formatação de ID caso existam (ex: OKR_0003 -> 3)
        const idLimpo = String(okrId).includes('_') ? parseInt(okrId.split('_')[1], 10) : okrId;
        const urlOkr = okrId === "TODAS" ? 1 : idLimpo;

        // 🔥 Chamando a rota analítica correta que contém "metrics" e "tasks"
        const response = await api.get(`/api/JiraTask/okrs/${urlOkr}`);
        
        if (!response.data) return [];

        const m = response.data.metrics || {};
        const listaTarefas = response.data.tasks || [];

        // Retorna mapeado no formato analítico que o Python espera para montar o relatório
        return [{
            total_tarefas_sprint: m.totalTasks || 0,
            concluidas: m.completedTasks || 0,
            pendentes: m.pendingTasks || 0,
            porcentagem_conclusao: m.completionPercentage ? `${m.completionPercentage}%` : "0.00%",
            peso_total: m.totalWeight || 0,
            peso_concluido: m.completedWeight || 0,
            // Lista detalhada que a IA usa para contextualizar os Key Results
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

// Mantém o alias caso outra parte do sistema utilize
export const getKrByOkr = getKeyResultsByOkr;
export const getTasksByOkr = async (okrId, projetoSelecionado) => {
    try {
        const idLimpo = okrId.includes('_') ? parseInt(okrId.split('_')[1], 10) : okrId;
        const urlOkr = okrId === "TODAS" ? 1 : idLimpo;

        const response = await api.get(`/api/JiraTask/okrs/${urlOkr}`);
        if (!response.data) return [];

        const responseProjetos = await api.get(`/jira/projects/${useridteste}/projects`);
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

