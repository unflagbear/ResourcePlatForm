import React from 'react';
import { AutoComplete ,Input, Button} from 'antd';

const options = [
    { value: '0' },
    { value: '1' },
    { value: '2' },
  ];

const options1 = [
  { value: '1' },
  { value: '2' },
  { value: '3' },
];

const TrainModel=(props)=>{
    const {setDomain, setModel, onClick}=props;

    function onChange1(value){
        //console.log(value);
        setDomain(value);
    }
    function onChange2(value){
        //console.log(value);
        setModel(value);
    }
      
    return(
        <div style={{ paddingTop: 45, minHeight: 70, marginBottom:150}}>
            <a style={{ color:'black', marginLeft:30 }}>领域</a>
            <AutoComplete
                style={{ width: 170, marginLeft:15 }}
                options={options}
                placeholder="0:专家;1:仪器;2:专利"
                filterOption={(inputValue, options) =>
                options.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
                onChange={onChange1}
                
            />
            <a style={{ color:'black', marginLeft:150 }}>模型选择</a>
            <AutoComplete
                style={{ width: 330, marginLeft:15 }}
                options={options1}
                placeholder="1:模型1;2:模型2;3:模型3"
                filterOption={(inputValue, options) =>
                options.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
                onChange={onChange2}
            />
            <Button type="primary" style={{marginLeft:200 }} onClick={onClick}>训练</Button>
        </div>
    )
}

export default TrainModel;