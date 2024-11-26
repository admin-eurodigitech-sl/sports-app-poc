import { ObjectId } from "mongodb";
import clientPromise from "../../../lib/mongodb";
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const client = await clientPromise;
  const db = client.db("volley");
  const collection = db.collection("sets");
  const id = JSON.parse(JSON.stringify(req.query.id));

  switch (req.method) {
    case "POST": 
      const { score, team1, team2 } = JSON.parse(req.body);
      const createUpdateObject: any = {}
      const [team1ScoreString, team2ScoreString] = score.split('-');
      const team1Score = parseInt(team1ScoreString);
      const team2Score = parseInt(team2ScoreString);

      if (score) { createUpdateObject["score"] = score  }
      if ((team1Score >= 25 || team2Score >= 25) && ((team1Score - team2Score) >= 2 || (team2Score - team1Score) >= 2)) {
        createUpdateObject["winner"] = team1Score > team2Score ? team1 : team2;
        createUpdateObject["isFinished"] = true
      }

      await collection.findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: createUpdateObject}
      );
      
      let updatedData = await collection.findOne({ _id: new ObjectId(id) });

      res.json({ status: 200, data: updatedData });
      break;

    case "GET":
      let currentSet = await collection
        .findOne({ _id: new ObjectId(id) })
      res.json({ status: 200, data: currentSet });
      break;

    case "DELETE":
      await collection.deleteOne({ _id: new ObjectId(id) })

      res.json({ status: 200 });
  }
}