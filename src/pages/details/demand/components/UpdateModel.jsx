import React, {useState, useEffect} from 'react'
import { Form, Button, DatePicker, Input, Modal, Radio, Select, Steps, Menu, Dropdown, message, InputNumber } from 'antd';
import { Color } from 'chalk';
import { DownOutlined } from '@ant-design/icons';


const UpdateModel = props =>{
  const [form]=Form.useForm();
  const {visible,closeHandler,onFinish}=props;


  // useEffect(()=>{
  //   if(record==undefined){
  //     form.resetFields();//清空表单
  //   }
  //   else{
  //   	form.setFieldsValue(record);
  //     //console.log({record});
  //   }
  // },[props.visible]);//异步操作，后面参数发生变化则执行前面的函数


  const onOk=()=>{
    form.submit(); //提交数据
  }

  const onFinishFailed=()=>{
    console.log('Failed');
  }

  // const formItemLayout = {
  //   labelCol: { span: 9 },
  //   wrapperCol: { span: 12 },
  // };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }} defaultValue="86">
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    </Form.Item>
  );

  return(
    <div >
      <Modal width={600} title={'提交申请'} visible={visible} onOk={onOk} onCancel={closeHandler} forceRender>
        <Form name="basic"
              style={{ width: 400, marginLeft:65 }}
              form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>
          <Form.Item name={['apply', 'demandName']} label="需求名称" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name={['apply', 'demandDesc']} label="需求描述">
            <Input.TextArea />
          </Form.Item>
          <Form.Item name={['apply', 'meansOfTransaction']} label="交易方式">
            <Radio.Group>
              <Radio.Button value="报价">报价</Radio.Button>
              <Radio.Button value="比选">比选</Radio.Button>
              <Radio.Button value="招标">招标</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item name={['apply', 'phoneNumber']} label="联系电话" >
            <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name={['apply', 'email']} label="电子邮箱" rules={[{ type: 'email' }]}>
            <Input/>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}
export default UpdateModel;
