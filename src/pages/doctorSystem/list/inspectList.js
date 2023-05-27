import {Button,Layout,Menu, Breadcrumb,Select,Input,List,InputNumber,message} from 'antd'
import React from 'react';
import MySelect2 from '../select/myselect2';
class InspectList extends React.Component{
    state={
        data:this.props.msg
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
        return (

            <div>
                        <span>开具检查:</span>
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
                                <Input style={{ width: 150 }} onChange={(e)=>this.inputchange(e,item.id)}></Input>
                                <Button type="primary" shape="circle" onClick={()=>this.deleteItem(item.id)} >test</Button>
                            </List.Item>
                            )}
                        />
                    </div>


        )
    }
}

export default InspectList