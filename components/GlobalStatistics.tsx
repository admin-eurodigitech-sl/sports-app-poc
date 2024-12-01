import * as React from 'react';
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

interface GlobalStatisticsProps {
    setsData: Set[];
}

export const GlobalStatistics = (props: GlobalStatisticsProps) => {
    const { setsData } = props;
    const titanesWins = setsData.filter((set) => set.winner === "Titanes").length;
    const aldeanosWins = setsData.filter((set) => set.winner === "Aldeanos").length;
    const totalPlays = setsData.length;

    return (
        <div>
            <Grid2 container spacing={2}  justifyContent="center">
                    <Grid2 justifyContent="center" textAlign="center">
                        <h1>Global Score</h1>
                    </Grid2>
            </Grid2>

            <Grid2 container spacing={1} justifyContent="center">
                    <Grid2 justifyContent="center" textAlign="center">
                        <h1>{totalPlays}</h1>
                    </Grid2>
            </Grid2>

            <Grid2 container spacing={2}  justifyContent="center">
                    <Grid2 justifyContent="center" textAlign="center">
                        <h1>Win rate</h1>
                    </Grid2>
            </Grid2>

            <Grid2 container spacing={1} justifyContent="center">
                    <Grid2 justifyContent="center" textAlign="center">
                        <h2>Titanes: {(Math.ceil((titanesWins/totalPlays) * 100))}% </h2>
                    </Grid2>
                    <Grid2 justifyContent="center" textAlign="center">
                        <h2>Aldeanos: {(Math.ceil((aldeanosWins/totalPlays) * 100)) - 1}%</h2>
                    </Grid2>
            </Grid2>
            
        </div>
    )
} 