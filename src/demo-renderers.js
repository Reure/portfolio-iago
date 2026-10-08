// Funções de apresentação: recebem dados e devolvem HTML ou SVG.
export function table(headers, rows) {
  return `<div class="demo-table"><table><thead><tr>${headers.map((h) => `<th scope="col">${h}</th>`).join('')}</tr></thead><tbody>${rows.map((row) => `<tr>${row.map((v) => `<td>${v}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
}
export function chart(rows, title, labels) {
  const max = Math.ceil(Math.max(...rows.flatMap((r) => r.slice(1))) / 20) * 20;
  const bars = rows
    .map(
      (r, i) =>
        r
          .slice(1)
          .map((v, j) => {
            const h = (v / max) * 160,
              x = 70 + i * 98 + j * 30;
            return `<rect x="${x}" y="${220 - h}" width="26" height="${h}" fill="${j ? '#e8ceb6' : '#fa823e'}" rx="2"/><text x="${x + 13}" y="${210 - h}" text-anchor="middle">${v}</text>`;
          })
          .join('') +
        `<text x="${98 + i * 98}" y="246" text-anchor="middle">${r[0]}</text>`,
    )
    .join('');
  return `<figure><figcaption>${title}</figcaption><p class="legend"><span>● ${labels[0]}</span> ● ${labels[1]}</p><svg viewBox="0 0 600 265" role="img" aria-label="${title}; valores na tabela abaixo"><line x1="55" y1="220" x2="570" y2="220" stroke="#666"/>${bars}</svg><details><summary>Ver dados do gráfico</summary>${table(['Período', ...labels], rows)}</details></figure>`;
}
export function horizontal(title, rows, unit = '') {
  const max = Math.max(...rows.map((r) => r[1]));
  return `<figure class="horizontal-chart"><figcaption>${title}</figcaption>${rows.map((r) => `<div class="bar-row"><span>${r[0]}</span><div><i style="width:${(r[1] / max) * 100}%"></i></div><strong>${r[1]}${unit}</strong></div>`).join('')}</figure>`;
}
export function line(title, labels, values, unit = '', domain) {
  const max = domain || Math.ceil(Math.max(...values) * 1.1);
  const points = values
    .map(
      (v, i) =>
        `${65 + i * (450 / (values.length - 1))},${205 - (v / max) * 155}`,
    )
    .join(' ');
  return `<figure class="trend-chart"><figcaption>${title}</figcaption><svg viewBox="0 0 580 250" role="img" aria-label="${title}: ${values.map((v, i) => labels[i] + ' ' + v + unit).join(', ')}"><line x1="55" y1="205" x2="530" y2="205" stroke="#666"/><text x="40" y="209">0</text><text x="28" y="54">${max}${unit}</text><polyline points="${points}" fill="none" stroke="#fa823e" stroke-width="3"/>${values
    .map((v, i) => {
      const x = 65 + (i * 450) / (values.length - 1),
        y = 205 - (v / max) * 155;
      return `<circle cx="${x}" cy="${y}" r="4" fill="#e8ceb6"/><text x="${x}" y="${y - 12}" text-anchor="middle">${v}${unit}</text><text x="${x}" y="230" text-anchor="middle">${labels[i]}</text>`;
    })
    .join('')}</svg></figure>`;
}
