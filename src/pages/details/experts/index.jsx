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
const ExpertsDetail = ({ dispatch, expertsDetails: { expertsDetail = {} } })=>{
    // const [top,setTop] = useState(60);
  // const [modalVisible,setModalVisible] = useState(false);
  const location = useLocation();
  const { productID } = location.query;
  // const content =<Affix offsetTop={80}><div style={{width: 500,height:600}}> <ChatforAccessService /></div></Affix>

  useEffect(() => {
    if (productID) {
      dispatch({
        type: 'expertsDetails/detail',
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
   
//     const values={serviceId: expertsDetail.id, ...value.apply};
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
        <Descriptions.Item label="专家图片">
          <Image width={130} height={130} src={expertsDetail.picpath} fallback={defaultImg} />
        </Descriptions.Item>
        <Descriptions.Item label="联系电话">{expertsDetail.mobilephonenumber}</Descriptions.Item>
        <Descriptions.Item label="电子邮箱">{expertsDetail.email}</Descriptions.Item>
        <Descriptions.Item label="毕业院校">{expertsDetail.graduateschool}</Descriptions.Item>
        <Descriptions.Item label="学历">{expertsDetail.degreesname}</Descriptions.Item>
        <Descriptions.Item label="专业类别">{expertsDetail.experttypetext}</Descriptions.Item>
        <Descriptions.Item label="职务">{expertsDetail.position}</Descriptions.Item>
        <Descriptions.Item label="擅长领域">{expertsDetail.specialty}</Descriptions.Item>
        <Descriptions.Item label="提供服务内容">{expertsDetail.servicetypename}</Descriptions.Item>
        {/* <Descriptions.Item label="关键词">{expertsDetail.keyword.split(",").map((item)=><Tag>{item}</Tag>)}</Descriptions.Item> */}

        <Descriptions.Item label="简介">{expertsDetail.expertIntroduce}</Descriptions.Item>
        
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
          <Title>{expertsDetail.name}</Title>
        </Col>
      </Row>

      <Row justify="center">
        <Col>
          <Title level={3} type="secondary">
            {expertsDetail.workunit}
          </Title>
        </Col>
      </Row>
      {/* <Row justify="center" style={{ marginBottom: '1rem' }}>
        <Col >
          <ClockCircleOutlined />
          {expertsDetail.approvaldate}
        </Col>
      </Row> */}
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

export default connect(({ expertsDetails }) => ({
    expertsDetails,
  }))(ExpertsDetail);