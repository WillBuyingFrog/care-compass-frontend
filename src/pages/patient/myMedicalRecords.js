import {useEffect, useState} from "react";
import axios from "axios";
import {Button, Col, Drawer, Row, Space, Table, Typography} from "antd";
import {Center} from "@chakra-ui/react";
import {useNavigate} from "react-router-dom";
import MedicalRecord from "./medicalRecord";

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

    const [selectedMedicalRecordID, setSelectedMedicalRecordID] = useState(-1);
    const [medicalRecordDrawerOpen, setMedicalRecordDrawerOpen] = useState(false);

    const handleMedicalRecordDrawerClose = () => {
        setMedicalRecordDrawerOpen(false);
    }

    const handleMedicalRecordDrawerOpen = () => {
        setMedicalRecordDrawerOpen(true);
    }

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
            title: '就诊时间',
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
                            setSelectedMedicalRecordID(record.id);
                            handleMedicalRecordDrawerOpen();
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
                <Col span={2} />
                <Col span={20}>
                    <Center>
                        <Space direction='vertical'>
                            <Table
                                style={{'width': '950px'}}
                                columns={columns} dataSource={medicalRecords}
                            />
                        </Space>
                    </Center>
                </Col>
                <Col span={2} />
            </Row>
            <Drawer
                width={1200}     title="诊疗记录详情"
                onClose={handleMedicalRecordDrawerClose} open={medicalRecordDrawerOpen}
            >
                <MedicalRecord medicalRecordID={selectedMedicalRecordID} />
            </Drawer>
        </div>
    )
}


export default MyMedicalRecords;
