import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import { useEffect } from 'react';

import { CustomAppBar } from "@/components/CustomAppBar";
import { DailyStatistics } from '@/components/DailyStatistics';
import { ISet } from "@/components/Set";

interface Props {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window?: () => Window;
    sets: ISet[];
}

const DailyScore: React.FC<Props> = (props: Props) => {
    const { window, sets } = props;
    const router = useRouter();

    useEffect(() => {
        const user = Cookies.get('user');
  
        !user && router.push('/');
    }, [])

   return (
    <>
        <CustomAppBar  window={window}/>
        <DailyStatistics setsData={sets} />
    </>
    
   );
};


export default DailyScore;


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