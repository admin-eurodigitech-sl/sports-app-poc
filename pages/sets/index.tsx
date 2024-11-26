import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react';
import { Set } from "../../components/Set";
import Grid2 from '@mui/material/Grid2';
import Button from '@mui/material/Button';

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

const Sets: React.FC<SetsProps> = (props: Props) => {
    const { window, sets } = props;
    const [setsData, setDataSets] = useState(sets);
    const router = useRouter();

    useEffect(() => {
        const user = Cookies.get('user');
  
        !user && router.push('/');
    }, [])

    const currentSet = setsData.filter((set) => !set.isFinished);
    const isSetAlreadyInProgress = currentSet.length >= 1;

    const createGameHandler = async () => {
        await fetch(`/api/sets`,
            {
              body: JSON.stringify({
                isFinished: false,
                team1:  "Titanes",
                team2: "Aldeanos",
                score: "0-0",
                winner: "",
                createdAt: new Date().toString()
              }),
              method: 'POST'
            }
          );

        const resGet = await fetch(`/api/sets`);
        
        const data = (await resGet.json()).data;

        setDataSets(data);
    }

   return (
    <>
        <CustomAppBar  window={window}/>
        <div>
            <div>
                <Grid2 container spacing={2}  justifyContent="center">
                    <Grid2 justifyContent="center" textAlign="center">
                        <h1>Current Set</h1>

                        {
                            !isSetAlreadyInProgress && 
                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                                onClick={createGameHandler}
                            >
                                New Set
                            </Button>
                        }
                    </Grid2>
                </Grid2>
                {
                    isSetAlreadyInProgress && currentSet
                        .map((set, index) => {
                            return (
                                <div onClick={()=> router.push(`/sets/${set._id}`)} key={`currentSet-${index}`}>
                                    <Set set={set} key={`currentSet-${index}`} isDetails={false}/>
                                </div>
                            )
                        })
                }

            </div>

            <Grid2 container spacing={2}  justifyContent="center">
                    <Grid2 justifyContent="center" textAlign="center">
                        <h1>Historical Sets</h1>
                    </Grid2>
            </Grid2>
            {
                setsData
                    .filter((set) => set.isFinished)
                    .map((set, index) => {
                        return (
                            <div onClick={()=> router.push(`/sets/${set._id}`)} key={`historySet-${index}`}>
                                <Set set={set} key={`historySet-${index}`} isDetails={false}/>
                            </div>
                        )
                    })
            }
        </div>
    </>
    
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