# Fintrack API

Fintrack API é a API de um sistema de controle de finanças pessoais, desenvolvido como parte de um trabalho acadêmico para as disciplinas de Teste de Software, Engenharia de Software e Programação Web.

## 🦰 Tecnologias Utilizadas

- Node.js
- Express.js
- PostgreSQL
- Prisma ORM
- Docker
- Clean Architecture
- ESLint + Prettier
- Jest (para testes)
- Swagger (para documentar)

## 📁 Estrutura do Projeto

A arquitetura segue os princípios da **Clean Architecture**, **SOLID** e **Adapter Pattern**. Separando responsabilidades em camadas bem definidas:

```
fintrack-api/
│
├── .husky/                      # Hooks de git para automação de tarefas
├── docs/                        # Documentação da API
│   └── swagger.json             # Especificação Swagger
├── prisma/                      # Arquivos de migração e schema do Prisma
|
├── src/                         # Código-fonte principal
│   ├── adapters/                # Adaptadores e interfaces
│   ├── controllers/             # Controladores HTTP e Tratamento de Erros
│   ├── errors/                  # Definições de erros customizados
│   ├── factories/               # Centralizar a criação de objetos
│   ├── repositories/            # Implementações dos repositórios (Postgres etc.)
│   ├── routes/                  # Definição das rotas da API
│   ├── schemas/                 # Validações de entrada com Zod
│   └── use-cases/               # Regras de negócio
│   └── app.js                   # Configuração principal do app Express
│
├── .env.example                 # Exemplo de variáveis de ambiente
├── .gitignore                   # Arquivos e pastas ignorados pelo git
├── .lintstagedrc.json           # Configuração do lint-staged
├── .prettierrc.json             # Configuração do Prettier
├── docker-compose.yml           # Configuração do Docker
├── eslint.config.js             # Configuração do ESLint
└── index.js                     # Ponto de entrada da aplicação

```

## 🚀 Como Executar Localmente

### 1. Clonar o repositório

```bash
git clone https://github.com/seu-usuario/fintrack-api.git
cd fintrack-api
```

### 2. Criar o arquivo `.env`

Copie o arquivo `.env.example` para `.env` e preencha com suas configurações:

```bash
cp .env.example .env
```

### 3. Instalar as dependências

```bash
npm install
```

### 4. Rodar as migrations

```bash
npx prisma migrate dev
```

### 5. Executar o container Docker 🐳

```bash
docker-compose up -d
```

### 6. Iniciar a aplicação

```bash
npm run start:dev
```
### 7. Acessar a documentação da API

Após iniciar a aplicação, a documentação da API estará disponível em [http://localhost:8080/docs](http://localhost:8080/docs).


---
