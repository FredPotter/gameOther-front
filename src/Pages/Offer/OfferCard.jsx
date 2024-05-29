import React, { useState } from 'react';
import { Card, CardContent, Typography, Button, TextField } from '@mui/material';
import UserService from "../../service/UserService";
import OfferService from "../../service/OfferService";
import {useNavigate} from "react-router-dom";

export default function OfferCard({ offer }) {
    const [count, setCount] = useState(1); // Счетчик для количества покупаемых лотов
    const offerService = new OfferService();
    const navigate = useNavigate();
    const handleCountChange = (event) => {
        let value = event.target.value;
        if (value < 1) {
            value = 1;
        }
        setCount(value);
    };
    const handleBuyClick = async () => {
        try {
            // Получаем текущий баланс пользователя
            const totalCost = offer.pricePerLot * count;
            // Затем создаем транзакцию
            const transactionResponse = await offerService.buyOffer(offer.id, count, totalCost);
            if (!transactionResponse.success) {
                throw new Error(transactionResponse.message);
            }
            alert('Покупка успешно совершена!');
            navigate('/Purchases', {replace: true});
        } catch (error) {
            console.error('Ошибка при покупке:', error);
            alert('Ошибка при покупке. Пожалуйста, попробуйте еще раз.');
        }
    };

    return (
        <Card sx={{ width: 300, height: 'auto' }}>
            <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                    <Typography variant="h5" component="div">
                        Оформление заказа
                    </Typography>
                    <Typography variant="subtitle1" component="div">
                        Название: {offer.name}
                    </Typography>
                    <Typography variant="subtitle1" component="div">
                        Подробное описание: {offer.description}
                    </Typography>
                    <Typography variant="subtitle1" component="div">
                        Цена за лот: {offer.pricePerLot}
                    </Typography>
                    <TextField
                        type="number"
                        InputProps={{ inputProps: { min: 1, max: offer.availableLots } }}
                        value={count}
                        onChange={handleCountChange}
                    />
                    <Typography variant="subtitle1" component="div" color="text.secondary">
                        Осталось в наличии: {offer.quantity}
                    </Typography>
                </div>
                <Button variant="contained" color="primary" onClick={handleBuyClick}>
                    Купить
                </Button>
            </CardContent>
        </Card>
    );
}