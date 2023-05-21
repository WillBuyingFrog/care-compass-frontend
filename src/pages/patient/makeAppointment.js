import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom/client';
import 'antd/dist/antd.min.css';
import axios from 'axios';
import {Col, Layout, Row} from "antd";
import MyHeader from "../../components/header/header";
import PatientSidebar from "./patientSidebar";
import SelectDepartment from "./steps/selectDepartment";
import {Outlet} from "react-router-dom";
import SelectDoctor from "./steps/selectDoctor";

const { Header, Footer, Sider, Content } = Layout;


function MakeAppointment() {
    // 这是预约挂号页面
    // 预约挂号页面一共有3步，分别是选择科室，选择预约医生及时段，确认预约信息
    // 步骤使用一个名为step的state来描述
    // step的值为1，2，3，分别对应上述3个步骤
    // 现在首先创建一个名为step的state，初始值为1
    const [step, setStep] = useState(1);

    const [selectedDepartment, setSelectedDepartment] = useState(null);

    // 监听selectedDepartment的变化
    useEffect(() => {
        if(selectedDepartment != null){
            // console.log("侦测到了selectedDepartment变为有效值")
            setStep(2);
        }else{
            // 说明用户更换了选择的科室
        }
    }, [selectedDepartment]);


    return (
        <Row>
            <Col span={6}>
                <SelectDepartment
                    selectedDepartment={selectedDepartment}
                    setSelectedDepartment={setSelectedDepartment}
                />
            </Col>
            <Col span={18}>
                {
                    // 如果step为2，那么这里渲染医生选择界面
                    step === 2 && (
                        <Row>
                            <Col span={20} offset={1}>
                                <SelectDoctor departmentID={selectedDepartment} />
                            </Col>
                        </Row>

                    )
                }
            </Col>

        </Row>
    )
}

export default MakeAppointment;
