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

## 📁 Estrutura do Projeto

A arquitetura segue os princípios da **Clean Architecture**, **SOLID** e **Adapter Pattern**. Separando responsabilidades em camadas bem definidas:

```
fintrack-api/
│
├── prisma/                     # Arquivos de migração e schema do Prisma
├── src/
│   ├── adapters/               # Adaptadores e interfaces
│   ├── controllers/           # Controladores que recebem as requisições HTTP
│   ├── errors/                # Definições de erros customizados
│   ├── factories/             # Factories para injeção de dependência
│   ├── repositories/          # Implementações dos repositórios (Postgres etc.)
│   ├── schemas/               # Validações de entrada com Zod (ou outra lib)
│   └── use-cases/             # Regras de negócio
│
├── .env.example               # Exemplo de variáveis de ambiente
├── docker-compose.yml         # Configuração do Docker
├── index.js                   # Ponto de entrada da aplicação
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

---







