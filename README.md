# Auth Node API

API REST de autenticação e gestão de usuários construída com **Node.js**, **Fastify**, **Prisma** e **PostgreSQL**. Inclui registro, login com JWT, perfil do usuário autenticado e listagem paginada de usuários.

## Tecnologias

- **Node.js** (runtime)
- **Fastify** (servidor HTTP)
- **Prisma** (ORM com PostgreSQL)
- **PostgreSQL** (banco de dados)
- **JWT** (autenticação)
- **bcryptjs** (hash de senhas)
- **Zod** (validação de dados)
- **TypeScript**

## Pré-requisitos

- Node.js 20+
- pnpm (ou npm/yarn)
- PostgreSQL (ou use o Docker Compose)

## Variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/authnode_db?schema=public"
JWT_SECRET="sua_chave_secreta_super_segura_aqui"
```

## Como rodar

### Desenvolvimento (local)

1. Instale as dependências:

```bash
pnpm install
```

2. Gere o cliente do Prisma e aplique as migrations:

```bash
npx prisma generate
npx prisma migrate dev
```

3. Inicie o servidor em modo desenvolvimento:

```bash
pnpm run dev
```

A API ficará disponível em **http://localhost:3333**.

### Produção com Docker

Na raiz do projeto:

```bash
docker-compose up -d
```

Isso sobe a API na porta **3333** e o PostgreSQL na **5432**. As variáveis de ambiente já vêm configuradas no `docker-compose.yml`.

### Build manual

```bash
pnpm run build
pnpm run start
```

## Endpoints da API

### Cadastro de usuário

**POST** `/register`

Cadastra um novo usuário.

**Body (JSON):**

```json
{
  "name": "João Silva",
  "email": "joao@email.com",
  "password": "senha123"
}
```

- **Senha:** mínimo 6 caracteres.
- **Resposta 409:** e-mail já cadastrado.

---

### Login (sessão)

**POST** `/sessions`

Autentica e retorna um token JWT.

**Body (JSON):**

```json
{
  "email": "joao@email.com",
  "password": "senha123"
}
```

**Resposta 200:**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

O token expira em **7 dias**. Use no header `Authorization: Bearer <token>` nas rotas protegidas.

---

### Perfil do usuário (protegido)

**GET** `/profile`

Retorna os dados do usuário autenticado.

**Headers:**

```
Authorization: Bearer <seu_token_jwt>
```

**Resposta 200:**

```json
{
  "user": {
    "id": "uuid",
    "name": "João Silva",
    "email": "joao@email.com",
    "createdAt": "2025-02-15T..."
  }
}
```

---

### Listar usuários

**GET** `/users?page=1`

Lista usuários com paginação (sem senha nos dados).

**Query (opcional):**

- `page` – número da página (default: 1)

**Resposta 200:**

```json
{
  "users": [
    {
      "id": "uuid",
      "name": "João Silva",
      "email": "joao@email.com",
      "createdAt": "2025-02-15T..."
    }
  ]
}
```

---

## Resumo das rotas

| Método | Rota       | Autenticação | Descrição              |
|--------|------------|--------------|------------------------|
| POST   | `/register`| Não          | Cadastrar usuário      |
| POST   | `/sessions`| Não          | Login (retorna JWT)    |
| GET    | `/profile` | Sim (JWT)    | Dados do usuário       |
| GET    | `/users`   | Não          | Listar usuários (paginado) |

## Estrutura do projeto

- `src/http/` – rotas, controllers e middlewares (ex.: `verify-jwt`)
- `src/services/` – regras de negócio
- `src/repositories/` – acesso a dados (Prisma)
- `prisma/` – schema e migrations do banco

## Licença

ISC
