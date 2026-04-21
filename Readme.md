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
