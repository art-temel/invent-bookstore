# Library Management System

A Node.js and TypeScript-based Library Management System, using Prisma as the ORM, designed to manage library operations including users, books, and borrowing transactions.

## Features

The application provides the following features:

1. **Manage Users**
   - Add, update, delete, and view users.
   
2. **Manage Books**
   - Add, update, delete, and view books.

3. **Borrow Books**
   - Borrow books by users, return books, and track borrowing status.

## Technologies Used

- **Node.js**: Backend runtime environment.
- **TypeScript**: Strongly-typed language for writing safer code.
- **Prisma**: ORM for interacting with the database.
- **PostgreSQL/MySQL/SQLite**: Database management (depending on your setup).
- **Express.js**: Web framework for building the REST API.

## Getting Started

### Prerequisites

Before you begin, ensure you have the following tools installed on your local machine:

- [Node.js](https://nodejs.org/en/) (version 14.x or higher)
- [npm](https://www.npmjs.com/get-npm) or [yarn](https://classic.yarnpkg.com/en/docs/install)
- A [PostgreSQL](https://www.postgresql.org/download/) or [MySQL](https://dev.mysql.com/downloads/) or [SQLite](https://www.sqlite.org/index.html) database

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/art-temel/invent-bookstore.git
    cd invent-bookstore
    ```

2. Install the project dependencies:
    ```bash
    npm install
    # or
    yarn install
    ```

3. Set up environment variables. Create a `.env` file in the root directory and configure the following values:

    ```bash
    DATABASE_URL="your-database-url"
    PORT=3000
    ```
    PS: Example environment files can be used for initial setup(.example.env)
4. Set up Prisma:

    ```bash
    npx prisma migrate dev --name init
    npx prisma generate
    ```

5. Start the application:
    ```bash
    npm run dev
    ```

    The server will start on `http://localhost:3000`.

### Scripts

- `npm run dev`: Start the application in development mode.
- `npm run build`: Build the application for production.
- `npm start`: Start the production build.
- `npx prisma studio`: Access the Prisma Studio for viewing and managing data.

## API Endpoints

### Users

- `GET /users`: Get a list of all users.
- `POST /users`: Create a new user.
- `GET /users/:id`: Get user details by ID.

### Books

- `GET /books`: Get a list of all books.
- `POST /books`: Create a new book.
- `GET /books/:id`: Get book details by ID.

### Borrowing

- `POST /borrow`: Borrow a book.
- `POST /return`: Return a book.

## Database Schema

The application uses Prisma ORM to interact with the database. Here's a simplified version of the schema:

```prisma

model User {
  id        Int         @id @default(autoincrement())
  name      String
  borrowings Borrowing[]
}

model Book {
  id            Int         @id @default(autoincrement())
  name         String
  borrowings    Borrowing[]
}

model Borrowing {
  id          Int      @id @default(autoincrement())
  userId      Int
  bookId      Int
  borrowedAt  DateTime @default(now())
  returnedAt  DateTime?
  userScore  Float
  user        User     @relation(fields: [userId], references: [id])
  book        Book     @relation(fields: [bookId], references: [id])
  @@unique([userId, bookId, returnedAt], name: "uniqueBorrowing")
}
```

## Tests
Tests have not been implemented yet.

