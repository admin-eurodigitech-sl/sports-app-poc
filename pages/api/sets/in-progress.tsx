import clientPromise from "../../../lib/mongodb";
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const client = await clientPromise;
  const db = client.db("volley");
  const collection = db.collection("sets");

  switch (req.method) {
    case "GET":
      const setsInProgress = await collection.find({ isFinished: false }).toArray();
      res.json({ status: 200, data: setsInProgress });
      break;
  }
}