import {
  atendimentoPorMes,
  demandaPorDiaEHora,
  autorizacoesPorMes,
  senhasPorFila,
  motivosDeAbandono,
  atendimentoPorPessoa,
  capacidadeEEntradas,
  pendenciasPorGrupo,
  motivosDeGlosa,
  temposPorGrupo,
  idadeDasPendencias,
  regimesDeTrabalho,
  tratativasPorPessoa,
} from './demo-data.js';
import { table, horizontal, line } from './demo-renderers.js';

export function renderExpandedDemos() {
  // Recortes inteiramente fictícios, coerentes entre os indicadores do mesmo conjunto.

  function section(id, title, html) {
    document
      .querySelector('#' + id + ' .demo')
      .insertAdjacentHTML(
        'beforeend',
        `<section class="expanded-view"><h4>${title}</h4>${html}</section>`,
      );
  }
  section(
    'presencial',
    'Visão mês a mês',
    `<p>O mesmo recorte mensal sustenta o volume, o abandono e o nível de serviço abaixo. Todos os valores são fictícios.</p><div class="chart-grid">${line(
      'Senhas emitidas',
      atendimentoPorMes.map((m) => m.month),
      atendimentoPorMes.map((m) => m.emitted),
    )}${line(
      'Nível de serviço',
      atendimentoPorMes.map((m) => m.month),
      atendimentoPorMes.map((m) => (m.within / m.attended) * 100),
      '%',
      100,
    )}</div>${table(
      [
        'Mês',
        'Emitidas',
        'Atendidas',
        'Abandonadas',
        'Dentro da meta',
        'NS*',
        'TMA',
        'Espera',
      ],
      atendimentoPorMes.map((m) => [
        m.month,
        m.emitted,
        m.attended,
        m.emitted - m.attended,
        m.within,
        ((m.within / m.attended) * 100).toFixed(0) + '%',
        m.tma + ' min',
        m.wait + ' min',
      ]),
    )}<p class="reading">* Definição fictícia: atendidas com espera de até 15 minutos ÷ atendidas. Fevereiro combina mais demanda, TMA maior e NS menor; é uma pista para investigação, não prova de causalidade. Em abril, 4.050 de 4.500 atendidas ficaram dentro da meta (90%).</p>`,
  );

  section(
    'presencial',
    'Quando a demanda se concentra',
    `<p>Mapa de calor de uma semana ilustrativa, independente do recorte mensal. Cada célula representa senhas emitidas.</p><div class="demo-table"><table class="heatmap"><thead><tr><th>Dia / hora</th>${['08h', '09h', '10h', '11h', '12h'].map((h) => `<th>${h}</th>`).join('')}</tr></thead><tbody>${demandaPorDiaEHora.map((r, i) => `<tr><th>${['Seg', 'Ter', 'Qua', 'Qui', 'Sex'][i]}</th>${r.map((v) => `<td style="background:rgba(250,130,62,${0.12 + (v / 85) * 0.65})">${v}</td>`).join('')}</tr>`).join('')}</tbody></table></div><p class="reading">Cores mais intensas indicam maior volume. Terça às 10h concentra 85 senhas neste exemplo; esse recorte ajuda a discutir distribuição de escala.</p>`,
  );
  section(
    'presencial',
    'Tipos de fila, abandonos e pessoas',
    `<p>Recortes fictícios e independentes. Os nomes de operadores e as categorias de fila abaixo são ilustrativos.</p><div class="chart-grid">${horizontal('Senhas por tipo de fila', senhasPorFila)}${horizontal('Motivos de abandono', motivosDeAbandono)}</div>${table(['Operador fictício', 'Atendimentos', 'TMA', 'Tempo ocioso observado'], atendimentoPorPessoa)}<p class="reading">Comparar pessoas exige considerar complexidade, perfil da fila, jornada e qualidade. Um TMA menor não determina sozinho quem atende melhor; ociosidade também depende da chegada e distribuição de demanda.</p>`,
  );

  section(
    'autorizacoes',
    'Visão gerencial: demanda e capacidade',
    `<p>Exemplo de acompanhamento agregado do App e dos grupos, inspirado nas visões gerencial, operacional e de capacidade do arquivo. Não é uma reprodução das telas originais.</p><div class="chart-grid">${line(
      'Entrantes por mês',
      autorizacoesPorMes.map((r) => r[0]),
      autorizacoesPorMes.map((r) => r[1]),
    )}${line(
      'Backlog ao fim do mês',
      autorizacoesPorMes.map((r) => r[0]),
      autorizacoesPorMes.map((r) => r[4]),
    )}</div>${table(['Mês', 'Entrantes', 'Finalizadas', 'Backlog inicial', 'Backlog final'], autorizacoesPorMes)}<p class="reading">Cada mês usa backlog inicial + entradas − finalizações. O saldo final de um mês é o inicial do seguinte. Decisões dos grupos não são somadas às finalizações do App.</p>${horizontal('Capacidade mensal estimada × entrada de abril', capacidadeEEntradas)}<p class="reading">Estimativa fictícia: 6 pessoas × 20 dias × 360 minutos úteis/dia ÷ 60 minutos médios de esforço = 720 requisições. Esforço produtivo é diferente do tempo decorrido de uma requisição, que pode incluir espera. A conta simplifica o processo para explicar a análise de capacidade.</p>`,
  );
  section(
    'autorizacoes',
    'Visão dos grupos e dos prazos',
    `<div class="chart-grid">${horizontal('Requisições nos grupos — fotografia fictícia', pendenciasPorGrupo)}${horizontal('Motivos de glosa — amostra fictícia', motivosDeGlosa)}</div>${table(['Grupo fictício', 'Pendentes', 'Tempo médio no grupo', 'Aguardando ação do grupo'], temposPorGrupo)}<p class="reading">O status de auditoria indica passagem pela análise complementar. Para o backlog acionável, é preciso distinguir o que aguarda ação do grupo do que depende de documentação ou de outra etapa.</p>${horizontal('Idade das pendências — recorte de 70 solicitações', idadeDasPendencias)}<p class="reading">As faixas são apenas ilustrativas. Não representam prazos da ANS; os limites aplicáveis precisam ser definidos por tipo de solicitação e regra vigente.</p>`,
  );
  section(
    'autorizacoes',
    'Produtividade e regimes de trabalho',
    `${table(['Recorte fictício', 'Pessoas', 'Horas produtivas', 'Tratativas', 'Tratativas/hora'], regimesDeTrabalho)}${horizontal('Tratativas por pessoa — recorte independente', tratativasPorPessoa)}<p class="reading">Tratativas representam ações e podem ocorrer mais de uma vez na mesma requisição. Não equivalem às finalizações. A comparação entre remoto e presencial exige considerar horas disponíveis e complexidade dos casos, sem atribuir desempenho apenas ao regime de trabalho.</p>`,
  );

  const queryContainer = document.querySelector('#mailing .demo');
  queryContainer.insertAdjacentHTML(
    'beforeend',
    `<details class="full-query"><summary>Ver query completa do mailing</summary><p>Três consultas: cabeçalho/layout, tratamento de contatos e montagem da base final. O endereço do SharePoint foi ocultado; nomes de campos e regras foram preservados. Nenhum registro de cliente está incluído. A consulta de retornos é um fluxo separado e não está neste bloco.</p><pre tabindex="0" aria-label="Consultas completas do mailing em código M"><code>Carregando código…</code></pre><a class="text-button" href="./assets/mailing-query.m" download>Baixar código M →</a></details>`,
  );
  const fullQuery = document.querySelector('.full-query');
  fullQuery.addEventListener('toggle', async () => {
    if (!fullQuery.open || fullQuery.dataset.loaded) return;
    try {
      const response = await fetch('./assets/mailing-query.m');
      if (!response.ok) throw Error();
      fullQuery.querySelector('code').textContent = await response.text();
      fullQuery.dataset.loaded = 'true';
    } catch {
      fullQuery.querySelector('code').textContent =
        'Não foi possível carregar o código. Use o link de download abaixo.';
    }
  });
}
