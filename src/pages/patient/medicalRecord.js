import {useEffect, useState} from "react";
import {Col, Row, Space, Typography} from "antd";
import {Center} from "@chakra-ui/react";
import axios from "axios";
import {useLoaderData} from "react-router-dom";
import DescriptionCard from "./medicalRecordCards/DescriptionCard";
import PrescriptionAndInspectionCard from "./medicalRecordCards/PrescriptionAndInspectionCard";
import DiagnoseCard from "./medicalRecordCards/DiagnoseCard";

const { Title, Paragraph, Text } = Typography;

export function medicalRecordLoader({params}){
    const medicalRecordID = params.medicalRecordID;

    return { medicalRecordID };

}

function MedicalRecord(){

    const {medicalRecordID} = useLoaderData();
    const [medicalRecord, setMedicalRecord] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getMedicalRecord = async () => {
            try {
                const response = await axios.post('/patient/consultation/get/', {
                    recordID: medicalRecordID
                });
                if (response.status === 200) {
                    setMedicalRecord(response.data);
                    setLoading(false);
                }
            } catch (error) {
                console.log(error);
            }
        }
        getMedicalRecord();
    }, []);


    return (
        <div>
            {loading ? (
                <div>loading...</div>
            ) : (
                <div style={{'marginTop': '3vh'}}>
                    <Row>
                        <Col span={6} />
                        <Col span={12}>
                            <Space direction='vertical'>
                                <Title level={1}>
                                    诊疗记录 #{medicalRecordID}
                                </Title>
                                <Text style={{'fontSize': '18px'}} strong>
                                    {medicalRecord.departmentName},{medicalRecord.doctorName}
                                </Text>
                                <Text style={{'fontSize': '18px'}} strong>
                                    {medicalRecord.date}, {medicalRecord.time === 0 ? '上午' : '下午'}
                                </Text>
                                <Center>
                                    <Space direction='vertical' size='medium' style={{'width': '50vw'}}>
                                        <DescriptionCard description={medicalRecord.description} />
                                        <PrescriptionAndInspectionCard
                                            prescriptionList={medicalRecord.prescriptionList}
                                            inspectionList={medicalRecord.inspectionList}
                                        />
                                        <DiagnoseCard diagnose={medicalRecord.diagnose}/>
                                    </Space>
                                </Center>
                            </Space>
                        </Col>
                        <Col span={6} />
                    </Row>
                </div>
            )}
        </div>
    )
}

export default MedicalRecord;
