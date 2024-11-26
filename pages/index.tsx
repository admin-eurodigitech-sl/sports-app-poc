import { FormEvent, useEffect } from "react";
import { GetServerSideProps } from 'next';
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import TextField from '@mui/material/TextField';
import Grid2 from "@mui/material/Grid2";
import Button from '@mui/material/Button';

import { CustomAppBar } from "@/components/CustomAppBar";

interface User {
   _id: string;
   name: string;
}


interface UsersProps {
    users: User[];
}

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
  users: User[];
}

const Login: React.FC<UsersProps> = (props: Props) => {
    const { window, users } = props;

    const router = useRouter()

    useEffect(() => {
      const user = Cookies.get('user');

      user && router.push('/sets')
    }, [])

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const formData = new FormData(event.currentTarget)
        const name = formData.get('name');
        const allowedUser = users.find((element) => element.name === name);    
        if (name && allowedUser) {
    
          Cookies.set('user', allowedUser.name, { expires: 1 })
    
          router.push('/sets')
        } else {
          // Handle errors
        }
      }

   return (
    <>
      <CustomAppBar  window={window}/>

      <Grid2 container spacing={2} justifyContent="center">
        <Grid2 size={{ xs: 12, sm: 4 }} justifyContent="start">
          <h1>Welcome to Sunday Volley</h1>
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
            Access
          </Button>
        </form>
        </Grid2>
      </Grid2>
    </>
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