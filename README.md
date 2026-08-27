# Delhi WCD Analytics Dashboard

A full-stack prototype for monitoring beneficiary schemes, applications, sanctions, DBT payments, and grievances under the Delhi Department of Women and Child Development.

The current implementation provides a responsive React dashboard with synthetic scheme-level data. The next phase will introduce a PostgreSQL-backed AI data assistant capable of answering natural-language questions by generating and executing read-only SQL queries.

## Current Features

- Admin login and protected routes
- Persistent browser session
- Financial year, district, and scheme filters
- Dynamic KPI cards and charts
- Application-status analytics
- Scheme-wise beneficiary analytics
- DBT payment monitoring
- Grievance-resolution analytics
- Responsive sidebar navigation
- Administrative module routes
- FY 2022-23 through FY 2026-27 coverage

## Technology Stack

### Frontend

- React
- Vite
- React Router
- Recharts
- Lucide React
- CSS

### Planned Backend and AI

- FastAPI
- PostgreSQL
- SQLAlchemy
- LangGraph
- LangChain
- Groq API
- JWT authentication

## Project Structure

```text
dly_demo_pmc/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── data/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── styles/
│   │   └── utils/
│   ├── package.json
│   └── vite.config.js
├── backend/
├── database/
└── README.md