import React ,{ useState, useRef }from 'react';
import { AutoComplete ,Input, Button} from 'antd';

const options = [
  { value: '0' },
  { value: '1' },
  { value: '2' },
];


const RecommendResult=(props)=>{
    const {setDomain, setUid, setLast, setCpy,onClick}=props;

    function onChange(value){
        //console.log(value);
        setDomain(value);
    }

    function testOnChange1(e){
        setUid(e.target.value);
    }

    function testOnChange2(e){
        setLast(e.target.value);
    }

    function testOnChange3(e){
        setCpy(e.target.value);
    }

      
    return(
        <div style={{ paddingTop: 10, minHeight: 70, marginBottom:80}}>
            <a style={{ color:'black', marginLeft:200 }}>领域</a>
            <AutoComplete
                style={{ width: 170, marginLeft:15 }}
                options={options}
                placeholder="0:专家;1:仪器;2:专利"
                filterOption={(inputValue, options) =>
                options.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
                onChange={onChange}
            />
            <a style={{ color:'black', marginLeft:150 }}>用户ID</a>
            <Input
                style={{ width: 170, marginLeft:15 }}
                onChange={testOnChange1}
            />
            <p/>
            <br/>
            <a style={{ color:'black', marginLeft:130 }}>上次点击物品ID</a>
            <Input
                style={{ width: 170, marginLeft:15 }}
                onChange={testOnChange2}
            />
             <a style={{ color:'black', marginLeft:110 }}>用户所属公司</a>
            <Input
                style={{ width: 170, marginLeft:15 }}
                onChange={testOnChange3}
            />
            <Button type="primary" style={{marginLeft:200}} onClick={onClick}>提交</Button>
        </div>
    )
}

export default RecommendResult;