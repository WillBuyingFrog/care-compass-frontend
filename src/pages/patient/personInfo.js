import {Alert, Avatar, Col, Row, Space, Tabs, Typography} from "antd";
import default_avatar from '../../assets/patient.png'
import {BulbOutlined, HomeOutlined, MailOutlined, SolutionOutlined} from "@ant-design/icons";
import {Center, Link as ChakraLink} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import {useOutletContext} from "react-router-dom";
import axios from "axios";
import MyBills from "./myBills";
import MyMedicalRecords from "./myMedicalRecords";
import {tab} from "@testing-library/user-event/dist/tab";

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
        <div style={{'marginTop': '3vh'}}>
            {loading ? (
                <div>loading...</div>
            ) : (
                <>
                    <Row>
                        <Col span={3} />
                        <Col span={18}>
                            <Title level={1}>
                                我的个人信息
                            </Title>
                            <Center>
                                <Space direction='vertical' style={{'width': '60%'}}>
                                    {
                                        isDefaulted === 1 ? (
                                            <Alert message="您是失约患者，暂时无法使用预约挂号功能。" type="warning" />
                                        ): (
                                            <></>
                                        )
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
                                                            <HomeOutlined style={{color :'#4A5568'}}/>
                                                        </Space>
                                                        <Text>
                                                            {personalInfo.phone}
                                                        </Text>
                                                    </Paragraph>
                                                    <Paragraph>
                                                        <Space>
                                                            <BulbOutlined style={{color :'#4A5568'}} />
                                                        </Space>
                                                        <Text style={{color :'#4A5568'}}>{personalInfo.officialID}</Text>
                                                    </Paragraph>
                                                </Typography>
                                            </Col>
                                        </Row>
                                    </div>
                                </Space>
                            </Center>

                        </Col>
                        <Col span={3} />
                    </Row>
                    <Row>
                        <Col span={3} />
                        <Col span={18}>
                            <Title level={1}>
                                诊疗与缴费
                            </Title>
                            <Center>
                                <Space direction='vertical' style={{'width': '80%'}}>
                                    <Tabs defaultActiveKey={1} items={tabItems} />
                                </Space>
                            </Center>
                        </Col>
                        <Col span={3} />
                    </Row>
                </>

            )}
        </div>
    )
}


export default PersonInfo;
