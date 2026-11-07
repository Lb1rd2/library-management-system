# Library Management System API

A NestJS backend for a library's book catalog, using Prisma and a hosted PostgreSQL database (Neon).

## Setup

1. Install dependencies: `npm install`
2. Copy `.env.example` to `.env` and put your real `DATABASE_URL` in it.
3. Apply the schema: `npx prisma migrate dev`
4. Generate the Prisma client: `npx prisma generate`
5. Seed the database: `npx prisma db seed`
6. Start the app: `npm run start:dev`

## Schema Decisions

**Why Book references Genre instead of embedding it.**
Each Book stores a `genreId` foreign key that points to a row in the Genre table, rather than holding a copy of the genre's details inside the book. I chose this for four reasons:

- **One source of truth.** A genre's name lives in one place. If "Sci-Fi" needs to be renamed, I update one Genre row and every book reflects it. Embedding would mean editing hundreds of books and risking inconsistent spellings.
- **No duplicated data.** Many books share a genre, so storing the genre once saves space and avoids drift.
- **Easy queries.** Finding all books in a genre, or counting books per genre, is a simple filter on `genreId` with an index on that column.
- **Data integrity.** The database enforces the relationship. A book cannot point to a genre that does not exist, and Genre names are unique.

**Role enum on User.** Roles are limited to `PATRON` and `LIBRARIAN`, so the database rejects invalid values and permissions can be built on a fixed set of roles later. New users default to `PATRON`.

**Unique title and author.** Book has a unique constraint on title plus author, which prevents duplicate entries and makes the seed script safe to run more than once.