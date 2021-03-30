import React, { useEffect,useState } from 'react'
import {connect,history,useLocation} from 'umi'
import { Layout, Menu, Table,Button, Space, AutoComplete, Card, message,Spin } from 'antd'
import { SyncOutlined , SearchOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { GridContent, PageContainer } from '@ant-design/pro-layout';
import './components/layout.css'
import Search from './components/Search'
import TrainModel from './components/TrainModel'
import SetModal from './components/SetModal';
import styles from './style.less';
import RecommendResult from './components/RecommendResult';

const { Header, Content, Footer, Sider } = Layout;


const Recommend = ({ dispatch, recommend })=>{
  const [domain,setDomain] = useState();
  const [uid,setUid] = useState();
  const [mid,setMid] = useState();
  const [last,setLast] = useState();
  const [cpy,setCpy] = useState();
  const [modalVisible,setModalVisible] = useState(false);
  const [record,setRecord] = useState(undefined);
  const [selected,setSelected] = useState(1);
  const columns = [
    {
        title: '领域',
        dataIndex: 'domain',
    },
    {
        title: '用户ID',
        dataIndex: 'uid',
    },
    {
        title: '模型偏好值',
        dataIndex: 'preference',
        sorter: {
            compare: (a, b) => a.preference- b.preference,
        },
    },
    {
        title: '操作',
        dataIndex: 'option',
        valueType: 'option',
        render: (_, record) => (
          <>
            <a onClick={() => {setHandler(record);}}>设置</a>
          </>
        ),
      },
    ];

  const columns1 = [
    {
        title: '推荐结果id',
        dataIndex: 'result',
    },
  ]

  const manage=()=>{
      setSelected(1);
  }
  const show=()=>{
      setSelected(2);
  }

  const closeHandler = ()=>{
    setModalVisible(false);
  };

  const setdomain=(value)=>{
    setDomain(value);
  }

  const setuid=(value)=>{
    setUid(value);
  }

  const setlast=(value)=>{
    setLast(value);
  }
  const setcpy=(value)=>{
    setCpy(value);
  }

  const setmodel=(value)=>{
    setMid(value);
  }
  
  const queryHandler=()=>{
    const data={domain:domain,uid:uid};
    dispatch({
      type:'recommend/query',
      payload:{
        data,
      },
    });
  }

  const setHandler=(record)=>{
    setModalVisible(true);
    setRecord(record);
    setUid(record.uid);
  }

  const showHandler=()=>{
    const values={domain:domain,uid:uid,last:last,cpy:cpy};
    //console.log(values);
    dispatch({
      type:'recommend/show',
      payload:{
        values,
      },
    });
  }

  const onFinsh=(value)=>{
    let values={};
    values['domain']=Number(record.domain);
    values[record.uid]=JSON.parse(value.preference);
    const data={domain:record.domain,uid:record.uid};
   // console.log(data);
    dispatch({
      type:'recommend/set',
      payload:{
        values,
        data,
      },
    });
    setModalVisible(false);
    
  };

  const trainHandler=()=>{
    const values={domain:domain,mid:mid};
    //console.log(values);
    dispatch({
      type:'recommend/train',
      payload:{
        values,
      },
    });
    //setLoading(true);
  }

    return (
      <Layout>
        <Sider
            style={{overflow: 'auto',
            height: '100vh',
            position: 'fixed',
            left: 0,
            }}
            breakpoint="lg"
            collapsedWidth="0"
            onBreakpoint={broken => {
                console.log(broken);
            }}
            onCollapse={(collapsed, type) => {
                console.log(collapsed, type);
            }}
            >
            <div className="logo" />
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1" icon={<SearchOutlined />} onClick={manage}>
              模型管理
            </Menu.Item>
            <Menu.Item key="2" icon={<SettingOutlined />} onClick={show}>
              推荐结果展示
            </Menu.Item>
            </Menu>
        </Sider>
        <Layout style={{ marginLeft: 200,background:'#fff' }}>
          {selected==1? 
          <div className={styles.main}>
                <GridContent>
                  <Card
                    title="推荐策略状态查询"
                    style={{
                      marginBottom: 24,
                      marginLeft:24,
                    }}
                  >
                  <Search setDomain={setdomain} setUid={setuid} onClick={queryHandler}/>
                  <div className="site-layout-background" style={{ paddingTop: 70,paddingLeft:18, minHeight: 270 }}>
                    <Space style={{ marginBottom: 16 }}></Space>
                    <Table columns={columns} dataSource={recommend.data} />
                    <SetModal visible={modalVisible} closeHandler={closeHandler} record={record} uid={uid} onFinsh={onFinsh}> </SetModal>
                  </div> 
                  </Card>
                  <Spin spinning={recommend.load} tip="模型正在训练中..." delay={500}>
                    <Card
                      title="模型训练"
                      style={{
                        marginBottom: 24,
                        marginLeft:24,
                      }}
                    >
                    <TrainModel setDomain={setdomain} setModel={setmodel} onClick={trainHandler} />
                    </Card>
                  </Spin>
              </GridContent>
              </div> :
              <div className={styles.main}> 
                <GridContent>
                  <Card
                    title="推荐结果查询"
                    style={{
                      marginBottom: 24,
                      marginLeft:24,
                    }}
                  >
                  <RecommendResult setDomain={setdomain} setUid={setuid} setLast={setlast} setCpy={setcpy} onClick={showHandler}/>
                  <div className="site-layout-background" style={{ paddingTop: 0,paddingLeft:60, paddingRight:60,minHeight: 230 }}>
                    <Space style={{ marginBottom: 16 }}></Space>
                    <Table columns={columns1} dataSource={recommend.id} />
                    <SetModal visible={modalVisible} closeHandler={closeHandler} record={record} uid={uid} onFinsh={onFinsh}> </SetModal>
                  </div> 
                </Card>
                </GridContent>
              </div>}
              </Layout>
        </Layout>  
    )
}

export default connect(({ recommend }) => ({
  recommend
}))(Recommend);
