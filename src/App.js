import {Route, Routes} from 'react-router-dom';
import Login from './Pages/Login/Login';
// import Logout from './Pages/Logout/Logout'; // Предполагается, что вы создали этот компонент
// import Account from './Pages/Account/Account'; // Предполагается, что вы создали этот компонент
import AppBar from "./Pages/HomeComponents/AppBar/AppBar";
import theme from "./Pages/HomeComponents/Theme/Theme";
import {ThemeProvider} from '@mui/material/styles';
import SignUp from "./Pages/SignUp/SignUp";

function App() {
    return (
        <div className="App">
            <ThemeProvider theme={theme}>
                <Routes>
                    <Route path="/Main" element={<AppBar/>}/>
                    <Route path="/Login" element={<Login/>}/>
                    <Route path="/SignUp" element={<SignUp/>}/>
                    {/*<Route path="/Logout" element={<Logout/>}/>*/}
                    {/*<Route path="/Account" element={<Account/>}/>*/}
                </Routes>
            </ThemeProvider>
        </div>
    );
}

export default App;