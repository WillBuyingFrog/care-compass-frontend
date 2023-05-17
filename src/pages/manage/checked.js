/**
 * 后台管理/入驻学者
 */
import "./checked.css"
import { Card, Col, Row, Table, Input, Modal, Form, Tag } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { useToast,Button,Link,Text } from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'
import Highlighter from 'react-highlight-words'
import axios from 'axios';

function List() {
  const [data, setData] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    var token = localStorage.getItem("userToken")
    const toast = useToast();
    // useEffect(() => {
    //   const getData = ()=>{
    //     axios({
    //       method: "post",
    //       url:"/manage/checkedlist",
    //       headers: {
    //         'token': token
    //       }
    //     })
    //     .then(res => {
    //         console.log(res.data)
    //         let a = res.data.data
    //         for(let i in a){
    //           let t = a[i]
    //           for(let j in t){
    //             if(!t[j]){
    //               t[j] = 'none'
    //             }
    //           }
    //         }
    //         setData(a)
    //       }
    //     )
    //   }
    //   getData()
    // }, [])

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
            ref={searchInput}
            placeholder={`请输入关键词`}
            value={selectedKeys[0]}
            onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          />
          </Col>
          <Col span={3}>
            <Button colorScheme='frog'
              onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
              size="xs"
              style={{height:30}}
            >
              <SearchIcon />
            </Button>
          </Col>
          <Col span={3}>
            <Button colorScheme='frog'
              onClick={() => clearFilters && handleReset(clearFilters, dataIndex, confirm)}
              size="xs"
              style={{height:30}}
            >
              重置
            </Button>
          </Col>
          </Row>
        </div>
      ),
      filterIcon: (filtered) => (
        <SearchIcon
          style={{
            color: filtered ? '#1890ff' : undefined,
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

      render: (text) =>
        searchedColumn === dataIndex ? (
          <Highlighter
            highlightStyle={{
              backgroundColor: '#ffc069',
              padding: 0,
            }}
            searchWords={[searchText]}
            autoEscape
            textToHighlight={text ? text.toString() : ''}
          />
        ) : (
          text
        ),
    });
    const Detail = (props) => {
      const [isModalOpen, setIsModalOpen] = useState(false);
      const showModal = () => {
        setIsModalOpen(true);
      };
      const handleCancel = () => {
        setIsModalOpen(false);
      };
      return(
        <><Button onClick={showModal} colorScheme='frog' size='sm'>详情</Button>
        <Modal open={isModalOpen} className="modal" footer={null}
        title='认领详情' width={900} onCancel={handleCancel}>
          <div className='detailForm'>
          <Row>
            <Col span={12}>
              <Card title="认领者信息" style={{width:400}}>
                <Form labelCol={{span:8}}>
                  <Form.Item label='申请者用户名'>
                    <div>{props.A.uname}</div>
                  </Form.Item>
                  <Form.Item label='申请者用户ID'>
                    <div>{props.A.aa_UID}</div>
                  </Form.Item>
                  <Form.Item label='申请者联系方式'>
                    <div>{props.A.AAemail}</div>
                  </Form.Item>
                  <Form.Item label='申请者个人简介'>
                    <div>{props.A.aaintroduction}</div>
                  </Form.Item>
                  {props.A.aatype == 1 && <Form.Item label='学者门户'>
                      <Link href={"/scholarPortal?RID="+props.A.aa_RID}  isExternal>
                        跳转学者门户
                      </Link>
                  </Form.Item>}
                </Form>
              </Card>
            </Col>
            <Col span={12}>
              <Card title="学者信息" style={{width:400}}>
                <Form labelCol={{span:8}}>
                  <Form.Item label='学者姓名'>
                    <div>{props.A.aaname}</div>
                  </Form.Item>
                  <Form.Item label='研究领域'>
                    <div>{props.A.aainterestedareas}</div>
                  </Form.Item>
                  <Form.Item label='所属机构'>
                    <div>{props.A.aainstitution}</div>
                  </Form.Item>
                  <Form.Item label='个人主页链接'>
                    <div>{props.A.aahomepage}</div>
                  </Form.Item>
                </Form>
              </Card>
            </Col>
            </Row>
            <Row>
              <Card title="审核结果" style={{width:850}}>
                <Row>
                  <Col span={20}>
                  <Form>
                    <Form.Item label="结果">
                      {props.A.aaccept == 1 && <Tag color='green'>通过</Tag> || props.A.aaccept == 2 && <Tag color='red'>拒绝</Tag>}
                    </Form.Item>
                    <Form.Item label="说明">
                      {props.A.aopinion}
                    </Form.Item>
                  </Form>
                  </Col>
                  <Col span={4}>
                  <div className='img1'>
                    <img src={require("../../assets/doctors.png")}></img>
                  </div>
                  </Col>
                </Row>

              </Card>
            </Row>
          </div>
        </Modal>
        </>
      )
    }

    const columns = [
      {
        title: '申请者用户名',
        dataIndex: 'uname',
        key: 'uname',
        ...getColumnSearchProps('uname'),
        sorter: (a, b) => a.uname.localeCompare(b.uname),
        sortDirections: ['descend', 'ascend'],
        width:180
      },
      {
        title: '学者姓名',
        dataIndex: 'aaname',
        key: 'aaname',
        ...getColumnSearchProps('aaname'),
        sorter: (a, b) => a.aaname.localeCompare(b.aaname),
        sortDirections: ['descend', 'ascend'],
      },
      {
        title: '联系方式',
        dataIndex: 'AAemail',
        key: 'AAemail',
        ...getColumnSearchProps('AAemail'),
      },
      {
          title: '审核时间',
          dataIndex: 'aalastUpdateTime',
          key: 'aalastUpdateTime',
          ...getColumnSearchProps('aalastUpdateTime'),
          sorter: (a, b) => a.aalastUpdateTime.localeCompare(b.aalastUpdateTime),
        sortDirections: ['descend', 'ascend'],
      },
      {
        title: '审核结果',
        dataIndex: 'aaccept',
        key: 'aaccept',
        render: (_, record)=>(
          record.aaccept == 1 && <Tag color='green'>通过</Tag> || record.aaccept == 2 && <Tag color='red'>拒绝</Tag>
        )
      },
      {
        title: '操作',
        key: 'action',
        render: (_, record) => (
            <Detail A={record} />
        ),
      },
    ];


    return (
        <div>
          <Row>
            <Col span={18}><div className='count'>已审核申请共{data.length}条</div></Col>
            <Col span={6}>
              <div className='img1'>
                <img src={require("../../assets/doctors.png")}></img>
              </div>
            </Col>
          </Row>
          <Table dataSource={data} columns={columns} rowKey="aaid"
            pagination={{
                pageSize: 8,
            }}
          ></Table>
        </div>
    )
}

function Checked(){
    return (
        <div className="checked">
            <List />
        </div>
    )
}
export default Checked;
