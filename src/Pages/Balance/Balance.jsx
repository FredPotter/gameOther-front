import React, {createContext, forwardRef, useImperativeHandle} from 'react';
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import UserService from "../../service/UserService";

export const OpenModalContext = createContext();

const Balance = forwardRef(({callback}, ref) => {
    const [value, setValue] = React.useState('');
    const [open, setOpen] = React.useState(false);
    const userService = new UserService();

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const fetchBalance = async () => {
            if (localStorage.getItem('token')) { // Проверьте наличие токена
                try {
                    const resp = await userService.changeUserBalance({amount: value}); // Получите баланс
                    callback(resp.balance);
                } catch (error) {
                    console.error('Ошибка:', error);
                }
            }
        }
        fetchBalance();
        handleClose(); // Закрыть модальное окно после отправки формы
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    useImperativeHandle(ref, () => ({
        handleClickOpen
    }));

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Пополнение баланса</DialogTitle>
            <DialogContent>
                <Container component="main" maxWidth="xl">
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <form onSubmit={handleSubmit}>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="amount"
                                    label="Сумма пополнения"
                                    name="amount"
                                    autoComplete="amount"
                                    autoFocus
                                    value={value}
                                    onChange={handleChange}
                                />
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                >
                                    Пополнить
                                </Button>
                            </form>
                        </Grid>
                    </Grid>
                </Container>
            </DialogContent>
        </Dialog>
    );
});

export default Balance;