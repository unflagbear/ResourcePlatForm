import React, { useEffect, useState } from 'react';
import { connect, useLocation } from 'umi';
// import './index.css';
// import ApplyModal from './components/ApplyModal';
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
import 'antd/dist/antd.css';


const { Title } = Typography;
const { Step } = Steps;


const CompanyDetail = ({ dispatch, companyDetails: { companyDetail = {} } })=>{
    
  // const [top,setTop] = useState(60);
  // const [modalVisible,setModalVisible] = useState(false);
  const location = useLocation();
  const { productID } = location.query;
  // const content =<Affix offsetTop={80}><div style={{width: 500,height:600}}> <ChatforAccessService /></div></Affix>

  useEffect(() => {
    if (productID) {
      dispatch({
        type: 'companyDetails/detail',
        payload: {
          productID,
        },
      });
    }
  }, []);
  
  
  
  // const success = () => {
  //   setModalVisible(false);
  //   message.success('您的申请已提交');
  // };
  
  // const Progress=(props)=>(
  //   <div //style={props.style}
  //   className='style'>
  //   {props.title}
  //   <Divider />
  //   <Steps //style={props.style}
  //   style={{marginTop: '20px'}}
  
  //   //title={props.title}
  //   current={0}>
  //     <Step title="申请服务" />
  //     <Step title="线下沟通"  />
  //     <Step title="签署协议"  />
  //     <Step title="服务实施"  />
  //     <Step title="服务验收"  />
  //     <Step title="服务评价"  />
  //   </Steps>
  //   </div>
  // )
  // const clickApply=()=>{
  //   setModalVisible(true);
  // }
//   const closeHandler = ()=>{
//     setModalVisible(false);
//   }
//   const onFinish= (value) => {
//    // console.log(value);
   
//     const values={serviceId: companyDetail.id, ...value.apply};
//     //const values={id:num++,create_time:time,demand:value.apply.demand,intro:value.intro,institution:value.institution,budget:value.budget,contact_name:value.contact_name,contact_phone:value.contact_name,contact_email:value.contact_email};
//     console.log(values);
//     dispatch({
//       type:'details/apply',
//       payload:{
//         values,
//       },
//     });
//     setModalVisible(false);
// }

  // 详细内容卡片
  const Detail = () => (

    <Card
      hoverable
      // extra={
      //   // haveSource ? (
      //     <Affix offsetTop={top}>
      //       <Button type="primary" onClick = {clickApply}>申请资源</Button>
      //     </Affix>
      //   // ) : null
      // }
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
          <Image width={500} height={130} src={companyDetail.url} fallback={defaultImg} />
        </Descriptions.Item>
        <Descriptions.Item label="联系电话">{companyDetail.telephone}</Descriptions.Item>
        <Descriptions.Item label="公司营业期限">{companyDetail.operatingperiod}</Descriptions.Item>
        <Descriptions.Item label="注册资本">{companyDetail.registercapital}</Descriptions.Item>
        <Descriptions.Item label="注册机构">{companyDetail.registrationauthority}</Descriptions.Item>
        <Descriptions.Item label="类别">{companyDetail.type}</Descriptions.Item>
        <Descriptions.Item label="状态">{companyDetail.state}</Descriptions.Item>
        <Descriptions.Item label="营业范围">{companyDetail.businessscope}</Descriptions.Item>
        
      </Descriptions>
      {/* <Progress 
        //style={{marginTop: '50px'}}
        title={
        <span style={{fontWeight:'450', fontSize:'16px'}}>
          <Divider
            plain
            style={{ borderLeft: '2px solid rgba(0,0,0,0.5)', fontSize: '20px' }}
            type="vertical"
          />
          申请流程
        </span>
      }/>        */}
      {/* </Progress> */}
      {/* <ApplyModal  style={{marginBottom:40}} visible={modalVisible} closeHandler={closeHandler} onFinish={onFinish} > </ApplyModal> */}
      
      {/* <Button type="primary" className='buttonMargin' >立刻申请</Button> */}
      
    </Card>
  );
  
  // const Comment = () => (
  //   <Card
  //     style={{ width: '100%' }}
  //     hoverable
  //     title={
  //       <span>
  //         <Divider
  //           plain
  //           style={{ borderLeft: '2px solid rgba(0,0,0,0.5)', fontSize: '20px' }}
  //           type="vertical"
  //         />
  //         使用评价
  //       </span>
  //     }
  //     style={{ marginTop: 32 }}
  //   >
  //     <Descriptions
  //       title="资源总体评分"
  //       style={{
  //         marginBottom: 32,
  //         width: '100%',
  //       }}
  //       bordered
  //     >
  //       <Descriptions.Item label="综合评分">
  //         <Rate disabled allowHalf style={{ marginRight: '3px' }} defaultValue={4.5} />
  //         4.5
  //       </Descriptions.Item>
  //       <Descriptions.Item label="专业评分">
  //         <Rate disabled allowHalf style={{ marginRight: '3px' }} defaultValue={3.5} />
  //         3.5
  //       </Descriptions.Item>
  //       <Descriptions.Item label="服务评分">
  //         <Rate disabled allowHalf style={{ marginRight: '3px' }} defaultValue={3.5} />
  //         3.5
  //       </Descriptions.Item>
  //     </Descriptions>

  //     <Descriptions
  //       title="服务时间：2021-1-1"
  //       style={{
  //         marginBottom: 32,
  //       }}
  //       bordered
  //     >
  //       <Descriptions.Item label="用户姓名">付**</Descriptions.Item>
  //       <Descriptions.Item label="用户评分">
  //         <Rate disabled allowHalf style={{ marginRight: '3px' }} defaultValue={3.5} /> 3.5分
  //       </Descriptions.Item>
  //       <Descriptions.Item label="评价时间">2020-3-4</Descriptions.Item>
  //       <Descriptions.Item label="用户评价">
  //         服务十分到位，设备状态良好，看着跟新的一样
  //       </Descriptions.Item>
  //     </Descriptions>
  //     <Divider />
  //     <Descriptions
  //       title="服务时间：2021-1-1"
  //       style={{
  //         marginBottom: 32,
  //       }}
  //       bordered
  //     >
  //       <Descriptions.Item label="用户姓名">付**</Descriptions.Item>
  //       <Descriptions.Item label="用户评分">
  //         <Rate disabled allowHalf style={{ marginRight: '3px' }} defaultValue={3.5} /> 3.5分
  //       </Descriptions.Item>
  //       <Descriptions.Item label="评价时间">2020-3-4</Descriptions.Item>
  //       <Descriptions.Item label="用户评价">
  //        设备很好用还会再次租借
  //       </Descriptions.Item>
  //     </Descriptions>
  //     <Divider />
  //     <Descriptions
  //       title="服务时间：2021-1-1"
  //       style={{
  //         marginBottom: 32,
  //       }}
  //       bordered
  //     >
  //       <Descriptions.Item label="用户姓名">付**</Descriptions.Item>
  //       <Descriptions.Item label="用户评分">
  //         <Rate disabled allowHalf style={{ marginRight: '3px' }} defaultValue={3.5} /> 3.5分
  //       </Descriptions.Item>
  //       <Descriptions.Item label="评价时间">2020-3-4</Descriptions.Item>
  //       <Descriptions.Item label="用户评价">
  //         服务专业，期待下次合作
  //       </Descriptions.Item>
  //     </Descriptions>
  //     <Divider />
  //     <Descriptions
  //       title="服务时间：2021-1-1"
  //       style={{
  //         marginBottom: 32,
  //       }}
  //       bordered
  //     >
  //       <Descriptions.Item label="用户姓名">付**</Descriptions.Item>
  //       <Descriptions.Item label="用户评分">
  //         <Rate disabled allowHalf style={{ marginRight: '3px' }} defaultValue={2} /> 3.5分
  //       </Descriptions.Item>
  //       <Descriptions.Item label="评价时间">2020-3-4</Descriptions.Item>
  //       <Descriptions.Item label="用户评价">
  //         服务态度一般，体验一般
  //       </Descriptions.Item>
  //     </Descriptions>
  //     {/* <Divider/> */}
  //     <Descriptions
  //       title="服务时间：2021-1-1"
  //       style={{
  //         marginBottom: 32,
  //       }}
  //       bordered
  //     >
  //       <Descriptions.Item label="用户姓名">付**</Descriptions.Item>
  //       <Descriptions.Item label="用户评分">
  //         <Rate disabled allowHalf style={{ marginRight: '3px' }} defaultValue={3.5} /> 3.5分
  //       </Descriptions.Item>
  //       <Descriptions.Item label="评价时间">2020-3-4</Descriptions.Item>
  //       <Descriptions.Item label="用户评价">
  //         感觉尚可
  //       </Descriptions.Item>
  //     </Descriptions>
  //     <Divider />
  //   </Card>
  // );

  return (
    <>
      <Row justify="center">
        <Col>
          <Title>{companyDetail.name}</Title>
        </Col>
      </Row>

      <Row justify="center">
        <Col>
          <Title level={3} type="secondary">
            {companyDetail.address}
          </Title>
        </Col>
      </Row>
      <Row justify="center" style={{ marginBottom: '1rem' }}>
        <Col >
          <ClockCircleOutlined />
          {companyDetail.approvaldate}
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

export default connect(({ companyDetails }) => ({
  companyDetails,
}))(CompanyDetail);