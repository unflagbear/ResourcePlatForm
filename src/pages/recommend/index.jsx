import React, { useEffect,useState, useRef } from 'react'
import {connect,history,useLocation} from 'umi'
import { Layout, Menu, Table,Button, Space, AutoComplete, Card, message,Spin, Progress} from 'antd'
import ProTable from '@ant-design/pro-table';
import { SyncOutlined , SearchOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { GridContent, PageContainer } from '@ant-design/pro-layout';
import './components/layout.css'
import Search from './components/Search'
import TrainModel from './components/TrainModel'
import SetModal from './components/SetModal';
import styles from './style.less';
import RecommendResult from './components/RecommendResult';
import {showProgress, expertRule, equipmentRule, patentRule, showRule} from './service'
import { PlusOutlined } from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;


const Recommend = ({ dispatch, recommend, userListLoading,})=>{
  const actionRef = useRef();
  const [domain,setDomain] = useState();
  const [uid,setUid] = useState();
  const [mid,setMid] = useState();
  const [last,setLast] = useState();
  const [cpy,setCpy] = useState();
  const [modalVisible,setModalVisible] = useState(false);
  const [record,setRecord] = useState(undefined);
  const [selected,setSelected] = useState(1);
  const [load, setLoad] = useState(false);
  const [progress, setProgress] = useState(0);
  const [selectedRowsState, setSelectedRows] = useState([]);
  const [showID,setShowID] = useState(null);
  const [showdata,setShowData] = useState(null);
  const [recommendDomain, setrecommendDomain] = useState();
  const [param,setParam] = useState({id:'id', name_t:'名称',name_d:'名称'});
 

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

    const columns1 =(item)=> ([
      {
        title: item.id,
        dataIndex: 'id',
        formItemProps: {
          rules: [
            {
              required: true,
              message: 'id为必填项',
            },
          ],
        },
        render: (dom, entity) => {
          return <a onClick={() => setRow(entity)}>{dom}</a>;
        },
      },
      {
        title: item.name_t,
        dataIndex: item.name_d,
        valueType: 'textarea',
      },
      {
        title: '所属类型',
        dataIndex: '所属类型',
        valueType: 'textarea',
      },
      {
        title: '操作',
        dataIndex: 'option',
        valueType: 'option',
        render: (_, record) => (
          <>
            {/* <a onClick={() => {editHandler(record);}}>修改</a>&nbsp;&nbsp; */}
            <a onClick={async() => {
              const success = await deleteHandler(record);
              if (success) {
                if (actionRef.current) {
                  actionRef.current.reload();
                }
              }}}>删除</a>
          </>
        ),
      },
    ]);

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

  const showHandler=async()=>{
    const values={domain:domain,uid:uid,last:last,cpy:cpy};
    let value={};
    await showRule(values).then((res)=>{
      //console.log(res);
      //setShowID(res.result);
      value = {id: res.result};
      //console.log(value);
    });
    if(domain==0){
      setParam({id:'专家id', name_t:'专家姓名',name_d:'姓名'});
      await expertRule(value).then((res)=>{
        console.log(res);
        setShowData(res.data);
      });
    }
    else if(domain==1){
      setParam({id:'设备id', name_t:'仪器名称',name_d:'仪器名称'});
      await equipmentRule(value).then((res)=>{
        console.log(res);
        setShowData(res.data);
      });
    }
    else if(domain==2){
      setParam({id:'专利id', name_t:'专利名称',name_d:'专利名称'});
      await patentRule(value).then((res)=>{
        console.log(res);
        setShowData(res.data);
      });
    }
  }
  // useEffect(()=>{
  //   clearInterval(timer);

  //     if(progress == 20){
  //       console.log("progress == 20",timer);
  //       clearInterval(timer);
  //     }
  // },[progress])
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

  const trainHandler=async()=>{
    const values={domain:domain,mid:mid};
    const value={d:domain,m:mid-1};
    console.log(values);
    setLoad(true);
    dispatch({
      type:'recommend/train',
      payload:{
        values,
      },
    });
    let count=0;
    const timer= setInterval(frame
    ,3000);
    async function frame() {
        await showProgress({value}).then((res)=>{   
         
          
          if(res.p ==0 && count >20){
            count = 19
          }
          if(res.p ==20 && count >70){
            count = 70
          }
          // debugger
          // if(res.p ==20 && progress< 70 ){
          //   setProgress(progress+1);
          // }
          setProgress(count+=4);

          // setProgress(res.p);  
          if(res.p == 100){
            setProgress(count+=4);
            setProgress(res.p);

            clearInterval(timer);
            setTimeout(setLoad(false),9000);
          }
        });
    }
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
          <div className={styles.main} style={{
            background:'#f0f2f5'
          }}>
                <GridContent>
                  <Card
                    title="推荐策略状态查询"
                  >
                  <Search setDomain={setdomain} setUid={setuid} onClick={queryHandler}/>
                  <div className="site-layout-background" style={{ paddingTop: 70,paddingLeft:18, minHeight: 270 }}>
                    <Space style={{ marginBottom: 16 }}></Space>
                    <Table columns={columns} dataSource={recommend.data} />
                    <SetModal visible={modalVisible} closeHandler={closeHandler} record={record} uid={uid} onFinsh={onFinsh}> </SetModal>
                  </div> 
                  </Card>
                  {/* <Progress type="circle" strokeColor={{'0%': '#108ee9','100%': '#87d068',}}percent={100} /> */}
                  {/* <Spin spinning={recommend.load} tip="模型正在训练中..." delay={100}> */}
                    <Card
                      title="模型训练"
                      style={{
                        marginTop:'2%',
                      }}
                    >
                    <TrainModel setDomain={setdomain} setModel={setmodel} onClick={trainHandler} />
                    {load? <div style={{textAlign: 'center'}}><Progress type="circle" showProgress= {false}  strokeColor={{'0%': '#108ee9','100%': '#87d068',}}percent={progress} /></div>:<div />}
                    </Card>
                  {/* </Spin> */}
                  {/* </Progress> */}
              </GridContent>
              </div> :
              <div className={styles.main}> 
                <GridContent>
                  <Card
                    title="推荐结果查询"
                  >
                  <RecommendResult setDomain={setdomain} setUid={setuid} setLast={setlast} setCpy={setcpy} onClick={showHandler}/>
                  <div className="site-layout-background" style={{ paddingTop: 0,paddingLeft:60, paddingRight:60,minHeight: 230 }}>
                    <Space style={{ marginBottom: 16 }}></Space>
                    <Table columns={columns1(param)} dataSource={showdata} />
                    {/* <ProTable
                      style={{marginTop:40}}
                      headerTitle="推荐结果"
                      actionRef={actionRef}
                      rowKey="id"
                      search={{
                        labelWidth: 120,
                      }}
                      // toolBarRender={() => [
                      //   <Button type="primary" onClick={() => handleModalVisible(true)}>
                      //     <PlusOutlined /> 新建
                      //   </Button>,
                      // ]}
                      columns={columns1}
                      request={(params, sorter, filter) => resultRule({ ...params, sorter, filter })}
                      //dataSource={modeldata}
                      loading={userListLoading}
                      rowSelection={{
                        onChange: (_, selectedRows) => setSelectedRows(selectedRows),
                      }}
                    />
                    {selectedRowsState?.length > 0 && (
                      <FooterToolbar
                        extra={
                          <div>
                            已选择{' '}
                            <a
                              style={{
                                fontWeight: 600,
                              }}
                            >
                              {selectedRowsState.length}
                            </a>{' '}
                            项
                          </div>
                        }
                      >
                        <Button
                          onClick={async () => {
                            await batchDelete(selectedRowsState);
                            setSelectedRows([]);
                            actionRef.current?.reloadAndRest?.();
                          }}
                        >
                          批量删除
                        </Button>
                        <Button type="primary">批量审批</Button>
                      </FooterToolbar>
                    )} */}
                    <SetModal visible={modalVisible} closeHandler={closeHandler} record={record} uid={uid} onFinsh={onFinsh}> </SetModal>
                  </div> 
                </Card>
                </GridContent>
              </div>}
              </Layout>
        </Layout>  
    )
}

export default connect(({ recommend, loading}) => ({
  recommend,
  userListLoading: loading.models.users,
}))(Recommend);
