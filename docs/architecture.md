# 🧩 System Architecture

```mermaid
flowchart LR
  subgraph Frontend [React SPA]
    A[UI Components] --> B[Axios Service]
  end

  subgraph Backend [Spring Boot REST API]
    C[Controller Layer] --> D[Service Layer]
    D --> E[Repository Layer]
    E --> F[(PostgreSQL Database)]
    D --> G[Logback + Correlation ID]
  end

  B -->|REST API JSON| C
```

## Description

The React SPA communicates with the Spring Boot REST API using JSON over HTTP.

The backend is layered:

- **Controller**: Handles HTTP requests and responses.
- **Service**: Contains business logic.
- **Repository**: Manages database access through JPA/Hibernate.

All logs include a Correlation ID for traceability.
