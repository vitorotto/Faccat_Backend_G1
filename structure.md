project-root/
│
├── prisma/
│   └── schema.prisma          # Definição do modelo do banco
│
├── src/
│   ├── domain/
│   │   └── ports/
│   │       └── UserRepository.js     # Interface para repositório
│
│   ├── application/
│   │   └── use-cases/
│   │       └── createUser.js         # Caso de uso
│
│   ├── infrastructure/
│   │   ├── database/
│   │   │   └── UserPrismaRepository.js   # Implementação da interface
│   │   └── http/
│   │       ├── controllers/
│   │       │   └── UserController.js
│   │       ├── routes/
│   │       │   └── userRoutes.js
│   │       └── server.js
│
│   └── schemas/
│       └── userSchema.js         # Validação com Zod
│
├── package.json
└── .env

prisma
---
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id       Int    @id @default(autoincrement())
  name     String
  email    String @unique
  password String
}
