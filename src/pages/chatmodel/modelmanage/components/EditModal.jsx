import {useState, useEffect} from 'react'
import { Form, Button, DatePicker, Input, Modal, Radio, Select, Steps, Menu, Dropdown, message } from 'antd';
import { Color } from 'chalk';
import { DownOutlined } from '@ant-design/icons';


const EditModal = props =>{
  const [form]=Form.useForm();
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
          <Form.Item {...formItemLayout} style={{marginTop:'20px'}} label='模型名称' name='model_name' >
            <input />
          </Form.Item>
          <Form.Item {...formItemLayout} label='模型描述' name='model_desc' >
            <input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}
export default EditModal;