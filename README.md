# Neon Planner -- Full Stack Task Manager with Monitoring

Este repositório contém a aplicação **Neon Planner**, um gerenciador de
tarefas completo composto por:

-   🟦 **Back-end** em Node.js + Express\
-   🟩 **Front-end** em React (Vite) servido via Nginx\
-   🟨 **Banco de Dados PostgreSQL**\
-   🟥 **Stack Zabbix** para monitoramento (DB + Server + Web UI +
    Agent)\
-   🐳 Toda a infraestrutura orquestrada via **Docker Compose**

------------------------------------------------------------------------

## 🌐 Links do Deploy

  Serviço                 URL
  ----------------------- ------------------------------------------
  **Frontend (Vercel)**   https://neontasks-devops-kc83.vercel.app
  **Backend (Render)**    https://neontasks-devops-1.onrender.com

------------------------------------------------------------------------

## 📁 Estrutura do Projeto

    /
    ├── backend/           # API Node.js (Express + Knex + PostgreSQL)
    ├── frontend/          # Interface React (Vite) servida via Nginx
    ├── docker-compose.yml # Orquestra toda a stack
    └── README.md

------------------------------------------------------------------------

## ⚙️ Tecnologias Utilizadas

**Backend** - Node.js + Express - Knex.js - PostgreSQL

**Frontend** - React (Vite) - Nginx (servidor estático + reverse proxy)

**DevOps** - Docker & Docker Compose - Zabbix (monitoramento completo)

------------------------------------------------------------------------

## 🚀 Como Executar o Projeto

### 1️⃣ Pré-requisitos

-   Docker
-   Docker Compose

------------------------------------------------------------------------

### 2️⃣ Criar arquivo `.env` na raiz do projeto

    NODE_ENV=development
    DATABASE_URL=postgres://postgres:postgres@db:5432/neon_tasks
    PGSSLMODE=disable

------------------------------------------------------------------------

### 3️⃣ Subir toda a stack

``` bash
docker-compose up -d --build
```

------------------------------------------------------------------------

## 🔌 Acessos Principais

  Serviço           URL
  ----------------- -----------------------------------
  Front-end         http://localhost
  API Backend       http://localhost:4000/api/tarefas
  Zabbix Web        http://localhost:8080
  Postgres App      localhost:5432
  Postgres Zabbix   interno

------------------------------------------------------------------------

## 🧩 Backend -- API Node.js

A API segue uma estrutura simples com CRUD de tarefas.

### 📌 Rotas

    GET    /api/tarefas
    POST   /api/tarefas
    PUT    /api/tarefas/:id
    DELETE /api/tarefas/:id

### 📄 Exemplo de rota (Express)

``` js
const express = require('express');
const router = express.Router();
const controller = require('../controllers/tarefa.controller');

router.get('/', controller.listar);
router.post('/', controller.criar);
router.put('/:id', controller.atualizar);
router.delete('/:id', controller.remover);

module.exports = router;
```

------------------------------------------------------------------------

## 🐳 Docker -- Configurações Principais

### Backend (Node.js)

-   Instala dependências via `npm ci`
-   Porta exposta **3000 → 4000**
-   Healthcheck ativo em `/api/tarefas`

### Frontend (React + Vite)

-   Build criado em `/dist`
-   Servido via Nginx na porta **80**
-   Reverse proxy configurado para `/api → backend`

### Banco de Dados PostgreSQL

-   Volume persistente `db_data`
-   Porta exposta **5432**
-   Banco padrão: `neon_tasks`

### Stack Zabbix

Inclui:

-   `zabbix-db`
-   `zabbix-server`
-   `zabbix-web`
-   `zabbix-agent`

Disponível em `http://localhost:8080`

------------------------------------------------------------------------

## 🛠️ Comandos Úteis

### Rodar apenas backend

``` bash
cd backend
npm start
```

### Rodar migrações (Knex)

``` bash
npm run migrate
```

------------------------------------------------------------------------

## 📦 Deploy e Build

O projeto é totalmente conteinerizado. Apenas execute:

``` bash
docker-compose up --build -d
```

E toda a infraestrutura será provisionada automaticamente.

------------------------------------------------------------------------

## 🤩 Estudantes Responsáveis

- Clara Heloísa Pereira dos Santos (Matricula: 01710826)
- Fernanda Gabrielli de Oliveira Magalhães (Matricula: 01710910)
- Lívia Janine Menezes Cabral da Silva (Matricula: 01712089)
- Maria Fernanda Trevizane Buonafina (Matrícula: 01711101)

------------------------------------------------------------------------
## 🤝 Contribuição

Fique à vontade para enviar PRs ou sugestões!

------------------------------------------------------------------------

## 📜 Licença

Este projeto está sob a licença MIT.
