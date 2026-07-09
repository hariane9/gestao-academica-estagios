# Guia de Deploy — Railway

Como hospedar a plataforma no [Railway](https://railway.com) usando o trial
gratuito (US$ 5 por 30 dias). São 3 serviços no mesmo projeto: banco MySQL,
API PHP e frontend.

## 1. Criar o projeto

1. Acesse railway.com e entre com a conta do **GitHub**.
2. **New Project** → **Deploy from GitHub repo** → escolha
   `gestao-academica-estagios` (autorize o acesso se pedir).
3. Antes que o primeiro deploy termine, siga os passos abaixo para configurar
   cada serviço.

## 2. Banco de dados (MySQL)

1. No projeto, clique em **+ New** → **Database** → **Add MySQL**.
2. Depois de criado, abra o serviço MySQL → aba **Data** → **Query** e cole o
   conteúdo do arquivo `public/backend/database.sql` → execute.
   (Alternativa: conectar com um cliente MySQL usando as credenciais da aba
   **Connect** e importar o arquivo.)

## 3. API PHP (backend)

1. O serviço criado a partir do repositório usa o `Dockerfile` da raiz
   automaticamente.
2. Na aba **Variables** do serviço, adicione (usando referências ao MySQL):

   | Variável  | Valor                          |
   |-----------|--------------------------------|
   | `DB_HOST` | `${{MySQL.MYSQLHOST}}`         |
   | `DB_PORT` | `${{MySQL.MYSQLPORT}}`         |
   | `DB_NAME` | `${{MySQL.MYSQLDATABASE}}`     |
   | `DB_USER` | `${{MySQL.MYSQLUSER}}`         |
   | `DB_PASS` | `${{MySQL.MYSQLPASSWORD}}`     |

3. Aba **Settings** → **Networking** → **Generate Domain**. Anote a URL
   (ex: `https://api-producao.up.railway.app`).
4. Teste no navegador: `https://SUA-URL/index.php/vagas` deve retornar JSON.

## 4. Frontend

1. **+ New** → **GitHub Repo** → o mesmo repositório.
2. Aba **Settings** → **Root Directory**: `frontend`.
3. Aba **Variables**, adicione:

   | Variável       | Valor                                        |
   |----------------|----------------------------------------------|
   | `VITE_API_URL` | `https://SUA-URL-DA-API/index.php`           |

   (a URL gerada no passo 3.3, terminando em `/index.php`)
4. **Settings** → **Networking** → **Generate Domain**. Essa é a URL que você
   envia para o IF testar.

## 5. Conferência final

- Abra a URL do frontend → tela de login deve carregar.
- Crie uma conta, entre e teste vagas/diário/documentos.
- Erros? Veja os **Deploy Logs** de cada serviço no Railway.

## Observações

- **Uploads são temporários**: os PDFs enviados ficam no container e somem a
  cada novo deploy (sem volume persistente no trial). Para a demonstração não
  é problema; para produção, contratar volume ou storage externo.
- **Rodando local continua igual**: sem variáveis de ambiente definidas, o
  `config/database.php` usa `localhost/root` (WAMP) e o frontend usa o proxy
  do Vite — nada muda no fluxo de desenvolvimento.
- Depois do trial, o plano Hobby (US$ 5/mês) mantém tudo no ar sem migração.
