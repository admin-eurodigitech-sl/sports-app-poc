import { FormEvent } from "react";
import clientPromise from "../lib/mongodb";
import { GetServerSideProps } from 'next';
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


interface CurrentSet {
   _id: string;
   team1: string;
   team2: string;
   isFinished: boolean;
   score: string;
   winner: string;
   createdAt: string;
}


interface CurrentSetProps {
  currentSet: CurrentSet;
}


const CurrentSet: React.FC<CurrentSetProps> = ({ currentSet }) => {
    const router = useRouter()

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget)
        const team1 = formData.get('team1');
        const team2 = formData.get('team1');

        const data = {
          team1,
          team2,
          score: "0-0",
          winner: "none",
          isFinished: false,
          createdAt: new Date().toDateString(),
        }

        const client = await clientPromise;
        const db = client.db("volley");
        await db.collection("sets").insertOne(data);
      }

    if (currentSet) {
      return (<div>Game created and running</div>);
    }

   return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="team1"
        name="team1"
        variant="outlined"
        fullWidth
        margin="normal"
      />
      <TextField
        label="team2"
        name="team2"
        variant="outlined"
        fullWidth
        margin="normal"
      />
      <Button
        variant="contained"
        color="primary"
        type="submit"
      >
        New Set
      </Button>
    </form>
   );
};


export default CurrentSet;


export const getServerSideProps: GetServerSideProps = async () => {
   try {
       const client = await clientPromise;
       const db = client.db("volley");
       const currentSet = await db
           .collection("sets")
           .find({ isFinished: false })
           .sort({ metacritic: -1 })
           .toArray();

       return {
           props: { currentSet: JSON.parse(JSON.stringify(currentSet)) },
       };
   } catch (e) {
       console.error(e);
       return { props: { currentSet: [] } };
   }
};