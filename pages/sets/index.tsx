import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router'
import Button from '@mui/material/Button';
import Paper from "@mui/material/Paper";

interface Set {
   _id: string;
   team1: string;
   team2: string;
   score: string;
   winner: string;
   isFinished: boolean;
    createdAt: string;
}


interface SetsProps {
    sets: Set[];
}


const Sets: React.FC<SetsProps> = ({ sets }) => {
    const router = useRouter();

    const LoadWinner = (winner: string, team: string) => {
        return winner === team ? <strong style={{color: "red"}}>{team}</strong> : <span>{team}</span>
    }

   return (
    <div>
        {
            sets.map((set, index) => {
                return (
                    <Paper key={index}>
                        <h2>
                            {LoadWinner(set.winner, set.team1)} - vs - {LoadWinner(set.winner, set.team2)}
                        </h2>
                        <h1>{set.score}</h1>
                        <h3>{set.createdAt}</h3>
                        <h3>{set.isFinished ? "FINISHED" : "PLAYING"}</h3>
                        <Button variant="contained" color="primary" value="Referee" type="button" onClick={() => router.push(`sets/${set._id}`)}>
                                Details
                        </Button>
                    </Paper>
                )
            })
        }
    </div>
   );
};


export default Sets;


export const getServerSideProps: GetServerSideProps = async () => {
   try {
    let res = await fetch(`${process.env.API_ENDPOINT}/api/sets`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      let sets = await res.json();

       return {
           props: { 
            sets: JSON.parse(JSON.stringify(sets.data))
         },
       };
   } catch (e) {
       console.error(e);
       return { props: { sets: [] } };
   }
};