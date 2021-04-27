import React, { useState,useEffect } from 'react';
import { Form, Input, Button, Radio ,Cascader ,} from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';

import data from '@/utils/classify/classifyNew.json'
import {modify} from '@/utils/classify/modify'
import styles from "@/pages/user/register/style.less";

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
        // console.log(seletct)
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
                <Form.Item label="请填写您的服务名称：" name="serviceName"
                           rules={[
                             {
                               required: true,
                               message: '请输入服务名称！',
                             },]}
                           tooltip="必须填写内容">
                <Input placeholder="服务名称" />
                </Form.Item>
              <Form.Item label="请填写您的服务价格：" name="servicePrice"
                         rules={[
                           {
                             required: true,
                             message: '请输入邮箱地址！',
                           },]}
                         tooltip="必须填写内容">
                <Input placeholder="服务名称" />
              </Form.Item>
                <Form.Item label="请简单描述一下服务的具体细节"name="serviceDesc"
                           rules={[
                             {
                               required: true,
                               message: '请输入服务的具体细节！',
                             },]}
                           tooltip="必须填写内容">
                <TextArea rows={5} placeholder="具体细节" />
                </Form.Item>
                <Form.Item label="请选择付款方式：" name="serviceMeansOfPayment">
                <Radio.Group>
                    <Radio.Button value="一次性支付">一次性支付</Radio.Button>
                    <Radio.Button value="分期付款">分期付款</Radio.Button>
                    <Radio.Button value="其他">其他</Radio.Button>
                </Radio.Group>
                </Form.Item>
              <Form.Item
                label="服务周期"
                name="servicePeriod"
                rules={[
                  {
                    required: true,
                    message: '请输入服务周期！',
                  },]}
                tooltip={{
                  title: '必须填写内容',
                  icon: <InfoCircleOutlined />,
                }}
              >
                <Input placeholder="请输入服务周期" />

              </Form.Item>
              <Form.Item
                label="服务价格"
                name="price"
                rules={[
                  {
                    required: true,
                    message: '请输入服务价格！',
                  },]}
                tooltip={{
                  title: "必须填写内容",
                  icon: <InfoCircleOutlined />,
                }}
              >
                <Input placeholder="请输入服务价格" />
              </Form.Item>
                <Form.Item
                label="联系方式"
                name="phone"
                tooltip={{
                    title: '可选',
                    icon: <InfoCircleOutlined />,
                }}
                >
                <Input placeholder="请输入手机号" />

                </Form.Item>
                <Form.Item
                label="电子邮箱"
                name="mail"
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
