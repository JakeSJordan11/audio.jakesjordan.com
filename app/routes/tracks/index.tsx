import { Link } from "@remix-run/react";
import { useLoaderData } from "@remix-run/react";
import AudioseumIcon from "~/components/icons/audioseum";
import AccountIcon from "~/components/icons/account";
import { useCallback, useRef, useState } from "react";
import { json } from "@remix-run/node";

import { getTracks } from "~/models/track.server";

type LoaderData = { tracks: Awaited<ReturnType<typeof getTracks>> };
export const loader = async () => {
  return json<LoaderData>({ tracks: await getTracks() });
};

export default function Index() {
  return (
    <>
      <Header />
      <AudioCardGrid />
    </>
  );
}

export function Header() {
  return (
    <header className="fixed top-0 z-10 w-full bg-white">
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
  );
}

export function AudioCardGrid() {
  const { tracks } = useLoaderData() as LoaderData;
  return (
    <section className="grid grid-cols-1 gap-4 pt-14 md:grid-cols-2 lg:grid-cols-3">
      {tracks.map((track) => (
        <>
          <AudioCard
            key={track.id}
            url={track.url}
            title={track.title}
            artwork={track.artwork}
          >
            <Link to={track.id}>View</Link>
          </AudioCard>
        </>
      ))}
    </section>
  );
}

interface AudioCardProps {
  artwork?: string | null;
  title: string;
  url: string;
  children: React.ReactNode;
}
export function AudioCard({ artwork, title, url, children }: AudioCardProps) {
  return (
    <article className="flex h-full items-center justify-center rounded-lg border-2 bg-gray-100 p-4 text-center shadow-md">
      {artwork && (
        <img
          src={`${artwork}`}
          alt="track artwork"
          className="w-1/4 rounded-lg"
        />
      )}
      <div className="ml-4 flex flex-col justify-center">
        <h1 className="rounded-lg px-3 py-1 font-mono font-black text-neutral-800 backdrop-blur-md">
          {title}
        </h1>
        <AudioButton src={url} />
        {children}
      </div>
    </article>
  );
}

interface AudioButtonProps {
  src: string;
}
export function AudioButton({ src }: AudioButtonProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const onClick = useCallback(() => {
    if (audioRef.current === undefined) {
      return;
    }
    isPlaying ? audioRef.current?.pause() : audioRef.current?.play();
    setIsPlaying(!isPlaying);
  }, [isPlaying]);

  return (
    <>
      <audio ref={audioRef} preload="metadata">
        <source src={src} type="audio/mpeg" />
      </audio>
      <button
        className={
          isPlaying
            ? "scale-90 transform rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 py-1 font-mono text-lg font-medium shadow-none shadow-gray-700 ring-2 ring-offset-2 transition-all duration-300"
            : "transform rounded-lg bg-gradient-to-r from-fuchsia-500 to-violet-500 py-1 font-mono text-lg font-medium shadow-md shadow-gray-700 ring-2 ring-offset-2 transition-all duration-300"
        }
        onClick={onClick}
      >
        {isPlaying ? "Pause" : "Play"}
      </button>
    </>
  );
}
