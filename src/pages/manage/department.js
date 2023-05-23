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

const DList = [
    {
        key: '1',
        did: 1,
        pname: '心脏外科',
        pdate: 123,
        pcite: 456,
        scheduleRegister: 1000,
        doctors: [['doctor1',1], ['doctor2',2], ['doctor3',3]],
        intro: '详细介绍'
    },
];

function DepartmentList(props) {

    const [DList, setDList] = useState({});
    const [citenum, setCitenum] = useState([]);


    useEffect(() =>{
        if (props.DList){
            setDList(props.DList)
            var max = 0
            props.DList.forEach((item)=>{
                if(item.pcite > max){
                    max = item.pcite
                }
            });
            props.DList.forEach((item)=>{
                item.max_cite = max
            });
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
            dataIndex: 'pname',
            key: 'pname',
            ...getColumnSearchProps('pname'),
            sorter: (a, b) => a.pname.localeCompare(b.pname),
            sortDirections: ['descend', 'ascend'],
            render: (_, record) => (
                <Text>{record.pname}</Text>
            ),
            ellipsis: true,
            width: 400
        },{
            title: '医生人数',
            dataIndex: 'pdate',
            key: 'pdate',
            sorter: (a, b) => a.pdate - b.pdate,
            sortDirections: ['descend', 'ascend'],
            width: 150,
            render: (_, record) => (
                <Text>{record.pdate}</Text>
            ),
        },{
            title: '本月挂号量',
            dataIndex: 'pcite',
            key: 'pcite',
            sorter: (a, b) => a.pcite - b.pcite,
            sortDirections: ['descend', 'ascend'],
            width: 200,
            render:(_,record) =>(
                <Row>
                    <Text>{record.pcite}</Text>
                    <Progress
                        style={{margin:'auto'}}
                        colorScheme='frog'
                        h='7px'
                        borderRadius='10px'
                        w='110px'
                        value={100 * record.pcite / (record.scheduleRegister)}/>
                </Row>
            )
        },
        {
            title: '本月放号量',
            dataIndex: 'scheduleRegister',
            key: 'scheduleRegister',
            sorter: (a, b) => a.scheduleRegister - b.scheduleRegister,
            sortDirections: ['descend', 'ascend'],
            width: 200,
            render:(_,record) =>(
                <Row>
                    <Text>{record.scheduleRegister}</Text>
                </Row>
            )
        },
    ];
    const options= {
        chart: {
            type: 'area',
            zoom: {
                enabled: false
            }
        },
        dataLabels: {
            enabled: false
        },
        colors:['#98bcdf'],
        stroke: {
            curve: 'smooth'
        },
        title: {
            text: '引用量',
            align: 'left'
        },
        xaxis: {
            categories: [2018,2019,2020,2021,2022]
        },
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
                <Table dataSource={props.DList} columns={columns}
                       pagination={false}
                       className='paperList'
                       rowKey={(record) => record.did}
                       expandable={{
                           expandedRowRender: (record) => (
                               <Row >
                                   <Col span={15} offset={1}>
                                       <Heading as='h4' size='md' mb={'10px'}>
                                           <div dangerouslySetInnerHTML={{ __html: record.pname }} />
                                       </Heading>
                                       <Row className='expand'>
                                           {
                                               record.doctors.map((value, key) => {
                                                   return (
                                                       <Text fontSize='sm' mr='25px' mt='5px' color='#98bcdf'>{value[0]}, </Text>
                                                   );})
                                           }
                                       </Row>
                                       <div style={{marginTop: '10px'}} dangerouslySetInnerHTML={{ __html: record.intro }} />
                                   </Col>
                               </Row>
                           ),
                       }}>
                </Table>
            </Box>
        </div>
    );
}

function Department(){

    return(
        <div className='manageCard'>
            <div>
                {/*<DepartmentList DList={data.DList}/>*/}
                <DepartmentList DList={DList}/>
            </div>
        </div>
    )
}

export default Department;
