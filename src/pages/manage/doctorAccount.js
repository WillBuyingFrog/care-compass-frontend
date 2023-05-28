import './doctorAccount.css';
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
    CheckCircleFilled,
    PlusOutlined
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
    const [dataSource, setDataSource] = useState(props.dayData);
    const [count, setCount] = useState(props.dayData.length);
    const [showModal, setShowModal] = useState(false);
    const [doctorList, setDoctorList] = useState(props.doctors);
    console.log(doctorList);
    console.log(dataSource);
    console.log(count);
    console.log(props.dayData);
    console.log(props.date);
    useEffect(() => {
        setDataSource(props.dayData);
        setCount(props.dayData.length);
    }, [props.dayData]);
    const handleDelete = (key) => {
        const newData = dataSource.filter((item) => item.shiftID !== key);
        console.log(newData);
        setDataSource(newData);
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
    function findById(array, id) {
        // 使用 Array.prototype.find() 方法查找特定对象
        return array.find(function(element) {
            return element.DoctorID === id;
        });
    }

    const [form] = Form.useForm();
    const AddPeriod = Form.useWatch('period', form);
    const AddDoctor = Form.useWatch('doctor', form);
    const AddAmount = Form.useWatch('amount', form);

    const handleAdd = () => {
        const newData = {
            doctorID: AddDoctor,
            doctorName: doctorList.find(function(element) {return element.doctorID === AddDoctor}).doctorName,
            time: AddPeriod,
            total: AddAmount,
        };
        console.log(newData);
        console.log(AddPeriod);
        console.log(AddDoctor);
        console.log(AddAmount);
        setDataSource([...dataSource, newData]);
        console.log(dataSource);
        setCount(count + 1);
        setShowModal(false);
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
    const onSubmit = () => {
        setOpen(false);
    }
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
                // console.log(res.data.data);
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
        showDrawer();
        console.log(newValue.format('YYYY-MM-DD'));
    };

    const onPanelChange = (newValue) => {
        setValue(newValue);
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
                    <ScheduleList dayData={dayData} date={selectedValue} doctors={doctors}/>
                </Drawer>
            }
        </>
    );
};

function DoctorAccount(){

    const [departmentID, setDepartmentID] = useState();
    const [departmentName, setDepartmentName] = useState();
    const [departmentList, setDepartmentList] = useState();
    const [current, setCurrent] = useState(0);
    const [doctors, setDoctors] = useState();
    const [theDoctor, setTheDoctor] = useState();
    const [showModal, setShowModal] = useState(false);
    const next = () => {
        setCurrent(current + 1);
    };
    const prev = () => {
        setCurrent(current - 1);
    };
    const getDoctors = (dID) => {
        axios({
            method: "post",
            url: "/admin/getOneDepartmentDoc/",
            data: {
                departmentID: dID,
            },
            // headers: {
            //     token: localStorage.getItem("userToken")
            // }
        })
            .then(res => {
                console.log(res.data);
                setDoctors(res.data.data.doctorList);
                console.log(doctors);
            })
    }

    const getDoctor = (doctorID) => {
        axios({
            method: "post",
            url: "/admin/getOneDoctor/",
            data: {
                doctorID: doctorID,
            },
            // headers: {
            //     token: localStorage.getItem("userToken")
            // }
        })
            .then(res => {
                console.log(res.data);
                setTheDoctor(res.data.data);
                console.log(theDoctor);
            })
    }

    const chooseDepartmentFinish = (dID, dName) => {
        setDepartmentID(dID);
        setDepartmentName(dName);
        getDoctors(dID);
        // console.log(departmentID);
        // console.log(departmentName);
        next();
    }
    const chooseDoctorFinish = (doctorID) => {
        getDoctor(doctorID);
    }

    const returnToChooseDepartment = () => {
        setDepartmentID(undefined);
        setDepartmentName(undefined);
        prev();
    }

    const finished1 = () => {
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


    const [form] = Form.useForm();
    const AddUsername = Form.useWatch('username', form);
    const AddOfficialID = Form.useWatch('officialID', form);
    const AddWorkID = Form.useWatch('workID', form);
    const AddSex = Form.useWatch('sex', form);
    const AddPhone = Form.useWatch('phone', form);
    const AddDepartmentID = Form.useWatch('departmentID', form);
    const AddTitle = Form.useWatch('title', form);
    const AddArea = Form.useWatch('area', form);
    const AddIntro = Form.useWatch('intro', form);
    const AddPrice = Form.useWatch('price', form);

    const handleAdd = () => {
        // const newData = {
        //     username: AddUsername,
        //     officialID: AddOfficialID,
        //     workID: AddWorkID,
        //     sex: AddSex,
        //     phone: AddPhone,
        //     departmentID: AddDepartmentID,
        //     title: AddTitle,
        //     area: AddArea,
        //     intro: AddIntro,
        //     price: AddPrice,
        // };
        const formData = new FormData();
        formData.append('username', AddUsername);
        formData.append('officialID', AddOfficialID);
        formData.append('workID', AddWorkID);
        formData.append('sex', AddSex);
        formData.append('phone', AddPhone);
        formData.append('departmentID', AddDepartmentID);
        formData.append('title', AddTitle);
        formData.append('area', AddArea);
        formData.append('intro', AddIntro);
        formData.append('price', AddPrice);
        console.log(formData);
        axios.post('/register/doctor/', formData)
            .then(res => {
                console.log(res);
                console.log(res.data);
                // setTheDoctor(res.data.data);
                // console.log(theDoctor);
            })

        // setDoctors([...doctors, newData]);
        // console.log(doctors);
        setShowModal(false);
    };
    const handleClickAdd = () => {
        setShowModal(true);
    }

    const handleCancel = () => {
        setShowModal(false);
    }

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
            title: '管理医生账号',
            status: 'finish',
            icon: <PieChartOutlined />,
            content: (
                <div>
                    {doctors !== undefined &&
                        <><Card title={departmentName+'医生列表'}>
                            {doctors.map((item) => (
                                <Card.Grid style={gridStyle} onClick={()=>chooseDoctorFinish(item.doctorID)}>{item.doctorName}</Card.Grid>
                            ))}
                            <Card.Grid style={gridStyle} onClick={()=>handleClickAdd()}><PlusOutlined /></Card.Grid>
                        </Card>
                        <Modal
                            title="添加医生账号"
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
                                <Form.Item
                                    name='username'
                                    label="姓名"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item label="身份证号" name="officialID">
                                    <Input />
                                </Form.Item>
                                <Form.Item label="工号" name="workID">
                                    <Input />
                                </Form.Item>
                                <Form.Item label="性别" name="sex">
                                    <Select>
                                        <Select.Option value={0}>男</Select.Option>
                                        <Select.Option value={1}>女</Select.Option>
                                        <Select.Option value={2}>其他</Select.Option>
                                    </Select>
                                </Form.Item>
                                <Form.Item label="联系方式" name="phone">
                                    <Input />
                                </Form.Item>
                                <Form.Item label="科室" name="departmentID">
                                    <Select>
                                        {departmentList.map((item) => (
                                            <Select.Option value={item.departmentID}>{item.departmentName}</Select.Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                                <Form.Item label="职称" name="title">
                                    <Input />
                                </Form.Item>
                                <Form.Item label="专业领域" name="area">
                                    <Input />
                                </Form.Item>
                                <Form.Item label="挂号费" name="price">
                                    <Input />
                                </Form.Item>
                                <Form.Item name='AddIntro' label="介绍">
                                    <Input.TextArea />
                                </Form.Item>
                            </Form>
                        </Modal>
                        </>
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
                            信息已提交！
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
                                onClick={finished1}
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

export default DoctorAccount;
