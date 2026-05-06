[
  {
    "selected_field": "Equipes",
    "selected": 1,
    "filter": [],
    "dados_banco": {
      "Users": [
        { "id": 1, "name": "Paola", "email": "paola@empresa.com", "role": "Lead Developer", "squad_name": "Gerar Relatorio Inteligente", "is_manager": true, "manager_id": null, "created_at": "2025-01-15T08:30:00Z" },
        { "id": 2, "name": "Clara Almeida", "email": "clara@empresa.com", "role": "Designer", "squad_name": "Gerar Relatorio Inteligente", "is_manager": false, "manager_id": 1, "created_at": "2025-02-20T09:00:00Z" },
        { "id": 3, "name": "Maria Lopes", "email": "maria@empresa.com", "role": "Back-end", "squad_name": "Gerar Relatorio Inteligente", "is_manager": false, "manager_id": 1, "created_at": "2025-03-10T10:00:00Z" },
        { "id": 4, "name": "Marcos Souza", "email": "marcos@empresa.com", "role": "Back-end", "squad_name": "Gerar Relatorio Inteligente", "is_manager": false, "manager_id": 1, "created_at": "2025-03-15T14:00:00Z" }
      ]
    }
  },
  {
    "selected_field": "Visão geral das OKR",
    "selected": 1,
    "filter": [
      {
        "id": "OKR_0001"
      }
    ],
    "dados_banco": {
      "OKRs": [
        { "id": "OKR_0001", "cycle_id": 10, "title": "Atingir R$ 500 mil em Novos Negócios", "description": "Foco em expansão B2B no trimestre", "manager_id": 5, "goal_progression": 86.0, "period": "simulado", "created_at": "2026-01-05T10:00:00Z" }
      ],
      "Cycles": [
        { "id": 10, "name": "Ciclo Q1-2026", "quarter_name": "Q1", "is_current_quarter": false, "year": 2026 }
      ]
    }
  },
  {
    "selected_field": "Progresso do projeto",
    "selected": 1,
    "filter": [{
        "id": "10001",
        "key": "Projeto A"
    }],
    "dados_banco": {
      "Jira_Projects": [
        { "id": 50, "external_id": "10001", "project_key": "PROJA", "name": "Gerar Relatorio Inteligente", "last_sync": "2026-05-02T18:00:00Z" }
      ],
      "Jira_Tasks": [
        { "id": 5001, "external_key": "PROJA-01", "summary": "Refatorar componente de filtro", "project_id": 50, "user_id": 1, "kr_id": 205, "issue_type": "Task", "status_name": "To Do", "priority_name": "High", "story_points": 5, "assignee_account_id": "u101", "created_at": "2026-04-10T14:00:00Z", "resolved_at": null, "updated_at": "2026-04-15T09:30:00Z" },
        { "id": 5002, "external_key": "PROJA-02", "summary": "Ajustar alinhamento do eixo Y no CSS", "project_id": 50, "user_id": 2, "kr_id": 204, "issue_type": "Sub-task", "status_name": "In Progress", "priority_name": "Medium", "story_points": 3, "assignee_account_id": "u102", "created_at": "2026-04-12T10:00:00Z", "resolved_at": null, "updated_at": "2026-04-20T11:00:00Z" },
        { "id": 5003, "external_key": "PROJA-03", "summary": "Integrar mock de OKRs", "project_id": 50, "user_id": 3, "kr_id": 203, "issue_type": "Task", "status_name": "To Do", "priority_name": "Medium", "story_points": 5, "assignee_account_id": "u102", "created_at": "2026-04-25T09:00:00Z", "resolved_at": null, "updated_at": "2026-04-28T16:00:00Z" }
      ]
    }
  },
  {
    "selected_field": "Todos os projetos",
    "selected": 1,
    "filter": [],
    "dados_banco": {
      "Jira_Projects": [
        { "id": 50, "external_id": "10001", "project_key": "PROJA", "name": "Gerar Relatorio Inteligente", "last_sync": "2026-05-02T18:00:00Z" },
        { "id": 51, "external_id": "10002", "project_key": "PROJB", "name": "Monitoramento de KR", "last_sync": "2026-05-02T18:05:00Z" },
        { "id": 52, "external_id": "10003", "project_key": "PROJC", "name": "ChatBot de Atendimento", "last_sync": "2026-05-02T18:10:00Z" }
      ],
      "Jira_Sync_Config": [
        { "id": 5, "user_id": 1, "project_key": "PROJA", "jql_url": "project = PROJA AND status != Closed", "last_sync": "2026-05-02T18:00:00Z" },
        { "id": 6, "user_id": 3, "project_key": "PROJB", "jql_url": "project = PROJB AND status != Closed", "last_sync": "2026-05-02T18:05:00Z" },
        { "id": 7, "user_id": 4, "project_key": "PROJC", "jql_url": "project = PROJC AND status != Closed", "last_sync": "2026-05-02T18:10:00Z" }
      ]
    }
  },
  {
    "selected_field": "Histórico de OKR",
    "selected": 1,
    "filter": [],
    "dados_banco": {
      "Metrics_History": [
        { "id": 9001, "target_id": 101, "type": "OKR", "captured_value": 40.0, "recorded_at": "2026-02-01T10:00:00Z" },
        { "id": 9002, "target_id": 101, "type": "OKR", "captured_value": 75.0, "recorded_at": "2026-03-01T10:00:00Z" },
        { "id": 9003, "target_id": 101, "type": "OKR", "captured_value": 86.0, "recorded_at": "2026-04-01T10:00:00Z" },
        { "id": 9004, "target_id": 102, "type": "OKR", "captured_value": 10.0, "recorded_at": "2026-04-15T10:00:00Z" },
        { "id": 9005, "target_id": 102, "type": "OKR", "captured_value": 20.0, "recorded_at": "2026-05-01T10:00:00Z" },
        { "id": 9006, "target_id": 103, "type": "OKR", "captured_value": 50.0, "recorded_at": "2026-04-01T10:00:00Z" },
        { "id": 9007, "target_id": 103, "type": "OKR", "captured_value": 100.0, "recorded_at": "2026-05-01T10:00:00Z" },
        { "id": 9008, "target_id": 104, "type": "OKR", "captured_value": 0.0, "recorded_at": "2026-05-01T10:00:00Z" },
        { "id": 9009, "target_id": 105, "type": "OKR", "captured_value": 0.0, "recorded_at": "2026-05-01T10:00:00Z" }
      ]
    }
  },
  {
    "selected_field": "Key Results",
    "selected": 1,
    "filter": [],
    "dados_banco": {
      "Key_Results": [
        { "id": 201, "okr_id": 105, "title": "Reduzir a taxa de erros e correções em 50%", "description": "A taxa atualmente se encontra em 1 erro a cada 10 homologações; a meta é chegarmos a 1 erro a cada 20 homologações.", "initial_value": 10.0, "goal_value": 20.0, "current_value": 14.0, "unit": "erros/homologações", "limit_date": "2026-12-31T23:59:59Z", "last_updated": "2026-05-01T15:20:00Z" },
        { "id": 202, "okr_id": 105, "title": "Reduzir o Lead Time de novas funcionalidades em 15%", "description": "O tempo entre a definição do requisito e o deploy em produção é de 20 dias; a meta é otimizar o fluxo para 17 dias.", "initial_value": 20.0, "goal_value": 17.0, "current_value": 19.0, "unit": "dias", "limit_date": "2026-12-31T23:59:59Z", "last_updated": "2026-05-01T15:20:00Z" },
        { "id": 203, "okr_id": 103, "title": "Melhorar a performance de carregamento do dashboard em 30%", "description": "O tempo médio atual de carregamento (LCP) é de 3,5 segundos; a meta é atingir 2,45 segundos para otimizar a experiência do usuário final.", "initial_value": 3.5, "goal_value": 2.45, "current_value": 2.45, "unit": "segundos", "limit_date": "2026-06-30T23:59:59Z", "last_updated": "2026-05-01T15:20:00Z" },
        { "id": 204, "okr_id": 102, "title": "Reduzir o tempo médio de primeira resposta (FRT) em 20%", "description": "Atualmente, o suporte leva em média 5 horas para o primeiro contato; a meta é reduzir para 4 horas através da automação de triagem.", "initial_value": 5.0, "goal_value": 4.0, "current_value": 4.8, "unit": "horas", "limit_date": "2026-06-30T23:59:59Z", "last_updated": "2026-05-01T15:20:00Z" }
      ],
      "Metrics_History": [
        { "id": 9010, "target_id": 201, "type": "KR", "captured_value": 10.0, "recorded_at": "2026-01-10T09:00:00Z" },
        { "id": 9011, "target_id": 201, "type": "KR", "captured_value": 12.0, "recorded_at": "2026-03-15T14:00:00Z" },
        { "id": 9012, "target_id": 201, "type": "KR", "captured_value": 14.0, "recorded_at": "2026-05-01T15:20:00Z" },
        { "id": 9013, "target_id": 202, "type": "KR", "captured_value": 20.0, "recorded_at": "2026-01-10T09:00:00Z" },
        { "id": 9014, "target_id": 202, "type": "KR", "captured_value": 19.0, "recorded_at": "2026-05-01T15:20:00Z" },
        { "id": 9015, "target_id": 203, "type": "KR", "captured_value": 3.5, "recorded_at": "2026-01-10T09:00:00Z" },
        { "id": 9016, "target_id": 203, "type": "KR", "captured_value": 2.45, "recorded_at": "2026-05-01T15:20:00Z" },
        { "id": 9017, "target_id": 204, "type": "KR", "captured_value": 5.0, "recorded_at": "2026-01-10T09:00:00Z" },
        { "id": 9018, "target_id": 204, "type": "KR", "captured_value": 4.8, "recorded_at": "2026-05-01T15:20:00Z" }
      ]
    }
  }
]