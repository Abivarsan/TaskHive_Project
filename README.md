# TaskHive 🚀

TaskHive is a comprehensive task and project management web application designed to help teams collaborate, track tasks, log work hours, organize meetings, and generate reports efficiently.

---

## 🏗️ Project Architecture

This repository is structured as a unified monorepo containing both the frontend and backend applications:

```text
TaskHive Project/
├── BackEnd/              # ASP.NET Core Web API & Entity Framework Core
│   ├── Work.sln          # Visual Studio Solution file
│   └── TASKHIVE/         # C# Project (Controllers, Models, Services, etc.)
├── FrontEnd/             # React SPA (Material-UI, Bootstrap, React Router)
│   ├── public/
│   ├── src/
│   └── package.json
├── .gitignore            # Unified ignore rules (.NET, Node, IDEs)
└── README.md             # Project documentation
```

---

## 💻 Tech Stack

### Backend
- **Framework:** ASP.NET Core Web API (.NET 8 / C#)
- **Database:** Microsoft SQL Server with Entity Framework Core
- **Architecture:** Repository Pattern with DTOs, Services, and Controllers
- **Documentation/Testing:** Swagger / OpenAPI, HTTP files

### Frontend
- **Framework:** React 18
- **UI Libraries:** Material UI (`@mui/material`), React Bootstrap, FontAwesome
- **Charts & Data:** Recharts, MUI X-Charts
- **Routing & State:** React Router v7, Axios, JWT Decode

---

## 🚀 Getting Started

### Prerequisites
- [.NET 8.0 SDK](https://dotnet.microsoft.com/download)
- [Node.js](https://nodejs.org/) (v16+ recommended)
- [Microsoft SQL Server](https://www.microsoft.com/en-us/sql-server/sql-server-downloads) & SQL Server Management Studio (SSMS)
- [Visual Studio 2022](https://visualstudio.microsoft.com/) (for backend)
- [Visual Studio Code](https://code.visualstudio.com/) (for frontend)

---

### Backend Setup (ASP.NET Core)

1. Open `BackEnd/Work.sln` in **Visual Studio 2022**.
2. Open `BackEnd/TASKHIVE/appsettings.json` and verify the SQL Server connection string:
   ```json
   "ConnectionStrings": {
     "DefaultConnection": "Server=YOUR_SERVER_NAME;Database=TaskHiveDB;Trusted_Connection=True;TrustServerCertificate=True"
   }
   ```
3. Open **Package Manager Console** in Visual Studio (or terminal in `BackEnd/TASKHIVE`):
   ```bash
   dotnet ef database update
   ```
4. Press **F5** or click **Run** to start the API server. By default, Swagger UI will open in your browser.

---

### Frontend Setup (React)

1. Open the `FrontEnd` folder in **Visual Studio Code**.
2. Open the integrated terminal and install dependencies (if not already installed):
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```
4. The React application will run at `http://localhost:3000`.

---

## 🛠️ Development Guidelines

- **Visual Studio:** Use for editing and debugging C# backend code.
- **VS Code:** Use for frontend development with live hot-reloading.
- **Git Version Control:** Both frontend and backend share this root repository. Changes across both apps can be tracked and committed together or separately.
