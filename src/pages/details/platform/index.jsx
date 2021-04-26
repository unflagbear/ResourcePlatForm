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
  message, Badge, List,
} from 'antd';
import { FundViewOutlined, ClockCircleOutlined } from '@ant-design/icons';
import defaultImg from '@/assets/defaultImg.svg';
import {apply} from './service';
import moment from "moment";

const { Title } = Typography;
const { Step } = Steps;


function PlatformDetails({ dispatch, platformDetails: { platformDetail = {} ,serviceData={}} }) {
  const location = useLocation();
  const { productID } = location.query;
  const [modalVisible,setModalVisible] = useState(false);
  const [userId,setId]=useState(undefined);

  useEffect(() => {
    if (productID) {
      dispatch({
        type: 'platformDetails/detail',
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

  const closeHandler = ()=>{
    setModalVisible(false);
  }


  const onFinish= async(value) => {
     console.log(value);

     //const values={serviceId: serviceDetail.serviceId, ...value.apply};
     //const values={id:num++,create_time:time,demand:value.apply.demand,intro:value.intro,institution:value.institution,budget:value.budget,contact_name:value.contact_name,contact_phone:value.contact_name,contact_email:value.contact_email};
    //  dispatch({
    //    type:'details/apply',
    //    payload:{
    //      values,
    //    },
    //  });
    //  await apply(values).then((res)=>{
    //   if(res.data==true){
    //     message.success("申请成功");
    //   }
    // });
     //setModalVisible(false);
 }
  const Detail = () => (

    <Card
      hoverable

      title={
        <span>
          <Divider
            plain
            style={{ borderLeft: '2px solid rgba(0,0,0,0.5)', fontSize: '20px' }}
            type="vertical"
          />
          平台详情
        </span>
      }
    >
      <Descriptions title="平台信息" bordered>
        <Descriptions.Item label="平台名称">{platformDetail.name}</Descriptions.Item>
        <Descriptions.Item label="联系地址">{platformDetail.address}</Descriptions.Item>
        <Descriptions.Item label="联系电话">{platformDetail.phone}</Descriptions.Item>
        <Descriptions.Item label="注册地址">{platformDetail.registrationAddress}</Descriptions.Item>
        <Descriptions.Item label="注册时间" span={2}>
          {moment(platformDetail.registrationTime).format('LL')}
        </Descriptions.Item>
        <Descriptions.Item label="状态" span={3}>
          <Badge status="processing" text="运行中" />
        </Descriptions.Item>
        <Descriptions.Item label="人员规模">{platformDetail.staffSize}</Descriptions.Item>
        <Descriptions.Item label="网址">{platformDetail.url}</Descriptions.Item>
        <Descriptions.Item label="法人代表">{platformDetail.legalRepresentative}</Descriptions.Item>
      </Descriptions>


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
          <Title>{platformDetail.name}</Title>
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
export default connect(({ platformDetails }) => ({
  platformDetails,
}))(PlatformDetails);

