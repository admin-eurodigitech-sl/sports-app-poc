import { FormEvent } from "react";
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
    
          router.push('/sets')
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

      let res = await fetch(`${process.env.API_ENDPOINT}/api/users`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      let users = await res.json();

       return {
           props: { users: JSON.parse(JSON.stringify(users.data)) },
       };
   } catch (e) {
       console.error(e);
       return { props: { users: [] } };
   }
};