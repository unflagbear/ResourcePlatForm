import React, { useEffect, useState } from 'react';
import { connect, useLocation,history } from 'umi';
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


function ServiceSetDetails({ dispatch, serviceSetDetails: { serviceDetail = {} } }) {
  const location = useLocation();
  const { productID } = location.query;
  const [modalVisible,setModalVisible] = useState(false);
  const appendix = serviceDetail.serviceCategory ? serviceDetail.serviceCategory.split('/') : [];
  useEffect(() => {
    if (productID) {
      dispatch({
        type: 'serviceSetDetails/detail',
        payload: {
          productID,
        },
      });
    }
  }, []); 

  const clickApply=()=>{
    setModalVisible(true);
  }
  const closeHandler = ()=>{
    setModalVisible(false);
  }
  const goToDetail = (productID) => {
    history.push({
      pathname: '/details_service',
      query: {
        productID,
      },
    });
  };
  const onFinish= async(value) => {
    // console.log(value);
    
     const values={serviceId: serviceDetail.id,type:1, ...value.apply};
     await apply(values).then((res)=>{  
      if(res.data=="success"){
        message.success("申请成功");
      }
    }); 
     setModalVisible(false);
 }
 const SubService = () => (
  <Card
    hoverable
    title={
      <span>
        <Divider
          plain
          style={{ borderLeft: '2px solid rgba(0,0,0,0.5)', fontSize: '20px' }}
          type="vertical"
        />
        服务包内容详细展示
      </span>
    }
    style={{marginTop:"1.5rem"}}
  >
    {serviceDetail.serviceTableList.map((index,num)=>{
      return (
        <Descriptions
      layout="vertical"
      bordered
      column={4}
      // labelStyle={{}}
      title={`第${(num+1)}个子服务：${index.serviceName}`}
      key={num}
      style={{marginBottom:"20px"}}
      extra={
        <>
        <Tag color="blue" key={index}>{index.serverOrigin}</Tag>
        <Button  onClick={() => goToDetail(index.serviceId)}>查看服务详情</Button>
        </>
      }
    >
     
      <Descriptions.Item label="服务名">{index.serviceName}</Descriptions.Item>
      
      <Descriptions.Item label="服务价格">{index.servicePrice}</Descriptions.Item>
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
      <Descriptions.Item label="交付周期">{index.servicePeriod}</Descriptions.Item>
      <Descriptions.Item label="服务描述" span={4}>{index.serviceDesc}</Descriptions.Item>
    </Descriptions>
      )
      
})}
   
  </Card>
);
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
          服务集成包详情
        </span>
      }
    >
      <Descriptions
        layout="vertical"
        bordered
        // labelStyle={{}}
        title="集成服务名"
        column={3}
        
      >
        <Descriptions.Item label="服务展示图片" span={3}>
          <Image width={300} src={serviceDetail.servicePicture} fallback={defaultImg} />
        </Descriptions.Item>
        <Descriptions.Item label="服务名">{serviceDetail.serviceName}</Descriptions.Item>
        <Descriptions.Item label="子服务数">{serviceDetail.serviceTableList?serviceDetail.serviceTableList.length:null}</Descriptions.Item>
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
        <Descriptions.Item label="服务描述">{serviceDetail.serviceProcess}</Descriptions.Item>
      </Descriptions>
      <ApplyModal  style={{marginBottom:40}} visible={modalVisible} closeHandler={closeHandler} onFinish={onFinish} > </ApplyModal>   
     
    </Card>
  );
  const Progress = () => (
    <Card
      hoverable
      title={
        <span>
          <Divider
            plain
            style={{ borderLeft: '2px solid rgba(0,0,0,0.5)', fontSize: '20px' }}
            type="vertical"
          />
          服务包流程
        </span>
      }
      style={{marginTop:"1.5rem"}}
    > 
    <Steps >
      {serviceDetail.serviceTableList.map((index,num)=>{
        return (
          <Step title={index.serviceName} key={num}/>
        )
      })}
      </Steps>
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
          {serviceDetail.serviceTableList?<Progress/>:null}
          {serviceDetail.serviceTableList?<SubService/>:null}
        </Col>
      </Row>
    </>
  )
}
export default connect(({ serviceSetDetails }) => ({
  serviceSetDetails,
}))(ServiceSetDetails);

