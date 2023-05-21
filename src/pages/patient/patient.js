import {Layout} from "antd";
import MyHeader from "../../components/header/header";
import PatientSidebar from "./patientSidebar";
import SelectDepartment from "./steps/selectDepartment";
import React from "react";
import MakeAppointment from "./makeAppointment";
import {Outlet} from "react-router-dom";
import PatientHeader from "../../components/header/patientHeader";
const { Header, Footer, Sider, Content } = Layout;


function Patient(){
    return (
        <div>
            <Layout>
                <PatientHeader />
                <Layout style={{'height': '600px'}}>
                    <Content>
                        <Outlet />
                    </Content>
                </Layout>
                <Footer>

                </Footer>
            </Layout>
        </div>
    )
}

export default Patient;
