import { GetServerSideProps } from 'next';
import { Set } from "../../components/Set";
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import { useEffect } from 'react';

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
    set: Set;
}


const Sets: React.FC<SetsProps> = ({ set }) => {
    const router = useRouter();

    useEffect(() => {
        const user = Cookies.get('user');
  
        !user && router.push('/');
    }, [])

   return (
    <div>
        <Set set={set} isDetails={true}/>
    </div>
   );
};


export default Sets;


export const getServerSideProps: GetServerSideProps = async ({ query }) => {
   try {
    let id = `${query.id}`;
    let res = await fetch(`${process.env.API_ENDPOINT}/api/sets/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      let set = await res.json();

       return {
           props: { 
            set: JSON.parse(JSON.stringify(set.data))
         },
       };
   } catch (e) {
       console.error(e);
       return { props: { set: {} } };
   }
};