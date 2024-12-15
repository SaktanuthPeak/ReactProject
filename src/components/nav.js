import React, { useState } from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined, TableOutlined, HomeOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
const items = [
    {
        label: 'Home',
        key: 'mail',
        icon: <HomeOutlined />,
    },

    {
        label: 'การตั้งค่า',
        key: 'SubMenu',
        icon: < SettingOutlined />,
        children: [
            {
                label: 'Edit or Delete records',
                key: 'EditOrDelete'
            },
            {
                label: 'Add records',
                key: 'Additem'

            }
        ],
    },

];
const App = () => {
    const [current, setCurrent] = useState('mail');
    const onClick = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
    };
    return <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />;
};
export default App;