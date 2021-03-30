import React,{useState} from'react'
import { Descriptions,Badge } from 'antd';

const ConfirmList = ({form})=>{
    return(
        <>
            <Descriptions title="需求表单" bordered>
                <Descriptions.Item label="需求名称">知识产权</Descriptions.Item>
                <Descriptions.Item label="交易模式" span={3}>
                    <Badge status="processing" text="报价" />
                </Descriptions.Item>
                <Descriptions.Item label="手机号">15907765524</Descriptions.Item>
                <Descriptions.Item label="电子邮件">15907765524@163.com</Descriptions.Item>
                <Descriptions.Item label="具体需求">
                资讯已有项目，涉及到的知识产权内容
                </Descriptions.Item>
            </Descriptions>
        </>
    )
}

export default ConfirmList;