import React, { useEffect } from "react"
import "./homepage.css"
import { Row, Col } from 'antd';
import { Input, Text, Link ,Box} from "@chakra-ui/react";
import Conferences from "./conferences";
import Papers from "./paper";
import MyHeader from "../../components/header/header";

function Header1(){
    const [input,setInput] = React.useState()
    return (
        <Row>
                    <Col span={2}>
                        <img src={require("../../assets/acegate_icon.png")} style={{height:80,width:80, marginRight:30}}></img>
                    </Col>
                    <Col span={19}>
                        <Input
                            style={{marginTop:20}}
                            size='lg'
                            backgroundColor='white'
                            width='80%'
                            placeholder="输入您想搜索的论文，学者等，敲下回车"
                            onChange={(e) => {
                                setInput(e.target.value)
                            }}
                            onKeyPress={(value) => {
                                if(value.key === "Enter") {
                                    window.open("/defaultSearch?q=" + input)
                                }
                            }}
                        />
                    </Col>
                    <Col span={3}>

                    </Col>
                </Row>
    )
}

function Homepage(){
    useEffect(()=>{
        let bg = document.querySelector('#bg')
        let moon = document.querySelector('#moon')
        let mountain = document.querySelector('#mountain')
        let road = document.querySelector('#road')
        let middle = document.querySelector('#middle')
        window.addEventListener('scroll', () => {
            var value = window.scrollY;
            bg.style.top = value * 0.5 + 'px';
            moon.style.left = -value * 0.5 + 'px';
            mountain.style.top = -value * 0.15 + 'px';
            road.style.top = value * 0.15 + 'px';
            middle.style.top = value * 1 + 'px';
        })
    }, [])
    return(
        <Box>
        <MyHeader></MyHeader>
        <div className="homepage">
            <section>
                <img
                    src={require("../../assets/bg.jpg")}
                    id="bg"
                />
                <img
                    src={require("../../assets/moon.png")}
                    id="moon"
                />
                <img
                    src={require("../../assets/mountain.png")}
                    id="mountain"
                />
                <img
                    src={require("../../assets/road.png")}
                    id="road"
                />
                <div id="middle">
                    <Text className="text1" fontWeight={'extrabold'}>
                        AceGate
                    </Text>
                    <Text className="text2" fontWeight={'extrabold'}>
                        Your Gate Towards Academia.
                    </Text>
                </div>
            </section>
            <div className="recomand">
                <Header1></Header1>
                <Row style={{marginTop:30}}>
                    <Text fontWeight={"extrabold"} color="#ffffff" fontSize="55px">热门推荐</Text>
                </Row>
                <Row style={{marginTop:30}}>
                    <Col span={16}><Papers  title="热门文献"></Papers></Col>
                    <Col span={8}><img src={require("../../assets/homepage3.png")} style={{marginTop:90}}></img></Col>
                </Row>
                <Row gutter={30} style={{marginTop:30}}>
                    <Col span={8}><img src={require("../../assets/homepage1.png")} style={{marginTop:90}}></img></Col>
                    <Col span={16}><Conferences url="/frogRecommendJournals" title="热门期刊"></Conferences></Col>
                </Row>
                <Row gutter={30} style={{marginTop:30}}>
                    <Col span={16}><Conferences url="/frogRecommendConferences" title="热门会议"></Conferences> </Col>
                    <Col span={8}><img src={require("../../assets/homepage2.png")} style={{marginTop:90}}></img></Col>
                </Row>
            </div>
        </div>
        </Box>
    )
}

export default Homepage
