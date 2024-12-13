import { eq } from "drizzle-orm";
import { db } from "./drizzle";
import { UserID, users } from "./schema";

export const createUser = async ({
  email,
  username,
  passwordHash,
}: {
  email: string;
  username: string;
  passwordHash: string;
}) => {
  await db.insert(users).values({
    email,
    passwordHash,
    username,
  });
};

export const getUserById = async (id: UserID) => {
  const user = await db.select().from(users).where(eq(users.id, id));
  if (user.length === 0) return null;
  user[0].passwordHash = "";
  return user[0];
};

export const getUserByEmail = async (email: string) => {
  const user = await db.select().from(users).where(eq(users.email, email));
  return user[0];
};
