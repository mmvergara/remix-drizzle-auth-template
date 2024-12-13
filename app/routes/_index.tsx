import { Link, useLoaderData } from "@remix-run/react";
import { LoaderFunctionArgs, redirect } from "@remix-run/node";

import { getUserIdFromSession } from "~/.server/session/session";
import { getUserById } from "~/.server/db/users";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const userId = await getUserIdFromSession(request);
  if (!userId) return null;
  const user = await getUserById(userId);
  if (!user) {
    return null;
  }
  return user;
};

const HomePage = () => {
  const user = useLoaderData<typeof loader>();
  return (
    <main
      className="min-h-screen bg-[#101010] text-white flex items-center justify-center px-4"
      role="main"
    >
      <div className="w-full max-w-sm rounded-lg shadow-lg p-6">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold tracking-tight text-white">
            Remix Drizzle Auth
          </h1>
          <a
            href="https://github.com/mmvergara/remix-drizzle-auth-template"
            target="_blank"
            rel="noreferrer"
            className="text-blue-500 underline underline-offset-8"
          >
            Github Repository
          </a>
        </header>

        <section className="flex flex-col items-center gap-4">
          <div className="bg-zinc-800 p-4 rounded-md">
            <p className="text-center text-sm font-bold text-white">
              User:{user ? ` ${user.username}` : " Not signed in"}
            </p>
          </div>
          <Link
            to="/protected"
            className="w-full py-3 bg-white text-black font-semibold rounded-xl hover:bg-blue-500 transition duration-300 text-center"
            aria-label="Sign up"
          >
            Go to protected page
          </Link>
          {user ? (
            <Link
              to="/api/logout"
              className="w-full py-3 bg-white text-black font-semibold rounded-xl hover:bg-blue-500 transition duration-300 text-center"
              aria-label="Sign up"
            >
              Logout
            </Link>
          ) : (
            <Link
              to="/signin"
              className="w-full py-3 bg-white text-black font-semibold rounded-xl hover:bg-blue-500 transition duration-300 text-center"
              aria-label="Sign up"
            >
              Sign In
            </Link>
          )}
        </section>
      </div>
    </main>
  );
};

export default HomePage;
