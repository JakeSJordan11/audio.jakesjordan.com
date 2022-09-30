import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { getTrack } from "~/models/track.server";

export const loader: LoaderFunction = async ({ params }) => {
  const track = await getTrack(params.id as string);
  return json({ track });
};

export default function PostSlug() {
  const { track } = useLoaderData();
  return (
    <main className="mx-auto max-w-4xl">
      <h1 className="my-6 border-b-2 text-center text-3xl">{track.title}</h1>
      <img src={track.artwork} alt={track.title} />
    </main>
  );
}
