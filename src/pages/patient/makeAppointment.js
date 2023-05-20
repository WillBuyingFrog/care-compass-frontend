import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom/client';
import 'antd/dist/antd.min.css';
import axios from 'axios';
import { Layout } from "antd";
import MyHeader from "../../components/header/header";
import PatientSidebar from "./patientSidebar";
import SelectDepartment from "./steps/selectDepartment";

const { Header, Footer, Sider, Content } = Layout;


function MakeAppointment() {
    // 这是预约挂号页面
    // 预约挂号页面一共有3步，分别是选择科室，选择预约医生及时段，确认预约信息
    // 步骤使用一个名为step的state来描述
    // step的值为1，2，3，分别对应上述3个步骤
    // 现在首先创建一个名为step的state，初始值为1
    const [step, setStep] = useState(1);



    return (
        <div>
            <Layout>
                <MyHeader />
                <Layout style={{'height': '600px'}}>
                    <Sider width={'15vw'} style={{'height': '600px'}}>
                        <PatientSidebar />
                    </Sider>
                    <Content>
                        <SelectDepartment />
                    </Content>
                </Layout>
                <Footer>

                </Footer>
            </Layout>
        </div>
    )
}

export default MakeAppointment;
