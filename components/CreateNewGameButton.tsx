import Button from '@mui/material/Button';

export const CreateNewGameButton = () => {

    const createGameHandler = async () => {
        const res = await fetch(`/api/sets`,
            {
              body: JSON.stringify({
                isFinished: false,
                team1:  "Titanes",
                team2: "Aldeanos",
                score: "0-0",
                winner: "",
                createdAt: new Date().toString()
              }),
              method: 'POST'
            }
          );

        const id = (await res.json()).data.insertedId;
        window.location.replace(`${window.location.origin}/sets/${id}`);
    }

    return (
        <Button
            variant="contained"
            color="primary"
            type="submit"
            onClick={createGameHandler}
        >
            New Set
        </Button>
    )
}