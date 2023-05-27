import {Button,Layout,Menu, Breadcrumb,Select,Input,List,InputNumber,message} from 'antd'
import React from 'react';
import MySelect from '../select/myselect';

class PrescriptionList extends React.Component{
    state={
        data:this.props.msg
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
        return (

            <div>
                        <span>开具处方:</span>
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
                                <div style={{marginRight:510}}>
                                    <InputNumber min={1} max={10} defaultValue={1} onChange={(e)=>this.numchange(e,item.id)}/>
                                </div>
                                <Input style={{ width: 150 }} onChange={(e)=>this.inputchange(e,item.id)}></Input>
                                <Button type="primary" shape="circle" onClick={()=>this.deleteItem(item.id)} >test</Button>
                            </List.Item>
                            )}
                        />
                        
                    </div>

        )
    }
}

export default PrescriptionList