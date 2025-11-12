# Notes App Challenge  Ensolvers

## Overview

This project is a simple note-taking web application built as a Full Stack SPA.
It allows users to create, edit, archive, and manage notes, with proper error handling and logging.
Authentication is implemented with JWT tokens, and each request includes a Correlation ID for traceability.

## Tech Stack

| Layer | Technologies |
|-------|--------------|
| **Backend** | Java 21  Spring Boot 3.3+  JPA/Hibernate  PostgreSQL |
| **Frontend** | React (Vite)  Axios  React Router |
| **Authentication** | JWT (Spring Security) |
| **Logging** | Logback + MDC Correlation ID |

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

- Java 21+
- Maven 3.9+
- Node.js 18+
- PostgreSQL running locally

### Run

To start the application, run:

```bash
./start.sh
```

This script will:
- Run the Spring Boot backend with Swagger UI enabled on `http://localhost:8080/swagger-ui.html`

Manual run:

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
- Sample JWT (1h validity, issued with `test-secret-key-for-testing-purposes-only`):  
  `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTc2Mjk1MDk1OCwiZXhwIjoxNzYyOTU0NTU4fQ.2xyvxfoz2KjyId_FH4ysTYg8jVsGMZ7HcVsRREOpx4I`

## Logging Example

```
2025-11-11 11:32:14 INFO [d2f1c97e-21e3-42b6] NoteService  User admin created note "Shopping List"
```

## Deployment

A live version of the project is available at:

https://ensolvers-notes.onrender.com

## Future Improvements

These are potential next steps for scalability and maintainability:

- Replace JWT authentication with Keycloak for centralized identity management
- Add unit tests with JUnit and integration tests with RestAssured
- Implement Docker Compose for full local orchestration
