# Movie Challenge

Este projeto foi desenvolvido com o objetivo de explorar e aprimorar habilidades em **desenvolvimento front-end** utilizando **React** com **TypeScript**, integração com APIs externas, manipulação de queries, e implementação de testes. A aplicação enfatiza práticas como:

- Uso de frameworks e bibliotecas modernas para criar uma aplicação funcional e responsiva.
- Consumo de APIs (neste caso, a [TMDB API](https://developer.themoviedb.org/docs/getting-started)) para manipulação e exibição de dados.
- Estruturação de componentes com foco na separação de responsabilidades.
- Manipulação de **queries** para lidar com dados paginados, incluindo filtragem e ordenação.
- **Paginação direta**, podendo navegar diretamente nas paginas mostradas, unitariamente (proximo e anterior) ou se preferir, pode mover-se a cada 10 paginas (seguintes ou anteriores).
- Uso de **React Router DOM** para gerenciar rotas, incluindo `useParams` e `useNavigate` para navegação dinâmica.
- Uso de **React Hooks** como `useState` e `useEffect` para controle de estado e ciclo de vida.
- Implementação de testes utilizando **React Testing Library**, e suporte a **mocks e spies** com **Jest**.

## Principais Observações

1. A funcionalidade de ordenação opera dentro do contexto de cada página, já que a API utilizada realiza requisições baseadas em páginas específicas.
2. Embora a estilização não tenha sido priorizada, a aplicação entrega uma experiência funcional para o usuário final.
3. O projeto foi pensado para consolidar conceitos de consumo de APIs RESTful, manipulação de rotas e boas práticas em React/TypeScript.

## Tecnologias Utilizadas

- **React** com **TypeScript**.
- API do [TMDB](https://developer.themoviedb.org/docs/getting-started).
- **React Router DOM** (`useParams`, `useNavigate`).
- **React Hooks** (`useState`, `useEffect`).
- **React Testing Library**.
- **Jest** para mocks e spies.

## Demonstração

A aplicação está hospedada no Netlify e pode ser acessada no link: [movie-challenge-react-ts.netlify.app](https://movie-challenge-react-ts.netlify.app/)

## Instalação Local

Caso queria rodar localmente em seu computador:

1. Clone o repositório:

   ```bash
   git clone <URL_DO_REPOSITÓRIO>
   ```

2. Navegue até o diretório do projeto:

   ```bash
   cd <NOME_DO_DIRETÓRIO>
   ```

3. Crie um arquivo `.env` na raiz do projeto com a seguinte variável: VITE_TOKEN_API=<SEU_TOKEN_DA_API>
4. Instale as dependências com npm ou yarn:

   ```bash
   npm install
   yarn install
   ```

5. Inicie o servidor de desenvolvimento:

   ```bash
   npm run dev
   ```

## Oportunidades de Melhorias Identificadas

Algumas ideias para expandir e melhorar a aplicação incluem:

- **Interface e Padronização**:
  - Definir uma paleta de cores e tipografia mais harmoniosa para melhorar a experiência visual.
  - Implementação de **temas** (claro/escuro) para maior acessibilidade.
  - Padronizar os **cards**, garantindo uma apresentação uniforme e adaptável em diferentes dispositivos e tamanhos de tela.
  - Organizar melhor os elementos dos cards, como títulos, imagens e descrições.

- **Tratativa de Dados**:
  - Gerenciamento de erros vindos da API, como falhas no carregamento de imagens ou textos incompletos.
  - Implementação de mensagens de fallback para dados ausentes ou corrompidos.

- **Funcionalidades Adicionais**:
  - Permitir ordenação global para todos os resultados, utilizando uma abordagem customizada que transcenda as limitações da API.
  - Adicionar um sistema de busca mais robusto e inteligente.

- **Performance**:
  - Melhorar o **Cumulative Layout Shift (CLS)** para reduzir o deslocamento inesperado de elementos na página.
  - Otimizar o tempo de carregamento, com foco em melhorar o **Largest Contentful Paint (LCP)**.

## Observações

- A limitação da API impede a ordenação global, funcionando apenas dentro da página atual.
- Para mais informações sobre a API utilizada, consulte a [documentação oficial](https://developer.themoviedb.org/docs/getting-started).
