import './App.css';
import axios from 'axios'
import { useState } from 'react';
import LoginScreen from './screen/LoginScreen';
import Home from './screen/Home';
import FinanceScreen from './screen/FinanceScreen'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Button } from 'antd'

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
        <div>
            <Router>
                <Routes>
                    <Route
                        path="/"
                        element={
                            isAuthenticated ? (
                                <Navigate to="/Home" />
                            ) : (
                                <LoginScreen onLoginSuccess={handleLoginSuccess} />
                            )
                        }
                    />
                    <Route
                        path="/Home"
                        element={
                            isAuthenticated ? (
                                <Home />
                            ) : (
                                <Navigate to="/" />
                            )
                        }
                    />
                    <Route
                        path="/Home/Finance"
                        element={
                            isAuthenticated ? (
                                <FinanceScreen />
                            ) : (
                                <Navigate to="/" />
                            )
                        }
                    />
                    <Route
                        path="/Home"
                        element={
                            isAuthenticated ? (
                                <LoginScreen />
                            ) : (
                                <Navigate to="/" />
                            )
                        }
                    />

                </Routes>
            </Router>
        </div>



    );
}
export default App;