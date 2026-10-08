// Dados exclusivamente fictícios ou mascarados; nenhuma base real.
// Cada conjunto é um recorte independente, salvo indicação na página.
export const autorizacoesPorDia = [
  ['Seg', 120, 108],
  ['Ter', 145, 132],
  ['Qua', 130, 142],
  ['Qui', 155, 150],
  ['Sex', 110, 118],
];

export const trechosPowerQuery = [
  [
    'Limpeza dos telefones',
    'Remoção de caracteres de controle, espaços nas pontas e símbolos. Padronizar a escrita não comprova que o telefone existe ou pertence à pessoa.',
    `#"Texto Limpo" = Table.TransformColumns(
    #"Colunas Não Dinâmicas",
    {{"N_Telefone", Text.Clean, type text}}
),
#"Texto Aparado" = Table.TransformColumns(
    #"Texto Limpo",
    {{"N_Telefone", Text.Trim, type text}}
),
#"Linhas Filtradas" = Table.SelectRows(
    #"Texto Aparado", each ([N_Telefone] <> "")
),
Contatos_Limpos = Table.AddColumn(
    #"Linhas Filtradas", "N_Limpos",
    each Text.Remove([N_Telefone], {"(", ")", "-", " "})
)`,
  ],
  [
    'Redução de duplicidades',
    'Nesta etapa, a chave usa identificadores do cliente. Ela não representa uma deduplicação global por número de telefone.',
    `#"Duplicatas Removidas" = Table.Distinct(
    #"Extraído ""Número do Telefone""",
    {"Nr seq segurado", "Carteira", "Nr cpf"}
)`,
  ],
  [
    'Consolidação dos retornos',
    'Reuni os retornos de 2024 e 2025 e ordenei o histórico dos mais recentes aos mais antigos para apoiar a segunda validação do mailing.',
    `#"Consulta Acrescentada" = Table.Combine({
    #"Tipo Alterado", #"Tabulações 2025"
}),
#"Linhas Classificadas1" = Table.Sort(
    #"Consulta Acrescentada",
    {{"Data", Order.Descending}}
)`,
  ],
];

export const senhasPorHora = [
  ['08h', 42, 40],
  ['09h', 68, 61],
  ['10h', 85, 69],
  ['11h', 76, 65],
  ['12h', 49, 45],
];

export const glosasPorSolicitante = [
  ['Clínica A', 120, 12, '10%'],
  ['Hospital B', 80, 16, '20%'],
  ['Consultório C', 40, 6, '15%'],
];

export const telefonesMascarados = [
  ['(84) 9XXXX-XXXX', '849XXXXXXXX', '84', '9XXXXXXXX', 'Contato anterior'],
  [
    '84 3XXX-XXXX',
    '843XXXXXXX',
    '84',
    '3XXXXXXX',
    'Telefone não pertence à pessoa',
  ],
  ['9XXXX-XXXX', '9XXXXXXXX', '84*', '9XXXXXXXX', 'Recusa registrada'],
];

export const temposPorHora = [
  ['08h', '8 min', '5 min', '36 / 40 · 90%'],
  ['09h', '10 min', '9 min', '49 / 61 · 80,3%'],
  ['10h', '14 min', '18 min', '38 / 69 · 55,1%'],
  ['11h', '12 min', '14 min', '43 / 65 · 66,2%'],
  ['12h', '9 min', '7 min', '39 / 45 · 86,7%'],
];

export const atendimentoPorMes = [
  {
    month: 'Jan',
    emitted: 4200,
    attended: 3780,
    within: 3024,
    tma: 12,
    wait: 11,
  },
  {
    month: 'Fev',
    emitted: 4600,
    attended: 4000,
    within: 2800,
    tma: 15,
    wait: 16,
  },
  {
    month: 'Mar',
    emitted: 4400,
    attended: 4000,
    within: 3400,
    tma: 10,
    wait: 8,
  },
  {
    month: 'Abr',
    emitted: 4800,
    attended: 4500,
    within: 4050,
    tma: 9,
    wait: 6,
  },
];

export const demandaPorDiaEHora = [
  [30, 55, 70, 60, 35],
  [35, 60, 85, 75, 45],
  [28, 50, 65, 58, 32],
  [40, 65, 80, 70, 42],
  [25, 45, 55, 48, 30],
];

export const autorizacoesPorMes = [
  ['Jan', 600, 580, 80, 100],
  ['Fev', 660, 650, 100, 110],
  ['Mar', 700, 720, 110, 90],
  ['Abr', 680, 700, 90, 70],
];

export const senhasPorFila = [
  ['Geral', 620],
  ['Prioritária', 280],
  ['Agendada', 100],
];

export const motivosDeAbandono = [
  ['Desistência durante espera', 42],
  ['Ausência na chamada', 25],
  ['Outros motivos', 13],
];

export const atendimentoPorPessoa = [
  ['Pessoa A', 80, '9 min', '32 min'],
  ['Pessoa B', 68, '12 min', '18 min'],
  ['Pessoa C', 75, '10 min', '25 min'],
];

export const capacidadeEEntradas = [
  ['Capacidade estimada', 720],
  ['Entrantes', 680],
];

export const pendenciasPorGrupo = [
  ['Grupo A', 32],
  ['Grupo B', 24],
  ['Grupo C', 14],
];

export const motivosDeGlosa = [
  ['Documentação', 18],
  ['Carência', 12],
  ['Plano não apto', 9],
  ['Outros', 6],
];

export const temposPorGrupo = [
  ['Grupo A', 32, '18h', 20],
  ['Grupo B', 24, '30h', 15],
  ['Grupo C', 14, '22h', 8],
];

export const idadeDasPendencias = [
  ['Até 24h', 24],
  ['24–48h', 20],
  ['48–72h', 16],
  ['Mais de 72h', 10],
];

export const regimesDeTrabalho = [
  ['Remoto', 3, 900, 450, '0,50'],
  ['Presencial', 3, 900, 468, '0,52'],
];

export const tratativasPorPessoa = [
  ['Pessoa A', 156],
  ['Pessoa B', 142],
  ['Pessoa C', 138],
];
