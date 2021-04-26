import React from 'react';
import { AutoComplete ,Input, Button} from 'antd';

const options = [
    { value: '0',label:'专家' },
    { value: '1',label:'仪器'},
    { value: '2',label:'专利' },
  ];

const options1 = [
  { value: '1' ,label: '模型1：基于隐语义相似度的推荐模型' },
  { value: '2' ,label: '模型2：基于协同过滤算法的推荐模型' },
  { value: '3' ,label: '模型3：基于科技资源知识图谱的深度模型' },
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
            <a style={{ color:'black', marginLeft:'15%'}}>领域</a>
            <AutoComplete
                style={{ width: '10%', marginLeft:'1%' }}
                options={options}
                placeholder="0:专家;1:仪器;2:专利"
                filterOption={(inputValue, options) =>
                options.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
                onChange={onChange1}
                
            />
            <a style={{ color:'black', marginLeft:'15%' }}>模型选择</a>
            <AutoComplete
                style={{ width: '17%', marginLeft:'1%'}}
                options={options1}
                placeholder="请选择需要训练的模型"
                filterOption={(inputValue, options) =>
                options.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
                onChange={onChange2}
            />
            <Button type="primary" style={{marginLeft:'10%' }} onClick={onClick}>训练</Button>
        </div>
    )
}

export default TrainModel;