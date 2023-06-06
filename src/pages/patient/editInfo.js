import {Col, Form, Row, Typography, Image, Input, Button, message} from "antd";
import "./css/editInfo.css"
import right from '../../assets/patient.png'
import {useEffect, useState} from "react";
import {CheckCircleOutlined} from "@ant-design/icons";
import axios from "axios";


const {Title, Text} = Typography;



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

function EditInfo(props){


    const [form] = Form.useForm();

    const [data, setData] = useState([]);

    const newPhoneNumber = Form.useWatch('新电话号码', form);
    const verifyCode = Form.useWatch('验证码', form);
    const password = Form.useWatch('密码', form);
    const confirmPassword = Form.useWatch('确认密码', form);

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

    // 发送验证码按钮的倒计时
    const [countdown, setCountdown] = useState(0);

    // 每秒检查倒计时是否结束
    useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [countdown]);

    // 发送post请求到服务器以请求短信验证码
    const requireVerifyCode = async () => {
        setCountdown(60);
        const response = await axios.post('/verifycode/', {
            phoneNumber: newPhoneNumber
        },{
            headers: {
                token: localStorage.getItem('userToken')
            }
        });
        message.info('验证码已发送，请注意查收');
    }

    // 发送post请求到服务器以修改用户信息
    const saveInfo = async () => {

        let customHeaders = {
            token: localStorage.getItem('userToken')
        }

        const response = await axios.post('/patient/edit/', {
            newPhoneNumber: newPhoneNumber,
            verifyCode: verifyCode,
            password: password
        },{
            headers: customHeaders
        });
        if(response.status === 200){
            message.success('修改成功！');
        }else{
            message.error('手机验证码校验失败，请重试');
        }

    }


    return (
        <div
            style={{
                padding: '80px 200px 50px 200px',
                // height: '100vh',
                backgroundColor: 'rgb(230,235,247)',
            }}
        >
            <div
                style={{
                    padding: '40px 0px 50px 50px',
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
                            >修改个人信息</Title>
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
                    <span className={'inputLabel'} style={{marginTop: '10px'}}>新联系电话</span>
                    <Form.Item
                        name="新联系电话"
                        // label={<span className={'inputLabel'} style={{marginTop: '10px'}}>电子邮箱</span>}
                        rules={[
                            {
                                type: 'text',
                                required: true,
                            },
                        ]}
                        style={{
                            padding: '10px',
                        }}
                    >
                        <Input
                            className={'editInput'}
                            style={{'width': '78%'}}
                            autoComplete={'off'}
                            initialValue={data.newPhoneNumber}
                            placeholder={data.newPhoneNumber}

                        />
                        <Button
                            onClick={() => {
                                requireVerifyCode();
                            }}
                            disabled={countdown > 0}
                        >
                            {countdown > 0 ? `${countdown}秒后重新发送` : '获取验证码'}
                        </Button>
                    </Form.Item>
                    <span className={'inputLabel'}>验证码</span>
                    <Form.Item
                        name="验证码"
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
                            initialvalues={data.verifyCode}
                            placeholder={data.verifyCode}
                        />
                    </Form.Item>
                    <span className={'inputLabel'}>密码</span>
                    <Form.Item
                        name="密码"
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
                            initialvalues={data.password}
                            placeholder={data.password}
                        />
                    </Form.Item>
                    <span className={'inputLabel'}>确认密码</span>
                    <Form.Item
                        name="确认密码"
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
                            initialvalues={data.confirmPassword}
                            placeholder={data.confirmPassword}
                        />
                    </Form.Item>
                </Form>
                <Row
                    style={{
                        padding: '8px 0 0 0',
                    }}
                >
                    <Image src={right} preview={false} style={{width: '60%', marginTop: '-200px'}}></Image>
                    <Button
                        type={"primary"}
                        icon={<CheckCircleOutlined />}
                        size="large"
                        shape={"round"}
                        style={saveStyle}
                        onMouseEnter={handleMouseEnterSave}
                        onMouseLeave={handleMouseLeaveSave}
                        onClick={() => {
                            saveInfo();
                        }}
                    >
                        保存
                    </Button>
                </Row>
            </div>
        </div>
    )
}


export default EditInfo;
