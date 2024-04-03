import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import CountryService from '../../service/CountryService';
import UserService from '../../service/UserService';
import {useNavigate} from "react-router-dom";

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                gameOther
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export default function SignUp() {
    const [countryCode, setCountryCode] = React.useState('7');
    const [countries, setCountries] = React.useState([]);
    const [selectedCountry, setSelectedCountry] = React.useState('');
    const [confirmationCode, setConfirmationCode] = React.useState('-1');
    const [isConfirmationVisible, setIsConfirmationVisible] = React.useState(false);
    const navigate = useNavigate();
    const userService = new UserService();

    React.useEffect(() => {
        const countryService = new CountryService();
        countryService.getCountries().then((result) => {
            setCountries(result);
        });
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        if (confirmationCode === '-1') {
            const preReg = async () => {
                const resp = await userService.preRegistration({username: data.get('username'),
                    countryName: countries.at(selectedCountry-1).name, login: data.get('telephone'),
                    password: data.get('password'), telephoneRegion: countryCode})
                if (resp.success) {
                    setIsConfirmationVisible(true);
                } else {
                    throw new Error(resp.message);
                }
            }
            try {
                preReg();
            } catch (error) {
                console.error('Ошибка:', error);
                alert('Ошибка регистрации, проверьте правильность введенных данных');
            }
        } else {
            const reg = async () => {
                const resp = await userService.registration({username: data.get('username'),
                    countryName: countries.at(selectedCountry-1).name, login: data.get('telephone'),
                    password: data.get('password'), telephoneRegion: countryCode}, confirmationCode)
                if (resp.token) {
                    alert('Регистрация прошла успешно!');
                    navigate('/Login', {replace: true});
                } else {
                    throw new Error(resp.message);
                }
            }
            try {
                reg().then(r => console.log(r));
            } catch (error) {
                console.error('Ошибка:', error);
                alert('Ошибка регистрации, проверьте правильность введенных данных');
            }
        }
        console.log({
            telephone: data.get('telephone'),
            username: data.get('username'),
            password: data.get('password'),
            countryCode: countryCode,
            country: countries.at(selectedCountry-1).name,
            confirmationCode: confirmationCode
        });
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 3}}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="given-name"
                                name="firstName"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                autoComplete="family-name"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel id="country-code-label">Country Code</InputLabel>
                                <Select
                                    labelId="country-code-label"
                                    id="country-code"
                                    value={countryCode}
                                    label="Country Code"
                                    onChange={(event) => setCountryCode(event.target.value)}
                                >
                                    <MenuItem value={'7'}>+7</MenuItem>
                                    <MenuItem value={'1'}>+1</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="telephone"
                                label="telephone with country code"
                                name="telephone"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel id="country-label">Country</InputLabel>
                                <Select
                                    labelId="country-label"
                                    id="country"
                                    value={selectedCountry}
                                    label="Country"
                                    onChange={(event) => setSelectedCountry(event.target.value)}
                                >
                                    {countries.map((country) => (
                                        <MenuItem key={country.id} value={country.id}>
                                            {country.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                name="username"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="new-password"
                            />
                        </Grid>
                    </Grid>
                    {isConfirmationVisible && (
                        <TextField
                            required
                            fullWidth
                            id="confirmation-code"
                            label="Confirmation Code"
                            value={confirmationCode}
                            onChange={(event) => setConfirmationCode(event.target.value)}
                            sx={{mt: 2}}
                        />
                    )}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2}}
                    >
                        Sign Up
                    </Button>
                    <Grid container justifyContent="flex-start">
                        <Grid item>
                            <Link href="/Login" variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <Copyright sx={{mt: 5}}/>
        </Container>
    );
}