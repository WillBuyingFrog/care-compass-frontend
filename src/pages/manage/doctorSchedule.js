/**
 * 后台管理/医生排班管理
 */
import 'antd/dist/antd.variable.min.css';
import './doctorSchedule.css';
import './manage.css';
import { Avatar } from '@chakra-ui/react'
import {Card, Row, Col, Badge, Calendar, ConfigProvider, Divider, Steps, Typography, Button, Alert, Drawer, Space, Form, Input, Popconfirm, Table} from 'antd';
import * as echarts from 'echarts'
import React, { useEffect, useRef, useState, useContext } from 'react';
import {Link, useLocation} from 'react-router-dom'
import axios from 'axios';
import moment from 'moment';
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

// 科室列表
const gridStyle = {
    width: '25%',
    textAlign: 'center',
};

// 排班抽屉
const EditableContext = React.createContext(null);
const EditableRow = ({ index, ...props }) => {
    const [form] = Form.useForm();
    return (
        <Form form={form} component={false}>
            <EditableContext.Provider value={form}>
                <tr {...props} />
            </EditableContext.Provider>
        </Form>
    );
};
const EditableCell = ({
                          title,
                          editable,
                          children,
                          dataIndex,
                          record,
                          handleSave,
                          ...restProps
                      }) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef(null);
    const form = useContext(EditableContext);
    useEffect(() => {
        if (editing) {
            inputRef.current.focus();
        }
    }, [editing]);
    const toggleEdit = () => {
        setEditing(!editing);
        form.setFieldsValue({
            [dataIndex]: record[dataIndex],
        });
    };
    const save = async () => {
        try {
            const values = await form.validateFields();
            toggleEdit();
            handleSave({
                ...record,
                ...values,
            });
        } catch (errInfo) {
            console.log('Save failed:', errInfo);
        }
    };
    let childNode = children;
    if (editable) {
        childNode = editing ? (
            <Form.Item
                style={{
                    margin: 0,
                }}
                name={dataIndex}
                rules={[
                    {
                        required: true,
                        message: `${title} is required.`,
                    },
                ]}
            >
                <Input ref={inputRef} onPressEnter={save} onBlur={save} />
            </Form.Item>
        ) : (
            <div
                className="editable-cell-value-wrap"
                style={{
                    paddingRight: 24,
                }}
                onClick={toggleEdit}
            >
                {children}
            </div>
        );
    }
    return <td {...restProps}>{childNode}</td>;
};

const ScheduleList = () => {
    const [dataSource, setDataSource] = useState([
        {
            key: '0',
            name: 'Edward King 0',
            age: '32',
            address: 'London, Park Lane no. 0',
        },
        {
            key: '1',
            name: 'Edward King 1',
            age: '32',
            address: 'London, Park Lane no. 1',
        },
    ]);
    const [count, setCount] = useState(2);
    const handleDelete = (key) => {
        const newData = dataSource.filter((item) => item.key !== key);
        setDataSource(newData);
    };
    const defaultColumns = [
        {
            title: '姓名',
            dataIndex: 'name',
            width: '20%',
        },
        {
            title: '工号',
            dataIndex: 'age',
        },
        {
            title: '时间段',
            dataIndex: 'age',
        },
        {
            title: '放号量',
            dataIndex: 'address',
            editable: true,
        },
        {
            title: '操作',
            dataIndex: 'operation',
            render: (_, record) =>
                dataSource.length >= 1 ? (
                    <Popconfirm title="确认删除?" onConfirm={() => handleDelete(record.key)}>
                        <a>删除排班</a>
                    </Popconfirm>
                ) : null,
        },
    ];
    const handleAdd = () => {
        const newData = {
            key: count,
            name: `Edward King ${count}`,
            age: '32',
            address: `London, Park Lane no. ${count}`,
        };
        setDataSource([...dataSource, newData]);
        setCount(count + 1);
    };
    const handleSave = (row) => {
        const newData = [...dataSource];
        const index = newData.findIndex((item) => row.key === item.key);
        const item = newData[index];
        newData.splice(index, 1, {
            ...item,
            ...row,
        });
        setDataSource(newData);
    };
    const components = {
        body: {
            row: EditableRow,
            cell: EditableCell,
        },
    };
    const columns = defaultColumns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record) => ({
                record,
                editable: col.editable,
                dataIndex: col.dataIndex,
                title: col.title,
                handleSave,
            }),
        };
    });
    return (
        <div>
            <Button
                onClick={handleAdd}
                type="primary"
                style={{
                    marginBottom: 16,
                }}
            >
                添加出诊医生
            </Button>
            <Table
                components={components}
                rowClassName={() => 'editable-row'}
                bordered
                dataSource={dataSource}
                columns={columns}
            />
        </div>
    );
};

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

// 排班日历
function WorkCalendar(){
    const [open, setOpen] = useState(false);
    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };
    const nowTime = moment().format('YYYY-MM-DD HH:mm:ss');
    const nextMonth1st = moment().add(1, 'months').format('YYYY-MM-01');
    // const [value, setValue] = useState(() => moment().add(1, 'months').format('YYYY-MM-01'));
    // const [selectedValue, setSelectedValue] = useState(() => moment().add(1, 'months').format('YYYY-MM-01'));
    const [value, setValue] = useState(() => moment(nextMonth1st));
    const [selectedValue, setSelectedValue] = useState(() => moment(nextMonth1st));

    const onSelect = (newValue) => {
        setValue(newValue);
        setSelectedValue(newValue);
        showDrawer();
        console.log(newValue.format('YYYY-MM-DD'));
    };
    const onPanelChange = (newValue) => {
        setValue(newValue);
    };

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
    return (
        <>
            {/*<Alert message={`You selected date: ${selectedValue?.format('YYYY-MM-DD')}`} />*/}
            <Calendar dateCellRender={dateCellRender} value={value} onSelect={onSelect} onPanelChange={onPanelChange}/>;
            <Drawer
                title={`心脏外科 ${selectedValue?.format('YYYY-MM-DD')}排班情况`}
                width={720}
                onClose={onClose}
                open={open}
                bodyStyle={{
                    paddingBottom: 80,
                }}
                extra={
                    <Space>
                        <Button onClick={onClose}>取消</Button>
                        <Button onClick={onClose} type="primary">
                            提交
                        </Button>
                    </Space>
                }
            >
                <ScheduleList />
            </Drawer>
        </>
    );
};

function DoctorSchedule(){
    const [department, setDepartment] = useState();
    const [current, setCurrent] = useState(0);
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

    const finished = () => {
        setCurrent(0);
    }

    const steps = [
        {
            title: '选择科室',
            status: 'finish',
            icon:
                <HomeOutlined />,
            content: (
                <div>
                    <Card title="科室列表">
                        <Card.Grid style={gridStyle} onClick={chooseDepartmentFinish}>Content</Card.Grid>
                        <Card.Grid style={gridStyle} onClick={chooseDepartmentFinish}>Content</Card.Grid>
                        <Card.Grid style={gridStyle} onClick={chooseDepartmentFinish}>Content</Card.Grid>
                        <Card.Grid style={gridStyle} onClick={chooseDepartmentFinish}>Content</Card.Grid>
                        <Card.Grid style={gridStyle} onClick={chooseDepartmentFinish}>Content</Card.Grid>
                        <Card.Grid style={gridStyle} onClick={chooseDepartmentFinish}>Content</Card.Grid>
                        <Card.Grid style={gridStyle} onClick={chooseDepartmentFinish}>Content</Card.Grid>
                    </Card>
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
                size={"small"}
                current={current}
                items={items}
                style={{
                    padding: 0,
                }}
            />
            <Divider dashed style={{marginTop: '1vh'}}/>
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
                        {/*<Button*/}
                        {/*    type="primary"*/}
                        {/*    onClick={chooseDepartmentFinish}*/}
                        {/*    shape={"round"}*/}
                        {/*    size="large"*/}
                        {/*    style={{*/}
                        {/*        margin: 'auto',*/}
                        {/*        // backgroundColor: '#3a3af1',*/}
                        {/*        border: 'none',*/}
                        {/*        boxShadow: '4px 4px 15px 0 rgba(0,0,0,0.1)',*/}
                        {/*        marginTop: '20px',*/}
                        {/*        marginBottom: '20px',*/}
                        {/*    }}*/}
                        {/*>*/}
                        {/*    下一步*/}
                        {/*</Button>*/}
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
                    <>
                    <Row>
                        {/*<Link*/}
                        {/*    to={{*/}
                        {/*        pathname: '/manage/doctorSchedule',*/}
                        {/*    }}*/}
                        {/*    style={{*/}
                        {/*        margin: 'auto',*/}
                        {/*    }}*/}
                        {/*>*/}
                            <Button
                                type="primary"
                                // onClick={() => message.success('即将返回首页!')}
                                shape={"round"}
                                size="large"
                                style={{
                                    border: 'none',
                                    margin: 'auto',
                                    marginBottom: '20px',
                                }}
                                onClick={finished}
                            >
                                返回
                            </Button>
                        {/*</Link>*/}
                    </Row>
                    </>)}
            </div>

        </div>
    )
}

export default DoctorSchedule;
