import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import { useEffect } from 'react';
import { Set, ISet } from "../../components/Set";
import Grid2 from '@mui/material/Grid2';

import { CustomAppBar } from "@/components/CustomAppBar";
import { CreateNewGameButton } from "@/components/CreateNewGameButton";


interface Props {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window?: () => Window;
    sets: ISet[];
}

const Sets: React.FC<Props> = (props: Props) => {
    const { window, sets } = props;
    const router = useRouter();

    useEffect(() => {
        const user = Cookies.get('user');
  
        !user && router.push('/');
    }, [])

    const currentSet = sets.filter((set) => !set.isFinished);
    const isSetAlreadyInProgress = currentSet.length >= 1;



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
                            <CreateNewGameButton />
                        }
                    </Grid2>
                </Grid2>

                {
                    isSetAlreadyInProgress && currentSet
                        .map((set, index) => {
                            return (
                                <div onClick={()=> router.push(`/sets/${set._id}`)} key={`currentSet-${index}`}>
                                    <Set set={set} key={`currentSet-${index}`} isDetails={false} isSetAlreadyInProgress={isSetAlreadyInProgress} />
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
                sets
                    .filter((set) => set.isFinished)
                    .map((set, index) => {
                        return (
                            <div onClick={()=> router.push(`/sets/${set._id}`)} key={`historySet-${index}`}>
                                <Set set={set} key={`historySet-${index}`} isDetails={false} isSetAlreadyInProgress={isSetAlreadyInProgress}/>
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