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
    Image, Popconfirm
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
import {Box, Heading, HStack, Input, Link, Progress, Tag, TagLabel, Tooltip} from "@chakra-ui/react";
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

const BoardList = [
    {
        key: '1',
        mallowance: '胡彦斌',
        mname: 'asdfasd',
        mcompany: 'asdfasd',
        mprice: 123,
    },
];

const PassageList = [
    {
        key: '1',
        edepartment: '胡彦斌',
        ename: 'asdfasd',
        eprice: 123,
    },
];

function BoardPassageList(props) {

    const [BoardList, setBoardList] = useState({});
    const [citenum, setCitenum] = useState([]);
    const [maxcite, setMaxcite] = useState(0);


    const handlePaper = (url)=>{
        window.open(url)
    }


    useEffect(() =>{
        if (props.BoardList){
            setBoardList(props.BoardList)
        }
        console.log(BoardList.length)
        // getData()
    }, [props])

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
    const [current, setCurrent]=React.useState(1);


    const htmlDecode = (input) => {
        var e = document.createElement('div');
        e.innerHTML = input;
        console.log(e.childNodes[0]);
        let ret = e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
        console.log(ret);
        return ret;
    }
    const [count, setCount] = useState(2);
    const handleAdd = () => {

    };
    const handleDelete = (key) => {
        const newData = BoardList.filter((item) => item.key !== key);
        setBoardList(newData);
    };

    const columns = [
        {
            title: '标题',
            dataIndex: 'mallowance',
            key: 'mallowance',
            sorter: (a, b) => a.mallowance.localeCompare(b.mallowance),
            sortDirections: ['descend', 'ascend'],
            width: 150,
            render: (_, record) => (
                <Text>{record.mallowance}</Text>
            ),
        },
        {
            title: '时间',
            dataIndex: 'mname',
            key: 'mname',
            ...getColumnSearchProps('mname'),
            render: (_, record) => (
                <Tooltip label={record.mname} aria-label='A tooltip'>
                    <Text>
                        {record.mname.replace(/<[^>]*>/g, '')}
                    </Text>
                </Tooltip>
            ),
            ellipsis: true,
            width: 400
        },
        {
            title: '操作',
            dataIndex: 'operation',
            render: (_, record) =>
                BoardList.length >= 1 ? (
                    <Popconfirm title="确认删除?" onConfirm={() => handleDelete(record.key)}>
                        <a>删除</a>
                    </Popconfirm>
                ) : null,
        },
    ];

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
                onClick={handleAdd}
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
                <Table dataSource={props.BoardList} columns={columns}
                       pagination={false}
                       className='boardList'
                       rowKey={(record) => record.mid}
                >
                </Table>
            </Box>
        </div>
    );
}

function DataChart(props) {
    React.useEffect(() => {
        setSeries([{data:props.count,name:'数量'}])
    },[props])
    const [options, setOptions] = React.useState(
        {
            chart: {
                type: 'bar',
            },
            xaxis: {
                categories: [2018,2019,2020,2021,2022]
            },
            plotOptions: {
                bar: {
                    columnWidth: '40%',
                    borderRadius: 6
                },
            },
            dataLabels: {
                enabled: false
            },
            fill: {
                type: 'gradient',
                gradient: {
                    type: 'vertical',
                    gradientToColors: ['#3a3af1'],
                    opacityFrom: 0.96,
                    opacityTo: 0.2,
                    stops:[0,100]
                }
            },
        }
    )
    const [series, setSeries] = React.useState(
        [{
        }]
    );
    return(
        <Box boxShadow='xs' rounded='md'
             borderRadius='25px' border='2px' borderColor='gray.200'
             className='chart'>
            <Row>
                {props.icon}

                <Heading className='chart-head'>{props.title}</Heading>
            </Row>
            <Chart options={options} series={series} type="bar" style={{marginTop:'0px'}}/>
        </Box>
    )
}

function HealthyPassageList(props) {

    const [PassageList, setPassageList] = useState({});

    useEffect(() =>{
        if (props.PassageList){
            setPassageList(props.PassageList)
        }
        console.log(PassageList.length)
        // getData()
    }, [props])

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
    const [current, setCurrent]=React.useState(1);


    const htmlDecode = (input) => {
        var e = document.createElement('div');
        e.innerHTML = input;
        console.log(e.childNodes[0]);
        let ret = e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
        console.log(ret);
        return ret;
    }
    const [count, setCount] = useState(2);
    const handleAdd = () => {

    };
    const handleDelete = (key) => {
        const newData = PassageList.filter((item) => item.key !== key);
        setPassageList(newData);
    };

    const columns = [
        {
            title: '标题',
            dataIndex: 'edepartment',
            key: 'edepartment',
            sorter: (a, b) => a.edepartment.localeCompare(b.edepartment),
            sortDirections: ['descend', 'ascend'],
            width: 150,
            render: (_, record) => (
                <Text>{record.edepartment}</Text>
            ),
        },
        {
            title: '时间',
            dataIndex: 'ename',
            key: 'ename',
            ...getColumnSearchProps('ename'),
            sorter: (a, b) => a.ename.localeCompare(b.ename),
            sortDirections: ['descend', 'ascend'],
            render: (_, record) => (
                <Text>
                    {record.ename}
                </Text>
            ),
            ellipsis: true,
            width: 400
        },
        {
            title: '操作',
            dataIndex: 'operation',
            render: (_, record) =>
                PassageList.length >= 1 ? (
                    <Popconfirm title="确认删除?" onConfirm={() => handleDelete(record.key)}>
                        <a>删除</a>
                    </Popconfirm>
                ) : null,
        },
    ];

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
                onClick={handleAdd}
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
                <Table dataSource={props.PassageList} columns={columns}
                       pagination={false}
                       className='boardList'
                       rowKey={(record) => record.mid}
                >
                </Table>
            </Box>
        </div>
    );
}

function Board(){

    return(
        <div className='manageCard'>
            <div>
                <Tabs
                    defaultActiveKey="1"
                    onChange={onChange}
                    items={[
                        {
                            label: `就医须知`,
                            key: '1',
                            children: <BoardPassageList
                                BoardList={BoardList}
                                // MediList={data.MedicineList}
                            />,
                        },
                        {
                            label: `健康科普`,
                            key: '2',
                            children: <HealthyPassageList
                                PassageList={PassageList}
                                // ExamList={data.ExaminationList}
                            />,
                        },
                    ]}
                />
            </div>
        </div>
    )
}

export default Board;
