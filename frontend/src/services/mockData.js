export const vagas = [
  { id: "v1", empresa: "Synapse Tech Soluções Digitais", area: "Desenvolvimento Web", local: "João Pessoa/PB", modalidade: "Híbrido", bolsa: "R$ 1.200,00", carga: "20h/semana", vagasDisp: 2, descricao: "Atuação no desenvolvimento e manutenção de sistemas web internos utilizando React e Node.js.", candidatado: true },
  { id: "v2", empresa: "AgroData Sistemas", area: "Ciência de Dados", local: "Campina Grande/PB", modalidade: "Remoto", bolsa: "R$ 1.100,00", carga: "20h/semana", vagasDisp: 1, descricao: "Análise de dados agrícolas e construção de dashboards para apoio à tomada de decisão.", candidatado: true },
  { id: "v3", empresa: "Prefeitura Municipal de João Pessoa", area: "Suporte de TI", local: "João Pessoa/PB", modalidade: "Presencial", bolsa: "R$ 900,00", carga: "30h/semana", vagasDisp: 3, descricao: "Suporte técnico aos setores administrativos e manutenção de equipamentos e redes.", candidatado: false },
  { id: "v4", empresa: "NuvemCerta Cloud Solutions", area: "DevOps & Infraestrutura", local: "Remoto", modalidade: "Remoto", bolsa: "R$ 1.300,00", carga: "20h/semana", vagasDisp: 1, descricao: "Apoio na automação de pipelines de CI/CD e monitoramento de infraestrutura em nuvem.", candidatado: true },
  { id: "v5", empresa: "Hospital Universitário Lauro Wanderley", area: "Sistemas de Informação em Saúde", local: "João Pessoa/PB", modalidade: "Presencial", bolsa: "R$ 950,00", carga: "25h/semana", vagasDisp: 2, descricao: "Apoio na gestão de prontuários eletrônicos e sistemas de agendamento hospitalar.", candidatado: false },
  { id: "v6", empresa: "Fintera Pagamentos", area: "Desenvolvimento Backend", local: "Remoto", modalidade: "Remoto", bolsa: "R$ 1.250,00", carga: "20h/semana", vagasDisp: 1, descricao: "Desenvolvimento de APIs para processamento de pagamentos utilizando Java e Spring Boot.", candidatado: true },
  { id: "v7", empresa: "EducaMais Plataforma de Ensino", area: "QA e Testes de Software", local: "Campina Grande/PB", modalidade: "Híbrido", bolsa: "R$ 1.000,00", carga: "20h/semana", vagasDisp: 2, descricao: "Elaboração e execução de planos de teste para plataforma de ensino a distância.", candidatado: true },
  { id: "v8", empresa: "Instituto de Pesquisa Tecnológica IFPB", area: "Iniciação Científica em IA", local: "João Pessoa/PB", modalidade: "Presencial", bolsa: "R$ 800,00", carga: "15h/semana", vagasDisp: 4, descricao: "Participação em projeto de pesquisa aplicada em visão computacional e aprendizado de máquina.", candidatado: false }
];

export const candidaturasAluno = [
  { id: "c1", empresa: "Synapse Tech Soluções Digitais", cargo: "Desenvolvimento Web", data: "12/05/2026", status: "Aprovada" },
  { id: "c2", empresa: "AgroData Sistemas", cargo: "Ciência de Dados", data: "28/05/2026", status: "Em análise" },
  { id: "c3", empresa: "NuvemCerta Cloud Solutions", cargo: "DevOps & Infraestrutura", data: "03/06/2026", status: "Entrevista agendada" },
  { id: "c4", empresa: "Fintera Pagamentos", cargo: "Desenvolvimento Backend", data: "10/06/2026", status: "Rejeitada" },
  { id: "c5", empresa: "EducaMais Plataforma de Ensino", cargo: "QA e Testes de Software", data: "22/06/2026", status: "Em análise" }
];

export const diario = [
  { id: "d1", data: "07/07/2026", atividade: "Atualização da documentação do projeto", horas: "3", descricao: "Revisão e atualização da documentação técnica da API REST do sistema." },
  { id: "d2", data: "06/07/2026", atividade: "Reunião de alinhamento de sprint", horas: "4", descricao: "Participação na reunião semanal com a equipe para definição das tarefas do sprint." },
  { id: "d3", data: "03/07/2026", atividade: "Implementação de tela de login", horas: "6", descricao: "Desenvolvimento do componente de autenticação com validação de formulário em React." },
  { id: "d4", data: "01/07/2026", atividade: "Correção de bugs no módulo de relatórios", horas: "5", descricao: "Identificação e correção de 3 bugs reportados pelo time de QA." },
  { id: "d5", data: "26/06/2026", atividade: "Code review", horas: "3", descricao: "Revisão de pull requests da equipe e sugestões de melhoria de código." },
  { id: "d6", data: "19/06/2026", atividade: "Reunião com cliente", horas: "2", descricao: "Apresentação do progresso do projeto para o supervisor da empresa." }
];

export const cronogramaEstagioProfessores = [
  { professor: "Carla", componente: "Estágio Curricular Supervisionado I", dia: "Segunda-feira", turno: "T", cargaHoraria: "4h" },
  { professor: "Carla", componente: "Estágio Curricular Supervisionado I", dia: "Terça-feira", turno: "M", cargaHoraria: "4h" },
  { professor: "Edivânia", componente: "Estágio Curricular Supervisionado I", dia: "Quarta-feira", turno: "M", cargaHoraria: "4h" },
  { professor: "Edivânia", componente: "Estágio Curricular Supervisionado I", dia: "Quarta-feira", turno: "T", cargaHoraria: "4h" },
  { professor: "Daniele", componente: "Estágio Curricular Supervisionado II", dia: "Terça-feira", turno: "T", cargaHoraria: "5h" },
  { professor: "Daniele", componente: "Estágio Curricular Supervisionado III", dia: "Segunda-feira", turno: "T", cargaHoraria: "" },
  { professor: "Rayssa", componente: "Estágio Curricular Supervisionado II", dia: "Quinta-feira", turno: "T", cargaHoraria: "5h" },
  { professor: "Rayssa", componente: "Estágio Curricular Supervisionado III", dia: "Terça-feira", turno: "T", cargaHoraria: "" },
  { professor: "Rita", componente: "Estágio Curricular Supervisionado II", dia: "Terça-feira", turno: "M", cargaHoraria: "5h" },
  { professor: "Rita", componente: "Estágio Curricular Supervisionado IV - diurno", dia: "Quinta-feira", turno: "M", cargaHoraria: "5h" },
  { professor: "Rita", componente: "Estágio Curricular Supervisionado IV - noturno", dia: "Quarta-feira", turno: "N", cargaHoraria: "4h" },
  { professor: "Rita", componente: "Estágio Curricular Supervisionado IV - noturno", dia: "Quinta-feira", turno: "N", cargaHoraria: "4h" },
  { professor: "Isa", componente: "Estágio Curricular Supervisionado II", dia: "Quarta-feira", turno: "M", cargaHoraria: "5h" },
  { professor: "Isa", componente: "Estágio Curricular Supervisionado IV - noturno", dia: "Quinta-feira", turno: "N", cargaHoraria: "4h" },
  { professor: "Edjaclécio", componente: "Estágio Curricular Supervisionado IV - diurno", dia: "Quarta-feira", turno: "T", cargaHoraria: "5h" },
  { professor: "Daiane", componente: "Estágio Curricular Supervisionado IV - noturno", dia: "Quarta-feira", turno: "N", cargaHoraria: "4h" }
];

export const avaliacoesAluno = [
  { id: "a1", periodo: "Junho 2026", supervisor: "Prof. Ricardo Andrade Melo", nota: 9.2, feedback: "Excelente desempenho técnico e proatividade na resolução de problemas. Manteve boa comunicação com a equipe.", data: "30/06/2026" },
  { id: "a2", periodo: "Maio 2026", supervisor: "Prof. Ricardo Andrade Melo", nota: 8.7, feedback: "Bom domínio das tecnologias utilizadas. Pode melhorar a pontualidade na entrega de tarefas.", data: "31/05/2026" },
  { id: "a3", periodo: "Abril 2026", supervisor: "Prof. Ricardo Andrade Melo", nota: 8.0, feedback: "Início de estágio com adaptação gradual. Demonstrou interesse em aprender novas ferramentas.", data: "30/04/2026" }
];

export const estagiarios = [
  { id: "e1", nome: "Marina Souza Lima", matricula: "20231103045", curso: "Análise e Desenvolvimento de Sistemas", empresa: "Synapse Tech Soluções Digitais", horasCumpridas: 320, horasTotal: 400, statusEstagio: "Em andamento" },
  { id: "e2", nome: "Pedro Henrique Alves", matricula: "20231103089", curso: "Análise e Desenvolvimento de Sistemas", empresa: "AgroData Sistemas", horasCumpridas: 180, horasTotal: 400, statusEstagio: "Em andamento" },
  { id: "e3", nome: "Camila Ferreira Duarte", matricula: "20221103012", curso: "Redes de Computadores", empresa: "NuvemCerta Cloud Solutions", horasCumpridas: 400, horasTotal: 400, statusEstagio: "Concluído" },
  { id: "e4", nome: "Lucas Gabriel Torres", matricula: "20231103102", curso: "Análise e Desenvolvimento de Sistemas", empresa: "Hospital Universitário Lauro Wanderley", horasCumpridas: 90, horasTotal: 400, statusEstagio: "Em andamento" },
  { id: "e5", nome: "Ana Beatriz Nogueira", matricula: "20221103078", curso: "Sistemas de Informação", empresa: "EducaMais Plataforma de Ensino", horasCumpridas: 400, horasTotal: 400, statusEstagio: "Concluído" },
  { id: "e6", nome: "João Victor Cardoso", matricula: "20231103150", curso: "Análise e Desenvolvimento de Sistemas", empresa: "Prefeitura Municipal de João Pessoa", horasCumpridas: 60, horasTotal: 400, statusEstagio: "Pendente" },
  { id: "e7", nome: "Isabela Costa Ribeiro", matricula: "20221103033", curso: "Redes de Computadores", empresa: "Instituto de Pesquisa Tecnológica IFPB", horasCumpridas: 250, horasTotal: 400, statusEstagio: "Em andamento" }
];

export const candidaturasSupervisor = [
  { id: "cs1", alunoNome: "Pedro Henrique Alves", empresa: "AgroData Sistemas", vaga: "Ciência de Dados", data: "28/05/2026", status: "Em análise" },
  { id: "cs2", alunoNome: "João Victor Cardoso", empresa: "Prefeitura Municipal de João Pessoa", vaga: "Suporte de TI", data: "20/06/2026", status: "Em análise" },
  { id: "cs3", alunoNome: "Isabela Costa Ribeiro", empresa: "Fintera Pagamentos", vaga: "Desenvolvimento Backend", data: "15/06/2026", status: "Entrevista agendada" },
  { id: "cs4", alunoNome: "Marina Souza Lima", empresa: "Synapse Tech Soluções Digitais", vaga: "Desenvolvimento Web", data: "12/05/2026", status: "Aprovada" },
  { id: "cs5", alunoNome: "Lucas Gabriel Torres", empresa: "Hospital Universitário Lauro Wanderley", vaga: "Sistemas de Informação em Saúde", data: "02/06/2026", status: "Aprovada" },
  { id: "cs6", alunoNome: "Camila Ferreira Duarte", empresa: "NuvemCerta Cloud Solutions", vaga: "DevOps & Infraestrutura", data: "05/05/2026", status: "Aprovada" }
];

export const avaliacoesSupervisor = [
  { id: "av1", alunoNome: "Marina Souza Lima", periodo: "Junho 2026", nota: 9.2, feedback: "Excelente desempenho técnico e proatividade na resolução de problemas.", data: "30/06/2026" },
  { id: "av2", alunoNome: "Pedro Henrique Alves", periodo: "Junho 2026", nota: 7.5, feedback: "Bom progresso técnico, necessita melhorar comunicação com a equipe.", data: "29/06/2026" },
  { id: "av3", alunoNome: "Camila Ferreira Duarte", periodo: "Junho 2026", nota: 9.6, feedback: "Desempenho excepcional durante todo o período de estágio.", data: "28/06/2026" },
  { id: "av4", alunoNome: "Lucas Gabriel Torres", periodo: "Maio 2026", nota: 6.8, feedback: "Em processo de adaptação, precisa de mais autonomia nas tarefas.", data: "31/05/2026" },
  { id: "av5", alunoNome: "Ana Beatriz Nogueira", periodo: "Junho 2026", nota: 9.0, feedback: "Excelente conclusão de estágio, superou expectativas.", data: "27/06/2026" }
];

export const perfilAluno = {
  nome: "Marina Souza Lima",
  matricula: "20231103045",
  curso: "Tecnologia em Análise e Desenvolvimento de Sistemas",
  instituicao: "Instituto Federal da Paraíba — Campus João Pessoa",
  supervisor: "Prof. Ricardo Andrade Melo",
  empresa: "Synapse Tech Soluções Digitais",
  email: "marina.lima@academico.ifpb.edu.br",
  telefone: "(83) 99123-4567",
  periodo: "Fev 2026 – Ago 2026",
  turno: "Vespertino"
};

export const perfilSupervisor = {
  nome: "Prof. Ricardo Andrade Melo",
  registro: "SIAPE 1928374",
  cargo: "Coordenador de Estágios",
  departamento: "Coordenação de Integração Escola-Empresa",
  instituicao: "Instituto Federal da Paraíba — Campus João Pessoa",
  email: "ricardo.melo@ifpb.edu.br",
  telefone: "(83) 98877-6655"
};

export const prazosAluno = [
  { titulo: "Entrega do relatório mensal de atividades", data: "15/07/2026", tag: "Relatório" },
  { titulo: "Avaliação de meio de período com supervisor", data: "30/07/2026", tag: "Avaliação" },
  { titulo: "Renovação do termo de compromisso de estágio", data: "10/08/2026", tag: "Documentação" }
];

export const prazosSupervisor = [
  { titulo: "Revisar candidaturas pendentes", data: "10/07/2026", tag: "Candidaturas" },
  { titulo: "Avaliação de meio de período — 4 estagiários", data: "30/07/2026", tag: "Avaliação" },
  { titulo: "Reunião de acompanhamento com empresas parceiras", data: "05/08/2026", tag: "Reunião" }
];
