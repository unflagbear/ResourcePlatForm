import { PlusOutlined } from '@ant-design/icons';
import { Button, message, Drawer } from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import EditForm from './components/EditForm';
import CreateForm from './components/CreateForm';
import EditModal from './components/EditModal';
import {connect} from 'umi'

import { queryRule, updateRule, addRule, deleteRule, editRule } from './service';

/**
 * 添加节点
 * @param fields
 */

const DialogData = ({dialogdata, dispatch, userListLoading}) => {
  const [createModalVisible, CreateModalVisible] = useState(false);
  const [editModalVisible, EditModalVisible] = useState(false);
  const actionRef = useRef();
  const [row, setRow] = useState();
  const [selectedRowsState, setSelectedRows] = useState([]);
  const [data, setData] = useState([]);
  const [record,setRecord] = useState(undefined);
  const [modalVisible,setModalVisible] = useState(false);
  const [name,setName] = useState(undefined);
  const [ID,setID] = useState(-1);
  const [values,setValues] = useState({tgt_example:[],tgt_intent:[]});
  const columns = [
    {
      title: '语料ID',
      dataIndex: 'example_id',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '规则名称为必填项',
          },
        ],
      },
      render: (dom, entity) => {
        return <a onClick={() => setRow(entity)}>{dom}</a>;
      },
    },
    {
      title: '语句内容',
      dataIndex: 'content',
      valueType: 'textarea',
    },
    {
      title: '相似语料组',
      dataIndex: 'intent',
      hideInForm: true,
      valueEnum: {
        'request_instrument': {
          text: '询问设备',
          status: 'Processing',
        },
        'request_patent': {
          text: '询问专利',
          status: 'Success',
        },
        'request_expert': {
          text: '询问专家',
          status: 'Error',
        },
        'faq':{
          text: '相关问答',
          status: 'Default',
        },
        'affirm':{
          text: '同意',
          status: 'Finish',
        },
        'deny':{
          text: '否认',
          status: 'Warning',
        },
        'inform':{
          text: '信息',
          status: 'Processing',
        }
      },
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <a onClick={() => {editHandler(record);
              if (actionRef.current) {
                actionRef.current.reload();
              }}}>修改</a>&nbsp;&nbsp;
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
  ];
  const closeHandler = ()=>{
    setModalVisible(false);
  };
  const editHandler = (record)=>{
    setName('修改语料');
    setModalVisible(true);
    setRecord(record);
    setID(record.id);
  };
  // const deleteHandler=(record)=>{
  //   const values = {tgt_example:record.context,tgt_intent:record.intent};
  //   dispatch({
  //     type:'dialogdata/delete',
  //     payload:{
  //       values,
  //     },
  //   });
  // }
  const deleteHandler=async(record)=>{
    const hide = message.loading('正在删除');
    const values = {example_id:record.example_id};
    try {
      await deleteRule(values);
       hide();
        message.success('删除成功');
        return true;
    } catch (error) {
      hide();
      message.error('删除失败请重试！');
      return false;
    }
  }
  /**
 * 添加节点
 * @param fields
 */
  const handleAdd = async (fields) => {
    const hide = message.loading('正在添加');
    console.log(fields);
    try {
      await addRule(fields);
      hide();
      message.success('添加成功');
      return true;
    } catch (error) {
      hide();
      message.error('添加失败请重试！');
      return false;
    }
  };
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
  const onFinsh=async(value)=>{
    let id=0;
    console.log(value);
    if(record){
      id = record.example_id;
    }
    //console.log(id);
    if(id>0){
      const values = {example_id:record.example_id,content:value.content,intent:record.intent}; 
      //console.log(values);
      const hide = message.loading('正在修改');
      try {
        await editRule(values);
        hide();
        message.success('修改成功');
        setModalVisible(false);
        return true;
      } catch (error) {
        hide();
        message.error('修改失败请重试！');
        setModalVisible(false);
        return false;
      }
      // dispatch({
      //   type:'dialogdata/edit',
      //   payload:{
      //     values,
      //   },
      // });
    }
    else{
      //const values = {intent:value.intent,content:value.content};
      const hide = message.loading('正在添加');
      try {
        await addRule(value);
        hide();
        message.success('添加成功');
        setModalVisible(false);
        if (actionRef.current) {
          actionRef.current.reload();
        }
        return true;
      } catch (error) {
        hide();
        message.error('添加失败请重试！');
        setModalVisible(false);
        return false;
      }
    }
    //   dispatch({
    //     type:'dialogdata/add',
    //     payload:{
    //       values,
    //     },
    //   });
    // }
    //setModalVisible(false);
  };

  const addHandler=()=>{
    setName('添加语料');
    setRecord(undefined);
    setModalVisible(true);
  };
  return (
    <>
      <PageContainer>
        <ProTable
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
          request={(params, sorter, filter) => queryRule({ ...params, sorter, filter })}
          columns={columns}
          //dataSource={dialogdata.resData}
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
        {/* <CreateForm onCancel={() => handleModalVisible(false)} modalVisible={createModalVisible}>
          <ProTable
            onSubmit={async (value) => {
              const success = await handleAdd(value);

              if (success) {
                handleModalVisible(false);

                if (actionRef.current) {
                  actionRef.current.reload();
                }
              }
            }}
            rowKey="key"
            type="form"
            columns={columns}
          />
        </CreateForm> */}
        <EditModal visible={modalVisible} closeHandler={closeHandler} record={record} id={ID} onFinsh={onFinsh} name={name}> </EditModal>
        <CreateForm onCancel={() => CreateModalVisible(false)} modalVisible={createModalVisible}>
          <ProTable
            onSubmit={async (value) => {
              const success = await handleAdd(value);
              if (success) {
                CreateModalVisible(false);
                if (actionRef.current) {
                  actionRef.current.reload();
                }
              }
            }}
            rowKey="recordId"
            type="form"
            columns={columns.slice(1,3)}
          />
        </CreateForm>
        <EditForm onCancel={() => EditModalVisible(false)} modalVisible={editModalVisible}>
          <ProTable
            onSubmit={async (value) => {
              const success = await handleEdit(value);
              if (success) {
                EditModalVisible(false);
                if (actionRef.current) {
                  actionRef.current.reload();
                }
              }
            }}
            rowKey="recordId"
            type="form"
            columns={columns.slice(1,3)}
          />
        </EditForm>
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

        <Drawer
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
        </Drawer>
      </PageContainer>
    </>
  );
};

//export default DialogData;

export default connect(({ dialogdata, loading }) => ({
  dialogdata,
  userListLoading: loading.models.users,
}))(DialogData);
