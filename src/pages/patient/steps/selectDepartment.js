import {useEffect, useState} from "react";
import axios from "axios";
import {Card} from "antd";
import {Link} from "react-router-dom";


function DepartmentCard({departmentName, departmentDescription, departmentId}){
    return (
        <Link to={'/makeAppointment/selectDoctor/' + departmentId}>
            <Card
                title={departmentName}
            >
                <p>{departmentDescription}</p>
            </Card>
        </Link>
    )
}

function SelectDepartment(){
    // 科室信息，json array格式
    const [departmentData, setDepartmentData] = useState(null);
    // 是否正在加载科室信息
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const getDepartmentList = async () => {
            try {
                const response = await axios.post('https://mock.apifox.cn/m2/2632066-0-default/80582204');
                console.log(response.data);
                setDepartmentData(response.data);
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        };
        getDepartmentList();
    }, []);

    return (
        <div>
            {loading ? (
                <div>loading...</div>
            ) : (
                <div>
                    {departmentData.map((department) => (
                        <DepartmentCard
                            departmentName={department.name}
                            departmentDescription={department.description}
                            departmentId={department.id}
                        />
                    ))}
                </div>
                )
            }
        </div>
    )
}

export default SelectDepartment;
