import { Link } from "@remix-run/react";
import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { prisma } from "../db.server";
import { useLoaderData } from "@remix-run/react";
import type { Track } from "@prisma/client";
import AudioseumIcon from "../components/icons/audioseum";
import AccountIcon from "~/components/icons/account";

type LoaderData = { tracks: Array<Track> };

export const loader: LoaderFunction = async () => {
  const data: LoaderData = {
    tracks: await prisma.track.findMany(),
  };

  return json(data);
};

export default function Index() {
  const data = useLoaderData<LoaderData>();
  return (
    <>
      <header>
        <div className="flex place-content-between items-center">
          <AudioseumIcon width={48} className="m-1" />
          <h1 className="font-mono text-2xl font-extrabold text-neutral-800">
            Audioseum
          </h1>
          <Link
            to="/join"
            className="bg-pink-50  px-3 py-0.5 text-sm font-bold text-slate-800"
          >
            Sign up
          </Link>
          <Link
            to="/login"
            className="bg-blue-50 px-3 py-0.5 text-sm font-bold text-slate-800"
          >
            Log In
          </Link>
          <AccountIcon width={36} />
        </div>
      </header>
      <main>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {data.tracks.map((track) => (
            <article
              key={track.id}
              className="flex h-full items-center justify-center rounded-lg border-2 bg-gray-100 p-4 text-center shadow-md"
            >
              {track.artwork && (
                <img
                  src={`${track.artwork}`}
                  alt="track artwork"
                  className="w-1/4 rounded-lg"
                />
              )}
              <div className="ml-4 flex flex-col justify-center">
                <h1 className="rounded-lg px-3 py-1 font-mono font-black text-neutral-800 backdrop-blur-md">
                  {track.title}
                </h1>
                <audio src={track.url} controls></audio>
              </div>
            </article>
          ))}
        </div>
      </main>
    </>
  );
}
