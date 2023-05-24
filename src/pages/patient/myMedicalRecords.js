import {useEffect, useState} from "react";
import axios from "axios";
import {Button, Col, Row, Space, Table, Typography} from "antd";
import {Center} from "@chakra-ui/react";
import {useNavigate} from "react-router-dom";

const {Title, Text} = Typography;

function parseRawMedicalRecords(rawMedicalRecords){
    let medicalRecords = [];
    for (let i = 0; i < rawMedicalRecords.length; i++) {
        let medicalRecord = rawMedicalRecords[i];
        let processedMedicalRecord = {
            key: medicalRecord.id,
            id: medicalRecord.id,
            departmentName: medicalRecord.departmentName,
            doctorName: medicalRecord.doctorName,
            departmentID: medicalRecord.departmentID,
            doctorID: medicalRecord.doctorID,
            doctorTitle: medicalRecord.doctorTitle,
            medicalDate: medicalRecord.date + (medicalRecord.time === 0 ? '  上午' : '  下午'),
        }
        medicalRecords.push(processedMedicalRecord);
    }
    return medicalRecords;
}


function MyMedicalRecords(){

    const [rawMedicalRecords, setRawMedicalRecords] = useState([])

    const [medicalRecords, setMedicalRecords] = useState([]);

    useEffect(() => {
        const getRawMedicalRecords = async () => {
            const response = await axios.post('/patient/consultation/list/');

            setRawMedicalRecords(response.data);
            setMedicalRecords(parseRawMedicalRecords(response.data));
        }
        getRawMedicalRecords();
    }, []);

    const navigate = useNavigate();


    const columns = [
        {
            title: '诊疗编号',
            dataIndex: 'id',
            key: 'id',
            render: (text) => {
                return (
                    <Text>#{text}</Text>
                )
            }
        },
        {
            title: '科室名称',
            dataIndex: 'departmentName',
            key: 'departmentName',
            render: (text) => {
                return (
                    <Text>{text}</Text>
                )
            }
        },
        {
            title: '就诊医生',
            dataIndex: 'doctorName',
            key: 'doctorName',
            render: (text, record) => {
                return (
                    <Text>{text}, {record.doctorTitle}</Text>
                )
            }
        },
        {
            title: '预约时间',
            dataIndex: 'medicalDate',
            key: 'medicalDate',
            render: (text) => {
                return (
                    <Text>{text}</Text>
                )
            }
        },
        {
            title: '操作',
            key: 'action',
            render: (_, record) => {

                return (
                    <Button
                        onClick={() => {
                            navigate('/patient/medicalRecord/' + record.id.toString());
                        }}
                    >
                        查看详情
                    </Button>
                )
            }
        }
    ]


    return (
        <div style={{'marginTop': '3vh'}}>
            <Row>
                <Col span={4} />
                <Col span={16}>
                    <Center>
                        <Space direction='vertical'>
                            <Title level={1}>
                                诊疗记录清单
                            </Title>
                            <Table
                                style={{'width': '950px'}}
                                columns={columns} dataSource={medicalRecords}
                            />
                        </Space>
                    </Center>
                </Col>
                <Col span={4} />
            </Row>
        </div>
    )
}


export default MyMedicalRecords;
