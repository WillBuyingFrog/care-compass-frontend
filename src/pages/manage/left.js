/*
 * 后台管理页面左侧导航栏
 */
import './left.css'
import { BarsOutlined, TeamOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { Menu } from "antd";
import { Outlet, useNavigate } from 'react-router-dom'
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
    getItem("平台概况", "info", <InfoCircleOutlined />),
    getItem("已审核认领", "checked", <TeamOutlined />),
    getItem("待审核认领", "uncheck", <BarsOutlined />),
]


function LeftMenu(){
    const navigate = useNavigate();
    const onClick = (e) =>{
        console.log(e);
        navigate(e.key);
        console.log(1);
    }
    return(
            <Menu style={{width: 200}}
            defaultSelectedKeys={[1]}
            theme="light"
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
                <Layout style={{background:'rgb(230,235,247)'}}>
                    <Sider style={{width:200, height:700}}
                    theme="light">
                        <div className='left'><LeftMenu/></div>
                        <img src={require('../../assets/doctors.png')} style={{marginTop:350}} />
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

