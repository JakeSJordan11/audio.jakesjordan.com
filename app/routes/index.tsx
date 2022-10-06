import { Link } from "@remix-run/react";

export default function IndexRoute() {
  return (
    <main className="flex h-full flex-col justify-between dark:bg-neutral-800">
      <div className="flex flex-1 flex-col place-content-center place-items-center">
        <h1 className="font-sans text-4xl font-extrabold text-rose-600 dark:text-red-600">
          Audioseum
        </h1>
        <div className="py-2" />
        <p className="font-sans text-lg text-neutral-700 dark:text-neutral-50">
          by
        </p>
        <p className="font-sans text-2xl text-neutral-700 dark:text-neutral-50">
          Jake Jordan
        </p>
        <div className="py-12" />
        <Link to="/dashboard">
          <button className="font-sans text-xl font-bold text-emerald-500 dark:text-teal-600">
            Listen Now
          </button>
        </Link>
      </div>
      <div className="flex flex-col place-content-center place-items-center dark:bg-neutral-800">
        <Link to="login">
          <button className="font-sans text-xl font-bold text-amber-500 dark:text-orange-600">
            Login
          </button>
        </Link>
        <p className="text-neutral-700 dark:text-neutral-50">
          if you don't have an account, you can{" "}
          <Link to="join">
            <button className="font-sans text-amber-500 dark:text-orange-600">
              Sign Up
            </button>
          </Link>
        </p>
      </div>
    </main>
  );
}
