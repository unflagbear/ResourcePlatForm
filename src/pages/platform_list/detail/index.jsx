import React, {useEffect, useState} from "react";
import { Descriptions, Badge } from 'antd';
import {connect, useLocation} from "umi";
import moment from "moment";

const PlatformDetail=({loading,detailAndplatform: {data = {},status},dispatch})=>{
  const location = useLocation();
  const { id } = location.query;
  useEffect(() => {
    dispatch({
      type:'detailAndplatform/list',
      payload:{productID:id},
    });
    console.log(id);

  }, []);
  const statu=()=>{

  }
  return(

    <div>
    <Descriptions title="平台信息" bordered>
      <Descriptions.Item label="平台名称">{data.name}</Descriptions.Item>
      <Descriptions.Item label="联系地址">{data.address}</Descriptions.Item>
      <Descriptions.Item label="联系电话">{data.phone}</Descriptions.Item>
      <Descriptions.Item label="注册地址">{data.registrationAddress}</Descriptions.Item>
      <Descriptions.Item label="注册时间" span={2}>
        {moment(data.registrationTime).format('LL')}
      </Descriptions.Item>
      <Descriptions.Item label="状态" span={3}>
        <Badge status="processing" text="运行中" />
      </Descriptions.Item>
      <Descriptions.Item label="人员规模">{data.Staffsize}</Descriptions.Item>
      <Descriptions.Item label="网址">{data.url}</Descriptions.Item>
      <Descriptions.Item label="法人代表">{data.legalRepresentative}</Descriptions.Item>
    </Descriptions>
    </div>
  )
}
export default connect(({ detailAndplatform, loading }) => ({
  detailAndplatform,
  loading: loading.models.detailAndplatform,
}))(PlatformDetail);
