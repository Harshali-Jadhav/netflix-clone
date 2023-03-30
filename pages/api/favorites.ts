import { NextApiRequest, NextApiResponse } from "next";
import serverAuth from "@/libs/serverAuth";
import prismadb from "@/libs/prismadb";

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    if(req.method != 'GET')
    {
        return res.status(405).end();
    }
    try {
            const { currentUser } = await serverAuth(req);
            
            const favoriteMovie = await prismadb.movie.findMany({
                where: {
                    id: {
                       in: currentUser?.favoriteIds,
                    }
                }
            });

            return res.status(200).json(favoriteMovie);

    } catch (error) {
        console.log(error);
        return res.status(400).end();
    }
}