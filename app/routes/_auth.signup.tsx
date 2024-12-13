import { Form, Link, useActionData } from "@remix-run/react";
import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  redirect,
} from "@remix-run/node";
import bcrypt from "bcrypt";
import { getUserIdFromSession } from "~/.server/session/session";
import { createUser, getUserByEmail, getUserById } from "~/.server/db/users";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const userId = await getUserIdFromSession(request);
  if (!userId) return null;
  const user = await getUserById(userId);
  if (user) {
    return redirect("/");
  }
  return null;
};

export const action = async ({ request }: ActionFunctionArgs) => {
  try {
    const formData = await request.formData();
    const email = formData.get("email") as string;
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    const emailTaken = await getUserByEmail(email);
    if (emailTaken) {
      return { message: "Email is already taken" };
    }

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    await createUser({
      email,
      username,
      passwordHash,
    });
    return redirect("/signin");
  } catch (error) {
    console.log(error);
    return { message: "Error creating account" };
  }
};

const ThreadsSignUp = () => {
  const actionData = useActionData() as { message: string };
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

        <section aria-label="Sign up form">
          <p className="text-center mb-2">
            {actionData && actionData?.message}
          </p>

          <Form method="post" className="space-y-2">
            <fieldset>
              <legend className="sr-only">Sign up credentials</legend>

              <div className="mb-4">
                <label htmlFor="email" className="sr-only">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  aria-required="true"
                  autoComplete="email"
                  className="w-full text-sm p-4 bg-[#1E1E1E] rounded-xl focus:outline-none focus:ring-[1px] focus:ring-zinc-500 text-white placeholder-gray-400"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="username" className="sr-only">
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  name="username"
                  max={20}
                  placeholder="Username"
                  required
                  aria-required="true"
                  autoComplete="username"
                  className="w-full text-sm p-4 bg-[#1E1E1E] rounded-xl focus:outline-none focus:ring-[1px] focus:ring-zinc-500 text-white placeholder-gray-400"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                  aria-required="true"
                  autoComplete="new-password"
                  className="w-full text-sm p-4 bg-[#1E1E1E] rounded-xl focus:outline-none focus:ring-[1px] focus:ring-zinc-500 text-white placeholder-gray-400"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-white text-black font-semibold rounded-xl hover:bg-blue-500 transition duration-300"
                aria-label="Sign up"
              >
                Sign Up
              </button>
            </fieldset>
          </Form>
        </section>

        <footer className="text-center mt-6 space-y-4">
          <div className="flex items-center justify-center mt-4">
            <span className="text-gray-500">Already have an account?</span>
            <Link
              to="/signin"
              className="ml-2 text-blue-500 hover:underline"
              aria-label="Go to sign in page"
            >
              Log In
            </Link>
          </div>
          <Link to="/" className="block">
            {"← Back"}
          </Link>
        </footer>
      </div>
    </main>
  );
};

export default ThreadsSignUp;
