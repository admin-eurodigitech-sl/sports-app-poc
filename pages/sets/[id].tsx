import { GetServerSideProps } from 'next';
import { Set } from "../../components/Set";
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import { useEffect } from 'react';
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
    set: Set;
}

interface Props {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window?: () => Window;
    set: Set;
}


const SetDetails: React.FC<Props> = (props: Props) => {
    const { window, set } = props;
    const router = useRouter();

    useEffect(() => {
        const user = Cookies.get('user');
  
        !user && router.push('/');
    }, [])

   return (
    <div>
        <CustomAppBar  window={window}/>
        <div>
            <Set set={set} isDetails={true}/>
        </div>
    </div>

   );
};


export default SetDetails;


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