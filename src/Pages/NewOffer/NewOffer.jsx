import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import * as React from "react";
import Grid from "@mui/material/Grid";
import AppBar from "../HomeComponents/AppBar/AppBar";

export default function NewOffer() {
    return (
        <div>
            <AppBar/>
            <Container component="main" maxWidth="xl">
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography component="h1" variant="h5">
                            New Offer
                        </Typography>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}