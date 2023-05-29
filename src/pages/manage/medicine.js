/**
 * 后台管理/检查管理
 */
import './medicine.css';
import './manage.css';
import Chart from 'react-apexcharts'
import {
    Typography,
    Layout,
    Menu,
    Avatar,
    Col,
    Row,
    Space,
    Button,
    Divider,
    Tabs,
    List,
    Skeleton,
    Table,
    Spin,
    Image, Popconfirm, Form, Radio, Select, InputNumber, Modal, Input
} from 'antd';
import {
    UserOutlined,
    HomeOutlined,
    BulbOutlined,
    FormOutlined,
    MailOutlined,
    SolutionOutlined,
    BarChartOutlined, RedoOutlined, BarsOutlined
} from '@ant-design/icons';
import React, { useRef, useEffect, useState } from 'react';
import {useLocation, useNavigate} from 'react-router-dom'
import axios from "axios";
import {Box, Heading, HStack, Link, Progress, Tag, TagLabel, Tooltip} from "@chakra-ui/react";
import {FaQuoteLeft} from "react-icons/fa";
import { IoSchoolSharp, IoNewspaperSharp } from "react-icons/io5"
import MyHeader from '../../components/header/header'
import moment from "moment";
// import {useRef} from "@types/react";
import {ExternalLinkIcon, SearchIcon} from "@chakra-ui/icons";
const { Header, Content, Footer, Sider } = Layout;
const { Title, Paragraph, Text } = Typography;

function separator(numb) {
    var str = numb.toString().split(".");
    str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return str.join(".");
}


// tabs callback
const onChange = (key) => {
    console.log(key);
};

const MediList = [
    {
        key: '1',
        mallowance: '胡彦斌',
        mname: 'asdfasd',
        mcompany: 'asdfasd',
        mprice: 123,
    },
];

const ExamList = [
    {
        key: '1',
        edepartment: '胡彦斌',
        ename: 'asdfasd',
        eprice: 123,
    },
];

function MedicineList(props) {

    const [mediList, setMediList] = useState(props.MediList);
    const [showModal, setShowModal] = useState(false);

    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters, dataIndex, confirm) => {
        clearFilters();
        handleSearch([], confirm, dataIndex);
    };
    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters}) => (
            <div
                style={{
                    padding: 10,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <Row gutter={8}>
                    <Col span={17}>
                        <Input
                            size='sm'
                            focusBorderColor='navy.500'
                            ref={searchInput}
                            placeholder={`请输入关键词`}
                            value={selectedKeys[0]}
                            onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                            onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        />
                    </Col>
                    <Col span={3}>
                        <Button
                            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                            size="sm"
                            color='navy.500'
                            style={{marginTop:3}}
                        >
                            <SearchIcon />
                        </Button>
                    </Col>
                    <Col span={3}>
                        <Button
                            onClick={() => clearFilters && handleReset(clearFilters, dataIndex, confirm)}
                            size="sm"
                            color='navy.500'
                            style={{marginTop:3}} >
                            <RedoOutlined />
                        </Button>
                    </Col>
                </Row>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchIcon
                style={{
                    color: filtered ? '#1b3bbb' : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
    });

    const htmlDecode = (input) => {
        var e = document.createElement('div');
        e.innerHTML = input;
        console.log(e.childNodes[0]);
        let ret = e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
        console.log(ret);
        return ret;
    }

    const columns = [
        {
            title: '批准文号',
            dataIndex: 'approval_number',
            key: 'approval_number',
            sorter: (a, b) => a.approval_number.localeCompare(b.approval_number),
            sortDirections: ['descend', 'ascend'],
            width: 150,
            render: (_, record) => (
                <Text>{record.approval_number}</Text>
            ),
        },
        {
            title: '药品名称',
            dataIndex: 'name',
            key: 'name',
            ...getColumnSearchProps('name'),
            render: (_, record) => (
                <Tooltip label={record.name} aria-label='A tooltip'>
                    <Text>
                        {record.name}
                    </Text>
                </Tooltip>
            ),
            ellipsis: true,
            width: 400
        },
        {
            title: '生产单位',
            dataIndex: 'production_unit',
            key: 'production_unit',
            width: 150,
            render: (_, record) => (
                <Text>{record.production_unit}</Text>
            ),
        },{
            title: '价格',
            dataIndex: 'price',
            key: 'price',
            sorter: (a, b) => a.price - b.price,
            sortDirections: ['descend', 'ascend'],
            width: 200,
            render:(_,record) =>(
                <Text>{record.price}</Text>
            )
        },
    ];

    const [form] = Form.useForm();
    const AddApproval = Form.useWatch('approval', form);
    const AddName = Form.useWatch('name', form);
    const AddPrice = Form.useWatch('price', form);
    const AddProduction = Form.useWatch('production', form);

    const handleClickAdd = () => {
        setShowModal(true);
    }

    const handleCancel = () => {
        setShowModal(false);
    }

    const getMediData = ()=>{
        axios({
            method: "post",
            url:'/admin/listAllPrescription/',
            // headers: {
            //   'token': token
            // }
        })
            .then(res => {
                // console.log(res.data.data.prescriptionList);
                setMediList(res.data.data.prescriptionList);
                // console.log(data);
            })
    }

    const handleAdd = () => {
        setShowModal(false);
        axios({
            method: "post",
            url: "/admin/createPrescription/",
            data: {
                approval_number: AddApproval,
                name: AddName,
                price: AddPrice,
                production_unit: AddProduction,
            },
            // headers: {
            //     token: localStorage.getItem("userToken")
            // }
        })
            .then(res => {
                // console.log(res.data);
                // setDoctors(res.data.data.doctorList);
                // console.log(doctors);
                getMediData();
            })
    }

    return (
        <div
            style={{
                height: 500,
                overflow: 'auto',
                padding: '0',
                border: 'none',
            }}
        >
            <Button
                onClick={handleClickAdd}
                type="primary"
                style={{
                    marginBottom: 16,
                }}
            >
                添加药品
            </Button>
            <Box css={{
                height: 450,
                overflow: 'auto',
                padding: '0 10px 0 0',
                '&::-webkit-scrollbar': {
                    width: '4px',
                },
                '&::-webkit-scrollbar-track': {
                    width: '6px',
                },
                '&::-webkit-scrollbar-thumb': {
                    background: '#cccccc',
                    borderRadius: '24px',
                },
            }}>
                <Table dataSource={mediList} columns={columns}
                       pagination={false}
                       className='medicineList'
                       rowKey={(record) => record.id}
                >
                </Table>
                <Modal
                    title="添加药品"
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
                        <Form.Item label="批准文号" name="approval">
                            <Input />
                        </Form.Item>
                        <Form.Item label="药品名称" name="name">
                            <Input />
                        </Form.Item>
                        <Form.Item label="单价" name="price">
                            <InputNumber min={1}/>
                        </Form.Item>
                        <Form.Item label="生产厂家" name="production">
                            <Input />
                        </Form.Item>
                    </Form>
                </Modal>
            </Box>
        </div>
    );
}


function ExaminationList(props) {
    const [examList, setExamList] = useState(props.ExamList);
    const [showModal, setShowModal] = useState(false);
    const [form] = Form.useForm();
    const AddName = Form.useWatch('name', form);
    const AddPrice = Form.useWatch('price', form);
    const AddDepartmentID = Form.useWatch('departmentID', form);
    const AddDetail = Form.useWatch('detail', form);

    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters, dataIndex, confirm) => {
        clearFilters();
        handleSearch([], confirm, dataIndex);
    };
    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters}) => (
            <div
                style={{
                    padding: 10,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <Row gutter={8}>
                    <Col span={17}>
                        <Input
                            size='sm'
                            focusBorderColor='navy.500'
                            ref={searchInput}
                            placeholder={`请输入关键词`}
                            value={selectedKeys[0]}
                            onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                            onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        />
                    </Col>
                    <Col span={3}>
                        <Button
                            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                            size="sm"
                            color='navy.500'
                            style={{marginTop:3}}
                        >
                            <SearchIcon />
                        </Button>
                    </Col>
                    <Col span={3}>
                        <Button
                            onClick={() => clearFilters && handleReset(clearFilters, dataIndex, confirm)}
                            size="sm"
                            color='navy.500'
                            style={{marginTop:3}} >
                            <RedoOutlined />
                        </Button>
                    </Col>
                </Row>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchIcon
                style={{
                    color: filtered ? '#1b3bbb' : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
    });

    const htmlDecode = (input) => {
        var e = document.createElement('div');
        e.innerHTML = input;
        console.log(e.childNodes[0]);
        let ret = e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
        console.log(ret);
        return ret;
    }

    const columns = [
        {
            title: '科室',
            dataIndex: 'department',
            key: 'department',
            sorter: (a, b) => a.department.localeCompare(b.department),
            sortDirections: ['descend', 'ascend'],
            width: 150,
            render: (_, record) => (
                <Text>{record.department}</Text>
            ),
        },
        {
            title: '项目',
            dataIndex: 'name',
            key: 'name',
            ...getColumnSearchProps('name'),
            sorter: (a, b) => a.name.localeCompare(b.name),
            sortDirections: ['descend', 'ascend'],
            render: (_, record) => (
                <Text>
                    {record.name}
                </Text>
            ),
            ellipsis: true,
            width: 400
        },
        {
            title: '价格',
            dataIndex: 'price',
            key: 'price',
            sorter: (a, b) => a.price - b.price,
            sortDirections: ['descend', 'ascend'],
            width: 200,
            render:(_,record) =>(
                <Text>{record.price}</Text>
            )
        },
    ];

    const getExamData = ()=>{
        axios({
            method: "post",
            url:'/admin/listAllInspection/',
            // headers: {
            //   'token': token
            // }
        })
            .then(res => {
                console.log(res.data.data.inspectionList);
                setExamList(res.data.data.inspectionList);
                // console.log(data);
            })
    }
    const handleClickAdd = () => {
        setShowModal(true);
    }

    const handleCancel = () => {
        setShowModal(false);
    }

    const handleAdd = () => {
        setShowModal(false);
        axios({
            method: "post",
            url: "/admin/createInspection/",
            data: {
                name: AddName,
                departmentID: AddDepartmentID,
                price: AddPrice,
                detail: AddDetail,
            },
            // headers: {
            //     token: localStorage.getItem("userToken")
            // }
        })
            .then(res => {
                console.log(res.data);
                // setDoctors(res.data.data.doctorList);
                // console.log(doctors);
                getExamData();
            })
    }

    return (
        <div
            style={{
                height: 500,
                overflow: 'auto',
                padding: '0',
                border: 'none',
            }}
        >
            <Box css={{
                height: 450,
                overflow: 'auto',
                padding: '0 10px 0 0',
                '&::-webkit-scrollbar': {
                    width: '4px',
                },
                '&::-webkit-scrollbar-track': {
                    width: '6px',
                },
                '&::-webkit-scrollbar-thumb': {
                    background: '#cccccc',
                    borderRadius: '24px',
                },
            }}>
                <Button
                    onClick={handleClickAdd}
                    type="primary"
                    style={{
                        marginBottom: 16,
                    }}
                >
                    添加检查项目
                </Button>
                <Table dataSource={examList} columns={columns}
                       pagination={false}
                       className='medicineList'
                       rowKey={(record) => record.id}
                >
                </Table>
                <Modal
                    title="添加检查项目"
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
                        <Form.Item label="项目名称" name="name">
                            <Input />
                        </Form.Item>
                        <Form.Item label="所属科室" name="departmentID">
                            <Select>
                                {props.departmentList.map((item) => (
                                    <Select.Option value={item.departmentID}>{item.departmentName}</Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item label="项目价格" name="price">
                            <InputNumber min={1}/>
                        </Form.Item>
                        <Form.Item label="详情" name="detail">
                            <Input.TextArea />
                        </Form.Item>
                    </Form>
                </Modal>
            </Box>
        </div>
    );
}

function Medicine(){
    const [mediList, setMediList] = useState();
    const [examList, setExamList] = useState();
    const [departmentList, setDepartmentList] = useState();
    const getMediData = ()=>{
        axios({
            method: "post",
            url:'/admin/listAllPrescription/',
            // headers: {
            //   'token': token
            // }
        })
            .then(res => {
                console.log(res.data.data.prescriptionList);
                setMediList(res.data.data.prescriptionList);
                // console.log(data);
            })
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
    const getExamData = ()=>{
        axios({
            method: "post",
            url:'/admin/listAllInspection/',
            // headers: {
            //   'token': token
            // }
        })
            .then(res => {
                console.log(res.data.data.inspectionList);
                setExamList(res.data.data.inspectionList);
                // console.log(data);
            })
    }
    useEffect(()=>{
        getMediData();
        getExamData();
        getDepartments();
    },[])



    return(
        <div className='manageCard'>
            <div>
                {mediList !== undefined && examList !== undefined && departmentList !== undefined &&
                    <Tabs
                        defaultActiveKey="1"
                        onChange={onChange}
                        items={[
                            {
                                label: `药品管理`,
                                key: '1',
                                children: <MedicineList
                                    MediList={mediList}
                                    // MediList={data.MedicineList}
                                />,
                            },
                            {
                                label: `检查管理`,
                                key: '2',
                                children: <ExaminationList
                                    ExamList={examList}
                                    departmentList={departmentList}
                                    // ExamList={data.ExaminationList}
                                />,
                            },
                        ]}
                    />
                }
            </div>
        </div>
    )
}

export default Medicine;
