import React from "react";
import { Select } from 'antd';
import axios from "axios";

const { Option } = Select;


class MySelect2 extends React.Component {
    state = {
      data: [],
      value: undefined,
    };
  
    handleSearch = value => {
        console.log(`selected ${value}`);
        console.log(value)
        // 远程链接
        if(value.length>=2){
            axios.post('/treatment/searchInspection/',JSON.stringify({msg:value}))
            .then(res=>{
                console.log(res.data.data.inspectionList)
                let templist=res.data.data.inspectionList
                this.setState({data:templist})
            })
        }

        //测试数据
        // this.setState({data:[]})
        // let templist=[{
        //     id:0,
        //     name:'h'
        // },
        // {
        //     id:2,
        //     name:'l'
        // },
        // ]
        // this.setState({data:templist})  
    };
  
    handleChange = value => {
        let temid=0
        for(let i=0;i<this.state.data.length;i++){
            if(this.state.data[i].name === value){
                temid = this.state.data[i].id
            }

        }
      this.props.senddata(value,temid)
    };
    render() {
        const options = this.state.data.map(d => <Option key={d.name}>{d.name}</Option>);
        return (
        <Select
          showSearch
          value={this.state.value}
          placeholder={this.props.placeholder}
          style={this.props.style}
          defaultActiveFirstOption={false}
          showArrow={false}
          filterOption={false}
          onSearch={this.handleSearch}
          onChange={this.handleChange}
          notFoundContent={null}
        >
          {options}
        </Select>
      );
    }
}

export default MySelect2