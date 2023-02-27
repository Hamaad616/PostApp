import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/client"

export default async function handler(
    req: NextApiRequest,
    res:NextApiResponse
){
    if(req.method === "GET"){
     //Fetch all posts
        try{
            const data = await prisma.post.findMany({
                include: {
                    author: true,
                    Comment : true
                },
                orderBy: {
                    createdAt: "desc",
                },
            })
            console.log(data)
            res.status(200).json(data)
        }catch(err){
            res.status(403).json({
                error : err,
                message : "Error fetching posts"
            })
        }

    }
}
