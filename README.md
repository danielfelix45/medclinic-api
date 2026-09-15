# MedClinic API

API REST desenvolvida como Mini-Projeto Final do Módulo 02 do programa SCTEC, com foco na implementação da base de autenticação e autorização da plataforma MedClinic.

## Tecnologias

- Node.js
- TypeScript
- Express
- TypeORM
- PostgreSQL
- JWT
- bcryptjs

## Funcionalidades

- Cadastro de usuários
- Login com geração de JWT
- Autenticação por token
- Controle de acesso por perfil (RBAC)
- Consulta do usuário autenticado
- Rota exclusiva para administrador
- Tratamento centralizado de erros

## Arquitetura

O projeto utiliza uma arquitetura em camadas:

`Routes → Middlewares → Controllers → Services → Repositories → PostgreSQL`

Principais diretórios:

- `controllers`: entrada e saída das requisições
- `services`: regras de negócio
- `repositories`: acesso aos dados
- `entities`: entidades do TypeORM
- `middlewares`: autenticação, autorização e erros
- `database`: configuração e migrations
- `dtos`: objetos de transferência de dados
- `utils`: recursos auxiliares

## Configuração

Crie um arquivo `.env` na raiz do projeto com:

PORT
DB_HOST
DB_PORT
DB_USERNAME
DB_PASSWORD
DB_DATABASE
DB_SSL
JWT_SECRET
JWT_EXPIRES_IN

## Como executar

Instale as dependências:

npm install

Execute as migrations:

npm run typeorm -- migration:run -d src/database/data-source.ts

Inicie o projeto em desenvolvimento:

npm run dev

Para compilar:

npm run build

## Endpoints

| Método | Endpoint         | Acesso              |
| ------ | ---------------- | ------------------- |
| POST   | `/auth/register` | Público             |
| POST   | `/auth/login`    | Público             |
| GET    | `/users/me`      | Usuário autenticado |
| GET    | `/admin/ping`    | Administrador       |

## Perfis de acesso

- **Administrador:** acesso às rotas administrativas.
- **Atendente:** acesso restrito às funcionalidades permitidas para usuários autenticados.

## Segurança

As senhas são armazenadas utilizando hash com bcrypt. A autenticação utiliza JWT com tempo de expiração, e as rotas protegidas validam o token e o perfil de acesso do usuário.
