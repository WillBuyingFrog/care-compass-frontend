import {Button, Col, message, Modal, Row, Table, Typography, Layout} from "antd";
import {useEffect, useState} from "react";
import axios from "axios";
import './personInfo.css'
import {useNavigate} from "react-router-dom";


const {Title, Text} = Typography;
const { Header, Content, Footer, Sider } = Layout;


function processRawAppointments(rawAppointments){
    let processedAppointments = [];
    for (let i = 0; i < rawAppointments.length; i++) {
        let appointment = rawAppointments[i];
        let processedAppointment = {
            key: appointment.id,
            id: appointment.id,
            commitTime: appointment.commitTime,
            billID: appointment.billID,
            price: appointment.price,
            departmentID: appointment.departmentID,
            departmentName: appointment.departmentName,
            doctorID: appointment.doctorID,
            doctorName: appointment.doctorName,
            appointmentTime: appointment.appointDate + (appointment.appointTime === 0 ? "  上午" : "  下午"),
            appointmentOrder: appointment.appointOrder,
            isPaid: appointment.isPaid
        }
        processedAppointments.push(processedAppointment);
    }
    return processedAppointments;
}


function MyAppointments() {

    const [rawAppointments, setRawAppointments] = useState([]);
    const [appointments, setAppointments] = useState([]);

    const navigate = useNavigate();

    let customHeaders = {
        token: localStorage.getItem('userToken')
    }
    const getRawAppointments = async () => {
        const res = await axios.post('/patient/appointment/list/',{},{
            headers: customHeaders
        });
        setRawAppointments(res.data.content);
        setAppointments(processRawAppointments(res.data.content));
    }

    const [cancelingAppointment, setCancelingAppointment] = useState(-1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        const cancelAppointment = async () => {
            const res = await axios.post('/patient/appointment/cancel/', {
                id: cancelingAppointment.id
            }, {
                headers: customHeaders
            });
            if(res.status === 200){
                message.success("取消预约成功！");
                setIsModalOpen(false);
                let allCurrentAppointments = [...appointments];
                let processedAppointments = [];
                for(let i = 0; i < allCurrentAppointments.length; i++){
                    if(allCurrentAppointments[i].key !== cancelingAppointment.key){
                        processedAppointments.push(allCurrentAppointments[i]);
                    }
                }
                setAppointments(processedAppointments);
            }
        }
        cancelAppointment();
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };


    useEffect(() => {
        getRawAppointments();
    }, []);



    const columns = [
        {
            title: '预约编号',
            dataIndex: 'id',
            key: 'id',
            render: (text) => <Text>#{text}</Text>
        },
        {
            title: '挂号发起时间',
            dataIndex: 'commitTime',
            key: 'commitTime',
            render: (text) => <Text>{text.split('T')[0]} {text.split('T')[1].split('.')[0]}</Text>
        },
        {
            title: '挂号价格',
            dataIndex: 'price',
            key: 'price',
            render: (text) => {
                return (
                    <Text type="warning" strong>¥{text}</Text>
                )
            }
        },
        {
            title: '预约科室',
            dataIndex: 'departmentName',
            key: 'departmentName',
            render: (text) => <Text>{text}</Text>
        },
        {
            title: '预约医生',
            dataIndex: 'doctorName',
            key: 'doctorName',
            render: (text) => <Text>{text}</Text>
        },
        {
            title: '预约时间',
            dataIndex: 'appointmentTime',
            key: 'appointmentTime',
            render: (text) => <Text>{text}</Text>
        },
        {
            title: '预约序号',
            dataIndex: 'appointmentOrder',
            key: 'appointmentOrder',
            render: (text) => {
                if(text === -1){
                    return (
                        <Text>---</Text>
                    )
                }
                return (
                    // 加粗文字
                    <Text strong>No.{text}</Text>
                )
            }
        },
        {
            title: '支付状态',
            dataIndex: 'isPaid',
            key: 'isPaid',
            render: (_, record) => {
                if (record.appointmentOrder === -1) {
                    return <Text style={{'color': 'grey'}}>未支付</Text>
                }else{
                    return <Text type="success">已支付</Text>
                }
            }
        },
        {
            title: '操作',
            key: 'action',
            render: (_, record) => {
                if(record.appointmentOrder !== -1) {
                    let appointDate = new Date(record.appointmentTime.split(' ')[0])
                    let today= new Date();
                    // 如果预约时间在今天及以前，就不能取消挂号
                    if(appointDate.getTime() <= today.getTime()){
                        return (
                            <Button
                                disabled
                            >取消挂号</Button>
                        )
                    }
                    // 显示可用的取消挂号按钮
                    return (
                        <Button
                            onClick={() => {
                                setCancelingAppointment(record);
                                showModal();
                            }}

                        >取消挂号</Button>
                    )
                } else {
                    return (
                        <Button
                            onClick={() => {
                                navigate('/patient/payBill/' + record.billID.toString())
                            }}
                        >前往支付</Button>
                    )
                }
            }
        }
    ]


    return (
        <Content
            style={{
                padding: '50px 100px 20px 100px',
                backgroundColor: 'rgb(220,225,242)',
            }}
        >
            <div
                style={{
                    marginBottom: '30px',
                    padding: '24px',
                    backgroundColor: 'white',
                    height: '300px',
                    boxShadow: '4px 4px 15px 0 rgba(0,0,0,0.1)',
                    borderRadius: '20px',
                    minHeight: '80vh',
                }}
            >
            <Row>
                <Col span={1} />
                <Col span={22}>
                    <Title level={1}>
                        我的挂号
                    </Title>
                    <Table columns={columns} dataSource={appointments} className='plist' pagination={{pageSize: 6}}/>
                </Col>
                <Col span={1} />
            </Row>
            <Modal title="确认取消挂号" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <Text>您确定要取消 #{cancelingAppointment.id} 挂号吗？</Text>
            </Modal>
            </div>
        </Content>
    )
}


export default MyAppointments;
