import React,{useState} from'react'
import { Descriptions,Badge,Form } from 'antd';

const ConfirmList = ({form,result})=>{
    return(
        <>
            <Descriptions title="服务表单" bordered>
                <Descriptions.Item label="服务名称">{result.serviceName}</Descriptions.Item>
                <Descriptions.Item label="交易模式" span={3}>
                    <Badge status="processing" text={result.mode} />
                </Descriptions.Item>
                <Descriptions.Item label="手机号">{result.phone}</Descriptions.Item>
                <Descriptions.Item label="电子邮件">{result.mail}</Descriptions.Item>
                <Descriptions.Item label="服务价格">{result.price}</Descriptions.Item>
                <Descriptions.Item label="具体细节">
                  {result.serviceDesc}
                </Descriptions.Item>
            </Descriptions>
          <Form>

          </Form>
        </>
    )
}

export default ConfirmList;
