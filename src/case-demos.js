import './demo.css';
// As visões adicionais são montadas após os exemplos básicos.

// Todos os valores são fictícios; nenhuma base de clientes é usada nesta página.
function table(headers, rows) {
  return `<div class="demo-table"><table><thead><tr>${headers.map(h => `<th scope="col">${h}</th>`).join('')}</tr></thead><tbody>${rows.map(row => `<tr>${row.map(v => `<td>${v}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
}
function chart(rows, title, labels) {
  const max = Math.ceil(Math.max(...rows.flatMap(r => r.slice(1))) / 20) * 20;
  const bars = rows.map((r, i) => r.slice(1).map((v, j) => {
    const h = v / max * 160, x = 70 + i * 98 + j * 30;
    return `<rect x="${x}" y="${220-h}" width="26" height="${h}" fill="${j ? '#e8ceb6' : '#fa823e'}" rx="2"/><text x="${x+13}" y="${210-h}" text-anchor="middle">${v}</text>`;
  }).join('') + `<text x="${98+i*98}" y="246" text-anchor="middle">${r[0]}</text>`).join('');
  return `<figure><figcaption>${title}</figcaption><p class="legend"><span>● ${labels[0]}</span> ● ${labels[1]}</p><svg viewBox="0 0 600 265" role="img" aria-label="${title}; valores na tabela abaixo"><line x1="55" y1="220" x2="570" y2="220" stroke="#666"/>${bars}</svg><details><summary>Ver dados do gráfico</summary>${table(['Período', ...labels], rows)}</details></figure>`;
}
function insert(id, html) {
  document.getElementById(id).insertAdjacentHTML('beforeend', `<section class="demo"><header><h3>Na prática</h3><span>Demonstração · Dados fictícios</span></header>${html}</section>`);
}
const week = [['Seg',120,108],['Ter',145,132],['Qua',130,142],['Qui',155,150],['Sex',110,118]];
insert('autorizacoes', `<p>Exemplo de uma semana. A finalização acontece no App; decisões intermediárias dos grupos não são contadas novamente como conclusões.</p><div class="demo-kpis"><div>Entrantes<strong>660</strong></div><div>Finalizadas<strong>650</strong></div><div>Backlog inicial<strong>80</strong></div><div>Backlog final<strong>90</strong></div></div>${chart(week,'Entradas e finalizações por dia',['Entrantes','Finalizadas'])}<p class="reading"><strong>Leitura:</strong> 80 pendências iniciais + 660 entradas − 650 finalizações = 90 pendências finais. Neste exemplo, o backlog aumentou em 10 solicitações.</p><h4>Tempo total e tempo no grupo</h4><p>Solicitação fictícia: entrada segunda às 09h → análise no grupo de segunda às 14h até terça às 14h → finalização pelo App quarta às 09h.</p><p><strong>Vida útil total: 48h. Permanência no grupo: 24h, incluídas nas 48h.</strong> Esses tempos não devem ser somados.</p><h4>Glosas por solicitante</h4>${table(['Solicitante fictício','Solicitações','Glosas','Taxa'],[['Clínica A',120,12,'10%'],['Hospital B',80,16,'20%'],['Consultório C',40,6,'15%']])}<p class="reading">Recorte independente da semana acima. Comparar quantidade e taxa ajuda a considerar o volume de cada solicitante; os motivos da recusa precisam ser investigados separadamente.</p>`);

insert('mailing', `<p>Exemplo com telefones mascarados. Não são contatos reais nem números para discagem.</p>${table(['Entrada ilustrativa','Após limpeza','DDD','Número separado','Retorno para revisão'],[['(84) 9XXXX-XXXX','849XXXXXXXX','84','9XXXXXXXX','Contato anterior'],['84 3XXX-XXXX','843XXXXXXX','84','3XXXXXXX','Telefone não pertence à pessoa'],['9XXXX-XXXX','9XXXXXXXX','84*','9XXXXXXXX','Recusa registrada']])}<p class="reading">* O código original complementa DDD 84 em determinadas regras. As máscaras ilustram o processo sem executar a consulta; a decisão sobre cada retorno depende da regra da campanha.</p><h4>Por dentro do Power Query</h4><p>Trechos reais do meu arquivo, formatados para leitura. Fontes internas foram omitidas. São recortes de etapas, não uma consulta completa para executar.</p><div id="query-examples"></div>`);
const snippets = [
 ['Limpeza dos telefones','Remoção de caracteres de controle, espaços nas pontas e símbolos. Padronizar a escrita não comprova que o telefone existe ou pertence à pessoa.',`#"Texto Limpo" = Table.TransformColumns(
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
)`],
 ['Redução de duplicidades','Nesta etapa, a chave usa identificadores do cliente. Ela não representa uma deduplicação global por número de telefone.',`#"Duplicatas Removidas" = Table.Distinct(
    #"Extraído ""Número do Telefone""",
    {"Nr seq segurado", "Carteira", "Nr cpf"}
)`],
 ['Consolidação dos retornos','Reuni os retornos de 2024 e 2025 e ordenei o histórico dos mais recentes aos mais antigos para apoiar a segunda validação do mailing.',`#"Consulta Acrescentada" = Table.Combine({
    #"Tipo Alterado", #"Tabulações 2025"
}),
#"Linhas Classificadas1" = Table.Sort(
    #"Consulta Acrescentada",
    {{"Data", Order.Descending}}
)`],
];
for (const [title, description, source] of snippets) {
  const section = document.createElement('section'); section.className='query-example';
  const h = document.createElement('h4'); h.textContent=title;
  const p = document.createElement('p'); p.textContent=description;
  const pre = document.createElement('pre'); pre.tabIndex=0; pre.setAttribute('aria-label',title+' — código M');
  const code = document.createElement('code'); code.textContent=source; pre.append(code);
  section.append(h,p,pre); document.getElementById('query-examples').append(section);
}
const hours=[['08h',42,40],['09h',68,61],['10h',85,69],['11h',76,65],['12h',49,45]];
insert('presencial', `<p>Exemplo de senhas por faixa de emissão. Todas as senhas deste recorte fictício terminaram atendidas ou abandonadas, sem pendências.</p><div class="demo-kpis"><div>Emitidas<strong>320</strong></div><div>Atendidas<strong>280</strong></div><div>Abandonadas<strong>40</strong></div><div>Abandono<strong>12,5%</strong></div></div>${chart(hours,'Demanda e atendimento por hora',['Emitidas','Atendidas'])}<p class="reading"><strong>Leitura:</strong> às 10h ocorre o maior volume. A faixa merece investigação junto dos tempos de espera, duração dos atendimentos e escala. O gráfico sozinho não prova falta de equipe.</p><h4>Tempos e nível de serviço</h4>${table(['Faixa','TMA','Espera média','Dentro da meta*'],[['08h','8 min','5 min','36 / 40 · 90%'],['09h','10 min','9 min','49 / 61 · 80,3%'],['10h','14 min','18 min','38 / 69 · 55,1%'],['11h','12 min','14 min','43 / 65 · 66,2%'],['12h','9 min','7 min','39 / 45 · 86,7%']])}<p class="reading">* Regra exclusiva da demonstração: espera de até 15 minutos dividida pelas senhas atendidas em cada faixa de emissão. Não representa a definição original do painel nem um prazo regulatório.</p>`);
document.querySelector('.case-disclosure p').textContent='Os relatos descrevem trabalhos de minha autoria. Gráficos e tabelas são demonstrações com dados fictícios, não capturas dos dashboards originais ou resultados reais. Os trechos de Power Query foram extraídos do meu arquivo de mailing, sem fontes internas ou dados pessoais.';
import('./expanded-demos.js');
