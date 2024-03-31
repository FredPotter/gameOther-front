import Container from "@mui/material/Container";
import * as React from "react";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

export default function Logout() {
    useEffect(() => {
        handleLogout();
        navigate('/', {replace: true});
    }, []);

    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('token');
    };

    return (
        <div>
            <Container component="main" maxWidth="xl">

            </Container>
        </div>
    );
}