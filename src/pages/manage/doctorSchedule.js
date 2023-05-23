/**
 * 后台管理/科室信息管理
 */
import 'antd/dist/antd.variable.min.css';
import './doctorSchedule.css';
import './manage.css';
import { Avatar } from '@chakra-ui/react'
import {Card, Row, Col, Badge, Calendar, ConfigProvider, Divider, Steps, Typography, Button} from 'antd';
import * as echarts from 'echarts'
import React, { useEffect, useRef, useState } from 'react';
import {Link, useLocation} from 'react-router-dom'
import axios from 'axios';
import {
    TeamOutlined,
    RiseOutlined,
    BookOutlined,
    HomeOutlined,
    PieChartOutlined,
    VerifiedOutlined,
    StockOutlined,
    CheckCircleOutlined,
    CheckCircleFilled
} from '@ant-design/icons'
const { Title, Paragraph, Text } = Typography;
const { Meta } = Card;

ConfigProvider.config({
    theme: {
        primaryColor: '#2C5282',
        successColor: '#50af78',
    },
});

const getListData = (value) => {
    let listData;
    switch (value.date()) {
        case 8:
            listData = [
                {
                    type: 'warning',
                    content: 'This is warning event.',
                },
                {
                    type: 'success',
                    content: 'This is usual event.',
                },
            ];
            break;
        case 10:
            listData = [
                {
                    type: 'warning',
                    content: 'This is warning event.',
                },
                {
                    type: 'success',
                    content: 'This is usual event.',
                },
            ];
            break;
        case 15:
            listData = [
                {
                    type: 'warning',
                    content: 'This is warning event',
                },
                {
                    type: 'success',
                    content: 'This is very long usual event。。....',
                },
            ];
            break;
        default:
    }
    return listData || [];
};

function WorkCalendar(){
    const dateCellRender = (value) => {
        const listData = getListData(value);
        return (
            <ul className="events">
                {listData.map((item) => (
                    <li key={item.content}>
                        <Badge status={item.type} text={item.content} />
                    </li>
                ))}
            </ul>
        );
    };
    return <Calendar dateCellRender={dateCellRender} />;
}

function DoctorSchedule(){
    const [current, setCurrent] = useState(1);
    const next = () => {
        setCurrent(current + 1);
    };
    const prev = () => {
        setCurrent(current - 1);
    };

    const chooseDepartmentFinish = () => {
        next()
    }

    const scheduled = () => {
        next()
    }

    const steps = [
        {
            title: '选择科室',
            status: 'finish',
            icon:
                <HomeOutlined />,
            content: (
                <div>
                </div>
            ),
        },
        {
            title: '进行下月排班',
            status: 'finish',
            icon: <PieChartOutlined />,
            content: (
                <div>
                    <WorkCalendar />
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
                            排班已提交！
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
                current={current}
                items={items}
                style={{
                    padding: 0,
                }}
            />
            <Divider dashed/>
            <div
                className="steps-content"
                style={{
                    padding: 0,
                }}
            >
                {steps[current].content}
            </div>
            <div className="steps-action">
                {current === 0 && (
                    <Row>
                        <Button
                            type="primary"
                            onClick={chooseDepartmentFinish}
                            shape={"round"}
                            size="large"
                            style={{
                                margin: 'auto',
                                // backgroundColor: '#3a3af1',
                                border: 'none',
                                boxShadow: '4px 4px 15px 0 rgba(0,0,0,0.1)',
                                marginBottom: '20px',
                            }}
                        >
                            下一步
                        </Button>
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
                                onClick={() => prev()}
                            >
                                返回
                            </Button>
                            <Button
                                type="primary"
                                onClick={scheduled}
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
                    <Row>
                        <Link
                            to={{
                                pathname: '/',
                            }}
                            style={{
                                margin: 'auto',
                            }}
                        >
                            <Button
                                type="primary"
                                // onClick={() => message.success('即将返回首页!')}
                                shape={"round"}
                                size="large"
                                style={{
                                    border: 'none',
                                    marginBottom: '20px',
                                }}
                            >
                                返回
                            </Button>
                        </Link>
                    </Row>
                )}
            </div>

        </div>
    )
}

export default DoctorSchedule;
