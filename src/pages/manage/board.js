/**
 * 后台管理/公告管理
 */
import './board.css';
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

function AnnouncementList(props) {

    const [AList, setAList] = useState(props.AList);
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
            title: '标题',
            dataIndex: 'title',
            key: 'title',
            sorter: (a, b) => a.title.localeCompare(b.title),
            sortDirections: ['descend', 'ascend'],
            render: (_, record) => (
                <Text>{record.title}</Text>
            ),
        },
        {
            title: '时间',
            dataIndex: 'time',
            key: 'time',
            ...getColumnSearchProps('time'),
            render: (_, record) => (
                <Tooltip label={record.time} aria-label='A tooltip'>
                    <Text>
                        {record.time.split('T')[0]} {record.time.split('T')[1].split('.')[0]}
                    </Text>
                </Tooltip>
            ),
            ellipsis: true,
        },
        {
            title: '操作',
            dataIndex: 'operation',
            render: (_, record) => (
                    <Popconfirm title="确认删除?" onConfirm={() => handleDelete(record.announcementID)}>
                        <a>删除</a>
                    </Popconfirm>
                )
        },
    ];

    const [form] = Form.useForm();
    const AddTitle = Form.useWatch('title', form);
    const AddContent = Form.useWatch('content', form);
    // const nowTime = moment().format('YYYY-MM-DD');
    const AddType = 0;
    const nowTime = moment().format('YYYY-MM-DD HH:MM:SS')

    const handleClickAdd = () => {
        setShowModal(true);
        console.log(AList);
    }

    const handleCancel = () => {
        setShowModal(false);
    }

    const getAList = ()=>{
        axios({
            method: "post",
            url:'/admin/allAnnouncement/',
            data: {
                type: 0,
            }
            // headers: {
            //   'token': token
            // }
        })
            .then(res => {
                console.log(res.data);
                setAList(res.data.data);
                // setAllList(res.data.data.announcementList);
                // getAData(res.data.data.announcementList);
                // getPData(res.data.data.announcementList);
                // console.log(data);
            })
    }

    const handleAdd = () => {
        setShowModal(false);
        axios({
            method: "post",
            url: "/admin/addAnnouncement/",
            data: {
                title: AddTitle,
                content: AddContent,
                type: AddType,
                // time: nowTime,
            },
            // headers: {
            //     token: localStorage.getItem("userToken")
            // }
        })
            .then(res => {
                // console.log(res.data);
                // console.log(AList);
                // setDoctors(res.data.data.doctorList);
                // console.log(doctors);
                getAList();
            })
    }
    const handleDelete = (key) => {
        axios({
            method: "post",
            url: "/admin/deleteAnnouncement/",
            data: {
                id: key,
            },
            // headers: {
            //     token: localStorage.getItem("userToken")
            // }
        })
            .then(res => {
                console.log(res.data);
                getAList();
            })
    };

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
                添加公告
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
                <Table dataSource={AList} columns={columns}
                       pagination={false}
                       className='medicineList'
                       rowKey={(record) => record.id}
                >
                </Table>
                <Modal
                    title="添加公告"
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
                        <Form.Item label="标题" name="title">
                            <Input />
                        </Form.Item>
                        <Form.Item label="内容" name="content">
                            <Input.TextArea />
                        </Form.Item>
                    </Form>
                </Modal>
            </Box>
        </div>
    );
}

function PassageList(props) {

    const [PList, setPList] = useState(props.PList);
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
            title: '标题',
            dataIndex: 'title',
            key: 'title',
            sorter: (a, b) => a.title.localeCompare(b.title),
            sortDirections: ['descend', 'ascend'],
            render: (_, record) => (
                <Text>{record.title}</Text>
            ),
        },
        {
            title: '时间',
            dataIndex: 'time',
            key: 'time',
            ...getColumnSearchProps('time'),
            render: (_, record) => (
                <Tooltip label={record.time} aria-label='A tooltip'>
                    <Text>
                        {record.time.split('T')[0]} {record.time.split('T')[1].split('.')[0]}
                    </Text>
                </Tooltip>
            ),
            ellipsis: true,
        },
        {
            title: '操作',
            dataIndex: 'operation',
            render: (_, record) => (
                    <Popconfirm title="确认删除?" onConfirm={() => handleDelete(record.announcementID)}>
                        <a>删除</a>
                    </Popconfirm>
            )
        },
    ];

    const [form] = Form.useForm();
    const AddTitle = Form.useWatch('title', form);
    const AddContent = Form.useWatch('content', form);
    const nowTime = moment().format('YYYY-MM-DD');
    const AddType = 1;

    const handleClickAdd = () => {
        setShowModal(true);
    }

    const handleCancel = () => {
        setShowModal(false);
    }

    const getPList = ()=>{
        axios({
            method: "post",
            url:'/admin/allAnnouncement/',
            data: {
                type: 1,
            }
            // headers: {
            //   'token': token
            // }
        })
            .then(res => {
                console.log(res.data);
                setPList(res.data.data);
                // getAData(res.data.data.announcementList);
                // getPData(res.data.data.announcementList);
                // console.log(data);
            })
    }

    const handleAdd = () => {
        setShowModal(false);
        axios({
            method: "post",
            url: "/admin/addAnnouncement/",
            data: {
                title: AddTitle,
                content: AddContent,
                type: AddType,
                // time: nowTime,
            },
            // headers: {
            //     token: localStorage.getItem("userToken")
            // }
        })
            .then(res => {
                console.log(res.data);
                // setDoctors(res.data.data.doctorList);
                // console.log(doctors);
                getPList();
            })
    }
    const handleDelete = (key) => {
        console.log(key)
        axios({
            method: "post",
            url: "/admin/deleteAnnouncement/",
            data: {
                id: key,
            },
            // headers: {
            //     token: localStorage.getItem("userToken")
            // }
        })
            .then(res => {
                console.log(res.data);
                getPList();
            })
    };

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
                添加文章
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
                <Table dataSource={PList} columns={columns}
                       pagination={false}
                       className='medicineList'
                       rowKey={(record) => record.id}
                >
                </Table>
                <Modal
                    title="添加文章"
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
                        <Form.Item label="标题" name="title">
                            <Input />
                        </Form.Item>
                        <Form.Item label="内容" name="content">
                            <Input.TextArea />
                        </Form.Item>
                    </Form>
                </Modal>
            </Box>
        </div>
    );
}

function Board(){
    const [allList, setAllList] = useState();
    const [AList, setAList] = useState();
    const [PList, setPList] = useState();
    const getAList = ()=>{
        axios({
            method: "post",
            url:'/admin/allAnnouncement/',
            data: {
                type: 0,
            }
            // headers: {
            //   'token': token
            // }
        })
            .then(res => {
                console.log(res.data);
                setAList(res.data.data);
                // setAllList(res.data.data.announcementList);
                // getAData(res.data.data.announcementList);
                // getPData(res.data.data.announcementList);
                // console.log(data);
            })
    }
    const getPList = ()=>{
        axios({
            method: "post",
            url:'/admin/allAnnouncement/',
            data: {
                type: 1,
            }
            // headers: {
            //   'token': token
            // }
        })
            .then(res => {
                console.log(res.data);
                setPList(res.data.data);
                // getAData(res.data.data.announcementList);
                // getPData(res.data.data.announcementList);
                // console.log(data);
            })
    }
    const getAData = (data)=>{
        let ret = [];
        for(let i = 0; i < data.length; i++){
            if(data[i].type === 0){
                ret.push(data[i]);
            }
        }
        setAList(ret);
        console.log(AList);
    }
    const getPData = (data)=>{
        let ret = [];
        for(let i = 0; i < data.length; i++){
            if(data[i].type === 1){
                ret.push(data[i]);
            }
        }
        setPList(ret);
        console.log(PList);
    }
    useEffect(()=>{
        getAList();
        getPList();
    },[])

    return(
        <div className='manageCard'>
            <div>
                {AList !== undefined && PList !== undefined &&
                    <Tabs
                        defaultActiveKey="1"
                        onChange={onChange}
                        items={[
                            {
                                label: `就医须知`,
                                key: '1',
                                children: <AnnouncementList
                                    AList={AList}
                                />,
                            },
                            {
                                label: `健康科普`,
                                key: '2',
                                children: <PassageList
                                    PList={PList}
                                />,
                            },
                        ]}
                    />
                }
            </div>
        </div>
    )
}

export default Board;
