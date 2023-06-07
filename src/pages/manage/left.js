/*
 * 后台管理页面左侧导航栏
 */
import './left.css'
import './manage.css';
import { UserOutlined, BarsOutlined, TeamOutlined, InfoCircleOutlined, ScheduleOutlined, AuditOutlined, DatabaseOutlined, HomeOutlined, StockOutlined, NotificationOutlined } from '@ant-design/icons';
import { Menu } from "antd";
import { Outlet, useNavigate } from 'react-router-dom';
import React, { useState } from "react";
import { Layout } from "antd";
import Header from '../../components/header/header';
const { Sider, Content } = Layout;

function getItem(label, key, icon){
    return {
        label,
        key: "/manage/" + key,
        icon: icon
    }
}

const items = [
    // getItem("医院概况", "info", <InfoCircleOutlined />),
    getItem("排班管理", "doctorSchedule", <ScheduleOutlined />),
    getItem("请假审批", "doctorLeave", <AuditOutlined />),
    getItem("医生账号管理", "doctorAccount", <UserOutlined />),
    getItem("科室信息管理", "department", <HomeOutlined />),
    getItem("药品/检查管理", "medicine", <DatabaseOutlined />),
    getItem("公告管理", "board", <NotificationOutlined />),
]


function LeftMenu(){
    const navigate = useNavigate();
    const onClick = (e) =>{
        console.log(e);
        navigate(e.key);
        console.log(1);
    }
    return(
            <Menu style={{width: '100%'}}
                defaultSelectedKeys={["info"]}
                items={items}
                mode="vertical"
                onClick={onClick}
            ></Menu>
    )

}

function Manage(){
    const navigate = useNavigate();
    let token = localStorage.getItem("userToken");
    let type = localStorage.getItem("userType")
    // if(!token || !type || type != "admin"){
    //     window.alert("您没有管理员权限！")
    //     setTimeout(function () {
    //         navigate("/");
    //     }, 0);
    // }

    return (
        <div>
            <Layout>
                <Header></Header>
                <Layout style={{background:'rgb(220,225,242)'}}>
                    <Sider style={{
                        height:'90.5vh',
                        borderRadius: '0 20px 20px 0',
                        boxShadow: '4px 4px 15px 0 rgba(0,0,0,0.1)',
                    }}
                    >
                        <div className='left'><LeftMenu/></div>
                        <img src={require('../../assets/blooming.png')} style={{marginTop:200}} />
                    </Sider>
                    <Content>
                        <Outlet />
                    </Content>
                </Layout>
            </Layout>
        </div>
    )
}
export default Manage;

