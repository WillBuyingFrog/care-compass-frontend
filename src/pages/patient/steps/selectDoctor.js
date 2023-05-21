import axios from "axios";
import {useEffect, useState} from "react";
import {Col, Row} from "antd";
import DoctorCard from "./doctorCard";




function SelectDoctor({departmentID}){

    // 所有医生排班信息
    const [doctorData, setDoctorData] = useState(null);
    // 当前选中时段的医生排班信息
    const [currentDoctorData, setCurrentDoctorData] = useState(null);
    // 是否在加载
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getDoctorsByDepartmentID = async (departmentID) => {
            setLoading(true);
            let data = {}
            data.departmentID = departmentID;

            let config = {
                method: 'post',
                url: 'https://mock.apifox.cn/m2/2632066-0-default/80582206',
                data: data
            };

            let response = await axios(config);
            console.log(response.data);
            setDoctorData(response.data);
            // TODO 提取出明天上午的医生排班作为默认展示排班
            // TODO 写一个函数，给定日期和上午下午时间段，更新对应的排班state
            setLoading(false);
        }
        if (departmentID != null) {
            getDoctorsByDepartmentID(departmentID);
        }
    }, [departmentID]);

    return (
        <div>
            <Row>
                <Col span={8} offset={8}>
                    选择时间，有六个时间段
                </Col>
            </Row>
            <Row gutter={16}>
                {
                    (loading === false && departmentID != null) ? (
                        doctorData.today.morning.map((doctor) => {
                                return (
                                    <Col span={8}>
                                        <DoctorCard
                                            doctor={doctor}
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
