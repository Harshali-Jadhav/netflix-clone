import { NextApiRequest, NextApiResponse } from "next";
import prismadb from '@/libs/prismadb';
import serverAuth from "@/libs/serverAuth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    debugger;
    if (req.method !== 'GET') {
      return res.status(405).end();
    }

    await serverAuth(req);

    const movies = await prismadb.movie.findMany();

    return res.status(200).json(movies);
  } catch (error) {
    return res.status(500).json({ error: `Something went wrong: ${error}` });
  }
}
