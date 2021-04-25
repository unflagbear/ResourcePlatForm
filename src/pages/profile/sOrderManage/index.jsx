import { PlusOutlined } from '@ant-design/icons';
import { Button, message, Drawer,Input,Divider } from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import ProDescriptions from '@ant-design/pro-descriptions';
import {Link} from 'react-router-dom'
//import CreateForm from './components/CreateForm';
//import UpdateForm from './components/UpdateForm';
import {history} from 'umi';

import { queryRule, updateRule, addRule, removeRule } from './service';


/**
 *  删除节点
 * @param selectedRows
 */
const mapRemove = (selectedRows)=>{
  selectedRows.map((row) =>removeRule({order_id:row.orderId}) )
}
const handleRemove = async (selectedRows) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;

  try {
    await mapRemove(selectedRows);
    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请重试');
    return false;
  }
};

const SOrderManage = () => {
  const [createModalVisible, handleModalVisible] = useState(false);
  // const [updateModalVisible, handleUpdateModalVisible] = useState(false);
  // const [stepFormValues, setStepFormValues] = useState({});
  const actionRef = useRef();
  const [row, setRow] = useState();
  const [selectedRowsState, setSelectedRows] = useState([]);
  const linkTodetails = () => {
    <Link to={{
        pathname:'/profile/server',
        state:{

        }}}> 
    </Link>
  }
  const columns = [
    {
      title: '订单号',
      dataIndex: 'orderId',
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
      title: '服务名称',
      dataIndex: 'serviceName',
      valueType: 'textarea',
    },
    {
      title: '申请人',
      dataIndex: 'server',
      valueType: 'textarea',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
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
      title: '订单进度',
      dataIndex: 'processId',
      hideInForm: true,
      valueEnum: {
        '0': {
          text: '申请服务',
          status: 'Processing',
        },
        '1': {
          text: '线下沟通',
          status: 'Processing',
        },
        '2': {
          text: '签署协议',
          status: 'Processing',
        },
        '3':{
          text: '服务实施',
          status: 'Processing',
        },
        '4':{
            text: '成果提交',
            status: 'Success',
        },
        '5':{
        text: '服务评价',
        status: 'Error',
        },
        '-1':{
            text: '已取消',
            status: 'Error',
        }
      }
    },{
      title: '备注',
      dataIndex: 'note',
      valueType: 'textarea',
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => {
        const {orderId, processId} =record
        return(
        <>
        {record.state==='-1'?null:
        <span>
          <a
              onClick={async() => {
                // handleUpdateModalVisible(true);
                // setStepFormValues(record);
                //console.log("record",orderId)
                history.push({
                    pathname: '/profile_server/server/',
                    query: {
                      order_id: orderId,
                      state: processId,
                      is_done: 0,
                    },
                  });
                // const success = await handleUpdate(record);
                // if (success) {
                //   if (actionRef.current) {
                //     actionRef.current.reload();
                //   }
                // }
              }}
            >
              查看
            </a>
            <Divider type="vertical" />
          </span>}
          
          
          <a onClick={async() => {
                // handleUpdateModalVisible(true);
                // setStepFormValues(record);
                const success = await handleRemove([record]);
                if (success) {
                  if (actionRef.current) {
                    actionRef.current.reload();
                  }
                }
              }}>删除</a>
        </>
      )},
    },
  ];
  return (
    <>
      <PageContainer>
        <ProTable
          key={1}
          headerTitle="订单管理"
          actionRef={actionRef}
          rowKey="recordId"
          search={{
            labelWidth: 120,
          }}
          toolBarRender={() => [
            <Button type="primary" onClick={() => handleModalVisible(true)}>
              <PlusOutlined /> 新建
            </Button>,
          ]}
          request={(params, sorter, filter) => {
              let values={isDone: 0, type: 0};
              return queryRule({ ...params, values, sorter, filter })}}
          columns={columns}
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
                await handleRemove(selectedRowsState);
                setSelectedRows([]);
                actionRef.current?.reloadAndRest?.();
              }}
            >
              批量删除
            </Button>
            {/* <Button type="primary">批量审批</Button> */}
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
            rowKey="recordId"
            type="form"
            columns={columns.slice(1,7)}
          />
        </CreateForm> */}
        {/* {stepFormValues && Object.keys(stepFormValues).length ? (
          <UpdateForm
            onSubmit={async (value) => {
              const success = await handleUpdate(value);

              if (success) {
                handleUpdateModalVisible(false);
                setStepFormValues({});

                if (actionRef.current) {
                  actionRef.current.reload();
                }
              }
            }}
            onCancel={() => {
              handleUpdateModalVisible(false);
              setStepFormValues({});
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

export default SOrderManage;