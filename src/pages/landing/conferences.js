import { useEffect } from "react"
import "./homepage.css"
import { Row, Col, List } from 'antd';
import { Box, Text, Heading, Link } from "@chakra-ui/react";
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

function Conferences(props){
    const [cname, setCname] = useState([])
    const [data, setData] = useState([])
    const [isLoading, setLoading] = React.useState(true)
    const getData = ()=>{
        axios({
          method: "get",
          url: props.url,
        })
        .then(res => {
            console.log(res.data)
            setData(res.data.data.venueResults)
            setCname(res.data.data.cName)
            setLoading(false)
          }
        )
      }
    useEffect(() =>{
    getData()
    }, [])
    if(isLoading){
        return (<Box boxShadow='xs' rounded='md'
                     borderRadius='25px' border='2px' borderColor='gray.200'
                     className='box'>
            <Row>
                <ImFire className="chart-icon"></ImFire>
                <Heading className="title">
                    加载中，请稍候...
                </Heading>
            </Row>


        </Box>    )
    }
    return (
        <Box boxShadow='xs' rounded='md'
            borderRadius='25px' border='2px' borderColor='gray.200'
            className='box'>
                <Row>
                    <ImFire className="chart-icon"></ImFire>
                    <Heading className="title">
                        {props.title + (cname != null ? (": " + cname): "")}
                    </Heading>
                </Row>
                <List
                    bordered={true}
                    itemLayout="horizontal"
                    dataSource={data}
                    renderItem={(item) => (
                    <List.Item className="listitem">
                       <Link href={"/journal?VID=" + item.vID} isExternal>
                            <Text as='em' fontWeight={'bold'} fontSize="18px" className="venueName">
                                {item.vAbbrName === "none" ? "" : "[" + item.vAbbrName + "]  "}{(item.vName.length >= 60 ? (item.vName.substring(0, 59) + "...") : item.vName)}</Text>
                       </Link>

                       <Text fontSize="16px" fontWeight={'bold'}><FaQuoteLeft></FaQuoteLeft>近三年引用 {separator(item.vCite)}</Text>
                    </List.Item>
                    )}
                />
        </Box>
    )
}

export default Conferences
