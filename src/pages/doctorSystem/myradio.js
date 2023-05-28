import { Radio } from 'antd';
import React from 'react';
import { useEffect } from 'react';

class MyRadio extends React.Component {
    state = {
      value: '',
    };
  

    onChange = e => {
      console.log('radio checked', e.target.value);
      this.setState({
        value: e.target.value,
      });
      this.props.senddata(this.state.value)
    };
  
    render() { 
      // console.log('render')
      // console.log(this.props.msg1)
      
      // if(this.props.msg1 != null){
      //   if(this.props.msg1 == 0 ){
      //     this.setState({value:'事假'})
      //   }
      //   else{
      //     this.setState({value:'病假'})
      //   }
      // }
      if(this.props.msg == 1){
        return (
          <Radio.Group onChange={this.onChange} defaultValue={this.props.msg1} disabled>
          <Radio value='事假'>事假</Radio>
          <Radio value='病假'>病假</Radio>
        </Radio.Group>
        )
      }
      else{
        return (
          <Radio.Group onChange={this.onChange} defaultValue={this.props.msg1}>
          <Radio value='事假'>事假</Radio>
          <Radio value='病假'>病假</Radio>
        </Radio.Group>
        )
      }
    }
}

export default MyRadio