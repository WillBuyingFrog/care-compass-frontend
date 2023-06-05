import { useEffect } from "react"
import "./homepage.css"
import { Row, Col, List, Modal } from 'antd';
import {Box, Text, Heading, Link, Spinner} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { FaQuoteLeft } from "react-icons/fa";
import { ImFire } from "react-icons/im";
import * as React from "react";

function separator(numb) {
    if(!numb) return ""
    var str = numb.toString().split(".");
    str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return str.join(".");
}

function Papers(props){
    const [data, setData] = useState([])
    const [cname, setCname] = useState([])
    const [isLoading, setLoading] = React.useState(true)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const getData = ()=>{
        axios({
            method: "post",
            url: '/admin/allAnnouncement/',
            data: {
                type: props.type,
            },
        })
        .then(res => {
            console.log(res.data)
            setData(res.data.data)
            // setCname(res.data.data.cName)
            setLoading(false)
          }
        )
      }
    useEffect(() =>{
        getData()
    }, [])
    if(isLoading){
        return (
            <Box boxShadow='xs' rounded='md'
                 borderRadius='25px' border='2px' borderColor='gray.200'
                 className='pbox'>
                <Row>
                    <ImFire className="chart-icon"></ImFire>
                    <Heading className="title">
                        加载中，请稍候...
                    </Heading>
                </Row>

            </Box>
        )
    }
    return (
        <Box boxShadow='xs' rounded='md'
            borderRadius='25px' border='2px' borderColor='gray.200'
            className='pbox'>
                <Row>
                    <ImFire className="chart-icon"></ImFire>
                    <Heading className="title">
                        {props.title}
                    </Heading>
                </Row>
                <List
                    bordered={true}
                    itemLayout="horizontal"
                    dataSource={data}
                    renderItem={(item) => (
                    <><List.Item >
                        <div className="listitem">
                        <Row>
                            <Link onClick={showModal}>
                                <Text fontWeight={'bold'} fontSize="18px" className="pName">{item.title}</Text>
                            </Link>
                       </Row>
                       <Row>
                       <Text as='em' fontSize="16px" fontWeight={'normal'}  className="PVname">{"时间 : " + (item.time == null? "unknown": item.time.split('T')[0])}</Text>
                       </Row>
                       </div>
                        <Modal title={item.title} open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>
                            <p>{item.content}</p>
                        </Modal>
                    </List.Item>
                    </>
                    )}
                />
        </Box>
    )
}

export default Papers
