export const demoQuestionBank = [
  {
    id: 'Q-1042',
    disciplina: 'Matemática',
    assunto: 'Razões e proporções',
    dificuldade: 'Média',
    tipoUso: 'AMBOS',
    status: 'ativo' as const,
    revisaoHumana: 'Validada',
    origem: 'Professor + IA',
  },
  {
    id: 'Q-1187',
    disciplina: 'Língua Portuguesa',
    assunto: 'Interpretação textual',
    dificuldade: 'Alta',
    tipoUso: 'SIMULADO',
    status: 'pendente' as const,
    revisaoHumana: 'Aguardando revisão',
    origem: 'IA sugerida',
  },
  {
    id: 'Q-0975',
    disciplina: 'Ciências',
    assunto: 'Ecossistemas',
    dificuldade: 'Baixa',
    tipoUso: 'TREINO',
    status: 'ativo' as const,
    revisaoHumana: 'Validada',
    origem: 'Professor',
  },
  {
    id: 'Q-1220',
    disciplina: 'História',
    assunto: 'Brasil República',
    dificuldade: 'Média',
    tipoUso: 'AMBOS',
    status: 'ativo' as const,
    revisaoHumana: 'Validada',
    origem: 'Professor + IA',
  },
];

export const professorDemo = {
  provasPlanejadas: [
    { id: 1, titulo: 'Avaliação Diagnóstica 9º Ano', turma: '9º Ano A', data: '22/05/2026', questoes: 20, status: 'agendado' as const },
    { id: 2, titulo: 'Simulado de Português', turma: '9º Ano B', data: '28/05/2026', questoes: 25, status: 'pendente' as const },
    { id: 3, titulo: 'Prova Bimestral de Ciências', turma: '1º Médio A', data: '03/06/2026', questoes: 18, status: 'ativo' as const },
  ],
  turmas: [
    { id: 1, turma: '9º Ano A', alunos: 32, provasAplicadas: 6, media: 78 },
    { id: 2, turma: '9º Ano B', alunos: 28, provasAplicadas: 5, media: 72 },
    { id: 3, turma: '1º Médio A', alunos: 35, provasAplicadas: 7, media: 80 },
  ],
  notasPendentes: [
    { id: 1, prova: 'Redação diagnóstica', turma: '9º Ano A', alunosPendentes: 12, prazo: '19/05/2026', status: 'pendente' as const },
    { id: 2, prova: 'Lista avaliativa 03', turma: '9º Ano B', alunosPendentes: 8, prazo: '20/05/2026', status: 'pendente' as const },
    { id: 3, prova: 'Atividade prática', turma: '1º Médio A', alunosPendentes: 4, prazo: '22/05/2026', status: 'ativo' as const },
  ],
};

export const secretariaDemo = {
  avaliacoes: [
    { id: 1, nome: 'Avaliação Bimestral 1', abrangencia: '12 escolas', data: '20/05/2026', situacao: 'agendado' as const },
    { id: 2, nome: 'Simulado Preparatório SEED', abrangencia: 'Rede completa', data: '28/05/2026', situacao: 'ativo' as const },
    { id: 3, nome: 'Recuperação Paralela', abrangencia: '5 escolas', data: '05/06/2026', situacao: 'pendente' as const },
  ],
  escolas: [
    { id: 1, escola: 'Escola Estadual João Alves', municipio: 'Aracaju', alunos: 450, diretor: 'Maria Souza', status: 'ativo' as const },
    { id: 2, escola: 'Escola Estadual Valadares', municipio: 'Itabaiana', alunos: 318, diretor: 'Carlos Menezes', status: 'ativo' as const },
    { id: 3, escola: 'Centro de Ensino Frei Paulo', municipio: 'Frei Paulo', alunos: 205, diretor: 'Ana Paula', status: 'pendente' as const },
  ],
  relatorios: [
    { id: 1, titulo: 'Desempenho por município', periodo: 'Abr/2026', formato: 'PDF consolidado', atualizadoEm: '15/05/2026 08:40' },
    { id: 2, titulo: 'Acompanhamento de aplicação', periodo: 'Mai/2026', formato: 'Planilha exportável', atualizadoEm: '16/05/2026 10:15' },
    { id: 3, titulo: 'Mapa de lacunas por disciplina', periodo: 'Abr/2026', formato: 'Painel analítico', atualizadoEm: '16/05/2026 14:05' },
  ],
};
