import {useLocation} from "react-router-dom";
import AppBar from "../HomeComponents/AppBar/AppBar";
import Container from "@mui/material/Container";
import * as React from "react";
import OfferService from "../../service/OfferService";
import OfferCard from "./OfferCard";

export default function Offer() {
    const offerService = new OfferService();
    const [offer, setOffer] = React.useState(null)
    const query = new URLSearchParams(useLocation().search);

    React.useEffect(() => {
        const id = query.get("id");
        const fetchData = async () => {
            try {
                const resp = await offerService.getOfferById(id);
                setOffer(resp)
            } catch (error) {
                console.error('Ошибка:', error);
            }
        }
        fetchData();
    }, []);
    return (
        <div>
            <AppBar/>
            <Container component="main" maxWidth="xl" sx={{marginTop: 4, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                {offer && <OfferCard offer={offer}/>}
            </Container>
        </div>
    );
}