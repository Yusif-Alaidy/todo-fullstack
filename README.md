# Todo Fullstack

A simple full-stack Todo application built as a learning project to practice integrating an **ASP.NET Core** backend with an **Angular** frontend — from local development to a free, live deployment.

## Live Demo

- **Frontend:** https://todo-fullstack-hit1i5vue-yusif7.vercel.app/
- **Backend API (Swagger):** https://todo-fullstack.runasp.net/swagger

## Tech Stack

**Backend**
- ASP.NET Core Web API
- Entity Framework Core
- SQL Server
- Swagger / OpenAPI

**Frontend**
- Angular (standalone components)
- Signals for state management
- Template-driven forms
- Bootstrap

**Hosting**
- Backend: [MonsterASP.NET](https://www.monsterasp.net) (free ASP.NET hosting)
- Frontend: [Vercel](https://vercel.com)

## Project Structure

```
todo-fullstack/
├── backend/
│   └── TodoApi/              # ASP.NET Core Web API
│       ├── Controllers/
│       ├── Models/
│       ├── Data/             # DbContext
│       ├── Migrations/
│       ├── Program.cs
│       ├── appsettings.json
│       └── TodoApi.csproj
├── frontend/
│   └── todoFront/             # Angular app
│       ├── src/
│       │   ├── app/
│       │   └── environments/
│       └── angular.json
├── .gitignore
└── README.md
```

## Features

- Create, read, update, and delete todos
- Toggle task completion status
- Inline title editing per task
- Responsive card-based UI

## Getting Started (Local Development)

### Prerequisites

- [.NET SDK](https://dotnet.microsoft.com/download) (8.0 or later)
- [Node.js](https://nodejs.org/) and npm
- [Angular CLI](https://angular.dev/tools/cli): `npm install -g @angular/cli`
- SQL Server (LocalDB is fine) or access to a remote SQL Server instance

### 1. Clone the repository

```bash
git clone https://github.com/<your-username>/todo-fullstack.git
cd todo-fullstack
```

### 2. Backend setup

```bash
cd backend/TodoApi
dotnet restore
```

Add your local connection string in `appsettings.Development.json` (not committed to Git):

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=(localdb)\\MSSQLLocalDB;Database=TodoDb;Trusted_Connection=True;"
  }
}
```

Apply migrations and run:

```bash
dotnet ef database update
dotnet run
```

The API will be available at `https://localhost:5xxx`, with Swagger UI at `/swagger`.

### 3. Frontend setup

```bash
cd frontend/todoFront
npm install
```

Set the API URL in `src/environments/environment.ts`:

```typescript
export const environment = {
  production: false,
  baseUrl: 'https://localhost:5xxx/api/todos'
};
```

Run the dev server:

```bash
ng serve
```

The app will be available at `http://localhost:4200`.

## Deployment

- **Backend** is deployed to MonsterASP.NET via Visual Studio Web Deploy, using a SQL Server database hosted on the same platform. HTTPS is enabled via Let's Encrypt.
- **Frontend** is deployed to Vercel, building from `frontend/todoFront` with output directory `dist/todoFront/browser`.
- CORS on the backend is restricted to the deployed frontend origin.

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/todos` | Get all todos |
| POST | `/api/todos` | Create a new todo |
| PUT | `/api/todos/{id}` | Update an existing todo |
| DELETE | `/api/todos/{id}` | Delete a todo |

## License

This project is for educational purposes.
