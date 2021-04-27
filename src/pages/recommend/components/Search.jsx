import React ,{ useState, useRef }from 'react';
import { AutoComplete ,Input, Button} from 'antd';

const options = [
    { value: '0',label:'专家' },
    { value: '1',label:'仪器'},
    { value: '2',label:'专利' },
];


const Search=(props)=>{
    const {setDomain, setUid, onClick}=props;

    function onChange(value){
        //console.log(value);
        setDomain(value);
    }

    function testOnChange(e){
         //console.log(e.target.value);
        setUid(e.target.value);
    }

      
    return(
        <div >
            <a style={{ color:'black', marginLeft:'15%'}}>领域</a>
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
                onChange={testOnChange}
            />
            <Button type="primary" style={{marginLeft:'17%'}} onClick={onClick}>查询</Button>
        </div>
    )
}

export default Search;