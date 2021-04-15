import React,{useEffect} from'react'
import {Button, Card,Descriptions,Input} from 'antd'
import { AudioOutlined } from '@ant-design/icons';
import {connect} from 'umi'
const { Search } = Input;
const KnowledgeGrapg=({dispatch,KnowledgeGraph: { infor = {},result={} }})=>{
    useEffect(() => {
        if (dispatch) {
          dispatch({
            type: 'KnowledgeGraph/getKnowledgeGraph',
            payload: {
              db: 'exp',
              data: {

              },
            },
          });
        }
      }, []);
      const onSearch = (value) => {
        dispatch({
          type: 'KnowledgeGraph/searchKnowledge',
          payload: {
            db: 'exp',
            data: value,
          },
        });
        console.log(value)
      }
    return (
        <>
            <Card title="当前知识图谱信息">
                {infor?<Descriptions
                    title="专利知识图谱"
                    bordered
                    column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
                    >
                    <Descriptions.Item label="专家数目">{infor.专家数目}</Descriptions.Item>
                    <Descriptions.Item label="专家类别数目">{infor.专家类别数目}</Descriptions.Item>
                    <Descriptions.Item label="关系数目">{infor.关系数目}</Descriptions.Item>
                    <Descriptions.Item label="最高学历">最高学历</Descriptions.Item>
                    <Descriptions.Item label="节点数目">{infor.节点数目}</Descriptions.Item>
                    <Descriptions.Item label="服务类别">服务类别</Descriptions.Item>
                    <Descriptions.Item label="机构类别">机构类别</Descriptions.Item>
                    <Descriptions.Item label="职称">
                    职称
                    </Descriptions.Item>
                    </Descriptions>:null}
            </Card>
            <Card title="知识图谱检索" style={{marginTop:"10px"}}>
            <Search
              placeholder="input search text"
              allowClear
              enterButton="Search"
              size="large"
              onSearch={onSearch}
            />
                <h1>{console.log(result)}</h1>
            </Card>
            <Button type="primary" danger> 删除图谱 </Button>
                <Button type="primary"> 上传数据 </Button>
            
        </>
    )
}

export default connect(({ KnowledgeGraph })=>({
    KnowledgeGraph
})) (KnowledgeGrapg)