import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Formik, Form, Field } from 'formik';
import './ProfilePage.css';
import Nav from '../components/nav';

const ProfilePage = () => {
    const [user, setUser] = useState(null); useEffect(() => {
        axios.get('/api/users/me')
            .then(response => setUser(response.data))
            .catch(error => console.error('Error fetching user data:', error));
    }, []);
    if (!user)
        return
    <div>
        Loading...
    </div>;
    return (
        <div>
            <header>
                <Nav />
            </header>
            <div className="profile-page">
                <h1>
                    Profile Page
                </h1>
                <div className="profile-info">
                    <p>{user.email}</p>

                </div>
            </div>
        </div>

    );
}; export default ProfilePage;