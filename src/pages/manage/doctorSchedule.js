/**
 * 后台管理/医生排班管理
 */
import 'antd/dist/antd.variable.min.css';
import './doctorSchedule.css';
import './manage.css';
import { Avatar } from '@chakra-ui/react'
import {Card, Row, Col, Badge, Calendar, ConfigProvider, Divider, Steps, Typography, Button, Alert, Drawer, Space, Form, Input, Popconfirm, Table, Modal, Radio, Select, InputNumber} from 'antd';
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

function ScheduleList(props) {
    const [dataSource, setDataSource] = useState();
    const [showModal, setShowModal] = useState(false);
    const [doctorList, setDoctorList] = useState(props.doctors);
    // console.log(doctorList);
    // console.log(dataSource);
    // console.log(count);
    // console.log(props.dayData);
    // console.log(props.date);
    useEffect(() => {
        setDataSource(props.dayData);
        // setCount(props.dayData.length);
        // console.log(props.date.format('YYYY-MM-DD'));
    }, [props.dayData]);
    const getDateData = () => {
        axios({
            method: "post",
            url: "/admin/getOneDayShift/",
            data: {
                departmentID: props.dID,
                date: props.date.format('YYYY-MM-DD')
            },
            // headers: {
            //     token: localStorage.getItem("userToken")
            // }
        })
            .then(res => {
                console.log(res.data);
                setDataSource(res.data.data.shiftList);
                console.log(dataSource);
            })
    }
    const deleteOneShift = (key) => {
        axios({
            method: "post",
            url: "/admin/deleteOneShift/",
            data: {
                shiftID: key,
            },
            // headers: {
            //     token: localStorage.getItem("userToken")
            // }
        })
            .then(res => {
                console.log(res.data);
                // setDoctors(res.data.data.doctorList);
                // console.log(doctors);
            })
    }
    const handleDelete = (key) => {
        deleteOneShift(key);
        getDateData();
    };
    const defaultColumns = [
        {
            title: '姓名',
            dataIndex: 'doctorName',
            width: '20%',
        },
        {
            title: '工号',
            dataIndex: 'doctorID',
        },
        {
            title: '时间段',
            dataIndex: 'time',
            render: (_, record) =>
                <Text>{record.time === 0 ? '上午':'下午'}</Text>

        },
        {
            title: '放号量',
            dataIndex: 'total',
            editable: true,
        },
        {
            title: '操作',
            dataIndex: 'operation',
            render: (_, record) =>
                dataSource.length >= 1 ? (
                    <Popconfirm title="确认删除?" onConfirm={() => handleDelete(record.shiftID)}>
                        <a>删除排班</a>
                    </Popconfirm>
                ) : null,
        },
    ];
    const handleClickAdd = () => {
        setShowModal(true);
    }

    const handleCancel = () => {
        setShowModal(false);
    }

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

    const [form] = Form.useForm();
    const AddPeriod = Form.useWatch('period', form);
    const AddDoctor = Form.useWatch('doctor', form);
    const AddAmount = Form.useWatch('amount', form);

    const handleAdd = () => {
        const newData = {
            doctorID: AddDoctor,
            date: props.date.format('YYYY-MM-DD'),
            time: AddPeriod,
            total: AddAmount,
        };
        // console.log(newData);
        // console.log(AddPeriod);
        // console.log(AddDoctor);
        // console.log(AddAmount);
        // console.log(props.date);
        // setDataSource([...dataSource, newData]);
        // console.log(dataSource);
        // setCount(count + 1);
        setShowModal(false);
        axios({
            method: "post",
            url: "/admin/createDoctorShift/",
            data: {
                shiftList: [newData],
            },
            // headers: {
            //     token: localStorage.getItem("userToken")
            // }
        })
            .then(res => {
                console.log(res.data);
                // setDoctors(res.data.data.doctorList);
                // console.log(doctors);
            })
        getDateData();
    };
    return (
        <div>
            <Button
                onClick={handleClickAdd}
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
            <Modal
                title="添加排班信息"
                open={showModal}
                onOk={handleAdd}
                onCancel={handleCancel}
            >
                <Form
                    form={form}
                    initialValues={{}}
                    labelCol={{
                        span: 4,
                    }}
                    wrapperCol={{
                        span: 14,
                    }}
                    layout="horizontal"
                >
                    <Form.Item label="时间段" name="period">
                        <Radio.Group>
                            <Radio value={0}> 上午 </Radio>
                            <Radio value={1}> 下午 </Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item label="医生" name="doctor">
                        <Select>
                            {doctorList.map((item) => (
                                <Select.Option value={item.doctorID}>{item.doctorName}</Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item label="放号量" name="amount">
                        <InputNumber min={1}/>
                    </Form.Item>

                </Form>
            </Modal>
        </div>
    );
};

// 排班日历
function WorkCalendar(props){
    const [open, setOpen] = useState(false);
    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };

    const nowTime = moment().format('YYYY-MM-DD');
    const nextMonth1st = moment().add(1, 'months').format('YYYY-MM-01');
    // const [value, setValue] = useState(() => moment().add(1, 'months').format('YYYY-MM-01'));
    // const [selectedValue, setSelectedValue] = useState(() => moment().add(1, 'months').format('YYYY-MM-01'));
    const [value, setValue] = useState(() => moment(nextMonth1st));
    const [selectedValue, setSelectedValue] = useState(() => moment(nextMonth1st));
    const [dID, setDID] = useState();
    const [dName, setDName] = useState();
    const [monthData, setMonthData] = useState();
    const [dayData, setDayData] = useState();
    const [doctors, setDoctors] = useState();

    const [showModal, setShowModal] = useState(false);

    const handleDelete = (key) => {
        axios({
            method: "post",
            url: "/admin/deleteOneShift/",
            data: {
                shiftID: key,
            },
            // headers: {
            //     token: localStorage.getItem("userToken")
            // }
        })
            .then(res => {
                console.log(res.data);
                getDateData(dID, selectedValue.format('YYYY-MM-DD'));
                getMonthData();
            })
    };

    const defaultColumns = [
        {
            title: '姓名',
            dataIndex: 'doctorName',
            width: '20%',
        },
        {
            title: '工号',
            dataIndex: 'workID',
        },
        {
            title: '时间段',
            dataIndex: 'time',
            render: (_, record) =>
                <Text>{record.time === 0 ? '上午':'下午'}</Text>

        },
        {
            title: '放号量',
            dataIndex: 'total',
        },
        {
            title: '操作',
            dataIndex: 'operation',
            render: (_, record) =>
                dayData.length >= 1 ? (
                    <Popconfirm title="确认删除?" onConfirm={() => handleDelete(record.shiftID)}>
                        <a>删除排班</a>
                    </Popconfirm>
                ) : null,
        },
    ];
    const handleClickAdd = () => {
        setShowModal(true);
    }

    const handleCancel = () => {
        setShowModal(false);
    }

    const handleSave = (row) => {
        const newData = [...dayData];
        const index = newData.findIndex((item) => row.key === item.key);
        const item = newData[index];
        newData.splice(index, 1, {
            ...item,
            ...row,
        });
        setDayData(newData);
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

    const [form] = Form.useForm();
    const AddPeriod = Form.useWatch('period', form);
    const AddDoctor = Form.useWatch('doctor', form);
    const AddAmount = Form.useWatch('amount', form);

    const handleAdd = () => {
        const newData = {
            doctorID: AddDoctor,
            date: selectedValue.format('YYYY-MM-DD'),
            time: AddPeriod,
            total: AddAmount,
        };
        setShowModal(false);
        axios({
            method: "post",
            url: "/admin/createDoctorShift/",
            data: {
                shiftList: [newData],
            },
            // headers: {
            //     token: localStorage.getItem("userToken")
            // }
        })
            .then(res => {
                console.log(res.data);
                // setDoctors(res.data.data.doctorList);
                // console.log(doctors);
                getDateData(dID, selectedValue.format('YYYY-MM-DD'));
                getMonthData();
            })

    };
    const getDateData = (departmentID, date) => {
        axios({
            method: "post",
            url: "/admin/getOneDayShift/",
            data: {
                departmentID: props.dID,
                date: date
            },
            // headers: {
            //     token: localStorage.getItem("userToken")
            // }
        })
            .then(res => {
                console.log(res.data.data);
                setDayData(res.data.data.shiftList);
                console.log(dayData);
            })
    }

    const getDoctors = () => {
        axios({
            method: "post",
            url: "/admin/getOneDepartmentDoc/",
            data: {
                departmentID: props.dID,
            },
            // headers: {
            //     token: localStorage.getItem("userToken")
            // }
        })
            .then(res => {
                console.log(res.data.data);
                setDoctors(res.data.data.doctorList);
                console.log(doctors);
            })
    }

    const onSelect = (newValue) => {
        setValue(newValue);
        setSelectedValue(newValue);
        getDateData(dID, newValue.format('YYYY-MM-DD'));
        getMonthDataByDate(newValue);
        showDrawer();
        console.log(newValue.format('YYYY-MM-DD'));
    };

    const onPanelChange = (newValue) => {
        setValue(newValue);
        getMonthDataByDate(newValue);

    };

    const getListData = (value) => {
        // console.log(value);
        // console.log(monthData);
        // const monthData2 = monthData.shiftList;
        // console.log(selectedValue);
        // console.log(value.month());
        // console.log(selectedValue.month());
        // console.log(value.date());
        // console.log(selectedValue.date());
        // console.log(monthData2);
        let listData = [];
        if (value.month() !== selectedValue.month()) {
            listData = [];
            return listData;
        }
        if (monthData !== undefined) {
            listData = monthData[value.date()-1];
        }
        return listData || [];
    };

    const getMonthData = () => {
        axios({
            method: "post",
            url: "/admin/getDepartAllShift/",
            data: {
                departmentID: props.dID,
                date: selectedValue.format('YYYY-MM-DD').toString(),
            },
            // headers: {
            //     token: localStorage.getItem("userToken")
            // }
        })
            .then(res => {
                // console.log(res);
                // console.log(res.data);
                // console.log(res.data.data);
                // console.log(res.data.data.shiftList);
                setMonthData(res.data.data.shiftList);
                // console.log(res.data.data.shiftList[3]);
                // console.log(monthData);
            })
    }

    const getMonthDataByDate = (date) => {
        axios({
            method: "post",
            url: "/admin/getDepartAllShift/",
            data: {
                departmentID: props.dID,
                date: date.format('YYYY-MM-DD').toString(),
            },
            // headers: {
            //     token: localStorage.getItem("userToken")
            // }
        })
            .then(res => {
                // console.log(res);
                // console.log(res.data);
                // console.log(res.data.data);
                // console.log(res.data.data.shiftList);
                setMonthData(res.data.data.shiftList);
                // console.log(res.data.data.shiftList[3]);
                // console.log(monthData);
            })
    }


    useEffect(() => {
        // console.log(props.dID);
        // console.log(props.dName)
        // setDID(props.dID);
        // setDName(props.dName);
        getMonthData();
        getDoctors();
    }, []);

    const dateCellRender = (value) => {
        // const listData = monthData;
        // console.log(value.date());
        // console.log(monthData);
        // console.log(monthData[value.date()]);
        const listData = getListData(value);
        // const listData = [];
        return (
            <div>
                {listData !== undefined &&
                    <ul className="events">
                        {listData.map((item) => (
                            <li key={item.type}>
                                <Badge status={item.type} text={item.content}/>
                            </li>
                        ))}
                    </ul>
                }
            </div>
        );
    };
    return (
        <>
            {/*<Alert message={`You selected date: ${selectedValue?.format('YYYY-MM-DD')}`} />*/}
            {/*{monthData !== undefined &&*/}
                <Calendar dateCellRender={dateCellRender} value={value} onSelect={onSelect}
                          onPanelChange={onPanelChange}/>
            {/*}*/}
            {dayData !== undefined &&
                <Drawer
                    title={`${props.dName} ${selectedValue?.format('YYYY-MM-DD')}排班情况`}
                    width={'70vw'}
                    onClose={onClose}
                    open={open}
                    bodyStyle={{
                        paddingBottom: 80,
                    }}

                >
                    <div>
                        <Button
                            onClick={handleClickAdd}
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
                            dataSource={dayData}
                            columns={columns}
                        />
                        <Modal
                            title="添加排班信息"
                            open={showModal}
                            onOk={handleAdd}
                            onCancel={handleCancel}
                        >
                            <Form
                                form={form}
                                initialValues={{}}
                                labelCol={{
                                    span: 4,
                                }}
                                wrapperCol={{
                                    span: 14,
                                }}
                                layout="horizontal"
                            >
                                <Form.Item label="时间段" name="period">
                                    <Radio.Group>
                                        <Radio value={0}> 上午 </Radio>
                                        <Radio value={1}> 下午 </Radio>
                                    </Radio.Group>
                                </Form.Item>
                                <Form.Item label="医生" name="doctor">
                                    <Select>
                                        {doctors.map((item) => (
                                            <Select.Option value={item.doctorID}>{item.doctorName}</Select.Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                                <Form.Item label="放号量" name="amount">
                                    <InputNumber min={1}/>
                                </Form.Item>

                            </Form>
                        </Modal>
                    </div>
                </Drawer>
            }
        </>
    );
};

function DoctorSchedule(){

    const [departmentID, setDepartmentID] = useState();
    const [departmentName, setDepartmentName] = useState();
    const [departmentList, setDepartmentList] = useState();
    const [current, setCurrent] = useState(0);
    const next = () => {
        setCurrent(current + 1);
    };
    const prev = () => {
        setCurrent(current - 1);
    };

    const chooseDepartmentFinish = (dID, dName) => {
        setDepartmentID(dID);
        setDepartmentName(dName);
        // console.log(departmentID);
        // console.log(departmentName);
        next();
    }
    const returnToChooseDepartment = () => {
        setDepartmentID(undefined);
        setDepartmentName(undefined);
        prev();
    }

    const scheduled = () => {
        next()
    }

    const finished = () => {
        setCurrent(0);
    }
    const getDepartments = () => {
        axios({
            method: "post",
            url: "/admin/getAllDepartment/",
            data: {
            },
            // headers: {
            //     token: localStorage.getItem("userToken")
            // }
        })
            .then(res => {
                // console.log(res)
                setDepartmentList(res.data.data.departmentList);
                // console.log(res.data.data);
                // console.log(res.data.data.departmentList);
                // console.log(departmentList);
            })
    }
    useEffect(() => {
        getDepartments();
    }, [])

    const steps = [
        {
            title: '选择科室',
            status: 'finish',
            icon:
                <HomeOutlined />,
            content: (
                <div>
                    {departmentList !== undefined &&
                        <Card title="科室列表">
                            {departmentList.map((item) => (
                                <Card.Grid style={gridStyle} onClick={()=>chooseDepartmentFinish(item.departmentID, item.departmentName)}>{item.departmentName}</Card.Grid>
                            ))}
                        </Card>
                        }
                </div>
            ),
        },
        {
            title: '进行下月排班',
            status: 'finish',
            icon: <PieChartOutlined />,
            content: (
                <div>
                    {departmentID !== undefined &&
                        <WorkCalendar dID={departmentID} dName={departmentName}/>
                    }
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
            {/*{steps[current].content !== undefined &&*/}
                <div
                    className="steps-content"
                    style={{
                        padding: 0,
                    }}
                >
                    {steps[current].content}
                </div>
            {/*}*/}
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
                                onClick={() => returnToChooseDepartment()}
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
