import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react';
import Grid2 from '@mui/material/Grid2';

import { CustomAppBar } from "@/components/CustomAppBar";


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

interface Props {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window?: () => Window;
    sets: Set[];
}

const Statistics: React.FC<SetsProps> = (props: Props) => {
    const { window, sets } = props;
    const [setsData, setDataSets] = useState(sets);
    const router = useRouter();

    useEffect(() => {
        const user = Cookies.get('user');
  
        !user && router.push('/');
    }, [])

    const titanesWins = setsData.filter((set) => set.winner === "Titanes").length;
    const aldeanosWins = setsData.filter((set) => set.winner === "Aldeanos").length;
    const totalPlays = setsData.length;

   return (
    <>
        <CustomAppBar  window={window}/>
        <div>

            <Grid2 container spacing={2}  justifyContent="center">
                    <Grid2 justifyContent="center" textAlign="center">
                        <h1>Total Sets</h1>
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
    </>
    
   );
};


export default Statistics;


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