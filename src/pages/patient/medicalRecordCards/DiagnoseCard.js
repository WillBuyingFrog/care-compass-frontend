import {Box} from "@chakra-ui/react";
import {Space, Typography} from "antd";
import '../personInfo.css'
const { Title, Text, Paragraph } = Typography;

function DiagnoseCard(props) {

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
            <Space direction='vertical' style={{'margin': '20px 30px 0 20px'}}>
                <Title level={4}>
                    诊断
                </Title>
                <Paragraph>
                    {props.diagnose}
                </Paragraph>
            </Space>
        </Box>
    )
}

export default DiagnoseCard;
