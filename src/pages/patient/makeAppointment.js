import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom/client';
import 'antd/dist/antd.min.css';
import axios from 'axios';
import {Col, Drawer, Layout, Row} from "antd";
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

    // 当前选择的科室
    const [selectedDepartment, setSelectedDepartment] = useState(null);
    // 当前选择的医生
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    // 当前选择的时段
    const [selectedPeriod, setSelectedPeriod] = useState(null);
    // 确认预约信息的抽屉是否显示
    const [confirmDrawerOpen, setConfirmDrawerOpen] = useState(false);

    // 监听selectedDepartment的变化
    useEffect(() => {
        if(selectedDepartment != null){
            setStep(2);
        }else{
            // 说明用户更换了选择的科室
        }
    }, [selectedDepartment]);

    // 监听selectedDoctor的变化
    useEffect(() => {
        if(selectedDoctor != null){
            console.log("selectedDoctor changed", selectedDoctor);
        }
    }, [selectedDoctor]);

    // 监听selectedPeriod的变化
    useEffect(() => {
        if(selectedPeriod != null){
            console.log("selectedPeriod changed", selectedPeriod);
        }
    }, [selectedPeriod]);

    // 唤起确认预约信息的抽屉的函数
    const showConfirmDrawer = () => {
        setConfirmDrawerOpen(true);
    }

    // 关闭确认预约信息的抽屉的函数
    const closeConfirmDrawer = () => {
        setConfirmDrawerOpen(false);
    }


    return (
        <>
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
                                    <SelectDoctor
                                        departmentID={selectedDepartment}
                                        setSelectedDoctor={setSelectedDoctor}
                                        setSelectedPeriod={setSelectedPeriod}
                                        showConfirmDrawer={showConfirmDrawer}
                                    />
                                </Col>
                            </Row>

                        )
                    }
                </Col>
            </Row>
            <Drawer title="确认预约信息" width={500} closeable={false}
                    onClose={closeConfirmDrawer} open={confirmDrawerOpen}
            >
                确认预约信息：
                {selectedDoctor != null ? selectedDoctor.doctorName : '未选择医生'}
                {selectedPeriod}
            </Drawer>
        </>


    )
}

export default MakeAppointment;
