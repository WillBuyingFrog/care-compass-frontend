import {Box, Center} from "@chakra-ui/react";
import {Space, Table, Typography} from "antd";
import '../personInfo.css'
const { Title, Text, Paragraph } = Typography;

function PrescriptionAndInspectionCard(props) {

    const prescriptionColumns = [
        {
            title: '药品名称',
            dataIndex: 'prescriptionName',
            key: 'prescriptionName',
            width: '20%',
            render: (text) => <Text> {text} </Text>
        },
        {
            title: '开具数量',
            dataIndex: 'prescriptionNum',
            key: 'prescriptionNum',
            width: '20%',
            render: (text) => {
                return (
                    <Text strong>
                        {text}
                    </Text>
                )
            }
        },
        {
            title: '用法用量',
            dataIndex: 'description',
            key: 'description',
            width: '60%',
            render: (text) => <Paragraph>{text}</Paragraph>
        }
    ]

    const inspectionColumns = [
        {
            title: '检查项目',
            dataIndex: 'inspectionName',
            key: 'inspectionName',
            render: (text) => <Text> {text} </Text>
        }
    ]

    const processedInspectionList = props.inspectionList.map((inspection) => {
        return {
            inspectionName: inspection
        }
    })
    console.log(processedInspectionList)


    return (
        <Box
            width={'100%'}
            borderWidth={'5'}
            borderRadius={'20'}
            borderStyle={'solid'}
            color={'#E2E8F0'}
            boxShadow={'4px 4px 15px 0 rgba(0,0,0,0.1)'}
            backgroundColor={'#ffffff'}
            pl={3} pr={3} pt={2} pb={2} mt={4}
        >
            <Center>
                <Space direction='vertical' size='large'
                       style={{'margin': '20px 30px 0 20px', 'width': '90%'}}>
                    <Title level={4}>
                        开具处方
                    </Title>
                    <Center>
                        <Table columns={prescriptionColumns} dataSource={props.prescriptionList}
                               style={{'width': '100%'}} pagination={false}
                               className='plist'
                        />
                    </Center>
                    <Title level={4}>
                        开具检查
                    </Title>
                    <Center>
                        <Table columns={inspectionColumns} dataSource={processedInspectionList}
                                 style={{'width': '100%'}} pagination={false}
                               className='plist'
                        />
                    </Center>
                </Space>
            </Center>
        </Box>
    )
}

export default PrescriptionAndInspectionCard;
