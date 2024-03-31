import React from 'react';
import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export default function GameCard({ id, name, pathToPoster }) {
    return (
        <Card>
            <CardActionArea component={Link} to={`/lots/${id}`}>
                <CardMedia
                    component="img"
                    height="140"
                    image={pathToPoster}
                    alt={name}
                />
                <CardContent>
                    <Typography variant="h5" component="div">
                        {name}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}