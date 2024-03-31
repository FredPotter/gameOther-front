import Container from "@mui/material/Container";
import * as React from "react";
import AppBar from "../HomeComponents/AppBar/AppBar";
import {useParams} from "react-router-dom";
import OfferService from "../../service/OfferService";
import LotTable from "./LotTable";

export default function Lots() {
    const offerService = new OfferService();
    const {id} = useParams();
    const [offers, setOffers] = React.useState([]);
    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const resp = await offerService.getOffersById(id, "");
                setOffers(resp)
            } catch (error) {
                console.error('Ошибка:', error);
            }
        }
        fetchData();
    }, [id]);
    return (
        <div>
            <AppBar/>
            <Container component="main" maxWidth="xl" sx={{marginTop: 4}}>
                <LotTable offers={offers}/>
            </Container>
        </div>
    );
}