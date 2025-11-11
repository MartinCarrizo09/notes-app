# Logging and Correlation ID Flow# Logging and Correlation ID Flow# 🧾 Logging and Correlation ID Flow



```mermaid

flowchart TD

  A[Incoming HTTP Request] --> B[CorrelationIdFilter]```mermaid```mermaid

  B --> C[MDC stores X-Correlation-Id]

  C --> D[Controller]flowchart TDflowchart TD

  D --> E[Service]

  E --> F[Repository]  A[Incoming HTTP Request] --> B[CorrelationIdFilter]  A[Incoming HTTP Request] --> B[CorrelationIdFilter]

  E --> G[Logback Appender]

  G --> H[(app.log file)]  B --> C[MDC stores X-Correlation-Id]  B --> C[MDC stores X-Correlation-Id]



  B -.->|Adds header X-Correlation-Id| A  C --> D[Controller]  C --> D[Controller]

  G -.->|Output example| I["2025-11-11 11:32 INFO [abc123] NoteService - User 12 created note 'Test'"]

```  D --> E[Service]  D --> E[Service]



## Description  E --> F[Repository]  E --> F[Repository]



- Every incoming request passes through a Correlation ID Filter.  E --> G[Logback Appender]  E --> G[Logback Appender]

- If the header X-Correlation-Id is not present, a new UUID is generated.

- The ID is stored in the Mapped Diagnostic Context (MDC) and included in all logs.  G --> H[(app.log file)]  G --> H[(app.log file)]

- Logs are formatted and persisted via Logback for traceability.



  B -.->|Adds header X-Correlation-Id| A  B -.->|Adds header X-Correlation-Id| A

  G -.->|Output example| I["2025-11-11 11:32 INFO [abc123] NoteService - User 12 created note 'Test'"]  G -.->|Output example| I["2025-11-11 11:32 INFO [abc123] NoteService - User 12 created note 'Test'"]

``````



## Description## Description



- Every incoming request passes through a Correlation ID Filter.- Every incoming request passes through a Correlation ID Filter.

- If the header `X-Correlation-Id` is not present, a new UUID is generated.- If the header `X-Correlation-Id` is not present, a new UUID is generated.

- The ID is stored in the Mapped Diagnostic Context (MDC) and included in all logs.- The ID is stored in the Mapped Diagnostic Context (MDC) and included in all logs.

- Logs are formatted and persisted via Logback for traceability.- Logs are formatted and persisted via Logback for traceability.

