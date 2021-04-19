import {useState, useEffect} from 'react'
import { Form, Button, DatePicker, Input, Modal, Radio, Select, Steps, Menu, Dropdown, message } from 'antd';
import { Color } from 'chalk';
import { DownOutlined } from '@ant-design/icons';


const EditModal = props =>{
  const [form]=Form.useForm();
  const [value, setValue]=useState('request_instrument');
  const [title, setTitle]=useState('询问设备');
  const {visible,record,id,closeHandler,onFinsh,name}=props;
  const { Option } = Select;

  function handleChange(value) {
    //console.log(`selected ${value}`);
  }
  useEffect(()=>{
    if(record==undefined){
      form.resetFields();//清空表单
    }
    else{
    	form.setFieldsValue(record);
      //console.log({record});
    }
  },[props.visible]);//异步操作，后面参数发生变化则执行前面的函数
 
  
	const onOk=()=>{
    form.submit(); //提交数据
  }
  
  const onFinishFailed=()=>{
    console.log('Failed',errorInfo);
  }

  const formItemLayout = {
    labelCol: { span: 9 },
    wrapperCol: { span: 12 },
  };

  return(
    <div>
      <Modal title={name} visible={visible} onOk={onOk} onCancel={closeHandler} forceRender>
        <Form name="basic" form={form} onFinish={onFinsh} onFinishFailed={onFinishFailed}>
          <h3  >ID: {id}</h3>
          <Form.Item {...formItemLayout} style={{marginTop:'20px'}} label='语句内容' name='content' >
            <input />
          </Form.Item>
          <Form.Item {...formItemLayout} label='相似语料组' name='intent' >
            <Select  style={{ width: 120 }} onChange={handleChange}>
              <Option value="request_instrument">询问设备</Option>
              <Option value="request_patent">询问专利</Option>
              <Option value="request_expert">询问专家</Option>
              <Option value="faq'">相关问答</Option>
              <Option value="affirm">同意</Option>
              <Option value="deny">否认</Option>
              <Option value="inform">信息</Option>
            </Select>
          </Form.Item>
          {/* <Form.Item {...formItemLayout} label='相似语料组' name='tgt_intent' >
            <Dropdown overlay={menu}>
              <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                {title} <DownOutlined />
              </a>
            </Dropdown>
            <input value={value}/>
          </Form.Item> */}
        </Form>
      </Modal>
    </div>
  )
}
export default EditModal;