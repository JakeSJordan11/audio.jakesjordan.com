import { Link } from "@remix-run/react";

export default function DashBoard() {
  return (
    <main className="grid h-full place-items-center dark:bg-neutral-800 md:grid-cols-2 md:grid-rows-2">
      <Link to="/tracks">
        <button className="rounded-xl border-4 border-red-600 ring-4 ring-teal-600 ring-offset-4 ring-offset-orange-600">
          <p className="p-4 text-2xl font-extrabold dark:text-neutral-50 md:my-4">
            new tracks
          </p>
          <p className="absolute rounded-full bg-red-600 px-2 font-semibold text-neutral-50 shadow-2xl ring ring-orange-600 ring-offset-4 ring-offset-teal-600">
            0
          </p>
        </button>
      </Link>
      <Link to="/tracks">
        <button className="rounded-xl border-4 border-red-600 ring-4 ring-teal-600 ring-offset-4 ring-offset-orange-600">
          <p className="p-4 text-2xl font-extrabold dark:text-neutral-50 md:my-4">
            favorites
          </p>
          <p className="py absolute rounded-xl bg-red-600 px-2 font-semibold text-neutral-50 ring ring-orange-600 ring-offset-4 ring-offset-teal-600">
            11
          </p>
        </button>
      </Link>
      <Link to="/tracks">
        <button className="rounded-xl border-4 border-red-600 ring-4 ring-teal-600 ring-offset-4 ring-offset-orange-600">
          <p className="p-4 text-2xl font-extrabold dark:text-neutral-50 md:my-4">
            all tracks
          </p>
        </button>
      </Link>
      <Link to="/tracks">
        <button className="rounded-xl border-4 border-red-600 ring-4 ring-teal-600 ring-offset-4 ring-offset-orange-600">
          <p className="p-4 text-2xl font-extrabold dark:text-neutral-50 md:my-4">
            carousel
          </p>
        </button>
      </Link>
    </main>
  );
}
