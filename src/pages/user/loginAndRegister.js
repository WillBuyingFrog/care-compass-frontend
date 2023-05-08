import './loginAndRegister.css';
import "antd/dist/antd.min.css";
import loginImg from '../../assets/findPassword.png'
import registerImg from '../../assets/advsearch.png'
import MyHeader from '../../components/header/header';
import {
    Typography,
    Layout,
message,
    Upload,
    Col,
    Row,
    Button,
    Form, Input,
    Menu, Steps, Divider,
    Image,
} from 'antd';

import { useToast } from '@chakra-ui/react'
import { LoadingOutlined, PlusOutlined, CheckCircleOutlined, EyeInvisibleOutlined, EyeTwoTone} from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import {Link, useLocation, useNavigate} from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroll-component';
import axios from "axios";
import { clean } from 'semver';
const { Header, Content, Footer, Sider } = Layout;
const { Title, Paragraph, Text} = Typography;


async function loginUser(username, password) {
    let ret;
    let status = ""
    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);

    await axios.post('/login', formData)
        .then(res => {
            console.log(res.data);
            if(res.data.code == 200)
                message.success('登录成功')
            else
            message.error( res.data.message)
            status = res.data.message
            ret = res.data.data
        })
    return {
        type: ret.type,
        token: ret.token,
        status: status
    };
}

const registerUser  = (username, password, email, verificationCode) =>{
    let status = "ERR";

    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);
    formData.append("email", email);
    formData.append("vercode", verificationCode);

    axios.post('/register', formData)
        .then(res => {
            if(res.data.code == 200){
                message.success("注册成功，请前往登录")
                status = res.data.status
            }
            
            else
            message.error(res.data.message)
            console.log(res.data)
        })
    return status;
}


const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};

function LoginAndRegister () {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [data ,setData] = React.useState();
    const navigate = useNavigate();
    const toast = useToast();
    const [messageApi, contextHolder] = message.useMessage()

    const [email, setEmail] = useState("");
    const [hasSendCode, setHasSendCode] = useState(0);
    const [verifyCode, setVerifycode] = useState(0);
    const [countdown, setCountdown] = useState(0);
    const [wait, setWait] = useState(60);

    const [currentIsLogin, setCurrentIsLogin] = useState(true);

    // if(localStorage.getItem("userToken")) {
    //     navigate('/landing');
    // }

    const handleLogin = async e => {
        e.preventDefault();
        let data = await loginUser(username, password);
        console.log(data.token);
        console.log(data.type);
        console.log(data.status);
        if (data.token !== "" && data.status === "登录成功") {
            localStorage.setItem("userToken", data.token);
            localStorage.setItem("userType", data.type);
            localStorage.setItem("username", username);
            if(data.type == "admin"){
                setTimeout(function () {
                    navigate("/manage/uncheck");
                }, 1000);
            }
            else{
                setTimeout(function () {
                    navigate("/");
                }, 1000);
            }
            
        }else if(data.status === "登录成功") {
        } else if (data.status === "密码错误") {
        } else {
        }
    }

    async function sendVerificationEmail(email){
        let ret = 500;
        const formData = new FormData()
        formData.append("to", email)
        await axios.post('/sendEmail',formData)
        .then(res => {
            console.log(res.data)
            if(res.data.code == 200){
                ret = 200;
                message.success('发送成功')
                setCountdown(1);
                setHasSendCode(1);
                // 必须发送一次验证码
                //setInterval(() => setCountdown(0), 60000);
                // setWait(60);
                // let siv = setInterval(() => {
                //     console.log(wait)
                //     if(wait == 0)
                //     clearInterval(siv)
                //     setWait(wait-1)
                // }, 1000);
            }
            else
                message.error(res.data.message)
            
        })
        console.log(ret)
        return ret;
    }

    // async function handleSendVerifyEmail(){
    //     let siv = setInterval(() => {
    //         if(wait == 0)
    //         clearInterval(siv)
    //         setWait(wait-1)
    //     }, 1000);
    //     if (!validateEmail(email)) {
    //         toast({
    //             title: '请填写合法的邮箱',
    //             status: 'error',
    //             position:'top',
    //             duration: 9000,
    //             isClosable: true,
    //           })
    //           return -1; 
    //     }
    //     if (countdown === 0) {
    //         let result =  await sendVerificationEmail(email); 
    //         if(result == 200){
    //             // let siv = setInterval(() => {
    //             //     if(wait == 0)
    //             //     clearInterval(siv)
    //             //     setWait(wait-1)
    //             // }, 1000);
    //     }
    //     }
    // }
    async function handleSendVerifyEmail() {
        // let siv = setInterval(() => {
        //     if(wait == 0)
        //     clearInterval(siv)
        //     setWait(wait-1)
        // }, 1000);

        if (!validateEmail(email)) {
            toast({
                title: '请填写合法的邮箱',
                status: 'error',
                position:'top',
                duration: 9000,
                isClosable: true,
              })
              return -1; 
        }
        if (countdown === 0) {
            let result =  await sendVerificationEmail(email); 
            console.log(result)
            if(result == 200){
                let second = wait;
                const countDown = ()=> {
                    if( second > 0){
                        second--;
                        setWait( second );
                    }
                    if( second == 0 ){
                        second = 60;
                        setWait( second );
                        return;
                    }
                    setTimeout( countDown,1000 );
                };
                setTimeout( countDown,1000 );
        }
        }
    }

    const handleRegister = () => {
        if(username == ''){
            toast({
                title: '请输入用户名',
                status: 'error',
                position:'top',
                duration: 9000,
                isClosable: true,
              })
              return -1;
        }
        if (password.length < 8 ) {
            toast({
                title: '密码太短，请输入8-16位密码，必须包含大小写字母、数字',
                status: 'error',
                position:'top',
                duration: 9000,
                isClosable: true,
              })
              return -1; 
        }
        if (password.length < 8 || password.length > 16) {
            toast({
                title: '密码太长，请输入8-16位密码，必须包含大小写字母、数字',
                status: 'error',
                position:'top',
                duration: 9000,
                isClosable: true,
              })
              return -1; 
        }

        
        var reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/;
        if (!reg.test(password)) {
            toast({
                title: '密码需包含大小写字母、数字',
                status: 'error',
                position:'top',
                duration: 9000,
                isClosable: true,
              })
              return -1; 
        }
        if (password !== password2) {
            toast({
                title: '两次输入的密码不一致',
                status: 'error',
                position:'top',
                duration: 9000,
                isClosable: true,
              })
              return -1; 
        }
        if (email === "") {
            toast({
                title: '请填写邮箱',
                status: 'error',
                position:'top',
                duration: 9000,
                isClosable: true,
              })
              return -1; 
        }

        if (!validateEmail(email)) {
            toast({
                title: '请填写合法的邮箱',
                status: 'error',
                position:'top',
                duration: 9000,
                isClosable: true,
              })
              return -1; 
        }

        if (hasSendCode === 0) {
            toast({
                title: '请获取邮箱验证码',
                status: 'error',
                position:'top',
                duration: 9000,
                isClosable: true,
              })
            return -1;
        }
        let status = registerUser(username, password, email, verifyCode);
        setTimeout(goToLogin(), 1000)
        
    }

    // 去注册
    const goToRegister = ()=>{
        setCurrentIsLogin(false);
        console.log(currentIsLogin);

    }

    // 去登录
    const goToLogin = ()=>{
        setCurrentIsLogin(true);
        console.log(currentIsLogin);
    }

    const [linkIsHover, setLinkIsHover] = useState(false)
    const handleMouseEnterLink = () => {
        setLinkIsHover(true)
    }
    const handleMouseLeaveLink = () => {
        setLinkIsHover(false);
    }
    const linkStyle = {
        color: '#F7FAFC',
        textDecoration: linkIsHover ? 'underline' : 'none'
    }

    return (
        
        <Layout className="layout">
            <MyHeader></MyHeader>
            <Content
                className="content"
                style={{
                    background: currentIsLogin ? 'linear-gradient(90deg,#f7fafc, rgba(158, 171, 196, 0.8))' : 'linear-gradient(270deg,#f7fafc, rgba(158, 171, 196, 0.8))',
                    padding: '50px 200px 20px 200px',
                    height: '100vh',
                    transition: '0.5s',
                }}

            >
                <div
                    className="container"
                    style={{
                        padding: '24px',
                        backgroundColor: 'white',
                        boxShadow: '4px 4px 15px 0 rgba(0,0,0,0.1)',
                        borderRadius: '10px',
                        width: '650px',
                        height: '415px',
                        margin: 'auto',
                        marginTop: '80px',
                    }}
                >
                    <div
                        className="form-box"
                        style={{
                            transform: currentIsLogin ? 'translateX(0%)' : 'translateX(85%)',
                        }}
                    >
                        {/*register*/}
                        <div
                            className="register-box"
                            style={{
                                display: currentIsLogin ? 'none' : 'flex',
                                transition: '0.5s',
                            }}
                        >
                            <Title
                                level={2}
                                style={{
                                    textAlign: 'center',
                                    marginBottom: '25px',
                                    color: 'white',
                                    letterSpacing: '5px',
                                }}
                            >注册</Title>
                            <Form>
                                <Form.Item
                                    name="username"
                                >
                                    <Input
                                        className={'registerInput'}
                                        placeholder="用户名"
                                        autoComplete={'off'}
                                        onChange={e => setUsername(e.target.value)}
                                    />
                                </Form.Item>
                                <Form.Item
                                    name="password"
                                >
                                    <Input
                                        className={'registerInput'}
                                        placeholder="密码"
                                        type="password"
                                        onChange={e => setPassword((e.target.value))}
                                    />
                                </Form.Item>
                                <Form.Item
                                    name="password2"
                                >
                                    <Input
                                        placeholder="再次输入密码"
                                        className={'registerInput'}
                                        type="password"
                                        onChange={e => setPassword2((e.target.value))}
                                    />
                                </Form.Item>
                                <Form.Item
                                    name="email"
                                >
                                    <Input
                                        className={'registerInput'}
                                        autoComplete={'off'}
                                        placeholder="邮箱"
                                        type="email"
                                        onChange={e => setEmail(e.target.value)}
                                    />
                                </Form.Item>
                                <Form.Item
                                    name="verifyCode"
                                >
                                    <Input
                                        className={'registerInput'}
                                        autoComplete={'off'}
                                        placeholder="验证码"
                                        type="text"
                                        onChange={e => setVerifycode(e.target.value)}
                                        style={{
                                            width: '55%',
                                        }}
                                    />
                                    
                                    {
                                         wait == 60?(
                                            <Button
                                            shape={"round"}
                                            size="large"
                                            style={{
                                                width: '45%',
                                                margin: 'auto',
                                                textAlign: 'center',
                                                marginTop: '10px',
                                                marginBottom: '10px',
                                                letterSpacing: '0',
                                            }}
                                            onClick={handleSendVerifyEmail}>
                                                发送验证码
                                            </Button>
                                         ):(
                                            <Button
                                            shape={"round"}
                                            size="large"
                                            style={{
                                                width: '45%',
                                                margin: 'auto',
                                                textAlign: 'center',
                                                marginTop: '10px',
                                                marginBottom: '10px',
                                                letterSpacing: '0',
                                            }}
                                            disabled="true">
                                                重新发送 {wait}秒
                                            </Button>
                                         )
                                    }
                                    
                                </Form.Item>
                            </Form>
                            <Button
                                shape={"round"}
                                size="large"
                                style={{
                                    width: '40%',
                                    margin: 'auto',
                                    marginTop: '10px',
                                    marginBottom: '10px',
                                }}
                                onClick={handleRegister}
                            >注册
                            </Button>
                        </div>
                        {/*login*/}
                        <div
                            className="login-box"
                            style={{
                                display: currentIsLogin ? 'flex' : 'none',
                                transition: '0.5s',
                            }}
                        >
                            <Title
                                level={2}
                                style={{
                                    textAlign: 'center',
                                    marginBottom: '25px',
                                    color: 'white',
                                    letterSpacing: '5px',
                                }}
                            >登录</Title>
                            <Form>
                                <Form.Item
                                    name="username"
                                    // label={'用户名'}
                                >
                                    <Input
                                        className={'loginInput'}
                                        placeholder="用户名"
                                        autoComplete={'off'}
                                        onChange={e => setUsername(e.target.value)}
                                    />
                                </Form.Item>
                                <Form.Item
                                    name="password"
                                    // label={'密码'}
                                >
                                    <Input
                                        className={'loginInput'}
                                        placeholder="密码"
                                        type="password"
                                        onChange={e => setPassword(e.target.value)}
                                    />
                                </Form.Item>
                            </Form>
                            <Link
                                to="/findPassword"
                                component={Typography.Link}
                                style={linkStyle}
                                onMouseEnter={handleMouseEnterLink}
                                onMouseLeave={handleMouseLeaveLink}
                            >忘记密码？</Link>
                            <Button
                                // type={"primary"}
                                shape={"round"}
                                size="large"
                                style={{
                                    width: '40%',
                                    margin: 'auto',
                                    marginTop: '20px',
                                    marginBottom: '20px',
                                }}
                                onClick={handleLogin}
                            >登录</Button>
                        </div>
                    </div>
                    <div className="con-box left">
                        <h2>欢迎来到<span className="blueText">AceGate</span></h2>
                        <p>Your gate towards<span className="blueText"> academia</span>.</p>
                        <Image
                            style={{
                                margin: 'auto',
                                width: '70%',
                                height: '70%',
                            }}
                            src={registerImg}
                            preview={false}
                        />
                        <p>已有账号</p>
                        <Button
                            id="login"
                            shape={"round"}
                            size="large"
                            style={{
                                width: '30%',
                                margin: 'auto',
                                marginTop: '20px',
                                marginBottom: '20px',
                            }}
                            onClick={goToLogin}
                        >去登录</Button>
                    </div>
                    <div className="con-box right">
                        <h2>欢迎来到<span className="blueText">AceGate</span></h2>
                        <p>Your gate towards<span className="blueText"> academia</span>.</p>
                        <Image
                            style={{
                                margin: 'auto',
                                width: '70%',
                                height: '70%',
                            }}
                            src={loginImg}
                            // src="../../assets/images/undraw_data_input_fxv2.png"
                            preview={false}
                        />
                        <p>没有账号？</p>
                        <Button
                            id="register"
                            shape={"round"}
                            size="large"
                            style={{
                                width: '30%',
                                margin: 'auto',
                                marginTop: '20px',
                                marginBottom: '20px',
                            }}
                            onClick={goToRegister}
                        >去注册</Button>
                    </div>
                </div>
            </Content>
        </Layout>
    );
}
export default LoginAndRegister;
