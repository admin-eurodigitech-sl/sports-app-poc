import { parseCreatedAtToDate } from "../lib/helper";
import Button from '@mui/material/Button';
import Paper from "@mui/material/Paper";
import Grid2 from '@mui/material/Grid2';


interface Set {
    _id: string;
    team1: string;
    team2: string;
    score: string;
    winner: string;
    isFinished: boolean;
     createdAt: string;
 }

 interface SetProps {
    set: Set;
}

export const Set = ({ set }: SetProps) => {
    const LoadWinner = (winner: string, team: string) => {
        return winner === team ? <strong style={{color: "red"}}>{team}</strong> : <span>{team}</span>
    }

    
    return (
        <Grid2 container spacing={2} justifyContent="center" >
            <Grid2 size={{ xs: 12, sm: 4 }} justifyContent="center" textAlign="center">
                <Paper>
                    <h2>
                        {LoadWinner(set.winner, set.team1)} - vs - {LoadWinner(set.winner, set.team2)}
                    </h2>
                    <h1>{set.score}</h1>
                    <h3>{parseCreatedAtToDate(set.createdAt)}</h3>
                    <h3>{set.isFinished ? "FINISHED" : "PLAYING"}</h3>
                </Paper>
            </Grid2>
            {
                !set.isFinished && 
                <Grid2 size={{ xs: 12, sm: 4 }} justifyContent="center" textAlign="center">
                    <Paper>
                        <Button>
                            +1 {set.team1}
                        </Button>
                        <Button>
                            +1 {set.team2}
                        </Button>
                    </Paper>
                </Grid2>
            }
            {
                !set.isFinished && 
                <Grid2 size={{ xs: 12, sm: 4 }} justifyContent="center" textAlign="center">
                    <Button variant="contained">
                        End game
                    </Button>
                </Grid2>
            }
        </Grid2>

    )
}