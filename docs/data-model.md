# Data Model (ER Diagram)# 🗃️ Data Model (ER Diagram)



```mermaid```mermaid

erDiagramerDiagram

    USER ||--o{ NOTE : owns    USER ||--o{ NOTE : owns

    NOTE ||--o{ TAG : has    NOTE ||--o{ TAG : has



    USER {    USER {

        int id PK        int id PK

        string username        string username

        string password        string password

    }    }



    NOTE {    NOTE {

        int id PK        int id PK

        string title        string title

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

