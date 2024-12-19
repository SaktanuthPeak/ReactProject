import './App.css';
import axios from 'axios'
import { useState } from 'react';
import LoginScreen from './screen/LoginScreen';
import Home from './screen/Home';
import EditOrDeletePage from './screen/EditOrDeletePage';
import AddPage from './screen/AddPage';
import { BrowserRouter as Router, Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';
import { Button } from 'antd'
import ProfilePage from './screen/Profile';

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL || "http://localhost:1337"

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const handleLoginSuccess = () => {
        setIsAuthenticated(true);


    }
    const handleLogout = () => {
        setIsAuthenticated(false)
    }

    return (
        // <div className="App">
        //     <header className="App-header">
        //         {!isAuthenticated && <LoginScreen onLoginSuccess={handleLoginSuccess} />}
        //         {isAuthenticated && <FinanceScreen />}
        //     </header>

        // </div>
        <BrowserRouter>
            <Routes>
                <Route
                    path="/login"
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
                            <Navigate to="/login" />
                        )
                    }
                />


                <Route
                    path="/Home/Profile"
                    element={
                        isAuthenticated ? (
                            <ProfilePage />
                        ) : (
                            <Navigate to="/login" />
                        )
                    }
                />

                <Route
                    path="/Home/Add"
                    element={
                        isAuthenticated ? (
                            <AddPage />
                        ) : (
                            <Navigate to="/login" />
                        )
                    }
                />

                <Route
                    path="/Home/EditOrDelete"
                    element={
                        isAuthenticated ? (
                            <EditOrDeletePage />
                        ) : (
                            <Navigate to="/login" />
                        )
                    }
                />


            </Routes>

        </BrowserRouter>




    );
}
export default App;