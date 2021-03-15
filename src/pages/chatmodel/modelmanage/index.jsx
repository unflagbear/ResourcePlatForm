import { PlusOutlined } from '@ant-design/icons';
import { Button, message, Drawer, Form, Select, Modal, Table, InputNumber, Input} from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import EditModal from './components/EditModal';
import {connect} from 'umi'
import './modelmanage.css';

import { queryRule, updateRule, addRule, removeRule } from './service';
import { white } from 'chalk';

/**
 * 添加节点
 * @param fields
 */

const ModelManage = ({modelmanage, trainmodel, dispatch, userListLoading}) => {
  const [form]=Form.useForm();
  const actionRef = useRef();
  const [selectedRowsState, setSelectedRows] = useState([]);
  const [record,setRecord] = useState(undefined);
  const [modalVisible,setModalVisible] = useState(false);
  const [name,setName] = useState(undefined);
  const [ID,setID] = useState(-1);
  const [selectModelId,setSelectModelId] = useState();
  const [text,setText] = useState();
  const [result,setResult] = useState('');
  let modeldata = modelmanage.resData;
  let modelname = modelmanage.current_model;
  // let modelData = modelmanage.resData;
  // console.log(modelData);
  // for(let i=0;i<modelData.length();i++){
  //   //model_id.push(modelData[i].model_id);
  //   if(modelData[i].model_status=="running"){
  //     current_model = modelData[i].model_name;
  //   }
  // }
  //console.log(current_model);
  const columns = [
    {
      title: '模型id',
      dataIndex: 'model_id',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '模型id为必填项',
          },
        ],
      },
      render: (dom, entity) => {
        return <a onClick={() => setRow(entity)}>{dom}</a>;
      },
    },
    {
      title: '模型名',
      dataIndex: 'model_name',
      valueType: 'textarea',
    },
    {
      title: '模型描述',
      dataIndex: 'model_desc',
      valueType: 'textarea',
    },
    {
      title: '模型路径',
      dataIndex: 'model_path',
      valueType: 'textarea',
    },{
      title: '创建时间',
      dataIndex: 'create_time',
      sorter: true,
      valueType: 'dateTime',
      hideInForm: true,
      renderFormItem: (item, { defaultRender, ...rest }, form) => {
        const status = form.getFieldValue('status');

        if (`${status}` === '0') {
          return false;
        }

        if (`${status}` === '3') {
          return <Input {...rest} placeholder="请输入异常原因！" />;
        }

        return defaultRender(item);
      },
    },
    {
      title: '模型状态',
      dataIndex: 'model_status',
      hideInForm: true,
      valueEnum: {
        'training': {
          text: '正在训练',
          status: 'Processing',
        },
        'ready': {
          text: '就绪',
          status: 'Success',
        },
        'running': {
          text: '运行',
          status: 'Error',
        },
      }
    },{
      title: '训练日志路径',
      dataIndex: 'train_log_path',
      valueType: 'textarea',
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          {/* <a onClick={() => {editHandler(record);}}>修改</a>&nbsp;&nbsp; */}
          <a onClick={() => {deleteHandler(record);}}>删除</a>
        </>
      ),
    },
  ];
  const closeHandler = ()=>{
    setModalVisible(false);
  };
 
  const deleteHandler=(record)=>{
    const values = {model_id:record.model_id};
    dispatch({
      type:'modelmanage/delete',
      payload:{
        values,
      },
    });
  }
  const batchDelete=(selectedRows)=>{
    const hide = message.loading('正在删除');
    if (!selectedRows) return true;
    try {
      // await removeRule({
      //   key: selectedRows.map((row) => row.key),
      // });
      let key=selectedRows.map((row) => row.key);
      console.log(key);
      //deleteHandler(selectedRows.map((row) => row.key));
      hide();
      message.success('删除成功，即将刷新');
      return true;
    } catch (error) {
      hide();
      message.error('删除失败，请重试');
      return false;
    }
  }
  const onFinsh=(value)=>{
    let id=0;
    if(record){
      id = record.id;
    }
    console.log(id);
    if(id){
      const values = {new_example:value.context,tgt_example:record.context,tgt_intent:record.intent}; 
      dispatch({
        type:'modelmanage/edit',
        payload:{
          values,
        },
      });
    }
    else{
      console.log(value);
      const values = value;
      dispatch({
        type:'modelmanage/add',
        payload:{
          values,
        },
      });
    }
    setModalVisible(false);
  };

  const changeHandler=()=>{
    const values = {model_id:selectModelId}; 
      dispatch({
        type:'modelmanage/change',
        payload:{
          values,
        },
      });
  };

  const addHandler=()=>{
    setName('添加');
    setRecord(undefined);
    setModalVisible(true);
  };

  const testHandler=()=>{
    const values = {test_utterance: text}; 
    console.log(values);
      dispatch({
        type:'modelmanage/test',
        payload:{
          values,
        },
      });
    // console.log(modelmanage.result);
    // setResult(modelmanage.result);
  };

  function testOnChange(e){
   // console.log(e.target.value);
    setText(e.target.value);
  }

  function onChange(value) {
     setSelectModelId(value);
 }
  return (
    <>
      <PageContainer>
      <div className='test-type'>
        <h4>模型测试</h4>
              <p style={{marginLeft:330, marginTop:18, fontSize: 16}}>当前模型:&nbsp;&nbsp;&nbsp;{modelname}
              <a style={{ color:'black', marginLeft:260 }}>测试语料:</a><Input style={{ width: 170, marginLeft:15 }} maxLength={100} onChange={testOnChange}/>
           </p>
            <Button style={{marginBottom:20, marginLeft:1200}} type="primary" onClick={testHandler}>提交</Button>
            <div>
            <p style={{marginLeft:330, marginTop:0, fontSize: 16}}>测试结果:
              <p className='tt-type'> {modelmanage.result}</p>
            </p>
            </div>
    
      </div>
      <div className='title-type'>
        <h4>模型切换</h4>
              <p style={{marginLeft:330, marginTop:18, fontSize: 16}}>当前模型:&nbsp;&nbsp;&nbsp;{modelname}
              <a style={{ color:'black', marginLeft:260 }}>模型id:</a><InputNumber style={{ width: 170, marginLeft:15 }} onChange={onChange}/>
           </p>
            <Button style={{marginBottom:20, marginLeft:1200}} type="primary" onClick={changeHandler}>切换</Button>
    
        </div>
        <ProTable
          style={{marginTop:40}}
          headerTitle="查询表格"
          actionRef={actionRef}
          rowKey="id"
          search={{
            labelWidth: 120,
          }}
          toolBarRender={() => [
            <Button type="primary" onClick={addHandler}>
              <PlusOutlined /> 新建
            </Button>,
          ]}
          columns={columns}
          dataSource={modeldata}
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
        )}
        <EditModal visible={modalVisible} closeHandler={closeHandler} record={record} id={ID} onFinsh={onFinsh} name={name}> </EditModal>
        {/* {stepFormValues && Object.keys(stepFormValues).length ? (
          <UpdateForm
            onSubmit={async (value) => {
              const success = await handleUpdate(value);

              if (success) {
                handleUpdateModalVisible(false);
                setFormValues({});

                if (actionRef.current) {
                  actionRef.current.reload();
                }
              }
            }}
            onCancel={() => {
              handleUpdateModalVisible(false);
              setFormValues({});
            }}
            updateModalVisible={updateModalVisible}
            values={stepFormValues}
          />
        ) : null} */}

        {/* <Drawer
          width={600}
          visible={!!row}
          onClose={() => {
            setRow(undefined);
          }}
          closable={false}
        >
          {row?.name && (
            <ProDescriptions
              column={2}
              title={row?.name}
              request={async () => ({
                data: row || {},
              })}
              params={{
                id: row?.name,
              }}
              columns={columns}
            />
          )}
        </Drawer> */}
      </PageContainer>
    </>
  );
};

//export default DialogData;

export default connect(({ modelmanage,trainmodel,loading }) => ({
  modelmanage,
  trainmodel,
  userListLoading: loading.models.users,
}))(ModelManage);



