import clientPromise from "../../lib/mongodb";
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const client = await clientPromise;
        const db = client.db("volley");
        const newSet = await db.collection("sets").insertOne(req);

        res.json(newSet);
    } catch (e) {
        console.error(e);
    }
}