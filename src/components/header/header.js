import {Box, Button, Input, Link, Text, InputGroup, InputLeftElement,Image, space} from '@chakra-ui/react'
import './header.css'
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverFooter,
    PopoverArrow,
    PopoverCloseButton,
    PopoverAnchor,
} from '@chakra-ui/react'
import {
    Drawer
} from 'antd'
import { message, Popconfirm ,Tooltip} from 'antd';

import {Link as RouterLink} from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Avatar, AvatarBadge, AvatarGroup } from '@chakra-ui/react'
import {Row,Col} from 'antd'
import * as React from "react";
import axios from "axios";
import { useLocation, useNavigate } from 'react-router-dom';


function MyHeader({textColor, isLanding=false}){
    const navigate = useNavigate();
    const [user, SetUser]=React.useState({username:''});
    const [open, setOpen] = React.useState(false);
    const [isLoggedIn, setIsLoggedIn]=React.useState(0);
    const [status, setStatus]=React.useState(0);
    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };
    React.useEffect(() => {
        console.log(localStorage.getItem("userToken"))
        console.log(localStorage)
        if (localStorage.getItem("userToken") != null) {
            // 已经登录
            console.log(localStorage.getItem('userToken'))
            console.log(localStorage)
            setIsLoggedIn(1)

            var nowuser = {
                username:localStorage.getItem("username"),
                u_rid:localStorage.getItem('userID'),
                utype:localStorage.getItem('userType')

            }
            SetUser(nowuser)
            // var config = {
            //     method: 'post',
            //     url: '/personInfo/',
            //     headers: {
            //         token: localStorage.getItem("userToken")
            //     }
            // };

            // axios(config)
            //     .then(res => {
            //         console.log(res)
            //         console.log('res')

            //         SetUser(res.data.data)
            //         console.log('setuser')
            //         console.log(res.data.data);
            //     })
            //     .catch(function (error) {
            //         console.log(error);
            //     });
        }

    }, [])

    const [input,setInput] = React.useState()

    const sections = ['工具箱']

    //转换医生返还的res格式，契合本页面
    const changgeDate = (temdate)=>{
        let backdate =null
        backdate.uname = temdate.username
        backdate.u_rid = temdate.userID
        backdate.utype = temdate.type
        console.log(backdate)
        return backdate
    }
    const confirm = (e) => {
        setIsLoggedIn(0);
        localStorage.removeItem("userToken")
        localStorage.removeItem("userType")
        localStorage.removeItem("username")
        // localStorage.setItem("userToken", null);
        // localStorage.setItem("userType", null);
        // localStorage.setItem("username", null);
        message.success('退出成功');
        setTimeout(function () {
            navigate("/");
        }, 1000);
    };


    let userButton;
    console.log(typeof(user.utype))
    if(isLoggedIn && user.utype == "2"){
        userButton = (
            <div>
            <Row>
                <Button w='220px' mt='8px' onClick={()=>{
                    // navigate('/doctorPortal',{state:{doctorID:localStorage.getItem('doctorID')}})
                    window.open(`/doctorPortal/${localStorage.getItem('doctorID')}`, '_blank');
                }}
                >我的门户</Button>
            </Row>
            <Row>
                <Button w='220px' mt='8px' onClick={()=>{
                    navigate('/doctorMain/patientAppointment');
                }}
                >开始诊疗</Button>
            </Row>
            </div>

        )
    }else if(isLoggedIn && user.utype == "0"){
        userButton = (
            <div>
                <Row>
                    <Button w='220px' mt='8px' onClick={()=>{
                        navigate('/manage/doctorSchedule')
                        }}
                    >医院管理</Button>
                </Row>
            </div>

        )
    }


    // 只有white和black两种选项
    // if (textColor.localeCompare("white") !== 0){
    //     textColor = "black"
    // }

    return (
        <Box
            w='100%'
            h='9.5vh'
            bg='#1A365D'
        >
            <Row>
                <Col span='17'>
                    <img
                        src={require("../../assets/cc_icon_header2.png")}
                        style={{height:55, marginTop:9, marginLeft:40}}
                        onClick={() => {
                            navigate("/")
                        }}
                    />
                </Col>
                <Col span='5' style={{margin:'auto'}} >
                    {isLoggedIn ?
                        <Popover >
                            <PopoverTrigger>
                                <Row style={{marginLeft:'60px'}}>
                                    <Col>
                                        <Text mt='6px' color='white' size='2xl' fontWeight='550'>👏Hey , {user.username}</Text>
                                    </Col>
                                    <Col>
                                        <Avatar width='35px' ml='8px' height='35px' name={user.username}></Avatar>
                                    </Col>
                                </Row >
                            </PopoverTrigger>
                            <PopoverContent w='240px' border='blue' >
                                <PopoverBody>
                                    <Row>
                                        {userButton}
                                    </Row>
                                    <Row>

                                        <Popconfirm
                                            placement="bottom"
                                            title="确认退出登录？"
                                            onConfirm={confirm}
                                            okText="确认"
                                            cancelText="取消"
                                        >
                                            <Button w='220px' mt='8px'>退出登录</Button>
                                        </Popconfirm>

                                    </Row>
                                </PopoverBody>
                            </PopoverContent>
                        </Popover>

                        :
                        <Button w='150px' mt='8px' onClick={()=>{
                            navigate('/loginAndRegister')
                        }} id='loginButton'
                        >登录/注册</Button>
                    }
                </Col>

            </Row>

        </Box>
    )
}

export default MyHeader;
