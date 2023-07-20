# Blogs Server

## Getting started

### 1. Clone Repository

Run following command in the terminal.

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

### 3. Setup environment variables

Rename `.env.example` file with `.env`.
You can replace `DATABASE_URL` with your PostgreSQL database URL of local machine.
Default server port is set to 8080. You can change it in env file by change `PORT` value.

### 4. Setup, migrate & seed database

Run following commands in the terminal:

```
npx prisma migrate deploy
```

```
npx prisma db seed
```

### 5. Start the server

For production server, run this command:

```
npm start
```

For development server, run this command:

```
npm run dev
```

Server will start at `http://localhost:8080` by default.

### Running test cases

Quit the server if it is running.
Run following command in the terminal.

```
npm run test
```
