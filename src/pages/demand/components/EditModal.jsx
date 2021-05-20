import React, {useState, useEffect} from 'react'
import { Form, Button, DatePicker, Input, Modal, Radio, Select, Steps, Menu, Dropdown, message } from 'antd';
import { Color } from 'chalk';
import { DownOutlined } from '@ant-design/icons';


const EditModal = props =>{
  const [form]=Form.useForm();
  const [value, setValue]=useState('request_instrument');
  const [title, setTitle]=useState('询问设备');
  const {visible,record,id,closeHandler,onFinsh,name}=props;
  const { Option } = Select;
  const { TextArea } = Input;

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
          <h3  >需求ID: {id}</h3>
          <Form.Item {...formItemLayout} style={{marginTop:'20px'}} label='需求名称' name='demandName' >
            <input />
          </Form.Item>
          <Form.Item {...formItemLayout} style={{marginTop:'20px'}} label='联系方式' name='phoneNumber' >
            <input />
          </Form.Item>
          <Form.Item {...formItemLayout} style={{marginTop:'20px'}} label='电子邮箱' name='email' >
            <input />
          </Form.Item>
          <Form.Item {...formItemLayout} label='需求描述' name='demandDesc' >
            <TextArea rows={4}  />
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
