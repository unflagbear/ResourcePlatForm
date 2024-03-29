import React,{useState} from'react'
import { Descriptions,Badge } from 'antd';

const ConfirmList = ({form,result})=>{
    return(
        <>
            <Descriptions title="需求表单" bordered>
                <Descriptions.Item label="需求名称">{result.demandName}</Descriptions.Item>
                <Descriptions.Item label="交易模式" span={3}>
                    <Badge status="processing" text={result.MeansOfTransaction} />
                </Descriptions.Item>
                <Descriptions.Item label="手机号">{result.phoneNumber}</Descriptions.Item>
                <Descriptions.Item label="电子邮件">{result.email}</Descriptions.Item>
                <Descriptions.Item label="具体需求">
                  {result.demandDesc}
                </Descriptions.Item>
            </Descriptions>
        </>
    )
}

export default ConfirmList;
