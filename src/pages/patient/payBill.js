import {useLoaderData} from "react-router-dom";
import {Button, Col, Drawer, Image, Radio, Row, Space, Typography, message} from "antd";
import axios from "axios";
import {useEffect, useState} from "react";
import {Center} from "@chakra-ui/react";
const { Title, Paragraph, Text, Link } = Typography;

export function singleBillLoader({params}){
    const billID = params.billID;

    return { billID };

}

function PayBill(props) {

    const { billID } = useLoaderData();

    // 页面加载时获取billID对应的账单信息
    const [billInfo, setBillInfo] = useState(null);
    const [loading, setLoading] = useState(true);

    // 记录当前选择的支付方式
    const [paymentMethod, setPaymentMethod] = useState(1);
    const handlePaymentMethodChange = (e) => {
        setPaymentMethod(e.target.value);
    }

    // 记录完成支付的Drawer的状态
    const [paymentDrawerOpen, setPaymentDrawerOpen] = useState(false);

    // 用户点击“已完成支付”按钮后，向后端发送支付完成的post请求的函数
    const handlePaymentFinish = async () => {
        try {
            const response = await axios.post('/patient/bill/pay/', {
                billID: billID,
                billType: billInfo.billType
            });
            if(response.code === 200) {

            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        const getBillInfo = async () => {
            try {
                const response = await axios.post('/patient/bill/getSingle/', {
                    billID: billID
                });
                setBillInfo(response.data);
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        };
        getBillInfo();
    }, []);

    return (
        <div>
            {
                loading ? (
                    <div>loading...</div>
                ) : (
                    <div>
                        <Row style={{'marginTop': '3vh'}}>
                            <Col span={2} />
                            <Col span={20}>
                                <Title level={1}> 支付账单 #{billInfo.id}</Title>
                                <Title level={3}>账单金额：¥{billInfo.price}</Title>
                                <Title level={3}>请选择支付方式</Title>
                                <Row style={{'marginTop': '20px'}}>
                                    <Col span={6}>
                                        <Space direction="vertical" size="large">
                                            <Radio.Group value={paymentMethod} onChange={handlePaymentMethodChange}>
                                                <Radio value={1}>支付宝</Radio>
                                                <Radio value={2}>微信</Radio>
                                            </Radio.Group>
                                            <Center>
                                                <Button

                                                >
                                                    前往支付
                                                </Button>
                                            </Center>
                                        </Space>
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={2} />
                        </Row>
                        <Drawer title="进行支付" width={550} closeable={false}

                        >
                            <Title level={3}>请扫描二维码完成支付</Title>
                            <Image
                                src='../../assets/pay_qrcode.png'
                                width={200}
                                />
                        </Drawer>
                    </div>
                )
            }
        </div>
    )
}

export default PayBill;
