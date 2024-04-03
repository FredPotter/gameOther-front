import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import logo from '../../../resources/images/logo.png';
import {Link, useNavigate} from 'react-router-dom';
import Balance from "../../Balance/Balance";
import UserService from "../../../service/UserService";
import {Badge} from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {jwtDecode} from "jwt-decode";

const pages = ['Games', 'Balance', 'New offer'];
const settings = [`${jwtDecode(localStorage.getItem('token')).sub}`, 'Login', 'Logout'];

function ResponsiveAppBar() {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const balanceRef = React.useRef();
    const [balance, setBalance] = React.useState(0); // Создайте состояние для баланса
    const userService = new UserService(); // Создайте экземпляр UserService
    const navigate = useNavigate();

    React.useEffect(() => {
        const fetchBalance = async () => {
            if (localStorage.getItem('token')) { // Проверьте наличие токена
                try {
                    const resp = await userService.getUserBalance(); // Получите баланс
                    setBalance(resp.balance); // Установите баланс в состояние
                } catch (error) {
                    console.error('Ошибка:', error);
                }
            }
        }
        fetchBalance();
    }, [balanceRef.current]);

    const handleOpenBalance = () => {
        balanceRef.current.handleClickOpen();
    }

    const handleCartClick = () => {
        navigate('/Purchases', {replace: true});
    };

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Link to={'/Games'} style={{color: 'inherit', textDecoration: 'none'}}>
                            <IconButton size="small">
                                <img src={logo} alt="My Icon"
                                     style={{width: "156px", height: "auto", marginRight: 10}}/>
                            </IconButton>
                        </Link>

                        <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon/>
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: {xs: 'block', md: 'none'},
                                }}
                            >
                                {pages.map((page) => (
                                    page === 'Balance' ? (
                                        <MenuItem key={page} onClick={handleOpenBalance}>
                                            <Typography textAlign="center">{page}</Typography>
                                        </MenuItem>
                                    ) : (
                                        <Link to={`/${page}`} style={{color: 'inherit', textDecoration: 'none'}}>
                                            <MenuItem key={page} onClick={handleCloseNavMenu}>
                                                <Typography textAlign="center">{page}</Typography>
                                            </MenuItem>
                                        </Link>
                                    )
                                ))}
                            </Menu>
                        </Box>
                        <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                            {pages.map((page) => (
                                page === 'Balance' ? (<Button
                                    key={page}
                                    onClick={handleOpenBalance}
                                    sx={{my: 2, color: 'white', display: 'block'}}
                                >
                                    {page}
                                </Button>) : (
                                    <Link to={`/${page}`} style={{color: 'inherit', textDecoration: 'none'}}>
                                        <Button
                                            key={page}
                                            onClick={handleCloseNavMenu}
                                            sx={{my: 2, color: 'white', display: 'block'}}
                                        >
                                            {page}
                                        </Button>
                                    </Link>)
                            ))}
                        </Box>
                        <Typography sx={{marginRight: 2}}>{balance} р.</Typography>
                        <Box sx={{flexGrow: 0}}>
                        <Tooltip title={`${jwtDecode(localStorage.getItem('token')).sub}`}>
                                <IconButton onClick={handleCartClick} sx={{marginRight: 2}}>
                                    <Badge color="error">
                                        <ShoppingCartIcon sx={{ color: 'white' }}/>
                                    </Badge>
                                </IconButton>
                                <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                                    <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg"/>
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{mt: '45px'}}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                {settings.map((setting) => (
                                    <Link to={`/${setting}`} style={{color: 'inherit', textDecoration: 'none'}}>
                                        <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                            <Typography textAlign="center">{setting}</Typography>
                                        </MenuItem>
                                    </Link>
                                ))}
                            </Menu>
                        </Box>
                    </Toolbar>
                    <Balance ref={balanceRef} callback={setBalance}/>
                </Container>
            </AppBar>
    );
}

export default ResponsiveAppBar;