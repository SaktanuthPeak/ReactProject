import './App.css';
import axios from 'axios'
import { useState } from 'react';
import LoginScreen from './screen/LoginScreen';
import FinanceScreen from './screen/FinanceScreen';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL || "http://localhost:1337"
function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const handleLoginSuccess = () => {
        setIsAuthenticated(true);
    }

    return (
        // <div className="App">
        //     <header className="App-header">
        //         {!isAuthenticated && <LoginScreen onLoginSuccess={handleLoginSuccess} />}
        //         {isAuthenticated && <FinanceScreen />}
        //     </header>

        // </div>
        <Router>
            <Routes>
                <Route
                    path="/"
                    element={
                        isAuthenticated ? (
                            <Navigate to="/finance" />
                        ) : (
                            <LoginScreen onLoginSuccess={handleLoginSuccess} />
                        )
                    }
                />
                <Route
                    path="/finance"
                    element={
                        isAuthenticated ? (
                            <FinanceScreen />
                        ) : (
                            <Navigate to="/" />
                        )
                    } />
            </Routes>
        </Router>


    );
}
export default App;