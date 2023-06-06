/**
 * 后台管理/医生请假审批
 */
import './doctorLeave.css';
import './manage.css';
import {Avatar, Button, Link, Text, useToast} from '@chakra-ui/react'
import {Card, Row, Col, Tabs, Input, Modal, Form, Space, Table, Tag} from 'antd';
import * as echarts from 'echarts'
import React, { Component, useEffect, useRef, useState } from 'react';
import { TeamOutlined, RiseOutlined, BookOutlined, HomeOutlined, PieChartOutlined, VerifiedOutlined } from '@ant-design/icons'
import axios from 'axios';
import {SearchIcon} from "@chakra-ui/icons";
import Highlighter from "react-highlight-words";
const { Meta } = Card;

const onChange = (key) => {
    console.log(key);
};

function UncheckList() {
    const [data, setData] = useState();
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const toast = useToast();
    var token = localStorage.getItem("userToken")
    // const [unchecked, setUnchecked] = useState();

    const getData = ()=>{
        axios({
            method: "post",
            url:"admin/getAllUnLeave/",
            // headers: {
            //     'token': token
            // }
        })
            .then(res => {
                console.log(res.data.data.appList);
                setData(res.data.data.appList);
                console.log(data);
            })
    }
    useEffect(() => {
      getData();
    }, [])

    // const temp_data = [
    //     {
    //         key: '1',
    //         aaid: '1',
    //         dname: '申请人',
    //         aaname: '科室',
    //         aaemail: '请假时间',
    //         aatype: '请假类型(事假/病假)',
    //         aalastUpdateTime: '申请时间',
    //         dreason: '请假原因',
    //         docid: '工号',
    //         doctel: '联系方式',
    //     },
    // ];
    //
    // useEffect(() => {
    //     setData(temp_data)
    // }, [])

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
                            ref={searchInput}
                            placeholder={`请输入关键词`}
                            value={selectedKeys[0]}
                            onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                            onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        />
                    </Col>
                    <Col span={3}>
                        <Button colorScheme='frog'
                                onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                                size="small"
                                style={{height:30}}
                        >
                            <SearchIcon />
                        </Button>
                    </Col>
                    <Col span={3}>
                        <Button colorScheme='frog'
                                onClick={() => clearFilters && handleReset(clearFilters, dataIndex, confirm)}
                                size="small"
                                style={{height:30}}
                        >
                            重置
                        </Button>
                    </Col>
                </Row>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchIcon
                style={{
                    color: filtered ? '#1890ff' : undefined,
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

        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{
                        backgroundColor: '#ffc069',
                        padding: 0,
                    }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });
    const Detail = (props) => {
        const [isModalOpen, setIsModalOpen] = useState(false);
        const showModal = () => {
            setIsModalOpen(true);
        };
        const handleCancel = () => {
            setIsModalOpen(false);
        };
        return(
            <><Button onClick={showModal} size='sm' colorScheme='frog'>详情</Button>
                <Modal open={isModalOpen} className="modal" footer={null}
                       title='请假申请详情' width={'50vw'} onCancel={handleCancel}>
                    <div className='detailForm'>
                        <Row>
                            <Card title={props.A.department+'——'+props.A.doctorName+' 工号:'+props.A.workID} style={{width:'45vw'}}>
                                    <Form labelCol={{span:8}}>
                                        <Form.Item label='请假时间'>
                                            <div>{props.A.commitTime}</div>
                                        </Form.Item>
                                        <Form.Item label='申请时间'>
                                            <div>{props.A.commitTime}</div>
                                        </Form.Item>
                                        <Form.Item label='联系方式'>
                                            <div>{props.A.phone}</div>
                                        </Form.Item>
                                        <Form.Item label='请假类型'>
                                            <div>{props.A.type === 1 ? '病假':'事假'}</div>
                                        </Form.Item>
                                        <Form.Item label='请假理由'>
                                            <div>{props.A.reason}</div>
                                        </Form.Item>
                                    </Form>
                                </Card>
                        </Row>
                    </div>
                </Modal>
            </>
        )
    }
    const Dialogue = (props) => {
        var text;
        const [content, setContent] = useState('');
        const [isModalOpen, setIsModalOpen] = useState(false);
        const showModal = () => {
            setIsModalOpen(true);
        };
        // var token = localStorage.getItem("userToken")

        const handleOk = () => {
            console.log(content);
            console.log(props.type);
            console.log(props.appID);
            axios({
                method: 'post',
                url: "/admin/verifyApp/",
                data: {
                    appID: props.appID,
                    state: props.type,
                    verifyComment: content,
                },
                // headers: {
                //     "Content-Type": "application/json",
                //     'token': token
                // }
            })
                .then(res => {
                    if(res.data.code === 0){
                        toast({
                            description: "已"+text+"该申请！",
                            status: 'success',
                            duration: 5000,
                            isClosable: true,
                        })
                        setContent("");
                        setIsModalOpen(false);
                        getData();
                    }
                    else{
                        toast({
                            description: res.data.message,
                            status: 'error',
                            duration: 5000,
                            isClosable: true,
                        })
                        setContent("");
                        setIsModalOpen(false);
                        getData();
                    }
                    console.log(res)
                })
        };
        const handleCancel = () => {
            setIsModalOpen(false);
        };
        //如果type == 2, 拒绝
        //如果type == 1, 通过
        let bcolor
        if(props.type === 1){
            text = '通过';
            bcolor = 'whatsapp'
        }
        else{
            text = '拒绝';
            bcolor = 'red'
        }
        return (
            <><Button size='sm' onClick={showModal} colorScheme={bcolor}>
                {text}
            </Button>
                {/*<Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}*/}
                <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}
                       title='审核意见' okText="确认" cancelText="取消" className="modal">
                    <Form>
                        <Form.Item label={text+'说明'}>
                            <Input.TextArea allowClear={true} value={content} onChange={(e) => setContent(e.target.value)}
                                            autoSize={{minRows: 5, maxRows: 8}} maxLength={300} >
                            </Input.TextArea>
                        </Form.Item>
                    </Form>
                </Modal>
            </>
        )
    }

    const columns = [
        {
            title: '科室',
            dataIndex: 'department',
            key: 'department',
            ...getColumnSearchProps('department'),
            sorter: (a, b) => a.department.localeCompare(b.department),
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: '申请人',
            dataIndex: 'doctorName',
            key: 'doctorName',
            ...getColumnSearchProps('doctorName'),
            sorter: (a, b) => a.doctorName.localeCompare(b.doctorName),
            sortDirections: ['descend', 'ascend'],
            width:180
        },
        {
            title: '请假时间',
            dataIndex: 'commitTime',
            key: 'commitTime',
            ...getColumnSearchProps('commitTime'),
        },
        {
            title: '请假类型',
            dataIndex: 'type',
            key: 'type',
            ...getColumnSearchProps('type'),
            render: (_, record) => (
                <Text>{record.type === 1 ? "病假":"事假"}</Text>
            ),
        },
        {
            title: '申请时间',
            dataIndex: 'commitTime',
            key: 'commitTime',
            ...getColumnSearchProps('commitTime'),
            sorter: (a, b) => a.commitTime.localeCompare(b.commitTime),
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: '操作',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Detail A={record} />
                    <Dialogue type={1} appID={record.id}></Dialogue>
                    <Dialogue type={2} appID={record.id}></Dialogue>
                </Space>
            ),
        },
    ];

    return (
        <>{data !== undefined &&
        <div>
            <Row>
                <Col span={18}>
                    <div className='count'>未审核申请共{data.length}条</div>
                </Col>
                <Col span={6}>

                </Col>
            </Row>
            <Table dataSource={data} columns={columns} rowKey="aaid"
                   pagination={{
                       pageSize: 8,
                   }}
            ></Table>
        </div>
        }</>
    )
}

function CheckList() {
    const [data, setData] = useState();
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    var token = localStorage.getItem("userToken")
    const toast = useToast();
    useEffect(() => {
      const getData = ()=>{
        axios({
          method: "post",
          url:"/admin/getAllLeave/",
          // headers: {
          //   'token': token
          // }
        })
            .then(res => {
                console.log(res.data.data.appList);
                setData(res.data.data.appList);
                console.log(data);
            })
      }
      getData()
    }, [])

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
                            ref={searchInput}
                            placeholder={`请输入关键词`}
                            value={selectedKeys[0]}
                            onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                            onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        />
                    </Col>
                    <Col span={3}>
                        <Button colorScheme='frog'
                                onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                                size="xs"
                                style={{height:30}}
                        >
                            <SearchIcon />
                        </Button>
                    </Col>
                    <Col span={3}>
                        <Button colorScheme='frog'
                                onClick={() => clearFilters && handleReset(clearFilters, dataIndex, confirm)}
                                size="xs"
                                style={{height:30}}
                        >
                            重置
                        </Button>
                    </Col>
                </Row>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchIcon
                style={{
                    color: filtered ? '#1890ff' : undefined,
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

        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{
                        backgroundColor: '#ffc069',
                        padding: 0,
                    }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });
    const Detail = (props) => {
        const [isModalOpen, setIsModalOpen] = useState(false);
        const showModal = () => {
            setIsModalOpen(true);
        };
        const handleCancel = () => {
            setIsModalOpen(false);
        };
        return(
            <><Button onClick={showModal} size='sm' colorScheme='frog'>详情</Button>
                <Modal open={isModalOpen} className="modal" footer={null}
                       title='请假申请详情' width={'50vw'} onCancel={handleCancel}>
                    <div className='detailForm'>
                        <Row>
                            <Card title={props.A.department+'——'+props.A.doctorName+' 工号:'+props.A.workID} style={{width:'45vw'}}>
                                <Form labelCol={{span:8}}>
                                    <Form.Item label='请假时间'>
                                        <div>{props.A.leaveTime} {props.A.time === 1 ? '下午':'上午'}</div>
                                    </Form.Item>
                                    <Form.Item label='申请时间'>
                                        <div>{props.A.commitTime}</div>
                                    </Form.Item>
                                    <Form.Item label='审核时间'>
                                        <div>{props.A.verifyTime}</div>
                                    </Form.Item>
                                    <Form.Item label='联系方式'>
                                        <div>{props.A.phone}</div>
                                    </Form.Item>
                                    <Form.Item label='请假类型'>
                                        <div>{props.A.type}</div>
                                    </Form.Item>
                                    <Form.Item label='请假理由'>
                                        <div>{props.A.reason}</div>
                                    </Form.Item>
                                    <Form.Item label='审核结果'>
                                        <div>{props.A.state === 1 ? '通过':'不通过'}</div>
                                    </Form.Item>
                                    <Form.Item label='审核意见'>
                                        <div>{props.A.verifyComment}</div>
                                    </Form.Item>
                                </Form>
                            </Card>
                        </Row>
                    </div>
                </Modal>
            </>
        )
    }
    // const temp_data = [
    //     {
    //         key: '1',
    //         aaid: '1',
    //         dname: '申请人',
    //         aaname: '科室',
    //         aaemail: '请假时间',
    //         aatype: '请假类型(事假/病假)',
    //         aalastUpdateTime: '申请时间',
    //         dreason: '请假原因',
    //         docid: '工号',
    //         doctel: '联系方式',
    //         aaTime: '审核时间',
    //         aaccept: '1',
    //         aadesc: '审核意见',
    //     },
    // ];
    //
    //
    // useEffect(() => {
    //     setData(temp_data)
    // }, [])

    const columns = [
        {
            title: '科室',
            dataIndex: 'department',
            key: 'department',
            ...getColumnSearchProps('department'),
            sorter: (a, b) => a.department.localeCompare(b.department),
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: '申请人',
            dataIndex: 'doctorName',
            key: 'doctorName',
            ...getColumnSearchProps('doctorName'),
            sorter: (a, b) => a.doctorName.localeCompare(b.doctorName),
            sortDirections: ['descend', 'ascend'],
            width:180
        },
        {
            title: '请假时间',
            dataIndex: 'commitTime',
            key: 'commitTime',
            ...getColumnSearchProps('commitTime'),
        },
        {
            title: '请假类型',
            dataIndex: 'type',
            key: 'type',
            ...getColumnSearchProps('type'),
            sorter: (a, b) => a.type.localeCompare(b.type),
            sortDirections: ['descend', 'ascend'],
            render: (_, record) => (
                <Text>{record.type === 1 ? "病假":"事假"}</Text>
            ),
        },
        {
            title: '申请时间',
            dataIndex: 'commitTime',
            key: 'commitTime',
            ...getColumnSearchProps('commitTime'),
            sorter: (a, b) => a.commitTime.localeCompare(b.commitTime),
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: '审核时间',
            dataIndex: 'verifyTime',
            key: 'verifyTime',
            ...getColumnSearchProps('verifyTime'),
            sorter: (a, b) => a.verifyTime.localeCompare(b.verifyTime),
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: '审核结果',
            dataIndex: 'state',
            key: 'state',
            render: (_, record)=>(
                record.state == 1 && <Tag color='green'>通过</Tag> || record.state == 2 && <Tag color='red'>拒绝</Tag>
            )
        },
        {
            title: '操作',
            key: 'action',
            render: (_, record) => (
                <Detail A={record} />
            ),
        },
    ];

    return (
        <>{data !== undefined &&
            <div>
                <Row>
                    <Col span={18}>
                        <div className='count'>已审核申请共{data.length}条</div>
                    </Col>
                    <Col span={6}>
                    </Col>
                </Row>
                <Table dataSource={data} columns={columns} rowKey="aaid"
                       pagination={{
                           pageSize: 8,
                       }}
                ></Table>
            </div>
        }</>
    )
}

function DoctorLeave(){

    return(
        <div className='manageCard'>
            <div>
                <Tabs
                    defaultActiveKey="1"
                    onChange={onChange}
                    items={[
                        {
                            label: `待审批`,
                            key: '1',
                            children: <UncheckList />,
                        },
                        {
                            label: `已审批`,
                            key: '2',
                            children: <CheckList />,
                        },
                    ]}
                />
            </div>
        </div>
    )
}

export default DoctorLeave;
