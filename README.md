# 📝 Task API

API RESTful para gerenciamento de tarefas, desenvolvida com **Node.js**, **TypeScript** e validação com **Zod**. Projeto modular com foco em boas práticas, injeção de dependência e escalabilidade.

## Estrutura de pastas

```
src/
├── config/ # Injeção de dependências
├── controller/ # Controllers genéricos
├── errors/ # Classe de erro customizada
├── middlewares/ # Middlewares globais
├── modules/ # Features organizadas por domínio
│ └── task/ # Módulo de tarefas
├── routes/ # Arquivos de rotas
├── server.ts # Inicialização do servidor
└── index.ts # Entry point da aplicação

```

## 🚀 Tecnologias Utilizadas

- Node.js
- TypeScript
- Zod (validação de dados)
- Express
- Tsyringe
- Prisma ORM
- PostgreSQL ([Neon](https://www.neon.tech))
- Winston (Logger)
- Middlewares customizados

---

## ⚙️ Como rodar o projeto

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/task-api.git
cd task-api
```

## 2. Instale as dependências

```
npm install
```

## 3. Execute a aplicação

```
npm run dev
```

O servidor irá iniciar em: `http://localhost:3333`

## 🧪 Endpoints

### ✅ Health Check

```
GET /health
```

Retorna o status da API.

### 📌 Tarefas

Criar uma tarefa

```
POST /tasks
```

### Body:

```
{
  "title": "Minha primeira tarefa",
  "description": "Descrição opcional"
}
```

### Listar todas as tarefas

```
GET /tasks
```

### Atualizar tarefa

```
PUT /tasks/:id
```

### Body:

```
{
  "title": "Título atualizado",
  "description": "Nova descrição"
}
```

### Marcar como completa/incompleta

```
PATCH /tasks/:id/complete
```

### Body:

```
{
  "completed": true
}
```

### Deletar tarefa

```
DELETE /tasks/:id
```

### ❗ Tratamento de Erros

A API utiliza um middleware global de tratamento de erros, retornando mensagens padronizadas em caso de falhas:

```
{
  "error": "Tarefa não encontrada",
  "statusCode": 404
}
```

## 📌 Melhorias Futuras

Testes automatizados (Jest, Supertest)

Autenticação com JWT

Swagger para documentação automática

## 👨‍💻 Autor

Desenvolvido por Joilson Miranda.
[LinkedIn](https://linkedin.com/in/joilsonmslopes) | [GitHub](https://github.com/joilsonmslopes)
