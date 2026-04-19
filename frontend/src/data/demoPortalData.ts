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
    { id: 2, nome: 'Simulado Preparatório SEED Educa', abrangencia: 'Rede completa', data: '28/05/2026', situacao: 'ativo' as const },
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

export const proofPerformanceDemo = {
  aluno: {
    base: 'Baseado nas últimas 4 provas e simulados concluídos',
    provasRecentes: [
      { id: 1, prova: 'Avaliação Diagnóstica Matemática', tipo: 'Prova online', data: '10/04/2026', disciplina: 'Matemática', acertos: 16, total: 20, nota: 80 },
      { id: 2, prova: 'Simulado de Português', tipo: 'Simulado inteligente', data: '03/04/2026', disciplina: 'Língua Portuguesa', acertos: 18, total: 25, nota: 72 },
      { id: 3, prova: 'Prova de Ciências', tipo: 'Prova online', data: '28/03/2026', disciplina: 'Ciências', acertos: 15, total: 18, nota: 83 },
      { id: 4, prova: 'Simulado de Matemática', tipo: 'Simulado inteligente', data: '15/03/2026', disciplina: 'Matemática', acertos: 13, total: 20, nota: 65 },
    ],
    evolucao: [
      { prova: 'Sim. Mat.', nota: 65 },
      { prova: 'Ciências', nota: 83 },
      { prova: 'Português', nota: 72 },
      { prova: 'Diag. Mat.', nota: 80 },
    ],
    lacunasPorTopico: [
      { topico: 'Razões e proporções', disciplina: 'Matemática', erro: 42, recomendacao: 'Resolver questões de taxa percentual e proporção direta.' },
      { topico: 'Inferência textual', disciplina: 'Língua Portuguesa', erro: 36, recomendacao: 'Revisar textos curtos com perguntas de inferência.' },
      { topico: 'Ecossistemas', disciplina: 'Ciências', erro: 24, recomendacao: 'Refazer itens sobre cadeias alimentares e equilíbrio ambiental.' },
    ],
    disciplinasComMaiorErro: [
      { disciplina: 'Matemática', erro: 34 },
      { disciplina: 'Língua Portuguesa', erro: 28 },
      { disciplina: 'Ciências', erro: 17 },
    ],
  },
  professor: {
    base: 'Baseado nas últimas 5 provas aplicadas às turmas vinculadas',
    desempenhoPorTurma: [
      { turma: '9º Ano A', provas: 5, media: 78, participacao: '31/32' },
      { turma: '9º Ano B', provas: 5, media: 69, participacao: '25/28' },
      { turma: '1º Médio A', provas: 4, media: 74, participacao: '33/35' },
    ],
    topicosCriticos: [
      { topico: 'Equações do 1º grau', disciplina: 'Matemática', erro: 46, turma: '9º Ano B' },
      { topico: 'Interpretação textual', disciplina: 'Língua Portuguesa', erro: 39, turma: '9º Ano A' },
      { topico: 'Ecossistemas', disciplina: 'Ciências', erro: 33, turma: '1º Médio A' },
    ],
    acertosPorQuestao: [
      { questao: 'Q1', acerto: 84 },
      { questao: 'Q2', acerto: 76 },
      { questao: 'Q3', acerto: 61 },
      { questao: 'Q4', acerto: 58 },
      { questao: 'Q5', acerto: 72 },
    ],
    alunosEmRisco: [
      { aluno: 'Ana Júlia', turma: '9º Ano B', ultimaProva: 'Simulado de Português', media: 54, principalTopico: 'Inferência textual' },
      { aluno: 'Carlos Henrique', turma: '9º Ano B', ultimaProva: 'Avaliação Diagnóstica', media: 49, principalTopico: 'Equações' },
      { aluno: 'Mariana Souza', turma: '1º Médio A', ultimaProva: 'Prova de Ciências', media: 57, principalTopico: 'Ecossistemas' },
    ],
  },
  secretaria: {
    base: 'Baseado nas últimas 6 aplicações institucionais consolidadas',
    mediaPorProva: [
      { prova: 'Avaliação Bimestral 1', media: 72, escolas: 12 },
      { prova: 'Simulado SEED Educa', media: 68, escolas: 12 },
      { prova: 'Recuperação Paralela', media: 64, escolas: 5 },
    ],
    comparativoEscolas: [
      { escola: 'Escola Estadual João Alves', municipio: 'Aracaju', aplicacao: 'Simulado SEED Educa', media: 76, participacao: '94%' },
      { escola: 'Escola Estadual Valadares', municipio: 'Itabaiana', aplicacao: 'Simulado SEED Educa', media: 62, participacao: '88%' },
      { escola: 'Centro de Ensino Frei Paulo', municipio: 'Frei Paulo', aplicacao: 'Simulado SEED Educa', media: 58, participacao: '81%' },
    ],
    comparativoMunicipios: [
      { municipio: 'Aracaju', media: 74, escolas: 5 },
      { municipio: 'Itabaiana', media: 66, escolas: 4 },
      { municipio: 'Frei Paulo', media: 59, escolas: 3 },
    ],
    disciplinasComMaiorDificuldade: [
      { disciplina: 'Matemática', erro: 38 },
      { disciplina: 'Língua Portuguesa', erro: 31 },
      { disciplina: 'Ciências', erro: 27 },
    ],
    escolasAbaixoMedia: [
      { escola: 'Centro de Ensino Frei Paulo', municipio: 'Frei Paulo', prova: 'Simulado SEED Educa', media: 58, mediaRede: 68 },
      { escola: 'Escola Estadual Valadares', municipio: 'Itabaiana', prova: 'Simulado SEED Educa', media: 62, mediaRede: 68 },
    ],
  },
};
