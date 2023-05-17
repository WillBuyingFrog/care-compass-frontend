/**
 * 后台管理/审核认领
 */
import { Card, Col, Row, Space, Table, Input, Modal, Form, Tag } from 'antd';
import { Button } from '@chakra-ui/react'
import React, { useEffect, useRef, useState } from 'react';
import { SearchIcon } from '@chakra-ui/icons'
import { useToast } from '@chakra-ui/react'
import Highlighter from 'react-highlight-words'
import "./uncheck.css"
import axios from 'axios';

function CheckList() {
    const [data, setData] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const toast = useToast();
    var token = localStorage.getItem("userToken")
    const getData = ()=>{
      axios({
        method: "post",
        url:"manage/unchecklist",
        headers: {
          'token': token
        }
      })
      .then(res => {
        console.log(res.data)
        let a = res.data.data
        for(let i in a){
          let t = a[i]
          for(let j in t){
            if(!t[j]){
              t[j] = 'none'
            }
          }
        }
        setData(a)
        }
      )
    }
    // useEffect(() => {
    //   getData();
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
              size="small"
              style={{height:30}}
            >
              <SearchIcon />
            </Button>
          </Col>
          <Col span={3}>
            <Button colorScheme='frog'
              onClick={() => clearFilters && handleReset(clearFilters, dataIndex, confirm)}
              size="small"
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
        <><Button onClick={showModal} size='sm' colorScheme='frog'>详情</Button>
        <Modal open={isModalOpen} className="modal" footer={null}
        title='认领申请详情' width={900} onCancel={handleCancel}>
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
                    <div>{props.A.aaemail}</div>
                  </Form.Item>
                  <Form.Item label='申请者个人简介'>
                    <div>{props.A.aaintroduction}</div>
                  </Form.Item>
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
                    <a href={props.A.aahomepage}>{props.A.aahomepage}</a>
                  </Form.Item>
                  {props.A.aatype == 1 && <Form.Item label='学者门户'>
                    <a href={"/scholarPortal?RID="+props.A.aa_RID}>跳转学者门户</a>
                  </Form.Item>}
                </Form>
              </Card>
            </Col>
            </Row>
          </div>
        </Modal>
        </>
      )
    }
    const Dialogue = (props) => {
      var text;
      const [content, setContent] = useState('');
      const [isModalOpen, setIsModalOpen] = useState(false);
      const showModal = () => {
        setIsModalOpen(true);
      };
      var token = localStorage.getItem("userToken")
      const handleOk = () => {
        axios({
          method: 'post',
          url: "/manage/check",
          data: {
            accept: props.type,
            opinion: content,
            AAID: props.AAID
          },
          headers: {
            "Content-Type": "application/json",
            'token': token
          }
        })
          .then(res => {
            if(res.data.code == 200){
              toast({
                description: "已"+text+"该申请！",
                status: 'success',
                duration: 5000,
                isClosable: true,
              })
              setContent("");
              setIsModalOpen(false);
              getData();
            }
            else{
              toast({
                description: res.data.message,
                status: 'error',
                duration: 5000,
                isClosable: true,
              })
              setContent("");
              setIsModalOpen(false);
              getData();
            }
          })
      };
      const handleCancel = () => {
        setIsModalOpen(false);
      };
      //如果type == 2, 拒绝
      //如果type == 1, 通过
      let bcolor
      if(props.type === 1){
        text = '通过';
        bcolor = 'whatsapp'
      }
      else{
        text = '拒绝';
        bcolor = 'red'
      }
      return (
        <><Button size='sm' onClick={showModal} colorScheme={bcolor}>
          {text}
        </Button>
        {/*<Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}*/}
        <Modal open={isModalOpen}
        title='审核意见' okText="确认" cancelText="取消" className="modal">
          <Form>
            <Form.Item label={text+'说明'}>
              <Input.TextArea allowClear={true} value={content} onChange={(e) => setContent(e.target.value)}
               autoSize={{minRows: 5, maxRows: 8}} maxLength={300} >
              </Input.TextArea>
            </Form.Item>
          </Form>
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
        dataIndex: 'aaemail',
        key: 'aaemail',
        ...getColumnSearchProps('aaemail'),
      },
      {
          title: '申请时间',
          dataIndex: 'aalastUpdateTime',
          key: 'aalastUpdateTime',
          ...getColumnSearchProps('aalastUpdateTime'),
          sorter: (a, b) => a.aalastUpdateTime.localeCompare(b.aalastUpdateTime),
        sortDirections: ['descend', 'ascend'],
      },
      {
        title: '操作',
        key: 'action',
        render: (_, record) => (
          <Space size="middle">
            <Detail A={record} />
            <Dialogue type={1} AAID={record.aaid}></Dialogue>
            <Dialogue type={2} AAID={record.aaid}></Dialogue>
          </Space>
        ),
      },
    ];


    return (
        <div>
          <Row>
            <Col span={18}><div className='count'>未审核申请共{data.length}条</div></Col>
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



function UnCheck(){
    return (
        <div className='uncheck'>
            <CheckList />
        </div>
    )
}

export default UnCheck;
