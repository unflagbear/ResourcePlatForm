import React, { useEffect, useState } from 'react';
import { connect, useLocation } from 'umi';
import ApplyModal from './components/ApplyModal';
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
  message,
} from 'antd';
import { FundViewOutlined, ClockCircleOutlined } from '@ant-design/icons';
import defaultImg from '@/assets/defaultImg.svg';
import {apply} from './service';

const { Title } = Typography;
const { Step } = Steps;


function ServiceDetails({ dispatch, serviceDetails: { serviceDetail = {} } }) {
  const location = useLocation();
  const { productID } = location.query;
  const [modalVisible,setModalVisible] = useState(false);
  const appendix = serviceDetail.serviceCategory ? serviceDetail.serviceCategory.split('/') : [];
  useEffect(() => {
    if (productID) {
      dispatch({
        type: 'serviceDetails/detail',
        payload: {
          productID,
        },
      });
    }
  }, []); 
  const Progress=(props)=>(
    <div //style={props.style}
    className='style'>
    {props.title}
    <Divider />
    <Steps //style={props.style}
    style={{marginTop: '20px'}}
  
    //title={props.title}
    current={0}>
      <Step title="申请服务"  />
      <Step title="线下沟通" />
      <Step title="签署协议" />
      <Step title="服务实施"/>
      <Step title="服务验收" />
      <Step title="服务评价"  />
    </Steps>
    </div>
  )
  const clickApply=()=>{
    setModalVisible(true);
  }
  const closeHandler = ()=>{
    setModalVisible(false);
  }

  const onFinish= async(value) => {
    // console.log(value);
    
     const values={serviceId: serviceDetail.serviceId, ...value.apply};
     //const values={id:num++,create_time:time,demand:value.apply.demand,intro:value.intro,institution:value.institution,budget:value.budget,contact_name:value.contact_name,contact_phone:value.contact_name,contact_email:value.contact_email};
     console.log(values);
    //  dispatch({
    //    type:'details/apply',
    //    payload:{
    //      values,
    //    },
    //  });
     await apply(values).then((res)=>{  
      if(res.data==true){
        message.success("申请成功");
      }
    }); 
     setModalVisible(false);
 }
  const Detail = () => (

    <Card
      hoverable
      extra={

          <Affix offsetTop={60}>
            <Button type="primary" onClick ={clickApply}>申请服务</Button>
          </Affix>
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
        <Descriptions.Item label="服务展示图片">
          <Image width={300} src={serviceDetail.servicePicture} fallback={defaultImg} />
        </Descriptions.Item>
        <Descriptions.Item label="服务名">{serviceDetail.serviceName}</Descriptions.Item>
        
        <Descriptions.Item label="服务价格">{serviceDetail.servicePrice}</Descriptions.Item>
        <Descriptions.Item label="付款方式">{serviceDetail.serviceMeansOfPayment}</Descriptions.Item>
        <Descriptions.Item label="类别">
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
          })}</Descriptions.Item>
        <Descriptions.Item label="交付周期">{serviceDetail.servicePeriod}</Descriptions.Item>
        <Descriptions.Item label="服务描述">{serviceDetail.serviceDesc}</Descriptions.Item>
      </Descriptions>
      <Progress 
        //style={{marginTop: '50px'}}
        title={
        <span style={{fontWeight:'500', fontSize:'16px'}}>
          <Divider
            plain
            style={{ borderLeft: '2px solid rgba(0,0,0,0.5)', fontSize: '20px' }}
            type="vertical"
          />
          申请流程
        </span>
      }/>    
      <ApplyModal  style={{marginBottom:40}} visible={modalVisible} closeHandler={closeHandler} onFinish={onFinish} > </ApplyModal>   
      {/* </Progress> */}
      {/* <ApplyModal  style={{marginBottom:40}} 
        // visible={modalVisible} 
        
        // closeHandler={closeHandler} 
        // onFinish={onFinish} 
      />  */}
      
      {/* <Button type="primary" className='buttonMargin' >立刻申请</Button> */}
      
    </Card>
  );
  return (
    <>
      <Row justify="center">
        <Col>
          <Title>{serviceDetail.serviceName}</Title>
        </Col>
      </Row>

      <Row justify="center">
        <Col>
          <Title level={3} type="secondary">
            {serviceDetail.serviceProvider}
          </Title>
        </Col>
      </Row>
      <Divider />
      <Row justify="center">
        {/* <Col offset={0}>
                    
                </Col> */}
        <Col span={24}>
          <Detail  />
          {/* <Comment /> */}
        </Col>
      </Row>
    </>
  )
}
export default connect(({ serviceDetails }) => ({
  serviceDetails,
}))(ServiceDetails);

