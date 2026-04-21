## 🔧 Etapas já realizadas

### 1. Criação da estrutura do projeto

Foi criada a estrutura inicial separando frontend e backend:

```bash
DesafioFullStack/
│
├── backend/   # API NestJS
├── frontend/  # Aplicação Next.js
└── README.md
```

---

### 2. Configuração do Front-end (Next.js)

O projeto frontend foi criado utilizando:

```bash
npx create-next-app@latest
```

Configurações utilizadas:

* TypeScript habilitado
* Estrutura padrão recomendada
* Tailwind CSS incluído

---

### ⚠️ Ajuste de versão do Node.js

Durante a instalação, foi identificado que a versão do Node.js não atendia aos requisitos do Next.js.

Versão inicial:

```bash
Node v20.3.1
```

Versão necessária:

```bash
>= 20.9.0
```

Solução:

* Atualização do Node.js para versão compatível (v20.11.1)
* Reinstalação das dependências do frontend:

```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
```

---

### 3. Configuração do Back-end (NestJS)

O backend foi criado com o CLI do NestJS:

```bash
nest new backend
```

---

### 4. Execução do Backend

Para iniciar o servidor em modo desenvolvimento:

```bash
cd backend
npm run start:dev
```

---

### ⚠️ Conflito de porta

Ao executar o backend, ocorreu o erro:

```bash
Error: listen EADDRINUSE: address already in use :::3000
```

Causa:

* A porta 3000 já estava sendo utilizada pelo frontend (Next.js)

---

### ✅ Solução aplicada

A porta do backend foi alterada para evitar conflito.

Arquivo:

```bash
backend/src/main.ts
```

Alteração realizada:

```ts
await app.listen(3001);
```

---

### 🔌 Portas definidas até o momento

| Serviço  | Porta |
| -------- | ----- |
| Frontend | 3000  |
| Backend  | 3001  |

---

### 5. Testes iniciais

* Frontend inicializado com sucesso
* Backend inicializado com sucesso

Teste da API:

```bash
http://localhost:3001
```

Resposta esperada:

```bash
Hello World!
```
---

## 🐳 Configuração com Docker

Com o objetivo de facilitar a execução do projeto e garantir consistência entre ambientes, foi configurado o uso de Docker para containerização da aplicação.

---

### 1. Criação do arquivo docker-compose

Na raiz do projeto, foi criado o arquivo:

```bash
docker-compose.yml
```

Responsável por orquestrar os serviços da aplicação:

* Banco de dados (PostgreSQL)
* Backend (NestJS)
* Frontend (Next.js)

---

### 2. Definição dos serviços

O arquivo `docker-compose.yml` contém a seguinte estrutura:

```yaml
version: '3.8'

services:
  db:
    image: postgres
    container_name: postgres_db
    restart: always
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: desafio
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  backend:
    build: ./backend
    container_name: nest_backend
    ports:
      - "3001:3001"
    depends_on:
      - db

  frontend:
    build: ./frontend
    container_name: next_frontend
    ports:
      - "3000:3000"
    depends_on:
      - backend

volumes:
  postgres_data:
```

---

### 3. Criação dos Dockerfiles

#### Backend (`/backend/Dockerfile`)

```Dockerfile
FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3001

CMD ["npm", "run", "start:prod"]
```

---

#### Frontend (`/frontend/Dockerfile`)

```Dockerfile
FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]
```

---

### 4. Configuração de variáveis de ambiente

Foi criado um arquivo `.env` no backend para configuração da conexão com o banco de dados:

```env
DATABASE_URL=postgresql://postgres:postgres@db:5432/desafio
```

Observação:

* O host `db` refere-se ao nome do serviço definido no `docker-compose`

---

### 5. Execução dos containers

Para subir todos os serviços, foi utilizado o comando:

```bash
docker-compose up --build
```

---

### 6. Serviços disponíveis

Após a execução, os serviços ficam disponíveis em:

| Serviço  | URL                   |
| -------- | --------------------- |
| Frontend | http://localhost:3000 |
| Backend  | http://localhost:3001 |
| Banco    | localhost:5432        |

---

### 7. Observações

* Os containers são inicializados de forma integrada
* O backend depende do banco de dados
* O frontend depende do backend
* O volume `postgres_data` garante persistência dos dados do banco

---

### 8. Testes realizados

* Containers iniciados com sucesso
* Backend e frontend acessíveis via navegador
* Banco de dados PostgreSQL em execução
