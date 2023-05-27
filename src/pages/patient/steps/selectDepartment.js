import {useEffect, useState} from "react";
import axios from "axios";
import {Card, Col, Menu, Row, Typography} from "antd";
import {Link} from "react-router-dom";

const { Title } = Typography;

function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}

function getSidebarItemsByDepartmentData(arr){
    // console.log("接收到的json array：")
    // console.log(arr)
    let items = []
    arr.map((item) => {
        items.push(getItem(item.name, item.id))
    })
    return items
}


function SelectDepartment({selectedDepartment, setSelectedDepartment}) {
    // 科室信息，json array格式
    const [departmentData, setDepartmentData] = useState(null);
    const [deptSidebarData, setDeptSidebarData] = useState(null);
    // 是否正在加载科室信息
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const getDepartmentList = async () => {
            try {
                const response = await axios.post('department/list/',{},
                    {
                        headers: {
                            token: localStorage.getItem('userToken')
                        }
                    });
                // 保存科室原始信息
                setDepartmentData(response.data);
                // 获取用于sidebar展示的科室信息
                setDeptSidebarData(getSidebarItemsByDepartmentData(response.data));
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        };
        getDepartmentList();
    }, []);

    const handleDepartmentClick = (e) => {
        // console.log(e.key)
        setSelectedDepartment(e.key);
    }

    return (
        <div style={{'margin': '20px', 'width' : '100%'}}>
            {loading ? (
                <div>loading...</div>
            ) : (
                <div>
                    <Menu
                        style={{
                            'width': '80%'
                        }}
                        mode="inline"
                        items={deptSidebarData}
                        onClick={handleDepartmentClick}
                    />
                </div>
                )
            }
        </div>
    )
}

export default SelectDepartment;
