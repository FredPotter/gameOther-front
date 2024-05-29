import React, {useEffect, useState} from 'react';
import {TextField, Button, Select, MenuItem, InputLabel, FormControl, Stack, Card, CardContent, Typography} from '@mui/material';
import GameService from '../../service/GameService';
import CategoryService from '../../service/CategoryService';
import AppBar from "../HomeComponents/AppBar/AppBar";
import OfferService from "../../service/OfferService";
import {useNavigate} from "react-router-dom";

function NewOffer() {
    const [form, setForm] = useState({
        sellerId: '',
        name: '',
        gameName: '',
        categoryName: '',
        pricePerLot: '',
        quantity: '',
        quantityGoodsInLot: '',
        description: '',
        obtainMethod: '',
        vipStatusDays: 0,
    });
    const [games, setGames] = useState([]);
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    const offerService = new OfferService();
    const gameService = new GameService();
    const categoryService = new CategoryService();

    useEffect(() => {
        gameService.getGames().then(setGames);
        categoryService.getCategories().then(setCategories);
    }, []);

    const handleChange = (event) => {
        let value = event.target.value;
        if (event.target.name === 'pricePerLot' || event.target.name === 'quantity' || event.target.name === 'quantityGoodsInLot') {
            if (value <= 0) {
                value = 1;
            }
        }
        if (event.target.name === 'vipStatusDays') {
            if (value < 0) {
                value = 0;
            }
        }
        setForm({
            ...form,
            [event.target.name]: value,
        });
    };

    const handleClickSubmit = (event) => {
        event.preventDefault();
        form.sellerId = localStorage.getItem('userId');
        try {
            const fetchData = async () => {
                const resp = await offerService.createOffer(form);
                if (resp.success) {
                    alert('Предложение успешно создано!');
                    navigate('/Games', {replace: true});
                } else {
                    throw new Error(resp.message);
                }
            }
            fetchData();
        } catch (error) {
            console.error('Ошибка:', error);
        }
    };

    return (
        <div>
            <AppBar/>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '125vh'}}>
                <Card sx={{width: 700, height: 800}}>
                    <CardContent>
                        <form onSubmit={handleClickSubmit}>
                            <Stack spacing={2}>
                                <TextField name="name" label="Name" value={form.name} onChange={handleChange}/>
                                <FormControl>
                                    <InputLabel>Game</InputLabel>
                                    <Select name="gameName" value={form.gameName} onChange={handleChange}>
                                        {games.map((game) => (
                                            <MenuItem key={game.id} value={game.name}>{game.name}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <FormControl>
                                    <InputLabel>Category</InputLabel>
                                    <Select name="categoryName" value={form.categoryName} onChange={handleChange}>
                                        {categories.map((category) => (
                                            <MenuItem key={category.id} value={category.name}>{category.name}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <TextField name="pricePerLot" label="Price Per Lot" value={form.pricePerLot}
                                           onChange={handleChange}/>
                                <TextField name="quantity" label="Quantity"
                                           value={form.quantity}
                                           onChange={handleChange}/>
                                <TextField name="quantityGoodsInLot" label="Quantity Goods In Lot"
                                           value={form.quantityGoodsInLot}
                                           onChange={handleChange}/>
                                <TextField name="description" label="Description" value={form.description}
                                           onChange={handleChange}/>
                                <TextField name="obtainMethod" label="Obtain Method" value={form.obtainMethod}
                                           onChange={handleChange}/>
                                <TextField name="vipStatusDays" label="VIP Status Days" value={form.vipStatusDays}
                                           onChange={handleChange}/>
                                <Typography variant="subtitle1" component="div">
                                    {form.vipStatusDays * 80} рублей за вип статус
                                </Typography>
                                <Button type="submit">Submit</Button>
                            </Stack>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

export default NewOffer;