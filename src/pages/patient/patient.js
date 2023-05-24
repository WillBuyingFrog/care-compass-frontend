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
    // TODO 和其他组员沟通，应用里的患者ID存放在什么位置（localStorage还是？）
    const [patientId, setPatientId] = useState(15);

    // TODO 患者ID存放位置沟通完毕后，写一个useEffect hook来获取患者ID


    return (
            <Layout style={{'height': '100%', 'overflow': 'scroll'}}>
                <PatientHeader />
                <Layout style={{'height': 'max(90.5vh, 100%)'}}>
                    <Content>
                        <Outlet context={[patientId, setPatientId]}/>
                    </Content>
                </Layout>
                <Footer>

                </Footer>
            </Layout>
    )
}

export default Patient;
