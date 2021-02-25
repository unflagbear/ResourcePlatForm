import { PlusOutlined } from '@ant-design/icons';
import { Button, message, Drawer } from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import ProDescriptions from '@ant-design/pro-descriptions';
import CreateForm from './components/CreateForm';
import UpdateForm from './components/UpdateForm';
import EditModal from './components/EditModal';
import {connect} from 'umi'

import { queryRule, updateRule, addRule, removeRule } from './service';

/**
 * 添加节点
 * @param fields
 */

const DialogData = ({dialogdata, dispatch, userListLoading}) => {
  const [createModalVisible, handleModalVisible] = useState(false);
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
      dataIndex: 'id',
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
      dataIndex: 'context',
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
          <a onClick={() => {editHandler(record);}}>修改</a>&nbsp;&nbsp;
          <a onClick={() => {deleteHandler(record);}}>删除</a>
        </>
      ),
    },
  ];
  const closeHandler = ()=>{
    setModalVisible(false);
  };
  const editHandler = (record)=>{
    setName('修改');
    setModalVisible(true);
    setRecord(record);
    setID(record.id);
  };
  const deleteHandler=(record)=>{
    const values = {tgt_example:record.context,tgt_intent:record.intent};
    dispatch({
      type:'dialogdata/delete',
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
      deleteHandler(selectedRows.map((row) => row.key));
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
        type:'dialogdata/edit',
        payload:{
          values,
        },
      });
    }
    else{
      const values = {new_example:value.context,tgt_intent:value.intent};
      dispatch({
        type:'dialogdata/add',
        payload:{
          values,
        },
      });
    }
    setModalVisible(false);
  };

  const addHandler=()=>{
    setName('添加');
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
          columns={columns}
          dataSource={dialogdata}
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

export default connect(({ dialogdata, loading }) => ({
  dialogdata,
  userListLoading: loading.models.users,
}))(DialogData);
