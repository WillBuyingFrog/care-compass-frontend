import React from 'react';
import ReactDOM from 'react-dom/client';
import 'antd/dist/antd.min.css';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';


function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}



const items = [
    getItem('诊疗记录', 'medicalRecord', <MailOutlined /> ),
    getItem('预约挂号', 'makeAppointment', <SettingOutlined /> ),
    getItem('缴费清单', 'paymentList', <AppstoreOutlined /> ),
];


function patientSidebar() {
    return (
        <Menu
            defaultSelectedKeys={['makeAppointment']}
            defaultOpenKeys={['medicalRecord']}
            mode="inline"
            items={items}
            style={{'height': '100%'}}
        />
    )
}

export default patientSidebar;
