import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProfilePage.css';
import { Avatar, Button, Card, Space } from "antd";
import { UserOutlined } from '@ant-design/icons';
import EditProfile from '../components/EditProfile';
import dayjs from 'dayjs';

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const [isModalVisible, setModalVisible] = useState(false);

    const fetchItems = async () => {
        try {
            const response = await axios.get('/api/users/me');
            setUser(response.data);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    useEffect(() => {

        fetchItems();
    }, []);

    const handleEditSubmit = (updatedData) => {
        axios.put('/api/user/me', updatedData)
            .then(response => {
                setUser(response.data);
                setModalVisible(false);
                fetchItems();
            })
            .catch(error => console.error('Error updating user data:', error));
    };


    if (!user) {
        return (
            <div>
                Loading...
            </div>
        );
    }

    return (
        <div>
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
                                <p>Email: {user.email}</p>
                                <p>Username: {user.username}</p>
                                <p>Name: {user.firstname} {user.lastname}</p>
                                <p>Created at: {dayjs(user.createdAt).format("DD/MM/YYYY")}</p>
                            </div>
                            <Button type="default" onClick={() => setModalVisible(true)}>
                                Edit Profile
                            </Button>
                        </Space>
                    </Card>
                </div>
            </div>

            {isModalVisible && (
                <EditProfile
                    defaultValue={user}
                    closeModal={() => setModalVisible(false)}
                    onSubmit={handleEditSubmit}
                />
            )}
        </div>
    );
};

export default ProfilePage;
