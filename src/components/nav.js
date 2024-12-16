import React, { useState } from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined, TableOutlined, HomeOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import Home from './Home'
import FinanceScreen from '../screen/FinanceScreen';

// const navigation = [
//     { label: "Home", key: 1, target: "/Home" },
//     { label: "Finance", key: 2, target: "/Finance" },
//     { label: "Login", key: 3, target: "/" },
// ];


const items = [
    {
        key: 'Home',
        label: <Link to='/Home'>Home</Link>,
        icon: <HomeOutlined />,
    },

    {
        key: 'การตั้งค่า',
        key: 'SubMenu',
        icon: < SettingOutlined />,
        children: [
            {
                key: 'EditOrDelete',
                label: <Link to='/Home/Finance'>Edit</Link>,
            },
            {
                key: 'Login',
                label: <Link to='/'>Logout</Link>

            }
        ],
    },

];
const App = () => {
    const [current, setCurrent] = useState('mail');
    // const navigate = useNavigate();

    // const handleMenuClick = ({ key }) => {
    //     const { target } = navigation.find(item => item.key === key) || {};
    //     if (target) {
    //         navigate(target);
    //     }
    // };
    const onClick = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
    };
    return <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />;
};
export default App;