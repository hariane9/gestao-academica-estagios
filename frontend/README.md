# Portal do Estágio — Frontend

Frontend em React (Vite) da Plataforma de Gestão de Estágios do IFPB.
Consome a API PHP deste mesmo repositório (`public/index.php`).

## Como rodar

Pré-requisitos: Node.js 18+ e o backend rodando no Apache (WAMP/XAMPP) em
`http://localhost/gestao_estagios/public/index.php`.

```bash
npm install
npm run dev   # abre em http://localhost:5173
```

O Vite faz proxy de `/api` para o backend (ver `vite.config.js`), então não há
problema de CORS em desenvolvimento. Se o Apache usar outra porta, ajuste o
`target` no `vite.config.js`.

## Estrutura

```
src/
  components/   componentes compartilhados (Sidebar, Header, modais, Toast...)
  context/      AppContext — sessão, dados e ações globais
  pages/        uma pasta por tela (Login, Cadastro, Dashboard, Vagas,
                Candidaturas, DiárioBordo, Avaliações, Estagiários,
                Documentos, Perfil)
  services/
    api.js      todas as chamadas à API (axios)
    mockData.js dados de exemplo usados como fallback quando a API não responde
  utils/        helpers (datas, iniciais, badges de status)
```

## Perfis

- **Estudante (aluno)**: dashboard, vagas (candidatar-se), candidaturas,
  diário de bordo (criar/editar/excluir atividades de 1 a 8h), avaliações
  recebidas, documentos (upload de PDF) e perfil.
- **Supervisor**: dashboard, estagiários, candidaturas recebidas, lançar
  avaliações (nota inteira 0–10), documentos e perfil.

O perfil é definido pelo campo `tipo` retornado pelo `POST /login`, e a sessão
fica no `localStorage` (sobrevive a refresh).

## Integração com a API

Rotas usadas: `/register`, `/login`, `/vagas`, `/candidaturas`,
`/estagio-atual`, `/atividades` (GET/POST/PUT/DELETE), `/avaliacoes`,
`/documentos` (multipart) e `/empresas` (funções prontas em `api.js`).

Pendências conhecidas (dependem de rotas novas no backend): listagem de
candidaturas do aluno, aprovação/rejeição de candidaturas e listagem de
estagiários do supervisor — essas telas usam dados de exemplo por enquanto.
