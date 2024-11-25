import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router'

import { Set } from "../../components/Set";

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


const Sets: React.FC<SetsProps> = ({ sets }) => {
    const router = useRouter();

    

   return (
    <div>
        {
            sets.map((set, index) => {
                return (
                    <div onClick={()=> router.push(`/sets/${set._id}`)}>
                        <Set set={set} key={index}/>
                    </div>
                )
            })
        }
    </div>
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