import React ,{ useState, useRef }from 'react';
import { AutoComplete ,Input, Button} from 'antd';

const options = [
    { value: '0',label:'专家' },
    { value: '1',label:'仪器'},
    { value: '2',label:'专利' },
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
            <a style={{ color:'black', marginLeft:'20%' }}>领域</a>
            <AutoComplete
                style={{ width: '10%', marginLeft:'1%' }}
                options={options}
                placeholder="0:专家;1:仪器;2:专利"
                filterOption={(inputValue, options) =>
                options.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
                onChange={onChange}
            />
            <a style={{ color:'black', marginLeft:'15%' }}>用户ID</a>
            <Input
                style={{ width: '10%', marginLeft:'1%' }}
                onChange={testOnChange1}
            />
            <p/>
            <br/>
            <a style={{ color:'black', marginLeft:'16%' }}>上次点击物品ID</a>
            <Input
                style={{ width: '10%', marginLeft:'1%' }}
                onChange={testOnChange2}
            />
             <a style={{ color:'black', marginLeft:'12.5%' }}>用户所属公司</a>
            <Input
                style={{ width: '10%', marginLeft:'1.1%' }}
                onChange={testOnChange3}
            />
            <Button type="primary" style={{marginLeft:200}} onClick={onClick}>提交</Button>
        </div>
    )
}

export default RecommendResult;