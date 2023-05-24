import {Avatar, Col, Row, Space, Typography} from "antd";
import default_avatar from '../../assets/patient.png'
import {BulbOutlined, HomeOutlined, MailOutlined, SolutionOutlined} from "@ant-design/icons";
import {Link as ChakraLink} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import {useOutletContext} from "react-router-dom";
import axios from "axios";

const {Title, Paragraph, Text} = Typography;


function PersonInfo(props){

    const [patientID, setPatientID] = useOutletContext();

    const [personalInfo, setPersonalInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const getPersonalInfo = async () => {
            try {
                const response = await axios.post('/patient/info/', {
                    UserID: patientID
                });
                if (response.status === 200) {
                    setPersonalInfo(response.data.content);
                    setLoading(false);
                }
            } catch (error) {
                console.log(error);
            }
        }
        getPersonalInfo();
    }, []);



    return (
        <div style={{'marginTop': '3vh'}}>
            {loading ? (
                <div>loading...</div>
            ) : (
                <Row>
                    <Col span={6} />
                    <Col span={12}>
                        <Space direction='vertical' style={{'width': '100%'}}>
                            <Title level={1}>
                                我的个人信息
                            </Title>
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
                                                {personalInfo.UserName}
                                            </Title>
                                            <Paragraph>
                                                <Space>
                                                    <HomeOutlined style={{color :'#4A5568'}}/>
                                                </Space>
                                                <Text>
                                                    （这里显示电话号码）{personalInfo.PhoneNumber}
                                                </Text>
                                            </Paragraph>
                                            <Paragraph>
                                                <Space>
                                                    <BulbOutlined style={{color :'#4A5568'}} />
                                                </Space>
                                                <Text style={{color :'#4A5568'}}>（这里显示身份证号）{personalInfo.OfficialID}</Text>
                                            </Paragraph>
                                        </Typography>
                                    </Col>
                                </Row>
                            </div>
                        </Space>
                    </Col>
                    <Col span={6} />
                </Row>
            )}
        </div>
    )
}


export default PersonInfo;
