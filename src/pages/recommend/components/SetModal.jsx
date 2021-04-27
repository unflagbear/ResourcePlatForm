import {useState, useEffect} from 'react'
import { Form, Button, DatePicker, Input, Modal} from 'antd';


const SetModal = props =>{
  const [form]=Form.useForm();
  const {visible,record,uid,closeHandler,onFinsh}=props;

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
    labelCol: { span: 5 },
    wrapperCol: { span: 12 },
  };

  return(
    <div>
      <Modal title={'设置偏好值'} visible={visible} onOk={onOk} onCancel={closeHandler} forceRender>
        <Form name="basic" form={form} onFinish={onFinsh} onFinishFailed={onFinishFailed}>
          <h3  >用户id: {uid}</h3>
          <Form.Item {...formItemLayout} style={{marginTop:'20px'}} label='模型偏好值' name='preference' >
            <input style={{width: '148%'}}/>
          </Form.Item>
          
        </Form>
      </Modal>
    </div>
  )
}
export default SetModal;