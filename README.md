# RightEcoPoints

## 📋 Visão Geral do Projeto
Este é um backend em Node.js para um sistema de gerenciamento de pontos de coleta de materiais recicláveis. O projeto utiliza uma arquitetura Clean Architecture com separação clara de responsabilidades.
___

## 🏗️ Arquitetura do Projeto
### 1. Arquitetura Clean Architecture
O projeto segue os princípios da Clean Architecture, organizando o código em camadas bem definidas:

```
📦 src/
├── 🎯 domain/         # Camada de Domínio (regras de negócio)
├── 🔧 application/    # Camada de Aplicação (casos de uso)
├── 🏗️ infrastructure/ # Camada de Infraestrutura (frameworks e drivers)
├── 🛡️ middlewares/    # Middlewares do Express
└── 🔍 validations/    # Esquemas de validação
```

### 2. Tecnologias Utilizadas
+ **Node.js** com **Express.js** (servidor web)
+ **Prisma ORM** (acesso ao banco de dados PostgreSQL)
+ **JWT** (autenticação)
+ **Bcrypt** (criptografia de senhas)
+ **Zod** (validação de dados)

## 📁 Estrutura Detalhada das Camadas
### 🎯 Domain (Domínio)
```
domain/
├── dtos/                    # Data Transfer Objects
│   └── CollectionPointDTO.js
└── ports/                   # Interfaces/Contratos
    ├── AdminRepository.js
    ├── CollectionPointsRepository.js
    └── UserRepository.js
```

**Responsabilidade:** Define as **regras de negócio centrais** e contratos que não dependem de frameworks externos.

### 🔧 Application (Aplicação)
```
application/
└── use-cases/              # Casos de uso específicos
    ├── admin/
    ├── collection-points/  # CRUD de pontos de coleta
    └── user/               # Gerenciamento de usuários
```

**Responsabilidade:** Implementa os **casos de uso** da aplicação, orquestrando as regras de domínio.

## 🏗️ Infrastructure (Infraestrutura)
```
infrastructure/
├── server.js              # Configuração do servidor Express
├── database/              # Implementações concretas dos repositórios
│   ├── AdminPrismaRepository.js
│   ├── CollectionPointsPrismaRepository.js
│   ├── UserPrismaRepository.js
│   └── prisma.js
└── http/                  # Camada HTTP
    ├── controllers/       # Controladores das rotas
    ├── routes/           # Definição das rotas
```

**Responsabilidade:** Implementa detalhes técnicos como **banco de dados, servidor web** e **APIs externas.**

## 🗃️ Modelo de Dados (Prisma Schema)

O projeto gerencia três entidades principais:

### 👥 User (Usuário)
```prisma
model User {
  id               String            @id @default(uuid()) @db.Uuid
  email            String            @unique
  name             String?
  password         String?
  role             UserRole          @default(USER)
  collectionPoints ColectionPoints[]
  DiscartTask      DiscartTask[]
}

enum UserRole {
  USER
  ADMIN
}
```
- Usuários do sistema com roles (USER/ADMIN)
- Relacionamento com pontos de coleta e tarefas de descarte

### 📍 ColectionPoints (Pontos de Coleta)
```prisma
model ColectionPoints {
  id              String    @id @default(uuid()) @db.Uuid
  name            String
  description     String
  latitude        String
  longitude       String
  city            String
  uf              String    @db.Char(2)
  address         String
  types           String[]
  operating_hours Json?
  contact         Json?
  validated       Boolean   @default(false)
  userId          String    @db.Uuid
  user            User      @relation(fields: [userId], references: [id])
}
```
- Locais para coleta de materiais recicláveis
- Contém localização, tipos de materiais, horários de funcionamento
- Necessita validação por administrador

### 📋 DiscartTask (Tarefas de Descarte)
```prisma
model DiscartTask {
  id              String    @id @default(uuid()) @db.Uuid
  name            String
  description     String
  latitude        String
  longitude       String
  city            String
  uf              String    @db.Char(2)
  address         String
  types           String[]
  operating_hours Json?
  contact         Json?
  validated       Boolean   @default(false)
  userId          String    @db.Uuid
  user            User      @relation(fields: [userId], references: [id])
}
```
- Tarefas relacionadas ao descarte de materiais
- Similar estrutura aos pontos de coleta

## 🔒 Sistema de Autenticação e Autorização

```
middlewares/
├── authMiddleware.js            # Validação de JWT
├── authorizeRoleMiddleware.js   # Controle de acesso por role
├── validateRequestMiddleware.js # Validação de dados de entrada
└── errorHandler.js              # Tratamento global de erros
```

### Fluxo de Autenticação:
1. **Login**: Usuário fornece email/senha
2. **Validação**: Credenciais verificadas no banco
3. **Token**: JWT gerado e retornado
4. **Autorização**: Token validado em rotas protegidas
5. **Role**: Verificação de permissões por role (USER/ADMIN)

## 🚀 Fluxo de uma Requisição

```mermaid
graph TD
    A[Cliente] --> B[Rota Express]
    B --> C[Middleware de Auth]
    C --> D[Middleware de Validação]
    D --> E[Controller]
    E --> F[Use Case]
    F --> G[Repository]
    G --> H[Prisma/Database]
    H --> I[Response]
    I --> A
```

### Exemplo prático - Criar Ponto de Coleta:
1. **POST /api/collection-points** - Rota recebe requisição
2. **authMiddleware** - Valida JWT do usuário
3. **validateRequestMiddleware** - Valida dados com Zod
4. **collectionPointsController** - Processa requisição
5. **CreateCollectionPoint** (Use Case) - Executa lógica de negócio
6. **CollectionPointsPrismaRepository** - Acessa banco de dados
7. **Response** - Retorna ponto de coleta criado

## 📚 Estrutura de Casos de Uso

### 👥 User (Usuários)
- `CreateUsers.js` - Cadastro de novos usuários
- `LoginUser.js` - Autenticação de usuários
- `EditUser.js` - Edição de dados do usuário
- `GetAllUserCollections.js` - Lista pontos de coleta do usuário

### 📍 Collection Points (Pontos de Coleta)
- `CreateCollectionPoint.js` - Criação de novos pontos
- `GetCollectionPoint.js` - Busca ponto específico
- `ListAllCollectionPoint.js` - Lista todos os pontos
- `EditCollectionPoint.js` - Edição de pontos existentes
- `DeleteCollectionPoint.js` - Remoção de pontos

### 👨‍💼 Admin (Administração)
- `validateCollectionPoint.js` - Validação de pontos pelos admins

## 🛠️ Scripts Disponíveis

```json
{
  "scripts": {
    "start": "node src/infrastructure/server.js",
    "dev": "nodemon src/infrastructure/server.js",
    "db:sync": "prisma generate && prisma db push"
  }
}
```

- **`npm start`** - Inicia servidor em produção
- **`npm run dev`** - Inicia servidor em desenvolvimento (com hot reload)
- **`npm run db:sync`** - Sincroniza schema do Prisma com banco de dados

## 🌐 Endpoints da API

### 🔐 Autenticação
- `POST /api/users/register` - Cadastro de usuário
- `POST /api/users/login` - Login de usuário

### 📍 Pontos de Coleta
- `GET /api/collection-points` - Lista todos os pontos
- `GET /api/collection-points/:id` - Busca ponto específico
- `POST /api/collection-points` - Cria novo ponto (autenticado)
- `PUT /api/collection-points/:id` - Edita ponto (autenticado)
- `DELETE /api/collection-points/:id` - Remove ponto (autenticado)

### 👨‍💼 Administração
- `PUT /api/admin/validate/:id` - Valida ponto de coleta (admin only)

## 💡 Vantagens desta Arquitetura

- ✅ **Testabilidade**: Camadas isoladas facilitam testes unitários
- ✅ **Manutenibilidade**: Código organizado e com responsabilidades claras
- ✅ **Flexibilidade**: Fácil troca de frameworks ou banco de dados
- ✅ **Escalabilidade**: Estrutura preparada para crescimento
- ✅ **Independência**: Regras de negócio não dependem de frameworks
- ✅ **Reutilização**: Use cases podem ser reutilizados em diferentes interfaces
- ✅ **Segurança**: Sistema robusto de autenticação e autorização

## 🔧 Configuração do Ambiente

### Pré-requisitos:
- Node.js 18+
- PostgreSQL
- npm ou yarn

### Variáveis de Ambiente:
```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/ecotrack"
JWT_SECRET="seu_jwt_secret_aqui"
PORT=3000
```

### Instalação:
```bash
# Clone o repositório
git clone [url-do-repositorio]

# Instale as dependências
npm install

# Configure o banco de dados
npm run db:sync

# Inicie o servidor
npm run dev
```

---

**EcoTrack** - Sistema de Gerenciamento de Pontos de Coleta Sustentável 🌱


