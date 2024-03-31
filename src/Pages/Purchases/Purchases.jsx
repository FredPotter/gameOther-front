import React, {useEffect, useState} from 'react';
import TransactionService from "../../service/TransactionService";
import AppBar from "../HomeComponents/AppBar/AppBar";
import Container from "@mui/material/Container";
import PurchaseTable from "./PurchasesTable";

function Purchase() {
    const [purchases, setPurchases] = useState([]);
    const transactionService = new TransactionService();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const resp = await transactionService.getTransactions();
                setPurchases(resp)
            } catch (error) {
                console.error('Ошибка:', error);
            }
        }
        fetchData();
    }, []);

    return (
        <div>
            <AppBar/>
            <Container component="main" maxWidth="xl" sx={{marginTop: 4}}>
                <PurchaseTable purchases={purchases}/>
            </Container>
        </div>
    );
}

export default Purchase;