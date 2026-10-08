import { table, chart } from './demo-renderers.js';
import { renderExpandedDemos } from './expanded-demos.js';
import {
  autorizacoesPorDia,
  trechosPowerQuery,
  senhasPorHora,
  glosasPorSolicitante,
  telefonesMascarados,
  temposPorHora,
} from './demo-data.js';
import './demo.css';
// As visões adicionais são montadas após os exemplos básicos.

// Todos os valores são fictícios; nenhuma base de clientes é usada nesta página.
function insert(id, html) {
  document
    .getElementById(id)
    .insertAdjacentHTML(
      'beforeend',
      `<section class="demo"><header><h3>Na prática</h3><span>Demonstração · Dados fictícios</span></header>${html}</section>`,
    );
}

insert(
  'autorizacoes',
  `<p>Exemplo de uma semana. A finalização acontece no App; decisões intermediárias dos grupos não são contadas novamente como conclusões.</p><div class="demo-kpis"><div>Entrantes<strong>660</strong></div><div>Finalizadas<strong>650</strong></div><div>Backlog inicial<strong>80</strong></div><div>Backlog final<strong>90</strong></div></div>${chart(autorizacoesPorDia, 'Entradas e finalizações por dia', ['Entrantes', 'Finalizadas'])}<p class="reading"><strong>Leitura:</strong> 80 pendências iniciais + 660 entradas − 650 finalizações = 90 pendências finais. Neste exemplo, o backlog aumentou em 10 solicitações.</p><h4>Tempo total e tempo no grupo</h4><p>Solicitação fictícia: entrada segunda às 09h → análise no grupo de segunda às 14h até terça às 14h → finalização pelo App quarta às 09h.</p><p><strong>Vida útil total: 48h. Permanência no grupo: 24h, incluídas nas 48h.</strong> Esses tempos não devem ser somados.</p><h4>Glosas por solicitante</h4>${table(['Solicitante fictício', 'Solicitações', 'Glosas', 'Taxa'], glosasPorSolicitante)}<p class="reading">Recorte independente da semana acima. Comparar quantidade e taxa ajuda a considerar o volume de cada solicitante; os motivos da recusa precisam ser investigados separadamente.</p>`,
);

insert(
  'mailing',
  `<p>Exemplo com telefones mascarados. Não são contatos reais nem números para discagem.</p>${table(['Entrada ilustrativa', 'Após limpeza', 'DDD', 'Número separado', 'Retorno para revisão'], telefonesMascarados)}<p class="reading">* O código original complementa DDD 84 em determinadas regras. As máscaras ilustram o processo sem executar a consulta; a decisão sobre cada retorno depende da regra da campanha.</p><h4>Por dentro do Power Query</h4><p>Trechos reais do meu arquivo, formatados para leitura. Fontes internas foram omitidas. São recortes de etapas, não uma consulta completa para executar.</p><div id="query-examples"></div>`,
);

for (const [title, description, source] of trechosPowerQuery) {
  const section = document.createElement('section');
  section.className = 'query-example';
  const h = document.createElement('h4');
  h.textContent = title;
  const p = document.createElement('p');
  p.textContent = description;
  const pre = document.createElement('pre');
  pre.tabIndex = 0;
  pre.setAttribute('aria-label', title + ' — código M');
  const code = document.createElement('code');
  code.textContent = source;
  pre.append(code);
  section.append(h, p, pre);
  document.getElementById('query-examples').append(section);
}

insert(
  'presencial',
  `<p>Exemplo de senhas por faixa de emissão. Todas as senhas deste recorte fictício terminaram atendidas ou abandonadas, sem pendências.</p><div class="demo-kpis"><div>Emitidas<strong>320</strong></div><div>Atendidas<strong>280</strong></div><div>Abandonadas<strong>40</strong></div><div>Abandono<strong>12,5%</strong></div></div>${chart(senhasPorHora, 'Demanda e atendimento por hora', ['Emitidas', 'Atendidas'])}<p class="reading"><strong>Leitura:</strong> às 10h ocorre o maior volume. A faixa merece investigação junto dos tempos de espera, duração dos atendimentos e escala. O gráfico sozinho não prova falta de equipe.</p><h4>Tempos e nível de serviço</h4>${table(['Faixa', 'TMA', 'Espera média', 'Dentro da meta*'], temposPorHora)}<p class="reading">* Regra exclusiva da demonstração: espera de até 15 minutos dividida pelas senhas atendidas em cada faixa de emissão. Não representa a definição original do painel nem um prazo regulatório.</p>`,
);
renderExpandedDemos();
