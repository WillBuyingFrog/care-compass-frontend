import {Button, Col, Row, Space, Table, Typography} from "antd";
import {useEffect, useState} from "react";
import {useNavigate, useOutletContext} from "react-router-dom";
import axios from "axios";
import {Center, Box} from "@chakra-ui/react";
import './personInfo.css'

const {Title, Text} = Typography;


function processPartRawBills(partRawBills, billType) {
    // 按照下面columns里面的key的顺序处理
    let processedBills = [];
    for (let i = 0; i < partRawBills.length; i++) {
        let bill = partRawBills[i];
        let processedBill = {
            key: bill.id,
            id: bill.id,
            createTime: bill.createTime,
            payTime: bill.payTime,
            billType: billType,
            relatedID: -1,
            medicalRecordID: bill.medicalRecordID,
            price: bill.price,
            status: -1,
        }
        if (processedBill.payTime !== null) {
            // 有时间记录，说明已经支付
            processedBill.status = 1;
        } else {
            // 没有时间记录，说明未支付
            processedBill.status = 0;
        }
        switch(billType) {
            case 'Appointment':
                processedBill.relatedID = bill.appointmentID;
                break;
            case 'Prescription':
                processedBill.relatedID = bill.prescriptionID;
                break;
            case 'Inspection':
                processedBill.relatedID = bill.inspectionID;
                break;
            default:
                break;
        }
        processedBills.push(processedBill);
    }
    return processedBills;
}

function MyBills(props){

    // 患者个人所有账单的state，是服务器直接传回，未经过处理的版本
    const [rawBills, setRawBills] = useState([]);
    // 患者个人所有账单，经过处理可以直接展示的版本
    const [bills, setBills] = useState([]);

    // 使用useOutletContext获取患者ID
    const [patientID, setPatientID] = useOutletContext();

    // 使用axios的post请求获取所有账单
    // 不需要参数，因为已经使用了token
    useEffect( () => {

        let customHeaders = {
            token: localStorage.getItem('userToken')
        }

        const getBills = async () => {
            const billResponse = await axios.post('/patient/bill/get/', {
                UserID: patientID
            }, {
                headers: customHeaders
            });
            setRawBills(billResponse.data);
            // 存储处理后的不同类型账单记录的临时变量
            let temp = [];
            // 处理Appointment
            temp = temp.concat(processPartRawBills(billResponse.data.Appointment, 'Appointment'));
            // 处理Inspection
            temp = temp.concat(processPartRawBills(billResponse.data.Inspection, 'Inspection'));
            // 处理Prescription
            temp = temp.concat(processPartRawBills(billResponse.data.Prescription, 'Prescription'));
            setBills(temp);
        }
        getBills();
    }, []);

    const navigate = useNavigate();

    const columns = [
        {
            title: '缴费编号',
            dataIndex: 'id',
            key: 'id',
            render: (text) => <Text>#{text}</Text>
        },
        {
            title: '发起时间',
            dataIndex: 'createTime',
            key: 'createTime',
        },
        {
            title: '费用类型',
            dataIndex: 'billType',
            key: 'billType',
            render: (text) => {
                if(text === 'Appointment'){
                    return <Text>挂号</Text>
                }
                else if(text === 'Prescription'){
                    return <Text>处方</Text>
                }
                else if(text === 'Inspection'){
                    return <Text>检查</Text>
                }else {
                    return <Text>未知</Text>
                }
            }
        },
        {
            title: '缴费金额',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: '缴费状态',
            dataIndex: 'status',
            key: 'status',
            render: (text) => {
                if (text === 0) {
                    return <Text>未缴费</Text>
                }else{
                    return <Text>已缴费</Text>
                }
            }
        },
        {
            title: '缴费时间',
            dataIndex: 'payTime',
            key: 'payTime',
            render: (text) => {
                if (typeof text === 'string' && text.trim().length > 0) {
                    return <Text>{text}</Text>
                }else{
                    return <Text>---</Text>
                }
            }
        },
        {
            title: '操作',
            key: 'action',
            render: (_, record) => {
                if (record.status === 0) {
                    return (
                        <Button type='primary' onClick={() => {
                            navigate('/patient/payBill/' + record.id.toString());
                        }}>缴费</Button>
                    )
                }else{
                    return (
                        <Button type='primary' disabled>已缴费</Button>
                    )
                }
            }
        }
    ]



    return (
        <div
            style={{
                height: 500,
                overflow: 'auto',
                padding: '0',
                border: 'none',
            }}
            css={{
                '&::-webkit-scrollbar': {
                    width: '4px',
                },
                '&::-webkit-scrollbar-track': {
                    width: '6px',
                },
                '&::-webkit-scrollbar-thumb': {
                    background: '#cccccc',
                    borderRadius: '24px',
                },
            }}
        >
            <Box
                id="scrollableDataList"
                style={{
                    height: 450,
                    overflow: 'auto',
                    padding: '0 25px',
                    border: 'none',
                }}
                css={{
                    '&::-webkit-scrollbar': {
                        width: '4px',
                    },
                    '&::-webkit-scrollbar-track': {
                        width: '6px',
                    },
                    '&::-webkit-scrollbar-thumb': {
                        background: '#cccccc',
                        borderRadius: '24px',
                    },
                }}
            >

            <Table columns={columns} dataSource={bills}
                   pagination={{pageSize: 8}}
                   className='plist'
            />
            </Box>
        </div>

    )
}

export default MyBills;
