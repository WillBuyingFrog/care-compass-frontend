import {Button,Layout,Menu, Breadcrumb,Select,Input,List,InputNumber,message, Row} from 'antd'
import React from 'react';
import MySelect2 from '../select/myselect2';
import {DeleteOutlined} from "@ant-design/icons";
class InspectList extends React.Component{
    state={
        data:this.props.msg,
        data2:this.props.msg2
    }
    onChange(value) {
        console.log('changed', value);
    }

    deleteItem(id) {
        for (let i = 0; i < this.state.data.length; i++) {
            if (this.state.data[i].id == id) {
                let temporarydata = this.state.data
                temporarydata.splice(i,1)
                this.setState({
                    data:temporarydata
                })
                // console.log(temporarydata)
                this.props.senddata(this.state.data)
                console.log(this.state.data)
            }
        }
    }

    inputchange=(e,id)=>{
        for( let i = 0; i < this.state.data.length; i++){
            if(this.state.data[i].id === id){
                this.state.data[i].description=e.target.value
            }
        }
        this.props.senddata(this.state.data)
    }

    getPrescription=(temdata1,id)=>{
        let temdata=this.state.data
        temdata.push({
            id:id,
            name:temdata1,
            description:'',
        })
        this.setState({data:temdata})
        this.props.senddata(this.state.data)
    }

    render(){
        console.log(this.state.data)
        if(this.state.data2 == '1'){
            return (
                <div>
                            <span style={{fontSize: 16}}>开具检查:</span>
                            {/* <Select mode="tags" style={{ width: '50%' ,marginLeft:300}} placeholder="Tags Mode" onChange={handleChange2}>
                                {children2}
                            </Select> */}
                            <MySelect2 style={{ width: '50%' ,marginLeft:300}} senddata={this.getPrescription} msg2='1' />
                            <br/>
                            <br/>
                            <List
                                bordered
                                itemLayout="horizontal"
                                dataSource={this.state.data}
                                renderItem={item => (
                                        <List.Item key={item.id}>
                                            <List.Item.Meta
                                            style={{maxWidth:300}}
                                            description={item.name}
                                            />
                                            <span style={{marginLeft: '40vw'}}>备注：</span>
                                            <Input style={{ width: 150 }} defaultValue={item.description} onChange={(e)=>this.inputchange(e,item.id)} disabled></Input>
                                            <Button shape="circle" onClick={()=>this.deleteItem(item.id)} icon={<DeleteOutlined />} disabled></Button>
                                        </List.Item>
                                )}
                            />
                        </div>
    
    
            )
        }
        else{
            return (
                <div>
                            <span style={{fontSize: 16}}>开具检查:</span>
                            {/* <Select mode="tags" style={{ width: '50%' ,marginLeft:300}} placeholder="Tags Mode" onChange={handleChange2}>
                                {children2}
                            </Select> */}
                            <MySelect2 style={{ width: '50%' ,marginLeft:300}} senddata={this.getPrescription}/>
                            <br/>
                            <br/>
                            <List
                                bordered
                                itemLayout="horizontal"
                                dataSource={this.state.data}
                                renderItem={item => (
                                        <List.Item key={item.id}>
                                            <List.Item.Meta
                                            style={{maxWidth:300}}
                                            description={item.name}
                                            />
                                            <span style={{marginLeft: '40vw'}}>备注：</span>
                                            <Input style={{ width: 150 }} defaultValue={item.description} onChange={(e)=>this.inputchange(e,item.id)}></Input>
                                            <Button shape="circle" onClick={()=>this.deleteItem(item.id)} icon={<DeleteOutlined />}></Button>
                                        </List.Item>
                                )}
                            />
                        </div>
    
    
            )
        }
    }
}

export default InspectList
