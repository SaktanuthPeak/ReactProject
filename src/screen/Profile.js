import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProfilePage.css';
import Nav from '../components/nav';
import { Formik, Field } from 'formik';
import { Avatar, Button, Card, Space, Form } from "antd";
import { UserOutlined } from '@ant-design/icons';

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

                                <p>{user.email}</p>
                                <p>{user.username}</p>
                                <Formik
                                    initialValues={{ name: user.name, email: user.email }}
                                    onSubmit={(values, { setSubmitting }) => {
                                        axios.post('api/users/update', values)
                                            .then(response => {
                                                setUser(response.data);
                                                setSubmitting(false);
                                            })
                                            .catch(error => {
                                                console.error('Error updating user data:', error);
                                                setSubmitting(false);
                                            });
                                    }}
                                >
                                    {({ isSubmitting }) => (
                                        <Form>
                                            <div>
                                                <label htmlFor="name">Name</label>
                                                <Field id="name" name="name" placeholder="John Doe" />
                                            </div>
                                            <div>
                                                <label htmlFor="email">Email</label>
                                                <Field id="email" name="email" placeholder="john.doe@example.com" type="email" />
                                            </div>
                                            <button type="submit" disabled={isSubmitting}>
                                                Update
                                            </button>
                                        </Form>
                                    )}
                                </Formik>
                            </div>
                            <Button type="default">edit profile</Button>
                        </Space>

                    </Card>

                </div>
            </div>
        </div >



    );
}; export default ProfilePage;