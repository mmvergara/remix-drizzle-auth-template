import { InferSelectModel, sql } from "drizzle-orm";
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const users = sqliteTable(
  "users",
  {
    id: integer("id").notNull().primaryKey(),
    username: text("username").unique().notNull(),
    email: text("email").unique().notNull(),
    passwordHash: text("password_hash").notNull(),
    createdAt: integer("created_at", { mode: "number" })
      .notNull()
      .default(sql`(strftime('%s', 'now'))`),
  },
  // define indexes
  (table) => []
);

export type UserID = InferSelectModel<typeof users>["id"];
