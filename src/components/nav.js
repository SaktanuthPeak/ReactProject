import React, { useState } from 'react';
import { MenuOutlined, HomeOutlined, UserOutlined, LogoutOutlined, BarChartOutlined, EditOutlined, AppstoreAddOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';


const items = [
    {
        key: 'Profile',
        label: <Link to='/Home/Profile'>Profile</Link>,
        icon: <UserOutlined />
    },

    {
        key: 'Home',
        label: <Link to='/Home'>Home</Link>,
        icon: <HomeOutlined />,
    },

    {
        key: 'เมนู',
        key: 'SubMenu',
        label: 'Menu',
        icon: <MenuOutlined />,
        children: [
            {
                key: 'EditOrDelete',
                label: <Link to='/Home/EditOrDelete'>เเก้ไขรายการ</Link>,
                icon: <EditOutlined />
            },
            {
                key: 'Add',
                label: <Link to='/Home/Add'>เพิ่มรายการ</Link>,
                icon: <AppstoreAddOutlined />

            },
            {
                key: 'กราฟสรุปผล',
                label: <Link to='/Home/Chart'>กราฟสรุปรายรับ รายจ่าย</Link>,
                icon: <BarChartOutlined />
            },
            {
                key: 'Logout',
                label: 'Logout',
                icon: <LogoutOutlined />,

            }
        ],
    },

];


const Nav = ({ handleLogout }) => {
    const [current, setCurrent] = useState('Home');

    // const navigate = useNavigate();

    // const handleMenuClick = ({ key }) => {
    //     const { target } = navigation.find(item => item.key === key) || {};
    //     if (target) {
    //         navigate(target);
    //     }
    // };
    const onClick = (e) => {
        // console.log('click ', e);
        if (e.key === 'Logout') {
            handleLogout();

        } else {

        } setCurrent(e.key);


    };
    return <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />;
};
export default Nav;