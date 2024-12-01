import * as React from 'react';
import { useEffect, useState } from 'react';

import Grid2 from '@mui/material/Grid2';

import { CustomSelect } from "@/components/CustomSelect";
import { onlyUnique, parseCreatedAtToDate } from "@/lib/helper";

interface Set {
    _id: string;
    team1: string;
    team2: string;
    score: string;
    winner: string;
    isFinished: boolean;
     createdAt: string;
}

interface DailyStatisticsProps {
    setsData: Set[];
}

export const DailyStatistics = (props: DailyStatisticsProps) => {
    const { setsData } = props;
    const [dateFilter, setDateFilter] = useState("");
    const [filteredSet, setFilteredSet] = useState(setsData);

    const titanesWins = filteredSet.filter((set) => set.winner === "Titanes").length;
    const aldeanosWins = filteredSet.filter((set) => set.winner === "Aldeanos").length;
    const totalPlays = filteredSet.length;
    const allUniqueDates = setsData
        .map((set) => parseCreatedAtToDate(set.createdAt))
        .filter(onlyUnique)
        .map((date) => {
            return {
                name: date,
                value: date,
            }
        })

    useEffect(() => {
        const newFilteredSet = setsData.filter((set) => parseCreatedAtToDate(set.createdAt) === dateFilter);
        setFilteredSet(newFilteredSet);
    }, [dateFilter])

    return (
        <div>
            <Grid2 container spacing={2}  justifyContent="center">
                    <Grid2 justifyContent="center" textAlign="center">
                        <h1>Daily Score</h1>
                    </Grid2>
            </Grid2>

            <Grid2 container spacing={1} justifyContent="center">
                    <Grid2 justifyContent="center" textAlign="center">
                        <CustomSelect selectName={"Date"} selectArray={allUniqueDates} selectLabel={"Date"} useStateHook={setDateFilter}/>
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