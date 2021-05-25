import React, {useRef, useState} from "react";
import {connect} from "umi";
import {FooterToolbar, PageContainer} from "@ant-design/pro-layout";
import ProTable from "@ant-design/pro-table";
import {Button, Drawer, message} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import {addDemand, deleteDemand, editDemand, queryDemand,getDemandList} from "@/pages/demand/service";
import EditModal from "@/pages/demand/components/EditModal";
import CreateForm from "@/pages/demand/components/CreateForm";
import EditForm from "@/pages/demand/components/EditForm";

const DemandManage=({Demand, dispatch, userListLoading})=>{
  const [createModalVisible, CreateModalVisible] = useState(false);
  const [editModalVisible, EditModalVisible] = useState(false);
  const actionRef = useRef();
  const [row, setRow] = useState();
  const [selectedRowsState, setSelectedRows] = useState([]);
  const [data, setData] = useState([]);
  const [record,setRecord] = useState(undefined);
  const [modalVisible,setModalVisible] = useState(false);
  const [name,setName] = useState(undefined);
  const [ID,setID] = useState(0);

  const columns = [
    {
      title: '需求id',
      dataIndex: 'demandId',
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
      title: '需求名称',
      dataIndex: 'demandName',
      valueType: 'textarea',
    },
    {
      title: '需求描述',
      hideInForm: true,
      dataIndex: 'demandDesc',
      valueType: 'textarea',
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
            }}}>删除</a>&nbsp;&nbsp;
          <a href={"/details_demand?productID="+record.demandId} onClick={async() => {

              }}>详情</a>
        </>
      ),
    },
  ];

  const closeHandler = ()=>{
    setModalVisible(false);
  };
  const editHandler = (record)=>{
    setName('修改需求');
    setModalVisible(true);
    setRecord(record);
    setID(record.demandId);
  };

  const deleteHandler=async(record)=>{
    const hide = message.loading('正在删除');
    const values = {productID:record.demandId};
    try {
      await deleteDemand(values);
      hide();
      message.success('删除成功');
      return true;
    } catch (error) {
      hide();
      message.error('删除失败请重试！');
      return false;
    }
  }

  const handleAdd = async (fields) => {
    const hide = message.loading('正在添加');
    console.log(fields);
    try {
      await addDemand(fields);
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
  const onFinish=async(value)=>{
    let id=0;
    console.log(value);
    if(record){
      id = record.demandId;
    }
    //console.log(id);
    if(id>0){
      const values = {demandId:record.demandId,demandName:value.demandName,demandDesc:value.demandDesc,phoneNumber:value.phoneNumber,email:value.email};
      //console.log(values);
      const hide = message.loading('正在修改');
      try {
        await editDemand(values);
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
        await addDemand(value);
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
    setName('添加需求');
    setRecord(undefined);
    setModalVisible(true);
  };

  return(
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
          request={(params, sort, filter) => getDemandList(params,sort,filter)}
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
        <EditModal visible={modalVisible} closeHandler={closeHandler} record={record} id={ID} onFinsh={onFinish} name={name}> </EditModal>
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

      </PageContainer>
    </>
  )
}

export default connect(({ Demand })=>({
  Demand
})) (DemandManage)
