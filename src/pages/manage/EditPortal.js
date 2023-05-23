import "antd/dist/antd.min.css";
import "./editPortal.css"
import right from '../../assets/doctors.png';
import left from '../../assets/doctors.png';
import {
    Typography,
    Layout,
    message,
    Upload,
    Col,
    Row,
    Button,
    Form, Input,
    Menu,
    Image
} from 'antd';
import MyHeader from '../../components/header/header'
import { LoadingOutlined, PlusOutlined, CheckCircleOutlined} from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import {Link, useLocation} from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroll-component';
import axios from "axios";
const { Header, Content, Footer, Sider } = Layout;
const { Title, Paragraph, Text} = Typography;

// tabs callback
const onChange = (key) => {
    console.log(key);
};

const layout = {
    labelCol: {
        span: 6,
    },
    wrapperCol: {
        span: 16,
    },
};

const validateMessages = {
    required: '${label}为必填项',
    types: {
        email: '请输入有效的${label}!',
        number: '${label} is not a valid number!',
    },
    number: {
        range: '${label} must be between ${min} and ${max}',
    },
};

function EditPortal() {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);

    let location = useLocation()
    let params = new URLSearchParams(location.search)
    let RID = params.get('RID')

    const getData = ()=>{
        axios({
            method: "post",
            url: "/editPortal",
            data: {
                RID: RID,
            },
            headers: {
                token: localStorage.getItem("userToken")
            }
        })
        .then(res => {
            setData(res.data.data)
            console.log(res.data.data)
        })
    }

    const [form] = Form.useForm();
    const Rcontact = Form.useWatch('电子邮箱', form);
    const Rconcepts = Form.useWatch('研究领域', form);
    const RpersonalPage = Form.useWatch('个人主页', form);
    const Rgateinfo = Form.useWatch('个人信息', form);


    const pushData = ()=>{
        axios({
            method: "post",
            url: "/editPortal2",
            data: {
                RID: RID,
                Ravatar: "",
                Rcontact: Rcontact,
                Rconcepts: Rconcepts,
                RpersonalPage: RpersonalPage,
                Rgateinfo: Rgateinfo,
            },
            headers: {
                token: localStorage.getItem("userToken")
            }
        })
            .then(res => {
                    console.log(res.data)
                }
            )
    }

    useEffect(() => {
        getData();
    }, [])

    const onFinish = (values) => {
        console.log(values);
    };

    // save button hover style
    const [saveIsHover, setSaveIsHover] = useState(false)
    const handleMouseEnterSave = () => {
        setSaveIsHover(true)
    }
    const handleMouseLeaveSave = () => {
        setSaveIsHover(false);
    }
    const saveStyle = {
        backgroundColor: saveIsHover ? '#5bc28b' : '#50af78',
        border: 'none',
        boxShadow: '4px 4px 15px 0 rgba(0,0,0,0.2)',
    }

    return (
        <Layout className="layout">
            <MyHeader></MyHeader>
            <Content
                style={{
                    padding: '80px 200px 50px 200px',
                    // height: '100vh',
                    backgroundColor: 'rgb(230,235,247)',
                }}
            >
                <div
                    style={{
                        padding: '40px 0px 50px 50px',
                        Height: '200px',
                        background: 'linear-gradient(180deg,rgba(255,255,255,1.0), rgba(255,255,255,0.4))',
                        boxShadow: '4px 4px 15px 0 rgba(0,0,0,0.1)',
                        borderRadius: '20px',
                    }}
                >
                    <Row>
                        <Col span={4}></Col>
                        <Col span={10}>
                            <Typography>
                                <Title
                                    style={{
                                        fontSize: '50px',
                                        textShadow: '4px 4px 6px rgba(0,0,0,0.2)',
                                        marginLeft: '20px',
                                        marginTop: '40px'

                                    }}
                                >{data.rname}</Title>
                            </Typography>
                        </Col>
                        <Col span={10}>
                            <Image src={right} preview={false} style={{
                                width: '60%',
                            }}></Image>
                        </Col>
                    </Row>
                    <Form
                        {...layout}
                        form={form}
                        onFinish={onFinish}
                        validateMessages={validateMessages}
                        style={{
                            padding: '20px 50px 0 20vw',
                            margin: 'auto',
                        }}
                    >
                        <span className={'inputLabel'} style={{marginTop: '10px'}}>电子邮箱</span>
                        <Form.Item
                            name="电子邮箱"
                            // label={<span className={'inputLabel'} style={{marginTop: '10px'}}>电子邮箱</span>}
                            rules={[
                                {
                                    type: 'email',
                                    required: true,
                                },
                            ]}
                            style={{
                                padding: '10px',
                            }}
                        >
                            <Input
                                className={'editInput'}
                                autoComplete={'off'}
                                initialValue={data.rcontact}
                                placeholder={data.rcontact}

                            />
                        </Form.Item>
                        <span className={'inputLabel'}>研究领域</span>
                        <Form.Item
                            name="研究领域"
                            // label={<span className={'inputLabel'}>研究领域</span>}
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                            style={{
                                padding: '10px',
                            }}
                        >
                            <Input
                                className={'editInput'}
                                autoComplete={'off'}
                                initialvalues={data.rcustomconcepts}
                                placeholder={data.rcustomconcepts}
                            />
                        </Form.Item>
                        <span className={'inputLabel'}>个人主页</span>
                        <Form.Item
                            name="个人主页"
                            // label={<span className={'inputLabel'}>个人主页</span>}
                            style={{
                                padding: '10px',
                            }}
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input
                                className={'editInput'}
                                autoComplete={'off'}
                                initialvalues={data.rpersonalpage}
                                placeholder={data.rpersonalPage}
                            />

                        </Form.Item>
                        <span className={'inputLabel'}>个人简介</span>
                        <Form.Item
                            name="个人简介"
                            // label={<span className={'inputLabel'}>个人简介</span>}
                            style={{
                                padding: '10px',
                            }}
                        >
                            <Input.TextArea
                                className={'editInput'}
                                autoComplete={'off'}
                                initialvalues={data.rgateinfo}
                                placeholder={data.rgateinfo}
                            />
                        </Form.Item>
                    </Form>
                    <Row
                        style={{
                            padding: '8px 0 0 0',
                        }}
                    >
                        <Image src={left} preview={false} style={{width: '60%', marginTop: '-200px'}}></Image>
                        <Link
                            to={{
                                pathname: '/scholarPortal',
                                search: '?RID=' + RID,
                            }}
                            style={{
                                margin: "auto",
                            }}
                        >
                            <Button
                                type={"primary"}
                                icon={<CheckCircleOutlined />}
                                size="large"
                                shape={"round"}
                                style={saveStyle}
                                onMouseEnter={handleMouseEnterSave}
                                onMouseLeave={handleMouseLeaveSave}
                                onClick={pushData}
                            >
                                保存
                            </Button>
                        </Link>
                    </Row>
                </div>
            </Content>
        </Layout>
    );
}
export default EditPortal;
