import { FormEvent } from "react";
import clientPromise from "../lib/mongodb";
import { GetServerSideProps } from 'next';
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';



interface User {
   _id: string;
   name: string;
}


interface UsersProps {
    users: User[];
}


const Login: React.FC<UsersProps> = ({ users }) => {
    const router = useRouter()

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
     
        const formData = new FormData(event.currentTarget)
        console.log(formData)
        const name = formData.get('name');
        console.log(users)
        console.log(name)
        const allowedUser = users.find((element) => element.name === name);

        console.log(allowedUser)
    
        if (name && allowedUser) {
    
          Cookies.set('user', allowedUser.name, { expires: 1 })
    
          router.push('/currentSet')
        } else {
          // Handle errors
        }
      }

   return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="name"
        name="name"
        variant="outlined"
        fullWidth
        margin="normal"
      />
      <Button
        variant="contained"
        color="primary"
        type="submit"
      >
        Login
      </Button>
    </form>
   );
};


export default Login;


export const getServerSideProps: GetServerSideProps = async () => {
   try {
       const client = await clientPromise;
       const db = client.db("volley");
       const users = await db
           .collection("users")
           .find({})
           .sort({ metacritic: -1 })
           .toArray();

       return {
           props: { users: JSON.parse(JSON.stringify(users)) },
       };
   } catch (e) {
       console.error(e);
       return { props: { users: [] } };
   }
};