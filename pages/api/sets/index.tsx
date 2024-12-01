import clientPromise from "../../../lib/mongodb";
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const client = await clientPromise;
  const db = client.db("volley");
  const collection = db.collection("sets");

  switch (req.method) {
    case "POST":
      let bodyObject = JSON.parse(req.body);
      let mySet = await collection.insertOne(bodyObject);
      res.json({ status: 200, data: mySet });
      break;
    case "GET":
      const allSets = await collection.find({}).sort({ createdAt: -1 }).toArray();
      res.json({ status: 200, data: allSets });
      break;
  }
}