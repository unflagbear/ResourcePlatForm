import React, { useState,useEffect } from 'react';
import { Form, Input, Button, Radio ,Cascader  } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';

import data from '@/utils/classify/classifyNew.json'
import {modify} from '@/utils/classify/modify'

const { TextArea } = Input;
const CommitTable = ({setForm,select,setSelect,setResult,current,setCurrent})=>{
    const [form] = Form.useForm();
    const options =[]
    const classifyData = modify(data.科技服务资源)
    const [requiredMark, setRequiredMarkType] = useState();
    const onRequiredTypeChange = ({ requiredMarkValue }) => {
        setRequiredMarkType(requiredMarkValue);
    };
    useEffect(()=>{
        setForm(form)
    },[form]);
    Object.keys(classifyData).forEach(key => {
        const befor = []
        Object.keys(classifyData[key]).forEach((num,item)=>{

            const child=[]
            if(typeof classifyData[key][num] === "object"){
                Object.keys(classifyData[key][num]).forEach(subitem=>{
                    child.push({value:subitem,label:subitem})
                })
            }
            befor.push({value:num,label:num,children:child})
             // console.log(classifyData[key][num])
        })
        options.push({value:key,label:key,children:befor})
        // console.log(items)
    })

      function onChange(value) {
        setSelect(value);
        console.log(select)
      }
      const onFinish = (values) => {
        setResult(values);
        setCurrent(current+1)
      };
    return(
      <>
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            requiredMark,
          }}

          style={{width:"500px", margin: '10px auto'}}
          onValuesChange={onRequiredTypeChange}
          requiredMark={requiredMark}
          onFinish={onFinish}
        >
          <Form.Item label="您所选择的服务分类" name="classify" required  tooltip="必须填写内容" initialValue={select}>
            <Cascader options={options}   placeholder="服务内容" />
          </Form.Item>
          <Form.Item label="请填写您的需求名称：" name="demandName"
                     rules={[
                       {
                         required: true,
                         message: '请输入需求名称！',
                       },]}
                     tooltip="必须填写内容">
            <Input placeholder="需求名称" />
          </Form.Item>
          <Form.Item label="请简单描述一下需求的具体细节"name="demandDesc"
                     rules={[
                       {
                         required: true,
                         message: '请输入需求的具体细节！',
                       },]}
                     tooltip="必须填写内容">
            <TextArea rows={5} placeholder="具体细节" />
          </Form.Item>
          <Form.Item label="请选择交易方式：" name="MeansOfTransaction">
            <Radio.Group>
              <Radio.Button value="报价">报价</Radio.Button>
              <Radio.Button value="比选">比选</Radio.Button>
              <Radio.Button value="招标">招标</Radio.Button>
            </Radio.Group>
          </Form.Item>


          <Form.Item
            label="联系方式"
            name="phoneNumber"
            tooltip={{
              title: '可选',
              icon: <InfoCircleOutlined />,
            }}
          >
            <Input placeholder="请输入手机号" />

          </Form.Item>
          <Form.Item
            label="电子邮箱"
            name="email"
            tooltip={{
              title: '可选',
              icon: <InfoCircleOutlined />,
            }}
          >
            <Input placeholder="请输入电子邮箱" />

          </Form.Item>
          <Form.Item>
            <Button size="large"
                    type="primary"
                    htmlType="submit">提交</Button>
          </Form.Item>
        </Form>
      </>
    )
}

export default CommitTable
