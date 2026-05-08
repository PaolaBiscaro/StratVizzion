export const getEquipes = () => {
  return [
    {
      id: 1,
      nome: "Gerar Relatorio Inteligente",
      dev: "Clara Almeira, Jonas Para, Maria Cecilia",
      cli: "Projeto A"
    },
    {
      id: 2,
      nome: "Monitoramento de KR",
      dev: "Marcos Souza, Julia Lima, Keila Recife, Johnattan Silva",
      cli: "Projeto B"
    },
    {
      id: 3,
      nome: "ChatBot de Atendimento",
      dev: "Sarah Pereira, João Silva, Marcos Antônio, Marcos Ferreira",
      cli: "Projeto C"
    },
    {
      id: 4,
      nome: "Controle de Estoque",
      dev: "MariaSarah, João Silveira, Marcos Enzo, Amelia Cristina",
      cli: "Projeto D"
    }
  ];
};

export const getOKR = () => {
  return [
    {
      id: "OKR_0001",
      porcentagem: 86,
      status: "Em andamento",
      ciclo: "Q1",
      ano: "2026",
      descricao: "Atingir R$ 500 mil em Novos Negócios até o final do trimestre."
    },
    {
      id: "OKR_0002",
      porcentagem: 20,
      status: "Em andamento",
      ciclo: "Q2",
      ano: "2026",
      descricao: "Reduzir o custo por aquisição (CPA) de R$45 para R$28"
    },
    {
      id: "OKR_0003",
      porcentagem: 100,
      status: "Concluído",
      ciclo: "Q2",
      ano: "2026",
      descricao: "Atingir taxa de conversão do onboarding de 40% para 62%"
    },
    {
      id: "OKR_0004",
      porcentagem: 0,
      status: "Não iniciado",
      ciclo: "Q3",
      ano: "2026",
      descricao: "Atingir R$ 500 mil em Novos Negócios até o final do trimestre."
    },
    {
      id: "OKR_0005",
      porcentagem: 0,
      status: "Não iniciado",
      ciclo: "Q4",
      ano: "2026",
      descricao: "Conseguir um aumento de 10% em novos clientes"
    },
  ];
};


export const keyResults = () => {
  return [
    {
      id: "KR_001",
      okrId: "OKR_0005",
      titulo: "Reduzir a taxa de erros e correções em 50%",
      descricao: "A taxa atualmente se encontra em 1 erro a cada 10 homologações; a meta é chegarmos a 1 erro a cada 20 homologações.",
      v_inicial: 10,
      v_final: 20

    },

    {
      id: "KR_002",
      okrId: "OKR_0005",
      titulo: "Reduzir o Lead Time de novas funcionalidades em 15%",
      descricao: "O tempo entre a definição do requisito e o deploy em produção é de 20 dias; a meta é otimizar o fluxo para 17 dias.",
      v_inicial: 20,
      v_final: 17
    },

    {
      id: "KR_003",
      okrId: "OKR_0003",
      titulo: "Melhorar a performance de carregamento do dashboard em 30%",
      descricao: "O tempo médio atual de carregamento (LCP) é de 3,5 segundos; a meta é atingir 2,45 segundos para otimizar a experiência do usuário final.",
      v_inicial: 3.5,
      v_final: 2.45
    },

    {
      id: "KR_004",
      okrId: "OKR_0002",
      titulo: "Reduzir o tempo médio de primeira resposta (FRT) em 20%",
      descricao: "Atualmente, o suporte leva em média 5 horas para o primeiro contato; a meta é reduzir para 4 horas através da automação de triagem.",
      v_inicial: 5,
      v_final: 4
    }
  ]
}


export const todasTarefasPendentes = () => {
  return [
    {
      key: "PROJA-01",
      summary: "Refatorar componente de filtro",
      status: "To Do",
      assignee: "Paola",
      projectKey: "Projeto A",
      kr: "OKR_0005"

    },
    {
      key: "PROJA-02",
      summary: "Ajustar alinhamento do eixo Y no CSS",
      status: "In Progress",
      assignee: "Clara Almeida",
      projectKey: "Projeto A",
      kr: "OKR_0004"
    },
    {
      key: "PROJA-03",
      summary: "Integrar mock de OKRs",
      status: "To Do",
      assignee: "Maria Lopes",
      projectKey: "Projeto A",
      kr: "OKR_0003"
    },

    {
      key: "PROJB-01",
      summary: "Definir metas para o Q3",
      status: "To Do",
      assignee: "João",
      projectKey: "Projeto B",
      kr: "OKR_0003"
    },
    {
      key: "PROJB-02",
      summary: "Corrigir cálculo de porcentagem",
      status: "In Progress",
      assignee: "Marcos Batista",
      projectKey: "Projeto B",
      kr: "OKR_0003"
    },

    {
      key: "PROJC-01",
      summary: "Treinar modelo de linguagem",
      status: "To Do",
      assignee: "Noelle da Cruz",
      projectKey: "Projeto C",
      kr: "OKR_0001"
    },
    {
      key: "PROJC-02",
      summary: "Configurar webhooks da API",
      status: "To Do",
      assignee: "Diego Pereira",
      projectKey: "Projeto C",
      kr: "OKR_0005"
    }
  ];
}



export const getProjetos = () => {
  return {
    "Projeto A": {
      id: "10001",
      key: "Projeto A",
      name: "Gerar Relatorio Inteligente",
      lead: "Paola",
      members: [
        { accountId: "u101", displayName: "Paola", role: "Lead Developer" },
        { accountId: "u102", displayName: "Clara Almeida", role: "Designer" },
        { accountId: "u102", displayName: "Maria Lopes", role: "Back-end" },
        { accountId: "u103", displayName: "Marcos Souza", role: "Back-end" }
      ]
    },
    "Projeto B": {
      id: "10002",
      key: "Projeto B",
      name: "Monitoramento de KR",
      lead: "João",
      members: [
        { accountId: "u101", displayName: "João", role: "Lead Developer" },
        { accountId: "u102", displayName: "Antonio Eduardo", role: "Designer" },
        { accountId: "u103", displayName: "Marcos Batista", role: "Back-end" }
      ]
    },
    "Projeto C": {
      id: "10003",
      key: "Projeto C",
      name: "ChatBot de Atendimento",
      lead: "Ronaldo",
      members: [
        { accountId: "u101", displayName: "Ronaldo", role: "Lead Developer" },
        { accountId: "u102", displayName: "Jessica Magalhães", role: "Designer" },
        { accountId: "u102", displayName: "Noelle da Cruz", role: "IA Engineer)" },
        { accountId: "u103", displayName: "Sergio Souza", role: "Back-end" },
        { accountId: "u103", displayName: "Diego Pereira", role: "Back-end" },
      ]

    },
  };
};

export const getProjetoByKey = (key) => {
  const projetos = getProjetos();
  return projetos[key] || null;
};

export const getAllProjetos = () => {
  return Object.values(getProjetos());
};


const listaParaExibirOkr = getOKR();
const listaParaExibirEquipes = getProjetos();

console.log(listaParaExibirOkr, listaParaExibirEquipes);