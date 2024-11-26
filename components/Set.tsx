import { parseCreatedAtToDate } from "../lib/helper";
import Button from '@mui/material/Button';
import Paper from "@mui/material/Paper";
import Grid2 from '@mui/material/Grid2';
import { useState } from "react";
import { useRouter } from "next/router";

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
    isDetails: boolean;
}

export const Set = ({ set, isDetails }: SetProps) => {
    const [dataSetState, setDataSetState] = useState(set);
    const router = useRouter();

    const LoadWinner = (winner: string, team: string) => {
        return winner === team ? <strong style={{color: "red"}}>{team}</strong> : <span>{team}</span>
    }

    const deleteSet = async (dataSetState: Set) => {
        await fetch(`/api/sets/${dataSetState._id}`,
            {
              method: 'DELETE'
            }
        );

        router.push('/sets')
    }

    const updateScore = async (team: string, operator: string, quantity: number) => {
        let [team1Score, team2Score] = dataSetState.score.split('-');


        if (operator === "sum") {
            if (team === "team1") team1Score = `${parseInt(team1Score) + quantity}`;
            if (team === "team2") team2Score = `${parseInt(team2Score) + quantity}`;
        }

        if (operator === "rest") {
            if (team === "team1" && parseInt(team1Score) > 0) team1Score = `${parseInt(team1Score) - quantity}`;
            if (team === "team2" && parseInt(team2Score) > 0) team2Score = `${parseInt(team2Score) - quantity}`
        }

        const data = {
            ...dataSetState,
            score: `${team1Score}-${team2Score}`
        }

        const res = await fetch(`/api/sets/${dataSetState._id}`,
            {
                body: JSON.stringify(data),
                method: 'POST'
            }
            );

        const updatedData = (await res.json()).data;
        console.log(updatedData);
        setDataSetState(updatedData);
    }

    return (
        <Grid2 container spacing={2} justifyContent="center" >
            {
                isDetails && !dataSetState.isFinished &&
                <Grid2 justifyContent="center" textAlign="center"> 
                    <Button color="error" onClick={async () => await deleteSet(dataSetState)}>
                        Delete Set
                    </Button> 
                </Grid2>
            }

            <Grid2 size={{ xs: 12, sm: 4 }} justifyContent="center" textAlign="center">
                <Paper>
                    <h2>
                        {LoadWinner(dataSetState.winner, dataSetState.team1)} - vs - {LoadWinner(dataSetState.winner, dataSetState.team2)}
                    </h2>
                    <h1>{dataSetState.score}</h1>
                    <h3>{parseCreatedAtToDate(dataSetState.createdAt)}</h3>
                    <h3>{dataSetState.isFinished ? "FINISHED" : "PLAYING"}</h3>
                </Paper>
            </Grid2>
            {
                isDetails && !dataSetState.isFinished && 
                <Grid2 size={{ xs: 12, sm: 4 }} container spacing={2} justifyContent="center" textAlign="center">
                    <Grid2 justifyContent="center" textAlign="center"> 
                        <Button onClick={async () => await updateScore("team1", "sum", 1)}>
                            +1 {dataSetState.team1}
                        </Button>
                        <Button>
                        </Button>
                        <Button onClick={async () => await updateScore("team2", "sum", 1)}>
                            +1 {dataSetState.team2}
                        </Button> 
                    </Grid2>

                    <Grid2 justifyContent="center" textAlign="center"> 
                        <Button onClick={async () => await updateScore("team1", "rest", 1)}>
                            -1 {dataSetState.team1}
                        </Button>
                        <Button>
                        </Button>
                        <Button onClick={async () => await updateScore("team2", "rest", 1)}>
                            -1 {dataSetState.team2}
                        </Button> 
                    </Grid2>
                </Grid2>
            }
        </Grid2>
    )
}