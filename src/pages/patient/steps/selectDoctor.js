import axios from "axios";
import {useEffect, useState} from "react";
import {Col, Row} from "antd";
import DoctorCard from "./doctorCard";
import * as React from "react";


function PeriodCard(props){

    return (
        <div
            onClick={props.handleClickPeriod}
        >
            <span
                style={{
                    'width': '100px',
                    'fontSize': '16px',
                    'cursor': 'default'
                }}
            >
                {props.date.getMonth()+1}月{props.date.getDate()}日{props.subPeriod}
            </span>
        </div>
    )
}

function getPeriodDoctors(doctorData, periodKey){
    switch (periodKey) {
        case 1:
            return doctorData.lastDay;
        case 2:
            return doctorData.today;
        case 3:
            return doctorData.tomorrow;
        default:
            return null;
    }
}


function getAllDaySchedule(doctorData){
    let combinedSchedule = {
        lastDay: [],
        today: [],
        tomorrow: []
    }
    const checkDoctorExists = (doctor, doctorList) => {
        for(let i = 0; i < doctorList.length; i++){
            if(doctor.doctorID === doctorList[i].doctorID){
                return i;
            }
        }
        return -1;
    }

    // 合并单日排班
    const combineSingleDay = (singleDaySchedule) => {
        let temp = [];
        singleDaySchedule.morning.map((doctor) => {
            doctor.morningAvailable = doctor.available;
            // 先无条件填充下午的排班信息
            doctor.afternoonAvailable = -1;
            temp.push(doctor);
        })
        singleDaySchedule.afternoon.map((doctor) => {
            let index = checkDoctorExists(doctor, temp);
            if(index !== -1){
                // 医生上午也有排班，所以在temp里面
                temp[index].afternoonAvailable = doctor.available;
            }else{
                // 医生上午没有排班，填充上午的排班信息
                doctor.afternoonAvailable = doctor.available;
                // -1表示上午没有排班
                doctor.morningAvailable = -1;
                temp.push(doctor);
            }
        })
        return temp;
    }

    // 分别合并三天
    combinedSchedule.lastDay = combineSingleDay(doctorData.lastDay);
    combinedSchedule.today = combineSingleDay(doctorData.today);
    combinedSchedule.tomorrow = combineSingleDay(doctorData.tomorrow);

    return combinedSchedule;
}


function SelectDoctor(props){

    // 所有医生排班信息
    const [doctorData, setDoctorData] = useState(null);
    // 当前选中时段
    const [currentPeriod, setCurrentPeriod] = useState(1);
    // 当前选中时段的医生排班信息
    const [currentDoctorData, setCurrentDoctorData] = useState(null);
    // 是否在加载
    const [loading, setLoading] = useState(true);

    let today = new Date();
    let day1 = new Date(today.getTime() + (24 * 60 * 60 * 1000));
    let day2 = new Date(today.getTime() + (24 * 60 * 60 * 1000 * 2));
    let day3 = new Date(today.getTime() + (24 * 60 * 60 * 1000 * 3));
    // 默认可以提前三天预约挂号，所以有6个写死的时间段，时间段key对应1-6，显示文字为xx日上午/下午
    const periods = [
        {key: 1, date: day1}, {key: 2, date: day2},
        {key: 3, date: day3}
    ]


    useEffect(() => {
        const getDoctorsByDepartmentID = async (departmentID) => {
            // 重新获取医生排班数据
            setLoading(true);
            let data = {}
            data.departmentID = departmentID;

            let config = {
                method: 'post',
                url: 'https://mock.apifox.cn/m2/2632066-0-default/80582206',
                data: data
            };
            let response = await axios(config);

            // 转换后端的数据为符合前端3天展示的数据格式
            let combinedSchedule = getAllDaySchedule(response.data);
            // console.log("combinedSchedule", combinedSchedule);
            // 设置医生排班数据和当前展示的排班数据
            setDoctorData(combinedSchedule);
            setCurrentDoctorData(getPeriodDoctors(combinedSchedule, currentPeriod));

            // 加载完成
            setLoading(false);
        }
        if (props.departmentID != null) {
            getDoctorsByDepartmentID(props.departmentID);
        }
    }, [props.departmentID]);

    // 当前选中时段改变时，更新当前时段的医生排班信息
    useEffect(() => {
        // console.log("currentPeriod", currentPeriod);
        if(doctorData != null) {
            setCurrentDoctorData(getPeriodDoctors(doctorData, currentPeriod));
        }
    }, [currentPeriod]);

    return (
        <div>
            <Row>
                <Col span={8} offset={8}>
                    <Row>
                        {
                            periods.map((period) => {
                                    return (
                                        <Col span={8}>
                                            <PeriodCard
                                                date={period.date}
                                                handleClickPeriod={() => {
                                                    setCurrentPeriod(period.key);
                                                }}
                                            />
                                        </Col>
                                    )
                                }
                            )
                        }
                    </Row>

                </Col>
            </Row>
            <Row gutter={16}>
                {
                    (loading === false && props.departmentID != null) ? (
                        currentDoctorData.map((doctor) => {
                                return (
                                    <Col span={8}>
                                        <DoctorCard
                                            doctor={doctor}
                                            periodKey = {currentPeriod}
                                            setSelectedDoctor={props.setSelectedDoctor}
                                            setSelectedPeriod={props.setSelectedPeriod}
                                            showConfirmDrawer={props.showConfirmDrawer}
                                        />
                                    </Col>

                                )
                            }
                        )
                    ) : (
                        <div>
                            正在加载医生信息
                        </div>
                    )
                }
            </Row>
        </div>
    )
}

export default SelectDoctor;
