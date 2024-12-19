import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProfilePage.css';
import Nav from '../components/nav';
import { Avatar, Button, Card, Space, Form } from "antd";
import { UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    useEffect(() => {
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
            <div className='profile-page-container'>
                <div className="profile-page">
                    <Card
                        style={{ width: 400, margin: '20px auto', textAlign: 'center' }}
                        bordered={false}
                        cover={
                            <Avatar
                                size={128}
                                icon={<UserOutlined />}
                                style={{ margin: '20px auto', display: 'block' }}
                            />
                        }>



                        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                            <h1>
                                Profile Page
                            </h1>
                            <div className="profile-info">

                                <p>email : {user.email}</p>
                                <p>username : {user.username}</p>
                                <p>name : {user.firstname} {user.lastname}</p>


                            </div>
                            <Button type="default">edit profile</Button>
                        </Space>

                    </Card>
                    <Button type="primary" danger onClick={handleLogout}>
                        Logout
                    </Button>

                </div>
            </div>
        </div >



    );
}; export default ProfilePage;