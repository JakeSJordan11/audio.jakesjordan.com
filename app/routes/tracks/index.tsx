import { Link } from "@remix-run/react";
import { useLoaderData } from "@remix-run/react";
import { useCallback, useRef, useState } from "react";
import { json } from "@remix-run/node";

import { getTracks } from "~/models/track.server";

type LoaderData = { tracks: Awaited<ReturnType<typeof getTracks>> };
export const loader = async () => {
  return json<LoaderData>({ tracks: await getTracks() });
};

export default function Index() {
  const { tracks } = useLoaderData() as LoaderData;
  return (
    <main className="grid grid-cols-1 gap-4 dark:bg-neutral-800 md:grid-cols-2 lg:grid-cols-3">
      {tracks.map((track) => (
        <AudioCard
          key={track.id}
          url={track.url}
          title={track.title}
          artwork={track.artwork}
        >
          <Link to={track.id}>Info</Link>
        </AudioCard>
      ))}
    </main>
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
    <article className="mx-8 my-4 flex items-center justify-center rounded-lg text-center ring-2 ring-red-600">
      {artwork && (
        <img
          src={`${artwork}`}
          alt="track artwork"
          className="w-1/6 rounded-2xl py-2"
        />
      )}
      <div className="ml-4 flex flex-col justify-center">
        <h1 className="rounded-lg px-3 py-1 font-mono font-medium dark:text-neutral-100">
          {title}
        </h1>
        <AudioButton src={url} />
        <p className="rounded-lg px-3 py-1 font-mono font-medium dark:text-neutral-100">
          {children}
        </p>
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
            ? "scale-90 transform rounded-lg py-1 font-mono text-lg font-medium shadow-none shadow-black ring-2 ring-orange-600 transition-all duration-300 dark:text-neutral-100"
            : "transform rounded-lg py-1 font-mono text-lg font-medium shadow-md shadow-black ring-2 ring-teal-600 ring-offset-2 ring-offset-red-600 transition-all duration-300 dark:text-neutral-100"
        }
        onClick={onClick}
      >
        {isPlaying ? "Pause" : "Play"}
      </button>
    </>
  );
}
