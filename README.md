# Notes App Challenge  Ensolvers

## Overview

This project is a simple note-taking web application built as a Full Stack SPA.
It allows users to create, edit, archive, and manage notes, with proper error handling and logging.
Authentication is implemented with JWT tokens, and each request includes a Correlation ID for traceability.

## Tech Stack

| Layer | Technologies & Versions |
|-------|------------------------|
| **Backend** | Java 21, Spring Boot 3.3.4, Spring Data JPA, Hibernate, PostgreSQL 42.7.3 |
| **Frontend** | React 19.2.0, Vite 7.2.2, Axios 1.13.2, React Router 7.9.5 |
| **Authentication** | JWT (jjwt 0.12.3) with Spring Security |
| **Logging** | Logback + MDC Correlation ID |
| **API Documentation** | SpringDoc OpenAPI 2.3.0 (Swagger UI) |
| **Build Tools** | Maven 3.9+, npm 9+ |

## Architecture

The system is divided into two independent apps:
- `/backend`: Spring Boot REST API
- `/frontend`: React SPA (Vite)

Detailed diagrams are available in the [`/docs`](./docs) folder:
- [Architecture Overview](./docs/architecture.md)
- [Data Model (ERD)](./docs/data-model.md)
- [Authentication Flow](./docs/auth-flow.md)
- [Logging and Correlation](./docs/logging.md)

## Run Instructions

### Prerequisites

Please ensure you have the following installed with the exact versions:

- **Java**: 21 or higher (OpenJDK or Oracle JDK)
- **Maven**: 3.9.0 or higher
- **Node.js**: 18.0.0 or higher (tested with 18.17.0+)
- **npm**: 9.0.0 or higher (comes with Node.js)
- **PostgreSQL**: 12.0 or higher (tested with 14+)

### Database Setup

**IMPORTANT**: Before running the application, you must set up PostgreSQL:

1. **Start PostgreSQL** service on `localhost:5432`

2. **Create the database**:
   ```sql
   CREATE DATABASE notes_db;
   ```

3. **Database credentials** (configured in `backend/src/main/resources/application.properties`):
   - **Username**: `postgres`
   - **Password**: `tpi` ⚠️ **This is the default password configured in the app**
   - **Database**: `notes_db`
   - **Port**: `5432`

4. **Automatic schema creation**: The application will automatically create all tables on first run using `spring.jpa.hibernate.ddl-auto=update`

**Note**: If your PostgreSQL uses a different password, update it in `backend/src/main/resources/application.properties`:
```properties
spring.datasource.password=your_password_here
```

### Run

**Quick Start** (Linux/macOS):

```bash
chmod +x start.sh
./start.sh
```

This script will:
- Check prerequisites
- Start the Spring Boot backend on `http://localhost:8080` (runs in background)
- Start the React frontend on `http://localhost:5173` (runs in foreground)
- Both servers run in parallel

**Note**: 
- The script runs in the foreground. Press `Ctrl+C` to stop both servers.
- On first run, Maven will download dependencies (may take 2-3 minutes).
- Backend logs are saved to `backend/logs/backend.log`.
- Make sure PostgreSQL is running and the database `notes_db` exists before starting.

### Manual Run

If you prefer to run them separately:

```bash
cd backend && mvn spring-boot:run
```

```bash
cd frontend && npm install && npm run dev
```

## API Documentation

- Swagger UI: `http://localhost:8080/swagger-ui.html`
- OpenAPI JSON: `http://localhost:8080/v3/api-docs`

## 🔑 Example Credentials

- `username`: `admin`
- `password`: `admin123`

**Note**: JWT tokens expire after 1 hour. When a token expires, you'll be automatically redirected to the login page. Simply log in again to get a new token.

## Logging Example

```
2025-11-11 11:32:14 INFO [d2f1c97e-21e3-42b6] NoteService  User admin created note "Shopping List"
```

## Future Improvements

These are potential next steps for scalability and maintainability:

- Deploy to cloud platform (Render, Railway, Heroku, etc.)
- Replace JWT authentication with Keycloak for centralized identity management
- Add unit tests with JUnit and integration tests with RestAssured
- Implement Docker Compose for full local orchestration
- Add CI/CD pipeline with GitHub Actions
