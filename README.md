# Blogs Server

## Getting started

### 1. Clone Repository

```
git clone https://github.com/Chsaleem31/blogs-server.git
```

### 2. Install dependencies

Navigate to the project's directory:

```
cd blogs-server
```

Install dependencies using npm:

```
npm install
```

### 2. Setup environment variables

Replace `.env.example` file with `.env`
You can replace `DATABASE_URL` with your postgres database URL of local machine

### 3. Setup, migrate & seed database

Run following commands

```
npx prisma migrate deploy
```

```
npx prisma db seed
```

### 4. Start the server

For production server:

```
npm start
```

For development server:

```
npm run dev
```
