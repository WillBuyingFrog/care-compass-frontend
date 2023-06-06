import {Layout} from "antd";
import MyHeader from "../../components/header/header";
import PatientSidebar from "./patientSidebar";
import SelectDepartment from "./steps/selectDepartment";
import React, {useState} from "react";
import MakeAppointment from "./makeAppointment";
import {Outlet} from "react-router-dom";
import PatientHeader from "../../components/header/patientHeader";
const { Header, Footer, Sider, Content } = Layout;


function Patient(){

    // 当前患者的id，作为一个react state
    const [patientId, setPatientId] = useState(15);



    return (
            <Layout>
                <PatientHeader />
                <Content>
                    <Outlet context={[patientId, setPatientId]}/>
                </Content>
            </Layout>
    )
}

export default Patient;
