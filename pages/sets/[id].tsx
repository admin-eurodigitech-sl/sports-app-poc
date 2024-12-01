import { GetServerSideProps } from 'next';
import { Set, ISet } from "../../components/Set";
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import { useEffect } from 'react';
import { CustomAppBar } from "@/components/CustomAppBar";

interface Props {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window?: () => Window;
    set: ISet;
    setInProgress: boolean;
}


const SetDetails: React.FC<Props> = (props: Props) => {
    const { window, set, setInProgress } = props;
    const router = useRouter();

    useEffect(() => {
        const user = Cookies.get('user');
  
        !user && router.push('/');
    }, [])

   return (
    <div>
        <CustomAppBar  window={window}/>
        <div>
            <Set set={set} isDetails={true} isSetAlreadyInProgress={setInProgress}/>
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

      let setInProgressRes = await fetch(`${process.env.API_ENDPOINT}/api/sets/in-progress`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });


      let set = await res.json();
      let setInProgress = await setInProgressRes.json();

       return {
           props: { 
            set: JSON.parse(JSON.stringify(set.data)),
            setInProgress: setInProgress.data.length !== 0
         },
       };
   } catch (e) {
       console.error(e);
       return { props: { set: {} }, setInProgress: false };
   }
};