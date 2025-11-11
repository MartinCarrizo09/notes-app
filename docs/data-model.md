# Data Model# Data Model# Data Model (ER Diagram)# Data Model (ER Diagram)# 🗃️ Data Model (ER Diagram)



```mermaid

erDiagram

    USER ||--o{ NOTE : owns```mermaid

    NOTE ||--o{ TAG : has

erDiagram

    USER {

        int id PK    USER ||--o{ NOTE : owns```mermaid

        string username

        string password    NOTE ||--o{ TAG : has

    }

erDiagram

    NOTE {

        int id PK    USER {

        string title

        string content        int id PK    USER ||--o{ NOTE : owns```mermaid```mermaid

        boolean archived

        datetime created_at        string username

    }

        string password    NOTE ||--o{ TAG : has

    TAG {

        int id PK    }

        string name

    }erDiagramerDiagram

```

    NOTE {

## Description

        int id PK    USER {

- A User can own multiple Notes.

- Each Note can have multiple Tags (many-to-many relation).        string title

- Notes can be marked as archived or active.

        string content        int id PK    USER ||--o{ NOTE : owns    USER ||--o{ NOTE : owns

        boolean archived

        datetime created_at        string username

    }

        string password    NOTE ||--o{ TAG : has    NOTE ||--o{ TAG : has

    TAG {

        int id PK    }

        string name

    }

```

    NOTE {

## Description

        int id PK    USER {    USER {

- A User can own multiple Notes.

- Each Note can have multiple Tags (many-to-many relation).        string title

- Notes can be marked as archived or active.

        string content        int id PK        int id PK

        boolean archived

        datetime created_at        string username        string username

    }

        string password        string password

    TAG {

        int id PK    }    }

        string name

    }

```

    NOTE {    NOTE {

## Description

        int id PK        int id PK

- A User can own multiple Notes.

- Each Note can have multiple Tags (many-to-many relation).        string title        string title

- Notes can be marked as archived or active.

        string content        string content

        boolean archived        boolean archived

        datetime created_at        datetime created_at

    }    }



    TAG {    TAG {

        int id PK        int id PK

        string name        string name

    }    }

``````



## Description## Description



- A User can own multiple Notes.- A User can own multiple Notes.

- Each Note can have multiple Tags (many-to-many relation).- Each Note can have multiple Tags (many-to-many relation).

- Notes can be marked as archived or active.- Notes can be marked as archived or active.

