import {Button,Layout,Menu, Breadcrumb,Select,Input,List,InputNumber,message} from 'antd'
import React from 'react';
import MySelect from '../select/myselect';
import {DeleteOutlined} from "@ant-design/icons";

class PrescriptionList extends React.Component{
    state={
        data:this.props.msg,
        data2:this.props.msg2
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

    numchange=(e,id)=>{
        for( let i = 0; i < this.state.data.length; i++){
            if(this.state.data[i].id === id){
                this.state.data[i].num=e
            }
        }
        this.props.senddata(this.state.data)
    }

    getPrescription=(itemname,id)=>{
        let temdata=this.state.data
        temdata.push({
            id:id,
            name:itemname,
            description:'',
            num:1
        })
        this.setState({data:temdata})
        this.props.senddata(this.state.data)
    }

    render(){
        console.log(this.state.data)
        if(this.state.data2 === '1'){
            return (

                <div>
                            <span style={{fontSize: 16}}>开具处方:</span>
                            {/*<MySelect style={{ width: '50%' ,marginLeft:300}} senddata={this.getPrescription} msg2='1' />*/}
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
                                    disabled
                                    />
                                    <span style={{marginLeft:'30vw'}}>数量：</span>
                                    <div style={{marginRight:'10vw'}}>
                                        <InputNumber min={1} max={10} defaultValue={item.num} onChange={(e)=>this.numchange(e,item.id)} disabled/>
                                    </div>
                                    <span>备注：</span>
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
                            <span style={{fontSize: 16}}>开具处方:</span>
                            <MySelect style={{ width: '50%' ,marginLeft:300}} senddata={this.getPrescription}/>
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
                                    <span style={{marginLeft:'30vw'}}>数量：</span>
                                    <div style={{marginRight:'10vw'}}>
                                        <InputNumber min={1} max={10} defaultValue={item.num} onChange={(e)=>this.numchange(e,item.id)}/>
                                    </div>
                                    <span>备注：</span>
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

export default PrescriptionList
