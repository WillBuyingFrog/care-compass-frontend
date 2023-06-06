import {useLoaderData, useNavigate} from "react-router-dom";
import {Button, Col, Drawer, Image, Radio, Row, Space, Typography, message} from "antd";
import axios from "axios";
import React, {useEffect, useState} from "react";
import {Center} from "@chakra-ui/react";
import {CheckCircleOutlined, PayCircleOutlined} from "@ant-design/icons";
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

    // 进行支付的Drawer
    const [paymentDrawerOpen, setPaymentDrawerOpen] = useState(false);
    const showPaymentDrawer = () => {
        setPaymentDrawerOpen(true);
    }
    const closePaymentDrawer = () => {
        setPaymentDrawerOpen(false);
    }

    const navigate = useNavigate();

    // 用户点击“已完成支付”按钮后，向后端发送支付完成的post请求的函数
    const handlePaymentFinish = async () => {
        let customHeaders = {
            token: localStorage.getItem('userToken')
        }
        try {
            const response = await axios.post('/patient/bill/pay/', {
                billID: billID,
                billType: billInfo.billType
            },
                {
                    headers: customHeaders
                });
            if (true) {
            // if(response.code === 200) {
                message.success("支付成功！跳转中...");
                navigate('/patient/personInfo');
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {

        let customHeaders = {
            token: localStorage.getItem('userToken')
        }
        const getBillInfo = async () => {
            try {
                const response = await axios.post('/patient/bill/getSingle/', {
                    billID: billID
                },
                    {
                        headers: customHeaders
                    });
                setBillInfo(response.data.data);
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        };
        getBillInfo();
    }, []);

    return (
        <div
            style={{
                padding: '40px 200px 50px 200px',
                // height: '100vh',
                backgroundColor: 'rgb(220,225,242)',
            }}
        >
            {
                loading ? (
                    <div>loading...</div>
                ) : (
                    <div
                        style={{
                            padding: '40px 0px 50px 50px',
                            background: 'linear-gradient(180deg,rgba(255,255,255,1.0), rgba(255,255,255,0.4))',
                            boxShadow: '4px 4px 15px 0 rgba(0,0,0,0.1)',
                            borderRadius: '20px',
                            height: '80vh',
                        }}
                    >
                        <Row style={{'marginTop': '10vh'}}>
                            <Col span={2} />
                            <Col span={20}>
                                <Title level={1} style={{textAlign: 'center'}}> 支付账单 #{billInfo.id}</Title>
                                <Title level={3} style={{textAlign: 'center'}}>账单金额：¥{billInfo.price}</Title>
                                <Title level={3} style={{textAlign: 'center'}}>请选择支付方式</Title>
                                <Row style={{'marginTop': '20px', textAlign: 'center'}}>
                                    <Col span={2} />
                                    <Col span={20}>
                                        <Space direction="vertical" size="large" align="center">
                                            <Radio.Group value={paymentMethod} onChange={handlePaymentMethodChange}>
                                                <Radio value={1}>支付宝</Radio>
                                                <Radio value={2}>微信</Radio>
                                            </Radio.Group>
                                            <Center>
                                                <Button
                                                    onClick={showPaymentDrawer}
                                                    type={"primary"}
                                                    icon={<PayCircleOutlined />}
                                                    size="large"
                                                    shape={"round"}
                                                    style={{'marginTop': '5vh'}}
                                                >
                                                    前往支付
                                                </Button>
                                            </Center>
                                        </Space>
                                    </Col>
                                    <Col span={2} />
                                </Row>
                            </Col>
                            <Col span={2} />
                        </Row>
                        <Drawer title="支付" width={550} closeable={false}
                                onClose={closePaymentDrawer} open={paymentDrawerOpen}
                        >
                            <Space direction='vertical'>
                                <Title level={3}>请扫描二维码完成支付</Title>
                                <Image
                                    src={require("../../assets/pay_qrcode.jpg")}
                                    width={200}
                                    preview={false}
                                />
                                <Text>支付完成后，请点击"已完成支付"，供平台检查支付结果</Text>
                                <Button onClick={handlePaymentFinish}
                                        type={"primary"}
                                        icon={<CheckCircleOutlined />}
                                        size="large"
                                        shape={"round"}
                                        style={{marginLeft: 20, marginTop: 20}}
                                >
                                    已完成支付
                                </Button>
                            </Space>
                        </Drawer>
                    </div>
                )
            }
        </div>
    )
}

export default PayBill;
