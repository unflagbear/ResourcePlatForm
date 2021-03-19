import React,{useState} from'react'
import { Descriptions,Badge } from 'antd';

const ConfirmList = ({form})=>{
    return(
        <>
            <Descriptions title="User Info" bordered>
                <Descriptions.Item label="需求名称">Cloud Database</Descriptions.Item>
                <Descriptions.Item label="联系方式">Prepaid</Descriptions.Item>
                <Descriptions.Item label="Automatic Renewal">YES</Descriptions.Item>
                <Descriptions.Item label="Order time">2018-04-24 18:00:00</Descriptions.Item>
                <Descriptions.Item label="Usage Time" span={2}>
                2019-04-24 18:00:00
                </Descriptions.Item>
                <Descriptions.Item label="交易模式" span={3}>
                <Badge status="processing" text="Running" />
                </Descriptions.Item>
                <Descriptions.Item label="Negotiated Amount">$80.00</Descriptions.Item>
                <Descriptions.Item label="Discount">$20.00</Descriptions.Item>
                <Descriptions.Item label="Official Receipts">$60.00</Descriptions.Item>
                <Descriptions.Item label="具体需求">
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
        </>
    )
}

export default ConfirmList;