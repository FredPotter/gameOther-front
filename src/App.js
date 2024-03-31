import {Navigate, Route, Routes} from 'react-router-dom';
import Login from './Pages/Login/Login';
// import Logout from './Pages/Logout/Logout'; // Предполагается, что вы создали этот компонент
// import Account from './Pages/Account/Account'; // Предполагается, что вы создали этот компонент
import AppBar from "./Pages/HomeComponents/AppBar/AppBar";
import theme from "./Pages/HomeComponents/Theme/Theme";
import {ThemeProvider} from '@mui/material/styles';
import SignUp from "./Pages/SignUp/SignUp";
import Games from "./Pages/Games/Games";
import NewOffer from "./Pages/NewOffer/NewOffer";
import Logout from "./Pages/Logout/Logout";
import Lots from "./Pages/Lots/Lots";
import Offer from "./Pages/Offer/Offer";
import Purchases from "./Pages/Purchases/Purchases";

function App() {
    return (
        <div className="App">
            <ThemeProvider theme={theme}>
                <Routes>
                    <Route path="/" element={<Navigate to="/Main" replace={true} />}/>
                    <Route path="/Main" element={<AppBar/>}/>
                    <Route path="/Login" element={<Login/>}/>
                    <Route path="/SignUp" element={<SignUp/>}/>
                    <Route path="/Logout" element={<Logout/>}/>
                    <Route path="/lots/:id" element={<Lots/>}/>
                    <Route path="/lots/offer" element={<Offer/>}/>
                    <Route path="/Purchases" element={<Purchases/>}/>
                    {/*<Route path="/Account" element={<Account/>}/>*/}
                    <Route path="/Games" element={<Games/>}/>
                    <Route path="/New offer" element={<NewOffer/>}/>
                </Routes>
            </ThemeProvider>
        </div>
    );
}

export default App;