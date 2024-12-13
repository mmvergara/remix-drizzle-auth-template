import { Link } from "@remix-run/react";
import { LoaderFunctionArgs } from "@remix-run/node";
import { requireUser } from "~/.server/session/session";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  // To protect routes you should always call this function
  await requireUser(request);

  // Yes, we need them for all routes
  // https://remix.run/docs/en/1.19.3/pages/faq#how-can-i-have-a-parent-route-loader-validate-the-user-and-protect-all-child-routes
  return null;
};

const Protected = () => {
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
              This is a protected page
            </p>
          </div>

          <Link
            to="/"
            className="w-full py-3 bg-white text-black font-semibold rounded-xl hover:bg-blue-500 transition duration-300 text-center"
            aria-label="Sign up"
          >
            Home
          </Link>
        </section>
      </div>
    </main>
  );
};

export default Protected;
