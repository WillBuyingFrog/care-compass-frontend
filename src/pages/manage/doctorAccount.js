import './doctorAccount.css';
import './manage.css';
import { Avatar } from '@chakra-ui/react'
import {Card, Row, Col, Badge, Calendar, ConfigProvider, Divider, Steps, Typography, Button, Alert, Drawer, Space, Form, Input, Popconfirm, Table, Modal, Radio, Select, InputNumber} from 'antd';
import * as echarts from 'echarts'
import React, { useEffect, useRef, useState, useContext } from 'react';
import {Link, useLocation, useNavigate} from 'react-router-dom'
import axios from 'axios';
import moment from 'moment';
import {
    TeamOutlined,
    RiseOutlined,
    BookOutlined,
    HomeOutlined,
    PieChartOutlined,
    VerifiedOutlined,
    StockOutlined,
    CheckCircleOutlined,
    CheckCircleFilled,
    PlusOutlined
} from '@ant-design/icons'
const { Title, Paragraph, Text } = Typography;
const { Meta } = Card;

ConfigProvider.config({
    theme: {
        primaryColor: '#2C5282',
        successColor: '#50af78',
    },
});

// 科室列表
const gridStyle = {
    width: '25%',
    textAlign: 'center',
};

function DoctorAccount(){

    const navigate = useNavigate()
    const [departmentID, setDepartmentID] = useState();
    const [departmentName, setDepartmentName] = useState();
    const [departmentList, setDepartmentList] = useState();
    const [current, setCurrent] = useState(0);
    const [doctors, setDoctors] = useState();
    const [theDoctor, setTheDoctor] = useState();
    const [showModal, setShowModal] = useState(false);
    const next = () => {
        setCurrent(current + 1);
    };
    const prev = () => {
        setCurrent(current - 1);
    };
    const getDoctors = (dID) => {
        axios({
            method: "post",
            url: "/admin/getOneDepartmentDoc/",
            data: {
                departmentID: dID,
            },
            // headers: {
            //     token: localStorage.getItem("userToken")
            // }
        })
            .then(res => {
                console.log(res.data);
                setDoctors(res.data.data.doctorList);
                console.log(doctors);
            })
    }

    const getDoctor = (doctorID) => {
        axios({
            method: "post",
            url: "/admin/getOneDoctor/",
            data: {
                doctorID: doctorID,
            },
            // headers: {
            //     token: localStorage.getItem("userToken")
            // }
        })
            .then(res => {
                // console.log('i am here')
                console.log(res.data);
                setTheDoctor(res.data.data);
                navigate('/doctorPortal',{state:{doctorID:res.data.data.doctorID}})
                console.log(theDoctor);
            })
    }

    const chooseDepartmentFinish = (dID, dName) => {
        setDepartmentID(dID);
        setDepartmentName(dName);
        getDoctors(dID);
        // console.log(departmentID);
        // console.log(departmentName);
        next();
    }
    const chooseDoctorFinish = (doctorID) => {
        getDoctor(doctorID);
    }

    const returnToChooseDepartment = () => {
        setDepartmentID(undefined);
        setDepartmentName(undefined);
        prev();
    }

    const finished1 = () => {
        next()
    }

    const finished = () => {
        setCurrent(0);
    }
    const getDepartments = () => {
        axios({
            method: "post",
            url: "/admin/getAllDepartment/",
            data: {
            },
            // headers: {
            //     token: localStorage.getItem("userToken")
            // }
        })
            .then(res => {
                // console.log(res)
                setDepartmentList(res.data.data.departmentList);
                // console.log(res.data.data);
                // console.log(res.data.data.departmentList);
                // console.log(departmentList);
            })
    }
    useEffect(() => {
        getDepartments();
    }, [])


    const [form] = Form.useForm();
    const addUsername = Form.useWatch('username', form);
    const addOfficialID = Form.useWatch('officialID', form);
    const addWorkID = Form.useWatch('workID', form);
    const addSex = Form.useWatch('sex', form);
    const addPhone = Form.useWatch('phone', form);
    const addDepartmentID = Form.useWatch('departmentID', form);
    const addTitle = Form.useWatch('title', form);
    const addArea = Form.useWatch('area', form);
    const addIntro = Form.useWatch('intro', form);
    const addPrice = Form.useWatch('price', form);

    // const[addUsername, setAddUsername] = useState();
    // const [addOfficialID, setAddOfficialID] = useState();
    // const [addWorkID, setAddWorkID] = useState();
    // const [addSex, setAddSex] = useState();
    // const [addPhone, setAddPhone] = useState();
    // const [addDepartmentID, setAddDepartmentID] = useState();
    // const [addTitle, setAddTitle] = useState();
    // const [addArea, setAddArea] = useState();
    // const [addIntro, setAddIntro] = useState();
    // const [addPrice, setAddPrice] = useState();

    const handleAdd = () => {
        // const newData = {
        //     username: AddUsername,
        //     officialID: AddOfficialID,
        //     workID: AddWorkID,
        //     sex: AddSex,
        //     phone: AddPhone,
        //     departmentID: AddDepartmentID,
        //     title: AddTitle,
        //     area: AddArea,
        //     intro: AddIntro,
        //     price: AddPrice,
        // };
        // const formData = new FormData();
        // formData.append('username', addUsername);
        // formData.append('officialID', addOfficialID);
        // formData.append('workID', addWorkID);
        // formData.append('sex', addSex);
        // formData.append('phone', addPhone);
        // formData.append('departmentID', addDepartmentID);
        // formData.append('title', addTitle);
        // formData.append('area', addArea);
        // formData.append('intro', addIntro);
        // formData.append('price', addPrice);
        console.log(addUsername);
        axios({
            method: 'post',
            url: "/register/doctor/",
            data: {
                workID: addWorkID,
                sex: addSex,
                username: addUsername,
                officialID: addOfficialID,
                phone: addPhone,
                departmentID: departmentID,
                title: addTitle,
                area: addArea,
                intro: addIntro,
                price: addPrice,
            }
        })
        // axios.post('/register/doctor/', formData)
            .then(res => {
                console.log(res);
                console.log(res.data);
                // setTheDoctor(res.data.data);
                // console.log(theDoctor);
                getDoctors(departmentID);
            })

        // setDoctors([...doctors, newData]);
        // console.log(doctors);
        setShowModal(false);
        getDoctors(departmentID);
    };
    const handleClickAdd = () => {
        setShowModal(true);
    }

    const handleCancel = () => {
        setShowModal(false);
    }
    const validateMessages = {
        required: '${label}是必填项!',
    };

    const steps = [
        {
            title: '选择科室',
            status: 'finish',
            icon:
                <HomeOutlined />,
            content: (
                <div>
                    {departmentList !== undefined &&
                        <Card title="科室列表">
                            {departmentList.map((item) => (
                                <Card.Grid style={gridStyle} onClick={()=>chooseDepartmentFinish(item.departmentID, item.departmentName)}>{item.departmentName}</Card.Grid>
                            ))}
                        </Card>
                    }
                </div>
            ),
        },
        {
            title: '管理医生账号',
            status: 'finish',
            icon: <PieChartOutlined />,
            content: (
                <div>
                    {doctors !== undefined &&
                        <><Card title={departmentName+'医生列表'}>
                            {doctors.map((item) => (
                                <Card.Grid style={gridStyle} onClick={()=>chooseDoctorFinish(item.doctorID)}>{item.doctorName}</Card.Grid>
                            ))}
                            <Card.Grid style={gridStyle} onClick={()=>handleClickAdd()}><PlusOutlined /></Card.Grid>
                        </Card>
                        <Modal
                            title="添加医生账号"
                            open={showModal}
                            // onOk={handleAdd}
                            onCancel={handleCancel}
                            footer={null}
                        >
                            <Form
                                form={form}
                                initialValues={{}}
                                labelCol={{
                                    span: 4,
                                }}
                                wrapperCol={{
                                    span: 14,
                                }}
                                layout="horizontal"
                                validateMessages={validateMessages}
                            >
                                <Form.Item
                                    name='username'
                                    label="姓名"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item label="身份证号" name="officialID" rules={[
                                    {
                                        required: true,
                                    },
                                ]}>
                                    <Input />
                                </Form.Item>
                                <Form.Item label="工号" name="workID" rules={[
                                    {
                                        required: true,
                                    },
                                ]}>
                                    <Input />
                                </Form.Item>
                                <Form.Item label="性别" name="sex" rules={[
                                    {
                                        required: true,
                                    },
                                ]}>
                                    <Select >
                                        <Select.Option value='0'>男</Select.Option>
                                        <Select.Option value='1'>女</Select.Option>
                                        <Select.Option value='2'>其他</Select.Option>
                                    </Select>
                                </Form.Item>
                                <Form.Item label="联系方式" name="phone" rules={[
                                    {
                                        required: true,
                                    },
                                ]}>
                                    <Input />
                                </Form.Item>
                                {/*<Form.Item label="科室" name="departmentID">*/}
                                {/*    <Select >*/}
                                {/*        {departmentList.map((item) => (*/}
                                {/*            <Select.Option value={`${item.departmentID}`}>{item.departmentName}</Select.Option>*/}
                                {/*        ))}*/}
                                {/*    </Select>*/}
                                {/*</Form.Item>*/}
                                <Form.Item label="职称" name="title" rules={[
                                    {
                                        required: true,
                                    },
                                ]}>
                                    <Input />
                                </Form.Item>
                                <Form.Item label="专业领域" name="area" rules={[
                                    {
                                        required: true,
                                    },
                                ]}>
                                    <Input />
                                </Form.Item>
                                <Form.Item label="挂号费" name="price" rules={[
                                    {
                                        required: true,
                                    },
                                ]}>
                                    <Input />
                                </Form.Item>
                                <Form.Item label="介绍" name='intro' rules={[
                                    {
                                        required: true,
                                    },
                                ]}>
                                    <Input.TextArea />
                                </Form.Item>
                                <Form.Item label="">
                                    <Row>
                                        <Col span={10}></Col>
                                        <Col span={7}>
                                            <Button onClick={handleCancel}>
                                                取消
                                            </Button>
                                        </Col>
                                        <Col span={7}>
                                            <Button type="primary" htmlType="submit" onClick={handleAdd}>
                                                提交
                                            </Button>
                                        </Col>
                                    </Row>
                                </Form.Item>
                            </Form>
                        </Modal>
                        </>
                    }
                </div>
            ),
        },
        {
            title: '完成',
            status: 'wait',
            icon: <CheckCircleOutlined />,
            content: (
                <div>
                    <Row>
                        <CheckCircleFilled
                            style={{
                                fontSize: '100px',
                                color: '#50af78',
                                margin: "auto",
                                marginTop: '30px',
                            }}
                        />
                    </Row>
                    <Row>
                        <Text
                            className={'applyLabel'}
                            style={{
                                fontSize: '24px',
                                margin: "auto",
                                padding: '20px',
                            }}
                        >
                            信息已提交！
                        </Text>
                    </Row>
                </div>
            ),
        },
    ];
    const items = steps.map((item) => ({
        key: item.title,
        title: item.title,
        icon: item.icon,
        content: item.content,
    }));

    return(
        <div className='manageCard'>
            <Steps
                size={"small"}
                current={current}
                items={items}
                style={{
                    padding: 0,
                }}
            />
            <Divider dashed style={{marginTop: '1vh'}}/>
            {/*{steps[current].content !== undefined &&*/}
            <div
                className="steps-content"
                style={{
                    padding: 0,
                }}
            >
                {steps[current].content}
            </div>
            {/*}*/}
            <div className="steps-action">
                {current === 0 && (
                    <Row>
                        {/*<Button*/}
                        {/*    type="primary"*/}
                        {/*    onClick={chooseDepartmentFinish}*/}
                        {/*    shape={"round"}*/}
                        {/*    size="large"*/}
                        {/*    style={{*/}
                        {/*        margin: 'auto',*/}
                        {/*        // backgroundColor: '#3a3af1',*/}
                        {/*        border: 'none',*/}
                        {/*        boxShadow: '4px 4px 15px 0 rgba(0,0,0,0.1)',*/}
                        {/*        marginTop: '20px',*/}
                        {/*        marginBottom: '20px',*/}
                        {/*    }}*/}
                        {/*>*/}
                        {/*    下一步*/}
                        {/*</Button>*/}
                    </Row>

                )}
                {current === 1 && (
                    <Row>
                        <Col span={16}></Col>
                        <Col span={8}>
                            <Button
                                shape={"round"}
                                size="large"
                                style={{
                                    margin: '0 10px',
                                    marginBottom: '20px',
                                }}
                                onClick={() => returnToChooseDepartment()}
                            >
                                返回
                            </Button>
                            <Button
                                type="primary"
                                onClick={finished1}
                                shape={"round"}
                                size="large"
                                style={{
                                    border: 'none',
                                    marginBottom: '20px',
                                    textWeight: 'bold',
                                }}
                            >
                                确定
                            </Button>
                        </Col>
                    </Row>
                )}
                {current ===2 && (
                    <>
                        <Row>
                            {/*<Link*/}
                            {/*    to={{*/}
                            {/*        pathname: '/manage/doctorSchedule',*/}
                            {/*    }}*/}
                            {/*    style={{*/}
                            {/*        margin: 'auto',*/}
                            {/*    }}*/}
                            {/*>*/}
                            <Button
                                type="primary"
                                // onClick={() => message.success('即将返回首页!')}
                                shape={"round"}
                                size="large"
                                style={{
                                    border: 'none',
                                    margin: 'auto',
                                    marginBottom: '20px',
                                }}
                                onClick={finished}
                            >
                                返回
                            </Button>
                            {/*</Link>*/}
                        </Row>
                    </>)}
            </div>

        </div>
    )
}

export default DoctorAccount;
