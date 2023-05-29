/**
 * 后台管理/科室信息管理
 */
import './department.css';
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
    Image, Modal, Form, Select, Input
} from 'antd';
import {
    UserOutlined,
    HomeOutlined,
    BulbOutlined,
    FormOutlined,
    MailOutlined,
    SolutionOutlined,
    BarChartOutlined, RedoOutlined, BarsOutlined, EditOutlined,
} from '@ant-design/icons';
import React, { useRef, useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom'
import axios from "axios";
import {Box, Heading, HStack, Link, Progress, Tag, TagLabel, Tooltip, useToast} from "@chakra-ui/react";
import {FaQuoteLeft} from "react-icons/fa";
import { IoSchoolSharp, IoNewspaperSharp } from "react-icons/io5"
import MyHeader from '../../components/header/header'
import moment from "moment";
// import {useRef} from "@types/react";
import {ExternalLinkIcon, SearchIcon} from "@chakra-ui/icons";
const { Header, Content, Footer, Sider } = Layout;
const { Title, Paragraph, Text } = Typography;

function Department(){
    const [DList,setDList]=useState();
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const [showModal, setShowModal] = useState(false);
    const [editDepartmentID, setEditDepartmentID] = useState();
    const [editDepartmentName, setEditDepartmentName] = useState();
    const toast = useToast();
    const [content, setContent] = useState("");

    const handleClickEdit = (dID, dName) => {
        setShowModal(true);
        console.log(showModal);
        setEditDepartmentID(dID);
        setEditDepartmentName(dName);
        console.log(dID);
        console.log(editDepartmentID);
    }

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

    const columns = [
        {
            title: '科室',
            dataIndex: 'departmentName',
            key: 'departmentName',
            ...getColumnSearchProps('departmentName'),
            sorter: (a, b) => a.departmentName.localeCompare(b.departmentName),
            sortDirections: ['descend', 'ascend'],
            render: (_, record) => (
                <Text>{record.departmentName}</Text>
            ),
            ellipsis: true,
            width: 400
        },{
            title: '医生人数',
            dataIndex: 'doctorNum',
            key: 'doctorNum',
            sorter: (a, b) => a.doctorNum - b.doctorNum,
            sortDirections: ['descend', 'ascend'],
            width: 150,
            render: (_, record) => (
                <Text>{record.doctorNum}</Text>
            ),
        },{
            title: '本月挂号量',
            dataIndex: 'already',
            key: 'already',
            sorter: (a, b) => a.already - b.already,
            sortDirections: ['descend', 'ascend'],
            width: 200,
            render:(_,record) =>(
                <Row>
                    <Text>{record.already}</Text>
                    <Progress
                        style={{margin:'auto'}}
                        colorScheme='frog'
                        h='7px'
                        borderRadius='10px'
                        w='110px'
                        value={100 * record.already / (record.total)}/>
                </Row>
            )
        },
        {
            title: '本月放号量',
            dataIndex: 'total',
            key: 'total',
            sorter: (a, b) => a.total - b.total,
            sortDirections: ['descend', 'ascend'],
            width: 200,
            render:(_,record) =>(
                <Row>
                    <Text>{record.total}</Text>
                </Row>
            )
        },
    ];


    const handleEdit = () => {
        axios({
            method: 'post',
            url: "/admin/updateDepartment/",
            data: {
                id: editDepartmentID,
                name: editDepartmentName,
                intro: content,
            },
            // headers: {
            //     "Content-Type": "application/json",
            //     'token': token
            // }
        })
            .then(res => {
                if(res.data.code === 0){
                    toast({
                        description: "已修改！",
                        status: 'success',
                        duration: 5000,
                        isClosable: true,
                    })
                    setShowModal(false);
                    getDepartments();
                }
                else{
                    toast({
                        description: res.data.message,
                        status: 'error',
                        duration: 5000,
                        isClosable: true,
                    })
                    setShowModal(false);
                }
                setContent("");
                console.log(res)
            })
    };
    const handleCancel = () => {
        setEditDepartmentID(undefined);
        setEditDepartmentName(undefined);
        setContent("");
        setShowModal(false);
    };

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
                console.log(res)
                setDList(res.data.data.departmentList);
                console.log(res.data.data);
                console.log(res.data.data.departmentList);
                console.log(DList);
            })
    }

    useEffect(() => {
        getDepartments();
    }, [])

    return(
        <div className='manageCard'>
            <div>
                {DList !== undefined &&
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
                            <Table dataSource={DList} columns={columns}
                                   pagination={false}
                                   className='departmentList'
                                   rowKey={(record) => record.departmentID}
                                   expandable={{
                                       expandedRowRender: (record) => (
                                           <Row >
                                               <Col span={15} offset={1}>
                                                   <Heading as='h4' size='md' mb={'10px'}>
                                                       <Row>
                                                           <div dangerouslySetInnerHTML={{ __html: record.departmentName }}
                                                                style={{margin: '5px 10px 0 0'}}
                                                           />
                                                           <Tooltip title="编辑">
                                                               <Button shape="circle" icon={<EditOutlined />} onClick={()=>handleClickEdit(record.departmentID, record.departmentName)}/>
                                                           </Tooltip>
                                                       </Row>
                                                   </Heading>
                                                   <Row className='expand'>
                                                       {
                                                           record.doctorList.map((value, key) => {
                                                               return (
                                                                   <Link href={"/doctorPortal?dID=" + value.doctorID} isExternal fontSize='sm' mr='25px' mt='5px' color='#98bcdf'> {`${value.doctorName}`}</Link>
                                                               );})
                                                       }
                                                   </Row>
                                                   <div style={{marginTop: '10px'}} dangerouslySetInnerHTML={{ __html: record.intro }} />
                                                   <Modal
                                                       title="编辑科室信息"
                                                       open={showModal}
                                                       onOk={handleEdit}
                                                       onCancel={handleCancel}
                                                   >
                                                       <Form
                                                           initialValues={{}}
                                                           labelCol={{
                                                               span: 4,
                                                           }}
                                                           wrapperCol={{
                                                               span: 14,
                                                           }}
                                                           layout="horizontal"
                                                       >
                                                           <Form.Item name='EditIntro' label="科室介绍">
                                                               <Input.TextArea placeholder={record.intro} value={content} onChange={(e) => setContent(e.target.value)}/>
                                                           </Form.Item>
                                                       </Form>
                                                   </Modal>
                                               </Col>
                                           </Row>
                                       ),
                                   }}>
                            </Table>
                        </Box>
                    </div>
                }
            </div>
        </div>
    )
}

export default Department;
