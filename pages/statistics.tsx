import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react';

import { CustomAppBar } from "@/components/CustomAppBar";
import { GlobalStatistics } from "@/components/GlobalStatistics";


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

   return (
    <>
        <CustomAppBar  window={window}/>
        <GlobalStatistics  setsData={setsData} />
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