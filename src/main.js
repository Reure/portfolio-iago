// Perfis reais. Valores vazios não abrem páginas.
const socialProfiles = {
  linkedin: 'https://www.linkedin.com/in/iagodsantana/',
  instagram: 'https://www.instagram.com/reure.ivgx/',
  github: 'https://github.com/Reure',
};

const status = document.querySelector('.terminal-status');
const toast = document.querySelector('.toast');
let toastTimer;

function openSocial(network) {
  const url = socialProfiles[network];
  if (url) {
    window.open(url, '_blank', 'noopener,noreferrer');
    return;
  }
  const label = {
    linkedin: 'LinkedIn',
    instagram: 'Instagram',
    github: 'GitHub',
  }[network];
  const message = `${label}: URL aguardando configuração.`;
  status.textContent = message;
  toast.textContent = message;
  toast.classList.add('visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('visible'), 4000);
}

document.querySelectorAll('[data-social]').forEach((button) => {
  button.addEventListener('click', () => openSocial(button.dataset.social));
});

// O terminal usa apenas JavaScript no navegador, sem envio de mensagens.
document.querySelector('#terminal-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const input = document.querySelector('#terminal-input');
  const command = input.value.trim().toLowerCase();
  if (Object.hasOwn(socialProfiles, command)) openSocial(command);
  else status.textContent = 'Comandos: linkedin, instagram, github ou ajuda.';
  input.value = '';
});

// Os botões de projeto usam o mesmo diálogo, preenchido com o conteúdo abaixo.
const projects = {
  java: {
    title: 'Sistema de pedidos em Java',
    description:
      'Projeto acadêmico: aplicação de console para cadastro de clientes e produtos, montagem de pedidos, controle de estoque e pagamentos simulados. O código usa orientação a objetos, herança, tipos de clientes e produtos, exceções próprias e separação entre entidades, serviços e persistência. Clientes, produtos e pedidos são armazenados em SQLite por JDBC.',
  },
  dados: {
    title: 'Dados na prática',
    description:
      'Experiência com preparação de dados, tratamento de CSV, Power Query, modelagem e medidas, dashboards em Power BI e Excel e apresentação para a gestão. Contextos: atendimento (fila, nível de serviço e abandono), vendas (conversão por operador, cidade e faixa etária), tickets e prazos. Os casos detalhados serão adicionados em uma próxima etapa.',
  },
  basquete: {
    title: 'Basquete em construção',
    description:
      'Ideia de aplicativo para registro de atividades e estatísticas de basquete. O estágio de implementação ainda precisa ser confirmado. A página do projeto será adicionada em uma próxima etapa.',
  },
};
const dialog = document.querySelector('#project-dialog');
document.querySelectorAll('[data-project]').forEach((button) => {
  button.addEventListener('click', () => {
    const project = projects[button.dataset.project];
    document.querySelector('#dialog-title').textContent = project.title;
    document.querySelector('#dialog-description').textContent =
      project.description;
    dialog.showModal();
  });
});
document.querySelectorAll('.dialog-close, .dialog-done').forEach((button) => {
  button.addEventListener('click', () => dialog.close());
});
dialog.addEventListener('click', (event) => {
  if (event.target === dialog) {
    const bounds = dialog.getBoundingClientRect();
    if (
      event.clientX < bounds.left ||
      event.clientX > bounds.right ||
      event.clientY < bounds.top ||
      event.clientY > bounds.bottom
    )
      dialog.close();
  }
});
