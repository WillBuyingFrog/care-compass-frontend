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
    Image
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

    const [MediList, setMediList] = useState({});
    const [citenum, setCitenum] = useState([]);
    const [maxcite, setMaxcite] = useState(0);


    const handlePaper = (url)=>{
        window.open(url)
    }


    useEffect(() =>{
        if (props.MediList){
            setMediList(props.MediList)
        }
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

    const columns = [
        {
            title: '批准文号',
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
            title: '药品名称',
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
            title: '生产单位',
            dataIndex: 'mcompany',
            key: 'mcompany',
            width: 150,
            render: (_, record) => (
                <Text>{record.mcompany}</Text>
            ),
        },{
            title: '价格',
            dataIndex: 'mprice',
            key: 'mprice',
            sorter: (a, b) => a.mprice - b.mprice,
            sortDirections: ['descend', 'ascend'],
            width: 200,
            render:(_,record) =>(
                <Text>{record.mprice}</Text>
            )
        }
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
                <Table dataSource={props.MediList} columns={columns}
                       pagination={false}
                       className='medicineList'
                       rowKey={(record) => record.mid}
                       // expandable={{
                       //     expandedRowRender: (record) => (
                       //         <Row >
                       //             <Col span={15} offset={1}>
                       //                 <Heading as='h4' size='md' mb={'10px'}>
                       //                     <div dangerouslySetInnerHTML={{ __html: record.mname }} />
                       //                 </Heading>
                       //                 <Row className='expand'>
                       //                     {
                       //                         record.pauthorname.map((value, key) => {
                       //                             return (
                       //                                 <Text fontSize='sm' mr='25px' mt='5px' color='#98bcdf'>{value}, </Text>
                       //                             );})
                       //                     }
                       //                 </Row>
                       //                 <div style={{marginTop: '10px'}} dangerouslySetInnerHTML={{ __html: record.pabstract }} />
                       //                 <Row>
                       //                     {
                       //                         record.pconcepts.map((value, key) => (
                       //                             key<8? (
                       //                                 <Tag size='sm' mt='3px' variant='subtle' bg='#627cd177' color='white' mr='20px'>
                       //                                     <TagLabel>{value}</TagLabel>
                       //                                 </Tag>
                       //                             ):(<p></p>)
                       //                         ))
                       //                     }
                       //                 </Row>
                       //             </Col>
                       //             <Col span={7} style={{marginLeft:'20px'}}>
                       //                 <Chart options={options}
                       //                        series={[{data:record.pcitednum.reverse(), name:'引用量'}]}
                       //                        type="area" height={250} />
                       //             </Col>
                       //         </Row>
                       //     ),
                       // }}
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

function ExaminationList(props) {

    const [ExamList, setExamList] = useState({});

    useEffect(() =>{
        if (props.ExamList){
            setExamList(props.ExamList)
        }
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

    const columns = [
        {
            title: '科室',
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
            title: '项目',
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
            title: '价格',
            dataIndex: 'eprice',
            key: 'eprice',
            sorter: (a, b) => a.eprice - b.eprice,
            sortDirections: ['descend', 'ascend'],
            width: 200,
            render:(_,record) =>(
                <Text>{record.eprice}</Text>
            )
        }
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
                <Table dataSource={props.MediList} columns={columns}
                       pagination={false}
                       className='medicineList'
                       rowKey={(record) => record.mid}
                    // expandable={{
                    //     expandedRowRender: (record) => (
                    //         <Row >
                    //             <Col span={15} offset={1}>
                    //                 <Heading as='h4' size='md' mb={'10px'}>
                    //                     <div dangerouslySetInnerHTML={{ __html: record.mname }} />
                    //                 </Heading>
                    //                 <Row className='expand'>
                    //                     {
                    //                         record.pauthorname.map((value, key) => {
                    //                             return (
                    //                                 <Text fontSize='sm' mr='25px' mt='5px' color='#98bcdf'>{value}, </Text>
                    //                             );})
                    //                     }
                    //                 </Row>
                    //                 <div style={{marginTop: '10px'}} dangerouslySetInnerHTML={{ __html: record.pabstract }} />
                    //                 <Row>
                    //                     {
                    //                         record.pconcepts.map((value, key) => (
                    //                             key<8? (
                    //                                 <Tag size='sm' mt='3px' variant='subtle' bg='#627cd177' color='white' mr='20px'>
                    //                                     <TagLabel>{value}</TagLabel>
                    //                                 </Tag>
                    //                             ):(<p></p>)
                    //                         ))
                    //                     }
                    //                 </Row>
                    //             </Col>
                    //             <Col span={7} style={{marginLeft:'20px'}}>
                    //                 <Chart options={options}
                    //                        series={[{data:record.pcitednum.reverse(), name:'引用量'}]}
                    //                        type="area" height={250} />
                    //             </Col>
                    //         </Row>
                    //     ),
                    // }}
                >
                </Table>
            </Box>
        </div>
    );
}

function Medicine(){

    return(
        <div className='manageCard'>
            <div>
                <Tabs
                    defaultActiveKey="1"
                    onChange={onChange}
                    items={[
                        {
                            label: `药品管理`,
                            key: '1',
                            children: <MedicineList
                                MediList={MediList}
                                // MediList={data.MedicineList}
                            />,
                        },
                        {
                            label: `检查管理`,
                            key: '2',
                            children: <ExaminationList
                                MediList={ExamList}
                                // ExamList={data.ExaminationList}
                            />,
                        },
                    ]}
                />
            </div>
        </div>
    )
}

export default Medicine;
