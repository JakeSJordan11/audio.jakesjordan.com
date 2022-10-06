import { prisma } from "~/db.server";

export async function getTracks() {
  return prisma.track.findMany();
}

export async function getTrack(id: string) {
  return prisma.track.findUnique({ where: { id } });
}
