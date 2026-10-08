# Iago Diogo — Portfólio

Portfólio pessoal sobre minha experiência com dados e BI e meu aprendizado em desenvolvimento, com identidade visual inspirada no basquete e no hip-hop.

**[Visite o site](https://iagodiogo.vercel.app/)**

## Conteúdo

- Apresentação, perfil e contato pelas redes sociais.
- Casos de BI: atendimento presencial, tratamento de mailing e requisições de exames e procedimentos.
- Gráficos demonstrativos e consultas Power Query para leitura e download.
- Apresentação de um sistema de pedidos em Java com SQLite e JDBC. Seu código pertence a um projeto separado.

Os gráficos usam **dados fictícios** e não representam resultados reais da operação. As consultas publicadas têm referências sensíveis substituídas. Os arquivos originais de trabalho não fazem parte deste repositório.

## Tecnologias

HTML, CSS e JavaScript; Vite para desenvolvimento e build; Vercel para hospedagem. Layout responsivo, navegação por teclado e suporte à preferência por movimento reduzido.

## Executar

Use Node.js 22.12 ou superior e npm. Na pasta do projeto:

```sh
npm ci
npm run dev
```

Abra o endereço exibido no terminal. Para conferir a versão de publicação:

```sh
npm run build
npm run preview
```

## Organização

- `index.html`: página principal.
- `dados.html`: casos de dados e BI.
- `src/`: estilos, interações e demonstrações.
- `src/demo-data.js`: conjuntos demonstrativos e trechos de Power Query.
- `src/demo-renderers.js`: funções compartilhadas para gerar tabelas e gráficos.
- `src/case-demos.js`: monta os exemplos básicos e chama as visões adicionais.
- `src/expanded-demos.js`: monta as visões adicionais após os exemplos básicos.
- `public/assets/`: artes e consulta Power Query.
- `vite.config.js`: configuração das duas páginas.
- `vercel.json`: configuração de publicação.

## Publicação

Na Vercel, use o preset **Vite**, o comando `npm run build` e a saída `dist`. Este diretório deve ser a raiz do repositório. Após conectar o GitHub, commits na branch de produção poderão atualizar o site automaticamente.

## Contato

- [LinkedIn](https://www.linkedin.com/in/iagodsantana/)
- [GitHub](https://github.com/Reure)
- [Instagram](https://www.instagram.com/reure.ivgx/)

## Manutenção

A ordem dos casos e os avisos estão definidos em `dados.html`. Para editar números demonstrativos, abra `src/demo-data.js`; para mudar o desenho dos gráficos, abra `src/demo-renderers.js`. As funções de apresentação recebem dados locais controlados pelo projeto, sem entrada de usuários.

Use `npm run format` para formatar os arquivos e `npm run format:check` para conferir o padrão.
