import {Alert, Avatar, Col, Row, Space, Tabs, Typography, Layout} from "antd";
import default_avatar from '../../assets/m-avatar.png'
import {BulbOutlined, HomeOutlined, MailOutlined, SolutionOutlined, PhoneOutlined, IdcardOutlined} from "@ant-design/icons";
import {Center, Link as ChakraLink} from "@chakra-ui/react";
import React, {useEffect, useState} from "react";
import {useOutletContext} from "react-router-dom";
import axios from "axios";
import MyBills from "./myBills";
import MyMedicalRecords from "./myMedicalRecords";
import './personInfo.css'
import {tab} from "@testing-library/user-event/dist/tab";
import MyHeader from "../../components/header/header";
const { Header, Content, Footer, Sider } = Layout;
const {Title, Paragraph, Text} = Typography;

function PersonInfo(props){

    const [patientID, setPatientID] = useOutletContext();

    const [isDefaulted, setIsDefaulted] = useState(0);

    const [personalInfo, setPersonalInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const getPersonalInfo = async () => {

            let customHeaders = {
                token: localStorage.getItem('userToken')
            }

            try {
                setPatientID(localStorage.getItem('userID'));
                let response = await axios.post('/patient/defaultedAppointmentsCheck/', {
                    UserID: localStorage.getItem('userID')
                }, {
                        headers: customHeaders
                    });
                setIsDefaulted(response.data.isDefaulted);
                console.log(response.data.isDefaulted);
                response = await axios.post('/patient/info/', {
                    UserID: localStorage.getItem('userID')
                }, {
                    headers: customHeaders
                });
                if (response.status === 200) {
                    setPersonalInfo(response.data);
                    setLoading(false);
                }
            } catch (error) {
                console.log(error);
            }
        }
        getPersonalInfo();
    }, []);


    const tabItems = [
        {
            label: '诊疗记录',
            key: '1',
            children: <MyMedicalRecords />
        },
        {
            label: '缴费记录',
            key: '2',
            children: <MyBills />
        }
    ]


    return (
        <>
            {loading ? (
                <div>loading...</div>
            ) : (
            <Content
                style={{
                    padding: '50px 100px 20px 100px',
                    backgroundColor: 'rgb(230,235,247)',
                }}
            >
                <>
                {isDefaulted === 1 &&
                <div>
                    <Alert message="您是失约患者，暂时无法使用预约挂号功能。" type="warning" />
                </div>
                }
                    <div
                        style={{
                            padding: '24px',
                            minHeight: '150px',
                            width: '100%',
                            background: 'linear-gradient(360deg,rgba(255,255,255,1.0), rgba(255,255,255,0.0))',
                            boxShadow: '4px 4px 15px 0 rgba(0,0,0,0.1)',
                            borderRadius: '20px',
                        }}
                    >
                        <Row>
                            <Col span={7}>
                                <Avatar
                                    size={130}
                                    // icon={<UserOutlined />}
                                    style={{
                                        boxShadow: '4px 4px 15px 0 rgba(0,0,0,0.2)',
                                        margin: '10px 0 0 30px',
                                    }}
                                    src={default_avatar}
                                />
                            </Col>
                            <Col span={15}>
                                <Typography
                                    style={{
                                        padding: '0 0 0 10px',
                                    }}
                                >
                                    <Title
                                        className="dark-text"
                                        style={{
                                            textShadow: '4px 4px 6px rgba(0,0,0,0.2)',
                                            color: '#4A5568',
                                        }}
                                    >
                                        {personalInfo.name}
                                    </Title>
                                    <Paragraph>
                                        <Space>
                                            <PhoneOutlined style={{color :'#4A5568'}}/>
                                        </Space>
                                        <Text>
                                            {personalInfo.phone}
                                        </Text>
                                    </Paragraph>
                                    <Paragraph>
                                        <Space>
                                            <IdcardOutlined style={{color :'#4A5568'}} />
                                        </Space>
                                        <Text style={{color :'#4A5568'}}>{personalInfo.officialID}</Text>
                                    </Paragraph>
                                </Typography>
                            </Col>
                        </Row>
                    </div>

                    <div
                        style={{
                            marginTop: '30px',
                            marginBottom: '30px',
                            padding: '24px',
                            backgroundColor: 'white',
                            height: '300px',
                            boxShadow: '4px 4px 15px 0 rgba(0,0,0,0.1)',
                            borderRadius: '20px',
                            minHeight: '70vh',
                        }}
                    >
                        <Tabs defaultActiveKey={1} items={tabItems} />
                    </div>
                </>
            </Content>
            )}
        </>
    )}


export default PersonInfo;
