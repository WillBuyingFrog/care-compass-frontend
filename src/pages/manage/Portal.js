import "antd/dist/antd.min.css";
import './portal.css';
import default_avatar from '../../assets/doctors.png';
import papers from '../../assets/doctors.png';
import cat from '../../assets/doctors.png';
import cite from '../../assets/doctors.png';
import coauthor from '../../assets/doctors.png';
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
    Image,
    message
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

function DoctorDataList(props) {
    const [workscount, setWorkscount] = useState();
    const [citescount, setCitescount] = useState();
    const [worksyear, setWorksyear] = useState([]);
    const [citesyear, setCitesyear] = useState([]);

    useEffect(() =>{
        setWorkscount(props.workscount);
        setCitescount(props.citescount);
        setWorksyear(props.worksyear);
        setCitesyear(props.citesyear);
    }, [props])
    console.log(workscount)
    console.log(citescount)
    console.log(worksyear)
    console.log(citesyear)
    return (
        <div
            style={{
                height: 500,
                overflow: 'auto',
                padding: '0',
                border: 'none',
            }}
            css={{
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
              }}
        >
            <Box
                id="scrollableDataList"
                style={{
                    height: 450,
                    overflow: 'auto',
                    padding: '0 25px',
                    border: 'none',
                }}
                css={{
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
                  }}
            >
                <Row>
                    <Col span={12}>
                        <DataChart
                            count={worksyear}
                            title={<Text className={'dark-text'} style={{color :'#4A5568'}}>近五年论文数量</Text>}
                            icon={<IoNewspaperSharp className='chart-icon' />}
                        ></DataChart>
                    </Col>
                    <Col span={12}>
                        <Image
                            src={papers}
                            preview={false}
                            style={{
                                width: '80%',
                                margin: 'auto',
                                marginTop: '50px',
                            }}></Image>
                        {citescount &&
                            <Typography
                                style={{
                                    padding: '0px 0 0 50px',
                                }}
                            >
                                <Text
                                    className={'dark-text'}
                                    style={{
                                        fontSize: '36px',
                                        fontWeight: 'bold',
                                        letterSpacing: '3px',
                                        color: '#4A5568',
                                    }}
                                >
                                    发表总论文数为
                                </Text>
                                <Text
                                    style={{
                                        margin: '0 0 0 20px',
                                        color: '#3a3af1',
                                        fontSize: '36px',
                                        fontWeight: 'bold',
                                        letterSpacing: '3px',
                                    }}
                                >
                                    {separator(workscount)}
                                </Text>
                            </Typography>
                        }
                    </Col>
                </Row>
                <Row
                    style={{
                        marginBottom: '30px',
                    }}
                >
                    <Col span={12}>
                        <Image
                            src={cite}
                            preview={false}
                            style={{
                                width: '80%',
                                margin: 'auto',
                                marginTop: '50px',
                            }}></Image>
                        {citescount &&
                            <Typography
                                style={{
                                    padding: '0px 0 0 0px',
                                }}
                            >
                                <Text
                                    className={'dark-text'}
                                    style={{
                                        margin: '200px 0 0 10px',
                                        fontSize: '36px',
                                        fontWeight: 'bold',
                                        letterSpacing: '3px',
                                        color: '#4A5568',
                                    }}
                                >
                                    总被引用量为
                                </Text>
                                <Text
                                    style={{
                                        margin: '200px 0 0 20px',
                                        color: '#3a3af1',
                                        fontSize: '36px',
                                        fontWeight: 'bold',
                                        letterSpacing: '3px',
                                    }}
                                >
                                    {separator(citescount)}
                                </Text>
                            </Typography>
                        }
                    </Col>
                    <Col span={12}>
                        <DataChart
                            count={citesyear}
                            title={<Text className={'dark-text'} style={{color :'#4A5568'}}>近五年被引数量</Text>}
                            icon={<FaQuoteLeft className='chart-icon' />}
                        ></DataChart>
                    </Col>
                </Row>

            </Box>
        </div>
    )
}

function Portal() {
    // const DoctorInfo =
    //     {
    //         key: '1',
    //         did: 1,
    //         dname: '医生姓名',
    //         ddepart: '心脏外科',
    //         dstatus: '知名专家',
    //         dtotal: '历史累计挂号量（本平台）',
    //         darea: '专业领域',
    //         d3days: [['2023.5.23(周二)', '上午', 25, 25], ['2023.5.24(周三)', '上午', 23, 25], ['2023.5.23(周三)', '上午', 20, 25]],
    //         dintro: '详细介绍'
    //     };
    let location = useLocation()
    console.log(location.pathname)
    let doctorData = {}
    var doctorID
    const [data, setData] = useState({});

    useEffect(() => {
        if(location.pathname.slice(-2,-1) == '/'){
            doctorID=parseInt(location.pathname.slice(-1))
        }
        else{
            doctorID=parseInt(location.pathname.slice(-2))
        }
        // setData(DoctorInfo);
        console.log(doctorID)
        axios.post('/admin/getOneDoctor/',JSON.stringify({
            //之后获取真正ID
            doctorID:doctorID
        }))
        .then(res=>{
            console.log(res)
            if(res.data.code === 0){
                doctorData=res.data.data
                setData(doctorData)
            }
            else{
                message.error(res.data.msg)
            }
        })
    }, [])
    const columns = [
        {
            title:'日期',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title:'时间段',
            dataIndex: 'time',
            key: 'time',
        },
        {
            title:'已约数/放号数',
            dataIndex: 'data',
            key: 'data',
        }
    ]

    const navigate = useNavigate();
    let params = new URLSearchParams(location.search)
    var RID;
    if(params.has('RID')){
        RID = params.get('RID')
    }else {
        RID = ''
    }
    console.log('RID:' + RID)

    // const getData = ()=>{
    //     axios({
    //         method: "post",
    //         url: "/scholarPortal",
    //         data: {
    //             RID: RID,
    //         },
    //         headers: {
    //             token: localStorage.getItem("userToken")
    //         }
    //     })
    //     .then(res => {
    //         setData(res.data.data)
    //         console.log(res.data.data)
    //     })
    // }
    // useEffect(() => {
    //     getData();
    // }, [])

    //用于转换为合适table的格式，存到d3days2中
    function convertD3days(temData){
        let endData=[]
        if(temData != null){
            for(let i=0 ; i < temData.length ; i++){
                let temp = {
                    date:temData[i].date,
                    time:temData[i].time == 0 ? '上午':'下午',
                    data:`${temData[i].already}/${temData[i].total}`
                }
                endData.push(temp)
            }
        }
        return endData
    }

    //用于在table中展示数据
    const d3days2=convertD3days(data.threeDays)

    //判断button是否展示（仅管理员显示）
    function showButton(){

        //判断条件
        if(localStorage.getItem('userType') === '0'){
            return (<div
            style={{
                width: '130px',
            }}
        >
            <Image src={cat} height='80px' preview={false}
            ></Image>
            <Button
                type="primary"
                icon={<FormOutlined />}
                size="large"
                shape={"round"}
                style={{
                    float: 'right',
                    margin: '-7px 40px 16px 24px',
                    // backgroundColor: '#859dda',
                    border: 'none',
                    boxShadow: '4px 4px 15px 0 rgba(0,0,0,0.3)',
                    width: '100px',
                }}
                onClick={() => {
                    //需要doctorID
                    console.log(data)
                    console.log('this is data')
                    navigate('/editPortal',{state:{price:data.price,title:data.title,area:data.area,intro:data.intro,doctorID:location.pathname.slice(-2,-1) == '/'?doctorID=parseInt(location.pathname.slice(-1)):doctorID=parseInt(location.pathname.slice(-2))}});
                }}
            >
                编辑
            </Button>
        </div>)
        }
        else{
            return
        }
    }
    const institute_name = (institute) => {
        var name = institute.split('|')[0]
        return name
    }

    const reformCoauthor = (coauthors) => {
        for (var i = 0; i < coauthors.length; i++) {
            coauthors[i].institute = institute_name(coauthors[i].institute);
        }
        return coauthors
    }

    // hover style
    // homepage
    const [homepageIsHover, setHomepageIsHover] = useState(false)
    const handleMouseEnterHomepage = () => {
        setHomepageIsHover(true)
    }
    const handleMouseLeaveHomepage = () => {
        setHomepageIsHover(false);
    }
    const homepageStyle = {
        textDecoration: homepageIsHover ? 'underline' : 'none'
    }

    // institute
    const [instituteIsHover, setInstituteIsHover] = useState(false)
    const handleMouseEnterInstitute = () => {
        setInstituteIsHover(true)
    }
    const handleMouseLeaveInstitute = () => {
        setInstituteIsHover(false);
    }
    const instituteStyle = {
        textDecoration: instituteIsHover ? 'underline' : 'none'
    }

    return (
        <Layout className="portal">
            <MyHeader></MyHeader>
            <Content
                style={{
                    padding: '50px 100px 20px 100px',
                    backgroundColor: 'rgb(230,235,247)',
                    height: '90vh'
                }}
            >
                <div
                    style={{
                        padding: '24px',
                        minHeight: '150px',
                        background: 'linear-gradient(360deg,rgba(255,255,255,1.0), rgba(255,255,255,0.0))',
                        boxShadow: '4px 4px 15px 0 rgba(0,0,0,0.1)',
                        borderRadius: '20px',
                    }}
                >
                    <Row>
                        <Col span={5}>
                            <Avatar
                                size={130}
                                // icon={<UserOutlined />}
                                style={{
                                    boxShadow: '4px 4px 15px 0 rgba(0,0,0,0.2)',
                                    margin: '10px 0 0 30px',
                                }}
                                src={default_avatar}
                            />
                        </Col>
                        <Col span={15}>
                            <Typography
                                style={{
                                    padding: '0 0 0 10px',
                                }}
                            >
                                <Title
                                    className="dark-text"
                                    style={{
                                        textShadow: '4px 4px 6px rgba(0,0,0,0.2)',
                                        color: '#4A5568',
                                    }}
                                >
                                    {data.doctorName}
                                </Title>
                                <Paragraph>
                                    <Space>
                                        <HomeOutlined style={{color :'#4A5568'}}/>
                                    </Space>
                                    <Text
                                        style={{color :'#4A5568'}}
                                        // href={"/institute?IID=" + data.r_IID} isExternal
                                    > {data.title} </Text>
                                </Paragraph>
                                <Paragraph>
                                    <Space>
                                        <BulbOutlined style={{color :'#4A5568'}} />
                                    </Space>
                                    <Text style={{color :'#4A5568'}}> {data.area}</Text>
                                </Paragraph>
                                {data.count != "none" &&
                                    <Paragraph>
                                        <Space>
                                            <MailOutlined style={{color :'#4A5568'}}/>
                                        </Space>
                                        <Text style={{color :'#4A5568'}}> {'历史累计挂号量：'+data.count}</Text>
                                    </Paragraph>
                                }
                                {data.intro != "none" &&
                                    <Paragraph>
                                        <Space>
                                            <SolutionOutlined style={{color :'#4A5568'}}/>
                                        </Space>
                                        <Text style={{color :'#4A5568'}}> {data.intro}</Text>
                                    </Paragraph>
                                }
                            </Typography>
                        </Col>
                        <Col span={4}>
                            {showButton()}
                        </Col>
                    </Row>
                </div>
                {/* <div
                    style={{
                        marginTop: '30px',
                        padding: '24px',
                        backgroundColor: 'white',
                        height: '550px',
                        boxShadow: '4px 4px 15px 0 rgba(0,0,0,0.1)',
                        borderRadius: '20px',
                    }}
                >
                    <DoctorDataList
                        workscount={data.rworkscount}
                        worksyear={data.rworksyear}
                        citescount={data.rcitescount}
                        citesyear={data.rcitesyear}
                    />
                </div> */}
                <div
                    style={{
                        marginTop: '30px',
                        padding: '24px',
                        backgroundColor: 'white',
                        height: '300px',
                        boxShadow: '4px 4px 15px 0 rgba(0,0,0,0.1)',
                        borderRadius: '20px',
                    }}
                >
                    <Table dataSource={d3days2} columns={columns} className='plist' scroll={{ y: 200 }} pagination={false}></Table>
                </div>
            </Content>
        </Layout>
    );
}
export default Portal;
