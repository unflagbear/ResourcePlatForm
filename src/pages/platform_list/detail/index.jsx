import React, {useEffect, useState} from "react";
import { Descriptions, Badge } from 'antd';
import {connect, useLocation} from "umi";

const PlatformDetail=({loading,detailAndplatform: {data = {},status},dispatch})=>{
  const [data1,setData]=useState("01")
  const location = useLocation();
  const { id } = location.query;
  useEffect(() => {
    dispatch({
      type:'detailAndplatform/list',
      payload:{id},
    });
    console.log(id);
    console.log(data);
    console.log(status);
  }, []);

  return(

    <div>
    <Descriptions title="User Info" bordered>
      <Descriptions.Item label="Product">Cloud Database</Descriptions.Item>
      <Descriptions.Item label="Billing Mode">Prepaid</Descriptions.Item>
      <Descriptions.Item label="Automatic Renewal">YES</Descriptions.Item>
      <Descriptions.Item label="Order time">2018-04-24 18:00:00</Descriptions.Item>
      <Descriptions.Item label="Usage Time" span={2}>
        2019-04-24 18:00:00
      </Descriptions.Item>
      <Descriptions.Item label="Status" span={3}>
        <Badge status="processing" text="Running" />
      </Descriptions.Item>
      <Descriptions.Item label="Negotiated Amount">$80.00</Descriptions.Item>
      <Descriptions.Item label="Discount">$20.00</Descriptions.Item>
      <Descriptions.Item label="Official Receipts">$60.00</Descriptions.Item>
      <Descriptions.Item label="Config Info">
        Data disk type: MongoDB
        <br />
        Database version: 3.4
        <br />
        Package: dds.mongo.mid
        <br />
        Storage space: 10 GB
        <br />
        Replication factor: 3
        <br />
        Region: East China 1<br />
      </Descriptions.Item>
    </Descriptions>
    </div>
  )
}
export default connect(({ detailAndplatform, loading }) => ({
  detailAndplatform,
  loading: loading.models.detailAndplatform,
}))(PlatformDetail);
