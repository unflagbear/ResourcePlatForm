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
import {update} from "./service";
import UpdateModel from "@/pages/details/demand/components/UpdateModel";
import moment from "moment";

const { Title } = Typography;
const { Step } = Steps;


function DemandDetails({ dispatch, demandDetails: { demandDetail = {} } }) {
  const location = useLocation();
  const { productID } = location.query;
  const [modalVisible,setModalVisible] = useState(false);
  const [modelVisible,setModelVisible] = useState(false);
  // const appendix = demandDetail.serviceCategory ? demandDetail.serviceCategory.split('/') : [];
  useEffect(() => {
    if (productID) {
      dispatch({
        type: 'demandDetails/detail',
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

  const clickUpdate=()=>{
    setModelVisible(true);
  }

  const closeHandler = ()=>{
    setModalVisible(false);
    setModelVisible(false);
  }

  const onFinish= async(value) => {
    // console.log(value);

     const values={demandId: demandDetail.demandId, ...value.apply};
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

  const onFinishUpdate= async(value) => {
     console.log(value);

    const values={demandId: demandDetail.demandId, ...value.apply};
    //const values={id:num++,create_time:time,demand:value.apply.demand,intro:value.intro,institution:value.institution,budget:value.budget,contact_name:value.contact_name,contact_phone:value.contact_name,contact_email:value.contact_email};
    console.log(values);
    //  dispatch({
    //    type:'details/apply',
    //    payload:{
    //      values,
    //    },
    //  });
    await update(values).then((res)=>{
      if(res.data==true){
        message.success("更改成功");
      }
    });
    setModalVisible(false);
  }
  const Detail = () => (

    <Card
      hoverable
      extra={

          <Affix offsetTop={60}>
            <Button type="primary" onClick ={clickApply}>提供服务</Button>
          </Affix>
      }
      title={
        <span>
          <Divider
            plain
            style={{ borderLeft: '2px solid rgba(0,0,0,0.5)', fontSize: '20px' }}
            type="vertical"
          />
          需求详情
        </span>
      }
    >
      <Descriptions
        layout="vertical"
        bordered
        // labelStyle={{}}
        title="需求信息"
      >
        <Descriptions.Item label="需求名">{demandDetail.demandName}</Descriptions.Item>

        <Descriptions.Item label="交易方式">{demandDetail.meansOfTransaction}</Descriptions.Item>
        {/*<Descriptions.Item label="类别">*/}
        {/*  /!* {resourceDetail.appendix.split("、").map((data,index)=>{*/}
        {/*                return (*/}
        {/*                    <>*/}
        {/*                    {data} <br />*/}
        {/*                    </>*/}
        {/*                )*/}
        {/*            })} *!/*/}
        {/*  {appendix.map((data, index) => {*/}
        {/*    return (*/}
        {/*      <Tag size="middle" key={index}>*/}
        {/*        {data}*/}
        {/*      </Tag>*/}
        {/*    );*/}
        {/*  })}</Descriptions.Item>*/}
        <Descriptions.Item label="需求描述">{demandDetail.demandDesc}</Descriptions.Item>
        <Descriptions.Item label="联系电话">{demandDetail.phoneNumber}</Descriptions.Item>
        <Descriptions.Item label="电子邮件">{demandDetail.email}</Descriptions.Item>
        <Descriptions.Item label="创建时间">{moment(demandDetail.createTime).format('LL')}</Descriptions.Item>
      </Descriptions>
      {/*<Progress*/}
      {/*  //style={{marginTop: '50px'}}*/}
      {/*  title={*/}
      {/*  <span style={{fontWeight:'500', fontSize:'16px'}}>*/}
      {/*    <Divider*/}
      {/*      plain*/}
      {/*      style={{ borderLeft: '2px solid rgba(0,0,0,0.5)', fontSize: '20px' }}*/}
      {/*      type="vertical"*/}
      {/*    />*/}
      {/*    申请流程*/}
      {/*  </span>*/}
      {/*}/>*/}
      <ApplyModal  style={{marginBottom:40}} visible={modalVisible} closeHandler={closeHandler} onFinish={onFinish} > </ApplyModal>
      {/* </Progress> */}
      {/* <ApplyModal  style={{marginBottom:40}}
        // visible={modalVisible}

        // closeHandler={closeHandler}
        // onFinish={onFinish}
      />  */}

      {/* <Button type="primary" className='buttonMargin' >立刻申请</Button> */}

      <Button style={{marginTop: '50px'}} type="primary" onClick ={clickUpdate}>更改需求</Button>
      <UpdateModel  style={{marginBottom:40}} visible={modelVisible} closeHandler={closeHandler} onFinish={onFinishUpdate} > </UpdateModel>

    </Card>
  );
  return (
    <>
      <Row justify="center">
        <Col>
          <Title>{demandDetail.demandName}</Title>
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
export default connect(({ demandDetails }) => ({
  demandDetails,
}))(DemandDetails);

