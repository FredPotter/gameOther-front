import Container from "@mui/material/Container";
import * as React from "react";
import Grid from "@mui/material/Grid";
import AppBar from "../HomeComponents/AppBar/AppBar";
import {useEffect} from "react";
import GameService from "../../service/GameService";
import GameCard from "./GameCard";

export default function Games() {
    const gameService = new GameService()
    const [games, setGames] = React.useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const resp = await gameService.getGames();
                console.log(resp);
                setGames(resp)
            } catch (error) {
                console.error('Ошибка:', error);
            }
        }
        fetchData();
    }, []);

    return (
        <div>
            <AppBar/>
            <Container component="main" maxWidth="xl" sx={{ marginTop: 4 }}>
                <Grid container spacing={4}>
                    {games.map((game) =>
                        <Grid item xs={3}>
                            <GameCard id={game.id} name={game.name} pathToPoster={game.pathToPoster}></GameCard>
                        </Grid>
                    )}
                </Grid>
            </Container>
        </div>
    );
}