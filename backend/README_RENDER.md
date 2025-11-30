Render deployment instructions

1) Create a Web Service on Render
- Connect your Git provider and choose the repository and branch `main`.
- Set the "Root Directory" to `backend`.
- Environment: Node
- Build Command: leave empty (Render runs `npm install`) or set to `npm install`
- Start Command: `npm start`

2) Environment variables (Render - Settings -> Environment)
- DATABASE_URL: use the external database URL (Render DB) you provided:
  `postgresql://neontasks_user:JP5GIgc0CuVMsp4qWxZJBBxNCHvgl8Oc@dpg-d4lpavali9vc73eeacs0-a.oregon-postgres.render.com/neontasks`
- NODE_ENV: `production` (optional)

3) Run database migrations
Option A (recommended for control): run migrations locally against the remote DB before or after deploy:

Windows PowerShell example:

```powershell
$env:DATABASE_URL='postgresql://neontasks_user:JP5GIgc0CuVMsp4qWxZJBBxNCHvgl8Oc@dpg-d4lpavali9vc73eeacs0-a.oregon-postgres.render.com/neontasks'
cd backend
npx knex migrate:latest --knexfile ./knexfile.js --env production
```

Option B (via Render shell): after deploy, open the Render web console for the service and run:

```bash
npm run migrate:prod
```

4) Verify
- After deploy, open the service URL (Render provides a domain) and check:
  - `https://<your-render-service>.onrender.com/api/tarefas` returns JSON (or empty array)
  - Logs in Render show `Servidor rodando` and `DB: conectado ao banco externo` messages if migrations and DB connection succeed.

Notes and troubleshooting
- `server.js` listens on `process.env.PORT` so Render will set the correct port automatically.
- If the app cannot connect to the DB, check the `DATABASE_URL` value and security settings of the Render Postgres instance (allow connections from the service or use the managed DB's connection string).
- If you prefer to automate migrations after each deploy, consider adding a post-deploy job in Render that runs `npm run migrate:prod` (be mindful of running migrations concurrently).

If you want, eu posso:
- adicionar um `render.yaml` que descreve automaticamente o serviço para o Render,
- ou executar as migrations para você (se autorizar o uso do DATABASE_URL aqui),
- ou testar a configuração de build localmente.  