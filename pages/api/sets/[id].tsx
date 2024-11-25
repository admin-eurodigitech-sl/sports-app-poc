import { ObjectId } from "mongodb";
import clientPromise from "../../../lib/mongodb";
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const client = await clientPromise;
  const db = client.db("volley");
  const collection = db.collection("sets");

  console.log(req.query);

  const id = JSON.parse(JSON.stringify(req.query.id));

  switch (req.method) {
    case "POST": 
      let { score, winner } = req.body;
      let createUpdateObject: any = {}

      if (score) { createUpdateObject["score"] = score  }
      if (winner) { createUpdateObject["winner"] = winner  }

      let getSetAndUpdate = await collection.findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: createUpdateObject}
      );

    case "GET":
      let currentSet = await collection
      .findOne({ _id: new ObjectId(id) })
      res.json({ status: 200, data: currentSet });
      break;
  }
}