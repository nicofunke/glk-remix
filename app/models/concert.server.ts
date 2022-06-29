import { Concert } from "@prisma/client";
import { prisma } from "~/db.server";

export type { Concert } from "@prisma/client";

export async function getConcerts(): Promise<Concert[]> {
  return prisma.concert.findMany();
}

export async function getConcert(id: string): Promise<Concert | null> {
  return prisma.concert.findUnique({ where: { id } });
}
