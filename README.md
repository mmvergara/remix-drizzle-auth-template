# Remix Drizzle Auth Template

## Installation

```bash
# Clone the repository
npm install
```

### Database Setup

Currently we are using **sqlite** and using `./local.db` as the database file. If you are using sqlite you can skip step 1.

#### 1. Setup and pick your own database

- Remove sqlite

  ```bash
  npm uninstall libsql
  rm ./local.db
  ```

- Go to `./app/.server/db/drizzle.ts`
- Configure your database using [drizzle-docs](https://orm.drizzle.team/docs/get-started)
- Go to `./app/.server/db/schema.ts` and modify the `users` table to your corresponding database

#### 2. Push database

```bash
npx drizzle-kit push
```

### Run the app

```bash
npm run dev
```

---

## What you need to know

- All of db operations are done in `./app/.server/db, you can organize them in you liking

- To protect routes you should [always call](https://remix.run/docs/en/1.19.3/pages/faq#how-can-i-have-a-parent-route-loader-validate-the-user-and-protect-all-child-routes) `requireUser` function in the loader

- Routes
  - `./`
  - `./singin`
  - `./signup`
  - `./protected`
