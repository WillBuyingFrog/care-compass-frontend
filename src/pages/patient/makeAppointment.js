import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom/client';
import 'antd/dist/antd.min.css';
import axios from 'axios';
import {Col, Drawer, Layout, Row, Typography, Input, Button} from "antd";
import MyHeader from "../../components/header/header";
import PatientSidebar from "./patientSidebar";
import SelectDepartment from "./steps/selectDepartment";
import {Outlet, useNavigate} from "react-router-dom";
import SelectDoctor from "./steps/selectDoctor";
import {Center} from "@chakra-ui/react";
const { Title , Text} = Typography;
const {TextArea} = Input;

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

    // 抽屉内显示的确认预约按钮的文字
    const [confirmDrawerButtonText, setConfirmDrawerButtonText] = useState("信息无误，前往支付");
    // 预约按钮是否可用
    const [confirmDrawerButtonDisabled, setConfirmDrawerButtonDisabled] = useState(false);

    const getConfirmedPeriodText = (periodKey) => {
        let today = new Date();
        let appointmentDay = new Date(today.getTime() + (24 * 60 * 60 * 1000) * Math.floor((periodKey + 1) / 2));
        let periodText = (appointmentDay.getMonth() + 1).toString() + "月" + appointmentDay.getDate().toString() + "日";
        periodText = periodText + (periodKey % 2 === 0 ? "下午" : "上午");
        return periodText;
    }

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
            // console.log("selectedDoctor changed", selectedDoctor);
        }
    }, [selectedDoctor]);

    // 监听selectedPeriod的变化
    useEffect(() => {
        if(selectedPeriod != null){
            // console.log("selectedPeriod changed", selectedPeriod);
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

    const navigate = useNavigate();

    // 确认预约并前往支付的函数
    const confirmAppointment = async () => {
        // 首先，发送POST请求以新建预约挂号记录
        // 然后，发送POST请求以新建预约挂号账单
        // 最后，跳转到支付页面
        setConfirmDrawerButtonText("正在创建预约挂号记录和账单...");
        setConfirmDrawerButtonDisabled(true);
        const createAppointmentResponse = await axios.post(
            '/patient/appointment/create/',
            {
                date: "sample",
                time: selectedPeriod % 2,
                doctorID: selectedDoctor.doctorID
        });
        const newAppointmentID = createAppointmentResponse.data.appointmentID;
        console.log("newAppointmentID", newAppointmentID);
        const createBillResponse = await axios.post(
            '/patient/bill/create/',
            {
                billType: 'appointment',
                billPrice: selectedPeriod % 2 === 0 ? selectedDoctor.afternoonPrice : selectedDoctor.morningPrice,
                typeID: newAppointmentID
            });
        const newBillID = createBillResponse.data.billID;
        console.log("newBillID", newBillID);
        setConfirmDrawerButtonText("正在跳转支付...")
        navigate('/patient/payBill/' + newBillID.toString());
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
            <Drawer title="确认预约信息" width={550} closeable={false}
                    onClose={closeConfirmDrawer} open={confirmDrawerOpen}
            >
                <Title level={2}>
                    您将预约挂号的医生以及时段如下：
                </Title>
                <Title level={4}>
                    {selectedDoctor != null ? selectedDoctor.doctorName : '未选择医生'}
                </Title>
                <Text>
                    {getConfirmedPeriodText(selectedPeriod)}
                </Text>
                <Title level={3}>
                    请您完整阅读以下预约挂号守则：
                </Title>
                <TextArea rows={4} defaultValue={'这里显示预约挂号守则'} />
                <Row style={{'marginTop': '30px'}} gutter={[0, 24]}>
                    <Col span={12} offset={6}>
                        <Center>
                            <span style={{'fontSize': '20px'}}>
                                价格：
                            </span>
                            <span style={{'color': '#ff8c00', 'fontSize': '20px', 'fontWeight': 'bold'}}>
                                ¥ {
                                selectedDoctor != null ?
                                    ((selectedPeriod % 2 === 0) ?
                                    selectedDoctor.afternoonPrice :
                                    selectedDoctor.morningPrice):
                                    0
                            }
                            </span>
                        </Center>
                    </Col>
                    <Col span={6} />
                    <Col span={12} offset={6}>
                        <Center>
                            <Button
                                onClick={confirmAppointment}
                                disabled={confirmDrawerButtonDisabled}
                            >
                                {confirmDrawerButtonText}
                            </Button>
                        </Center>
                    </Col>
                </Row>
            </Drawer>
        </>


    )
}

export default MakeAppointment;