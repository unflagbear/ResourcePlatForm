import React, { useEffect, useState } from 'react';
import { connect, useLocation } from 'umi';
import './index.css'
import {
  Typography,
  Image,
  Col,
  Row,
  Tag,
  Descriptions,
  Card,
  Divider,
  Rate,
  Button,
  Affix,
  Steps,
  Modal,
  Form,
  Input, 
  InputNumber,
  message,
  Space
} from 'antd';
import {
  MessageOutlined
, FundViewOutlined, ClockCircleOutlined } from '@ant-design/icons';

import defaultImg from '@/assets/defaultImg.svg';
import 'antd/dist/antd.css';
import ChatforAccessService from '@/components/ChatForAccessService';

const { Title } = Typography;
const { Step } = Steps;

function Details({ dispatch, resource: { resourceDetail = {} } }) {
  const [haveSource, setHaveSource] = useState(false);
  const [chatLog, setChatLog] = useState(false);
  // const text = (
  //   <Affix offsetTop={70}>
  //     <div>对方服务人员</div>
  //   </Affix>
  // );
  const [top,setTop] = useState(60);
  const [modalVisible,setModalVisible] = useState(false);
  const location = useLocation();
  const { productID } = location.query;
  // const content =<Affix offsetTop={80}><div style={{width: 500,height:600}}> <ChatforAccessService /></div></Affix>
  const appendix = resourceDetail.appendix ? resourceDetail.appendix.split('、') : [];
  useEffect(() => {
    if (productID) {
      dispatch({
        type: 'resource/detail',
        payload: {
          productID,
        },
      });
    }
  }, []);
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  
  const validateMessages = {
    required: '${label} is required!',
    types: {
      email: '${label} is not a valid email!',
      number: '${label} is not a valid number!',
    },
    number: {
      range: '${label} must be between ${min} and ${max}',
    },
  };
  const success = () => {
    setModalVisible(false);
    message.success('您的申请已提交');
  };
  
  const Demo = () => {
    const onFinish = (values) => {
      console.log(values);
    };
  
    return (
      <div >
      <Form {...layout} name="nest-messages" 
      onFinish={onFinish} validateMessages={validateMessages}>
        <Form.Item name={['apply', 'demand']} label="需求概述" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name={['apply', 'intro']} label="详细说明">
        <Input.TextArea />
        </Form.Item>
        <Form.Item name={['apply', 'institution']} label="需求单位">
          <Input />
        </Form.Item>
        <Form.Item name={['apply', 'website']} label="预算金额(万元)" rules={[{ type: 'number', min: 0, max: 999999 }]}>
          <Input />
        </Form.Item>
        <Form.Item name={['apply', 'introduction']} label="联系人姓名">
          <Input/>
        </Form.Item>
        <Form.Item name={['apply', 'introduction']} label="联系电话" rules={[{ type: 'number', length:11 }]}>
          <Input/>
        </Form.Item>
        <Form.Item name={['apply', 'email']} label="邮箱" rules={[{ type: 'email' }]}>
          <Input/>
        </Form.Item>
        {/* <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item> */}
      </Form>
      </div>
    );
  };
  const Progress=(props)=>(
    <div // style={props.style}
    className='style'>
    {props.title}
    <Divider />
    <Steps // style={props.style}
    style={{marginTop: '20px'}}
  
    // title={props.title}
    current={0}>
      <Step title="申请服务" description="This is a description." />
      <Step title="线下沟通" /* subTitle="Left 00:00:08" */ description="This is a description." />
      <Step title="签署协议" description="This is a description." />
      <Step title="服务实施" description="This is a description." />
      <Step title="服务验收" description="This is a description." />
      <Step title="服务评价" description="This is a description." />
    </Steps>
    </div>
  )
  const clickApply=()=>{
   // debugger
    setModalVisible(true);
    console.log(modalVisible);
  }
  const closeHandler = ()=>{
    setModalVisible(false);
  }

  // 详细内容卡片
  const Detail = () => (
    <Card
      hoverable
      extra={
        haveSource ? (
          <Affix offsetTop={top}>
            <Button type="primary">申请资源</Button>
          </Affix>
        ) : null
      }
      title={
        <span>
          <Divider
            plain
            style={{ borderLeft: '2px solid rgba(0,0,0,0.5)', fontSize: '20px' }}
            type="vertical"
          />
          资源详情
        </span>
      }
    >
      <Descriptions
        layout="vertical"
        bordered
        // labelStyle={{}}
        title="产品介绍"
      >
        <Descriptions.Item label="产品图片">
          <Image width={200} height={200} src={resourceDetail.imgLink} fallback={defaultImg} />
        </Descriptions.Item>
        <Descriptions.Item label="产品名">{resourceDetail.name}</Descriptions.Item>
        <Descriptions.Item label="生产地">{resourceDetail.makein}</Descriptions.Item>
        <Descriptions.Item label="生产时间">{resourceDetail.buydate}</Descriptions.Item>
        <Descriptions.Item label="所在地">{resourceDetail.place}</Descriptions.Item>
        <Descriptions.Item label="类别">{resourceDetail.machineSimType}</Descriptions.Item>
        <Descriptions.Item label="型号">{resourceDetail.model}</Descriptions.Item>
        <Descriptions.Item label="设备索引">
          {/* {resourceDetail.appendix.split("、").map((data,index)=>{
                        return (
                            <>
                            {data} <br />
                            </>
                        )
                    })} */}
          {appendix.map((data, index) => {
            return (
              <Tag size="middle" key={index}>
                {data}
              </Tag>
            );
          })}
        </Descriptions.Item> 
      </Descriptions>
      <Progress 
        // style={{marginTop: '50px'}}
        title={
        <span style={{fontWeight:'500', fontSize:'16px'}}>
          <Divider
            plain
            style={{ borderLeft: '2px solid rgba(0,0,0,0.5)', fontSize: '20px' }}
            type="vertical"
          />
          申请流程
        </span>
      } />
      <Modal 
        title="提交申请" 
        centered 
        style={{top: '10px'}}
        width='900px'
        height='550px'
        visible={modalVisible} 
        onOk={closeHandler} 
        onCancel={closeHandler}
        bodyStyle={{
          marginRight:'120px'
        }}
        footer={[
          <Button key="back" onClick={closeHandler}>
            取消
          </Button>,
          <Button key="submit" type="primary" htmlType="submit" loading={false} onClick={success}>
            提交
          </Button>,
        ]}>
        <Demo />
      </Modal>
      <Button type="primary" className='buttonMargin' onClick={clickApply}>立刻申请</Button>
      
    </Card>
  );
  
  const Comment = () => (
    <Card
      style={{ width: '100%' }}
      hoverable
      title={
        <span>
          <Divider
            plain
            style={{ borderLeft: '2px solid rgba(0,0,0,0.5)', fontSize: '20px' }}
            type="vertical"
          />
          使用评价
        </span>
      }
      style={{ marginTop: 32 }}
    >
      <Descriptions
        title="资源总体评分"
        style={{
          marginBottom: 32,
          width: '100%',
        }}
        bordered
      >
        <Descriptions.Item label="综合评分">
          <Rate disabled allowHalf style={{ marginRight: '3px' }} defaultValue={4.5} />
          4.5
        </Descriptions.Item>
        <Descriptions.Item label="专业评分">
          <Rate disabled allowHalf style={{ marginRight: '3px' }} defaultValue={3.5} />
          3.5
        </Descriptions.Item>
        <Descriptions.Item label="服务评分">
          <Rate disabled allowHalf style={{ marginRight: '3px' }} defaultValue={3.5} />
          3.5
        </Descriptions.Item>
      </Descriptions>

      <Descriptions
        title="服务时间：2021-1-1"
        style={{
          marginBottom: 32,
        }}
        bordered
      >
        <Descriptions.Item label="用户姓名">付**</Descriptions.Item>
        <Descriptions.Item label="用户评分">
          <Rate disabled allowHalf style={{ marginRight: '3px' }} defaultValue={3.5} /> 3.5分
        </Descriptions.Item>
        <Descriptions.Item label="评价时间">2020-3-4</Descriptions.Item>
        <Descriptions.Item label="用户评价">
          服务十分到位，设备状态良好，看着跟新的一样
        </Descriptions.Item>
      </Descriptions>
      <Divider />
      <Descriptions
        title="服务时间：2021-1-1"
        style={{
          marginBottom: 32,
        }}
        bordered
      >
        <Descriptions.Item label="用户姓名">付**</Descriptions.Item>
        <Descriptions.Item label="用户评分">
          <Rate disabled allowHalf style={{ marginRight: '3px' }} defaultValue={3.5} /> 3.5分
        </Descriptions.Item>
        <Descriptions.Item label="评价时间">2020-3-4</Descriptions.Item>
        <Descriptions.Item label="用户评价">
          服务十分到位，设备状态良好，看着跟新的一样
        </Descriptions.Item>
      </Descriptions>
      <Divider />
      <Descriptions
        title="服务时间：2021-1-1"
        style={{
          marginBottom: 32,
        }}
        bordered
      >
        <Descriptions.Item label="用户姓名">付**</Descriptions.Item>
        <Descriptions.Item label="用户评分">
          <Rate disabled allowHalf style={{ marginRight: '3px' }} defaultValue={3.5} /> 3.5分
        </Descriptions.Item>
        <Descriptions.Item label="评价时间">2020-3-4</Descriptions.Item>
        <Descriptions.Item label="用户评价">
          服务十分到位，设备状态良好，看着跟新的一样
        </Descriptions.Item>
      </Descriptions>
      <Divider />
      <Descriptions
        title="服务时间：2021-1-1"
        style={{
          marginBottom: 32,
        }}
        bordered
      >
        <Descriptions.Item label="用户姓名">付**</Descriptions.Item>
        <Descriptions.Item label="用户评分">
          <Rate disabled allowHalf style={{ marginRight: '3px' }} defaultValue={3.5} /> 3.5分
        </Descriptions.Item>
        <Descriptions.Item label="评价时间">2020-3-4</Descriptions.Item>
        <Descriptions.Item label="用户评价">
          服务十分到位，设备状态良好，看着跟新的一样
        </Descriptions.Item>
      </Descriptions>
      {/* <Divider/> */}
      <Descriptions
        title="服务时间：2021-1-1"
        style={{
          marginBottom: 32,
        }}
        bordered
      >
        <Descriptions.Item label="用户姓名">付**</Descriptions.Item>
        <Descriptions.Item label="用户评分">
          <Rate disabled allowHalf style={{ marginRight: '3px' }} defaultValue={3.5} /> 3.5分
        </Descriptions.Item>
        <Descriptions.Item label="评价时间">2020-3-4</Descriptions.Item>
        <Descriptions.Item label="用户评价">
          服务十分到位，设备状态良好，看着跟新的一样
        </Descriptions.Item>
      </Descriptions>
      <Divider />
    </Card>
  );

  const Recomment = () => (
    <Card
      style={{ width: '100%' }}
      hoverable
      title={
        <span>
          <Divider
            plain
            style={{ borderLeft: '2px solid rgba(0,0,0,0.5)', fontSize: '20px' }}
            type="vertical"
          />
          使用评价
        </span>
      }
      style={{ marginTop: 32 }}
    >
      <Descriptions
        title="资源总体评分"
        style={{
          marginBottom: 32,
          width: '100%',
        }}
        bordered
      >
        <Descriptions.Item label="综合评分">
          <Rate disabled allowHalf style={{ marginRight: '3px' }} defaultValue={4.5} />
          4.5
        </Descriptions.Item>
        <Descriptions.Item label="专业评分">
          <Rate disabled allowHalf style={{ marginRight: '3px' }} defaultValue={3.5} />
          3.5
        </Descriptions.Item>
        <Descriptions.Item label="服务评分">
          <Rate disabled allowHalf style={{ marginRight: '3px' }} defaultValue={3.5} />
          3.5
        </Descriptions.Item>
      </Descriptions>

    </Card>
  );
  return (
    <>
      <Row justify="center">
        <Col>
          <Title>{resourceDetail.title}</Title>
        </Col>
      </Row>

      <Row justify="center">
        <Col>
          <Title level={3} type="secondary">
            {resourceDetail.company}
          </Title>
        </Col>
      </Row>
      <Row justify="center" style={{ marginBottom: '1rem' }}>
        <Col>
          <FundViewOutlined />
          {resourceDetail.viewInfo}
        </Col>
        <Col offset={1}>
          <ClockCircleOutlined />
          {resourceDetail.buydate}
        </Col>
      </Row>
      <Divider />
      <Row justify="center">
        {/* <Col offset={0}>
                    
                </Col> */}
        <Col span={24}>
          <Detail  />
          <Comment />
        </Col>
      </Row>
      
      {/* <div
        style={{
          zIndex: '999999',
          right: '38px',
          bottom: '49px',
          position: 'fixed',
          display: 'block',
        }}
      >
        <Card
          style={{
            display: chatLog ? 'block' : 'none',
            position: 'absolute',
            overflow: 'hidden',
            left: '-500px',
            bottom: '-8px',
          }}
        >
          <div style={{ height: '554px', width: '460px' }}>
            <ChatforAccessService />
          </div>
        </Card>
        <Button
          style={{ left: 30 ,
            backgroundColor: 'black',
            bordercolor: 'black'}}
          type="primary"
          onClick={() => (chatLog ? setChatLog(false) : setChatLog(true))}
        >
          <MessageOutlined style={{bottom:2}}/>
          在线客服
        </Button>
      </div> */}
    </>
  );
}

export default connect(({ resource, loading }) => ({
  resource,
  loading: loading.models.listAndsearchAndprojects,
}))(Details);
