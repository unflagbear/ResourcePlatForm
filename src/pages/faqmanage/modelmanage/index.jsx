import { PlusOutlined } from '@ant-design/icons';
import { Button, message, Drawer,Input,Divider } from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import ProDescriptions from '@ant-design/pro-descriptions';
import CreateModelForm from './components/CreateModelForm';

import CreateForm from './components/CreateForm';
import DetailForm from './components/DetailForm';

import { queryRule, updateRule, addRule, removeRule,queryQues ,trainModel} from './service';

/**
 * 添加节点
 * @param fields
 */

const handleAdd = async (fields) => {
  const hide = message.loading('正在添加');

  try {
    await addRule({ name: fields.name,answer: fields.answer });
    hide();
    message.success('添加成功');
    return true;
  } catch (error) {
    hide();
    message.error('添加失败请重试！');
    return false;
  }
};
const handleDetial = async (fields)=>{
  
}

/**
 * 更新节点
 * @param fields
 */

const handleUpdate = async (fields) => {
  const hide = message.loading('正在配置');

  try {
    await updateRule({
      name: fields.name,
      record_id: fields.categoryId,
      domain: fields.domain,
    });
    hide();
    message.success('配置成功');
    return true;
  } catch (error) {
    hide();
    message.error('配置失败请重试！');
    return false;
  }
};
/**
 *  删除节点
 * @param selectedRows
 */
const mapRemove = (selectedRows)=>{
  selectedRows.map((row) =>removeRule({category_id:row.categoryId}) )
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
const handleTrain = async (value,selectedRows) => {
  const hide = message.loading('正在根据所选分类创建模型');
  if (!selectedRows) return true;
  const idList = selectedRows.map((item)=>{return item.categoryId})

  // hide()
  try {
    await trainModel({...value,categories:idList})

    hide();
    message.success('模型创建成功');
    return true;
  } catch (error) {
    hide();
    message.error('模型创建失败，请重试');
    return false;
  }
};

const Faqmanage = () => {
  const [createModalVisible, handleModalVisible] = useState(false);
  const [detailModalVisible, handleDetailModalVisible] = useState(false);
  const [createModelVisible, handleModelVisible] = useState(false);

  // const [updateModalVisible, handleUpdateModalVisible] = useState(false);
  const [stepFormValues, setStepFormValues] = useState({});
  const actionRef = useRef();
  const [row, setRow] = useState();
  const [selectedRowsState, setSelectedRows] = useState([]);
  const columns = [
    {
      title: '类别ID',
      dataIndex: 'categoryId',
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
      title: '类别名',
      dataIndex: 'name',
      valueType: 'textarea',
    },
    {
      title: '回答',
      width: 700,
      dataIndex: 'answer',
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
      title: '操作',
      width: 130,
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
       
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
              <Divider type="vertical" />
              <a  onClick={async() => {
                handleDetailModalVisible(true)
                setStepFormValues(record);
                
              }}>详情</a>
        </>
      ),
    },
  ];
  const queryCom = [
    {
      title: '问题ID',
      dataIndex: 'queryId',
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
      title: '问题',
      dataIndex: 'text',
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
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
       
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
              {/* <a onClick={async() => {
                handleDetailModalVisible(true)
                setStepFormValues(record);
                
              }}>详情</a> */}
        </>
      ),
    },
  ];
  return (
    <>
      <PageContainer>
        <ProTable
          headerTitle="查询表格"
          actionRef={actionRef}
          rowKey="categoryId"
          search={{
            labelWidth: 120,
          }}
          toolBarRender={() => [
            <Button type="primary" onClick={() => handleModalVisible(true)}>
              <PlusOutlined /> 新建
            </Button>,
          ]}
          request={(params, sorter, filter) => queryRule({ ...params, sorter, filter })}
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
            <Button type="primary" onClick={async () => {
               handleModelVisible(true)
              }}>训练</Button>
          </FooterToolbar>
        )}
        
        <CreateModelForm onCancel={() => handleModelVisible(false)} modalVisible={createModelVisible}>
          <ProTable
            onSubmit={async (value) => {
              const success = await handleTrain(value,selectedRowsState);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
              if (success) {
                handleModelVisible(false);
                if (actionRef.current) {
                  actionRef.current.reload();
                }
              }
            }}
            rowKey="categoryId"
            type="form"
            columns={[{
              title: '所属领域',
              dataIndex: 'domain',
              valueEnum: {
                'patent': {
                  text: '专利',
                  status: 'Processing',
                },
                'expert': {
                  text: '专家',
                  status: 'Success',
                },
                'equipment': {
                  text: '设备',
                  status: 'Error',
                }
              }
            },{
              title: '模型名',
              dataIndex: 'name',
              valueType: 'textarea',
            }]}
          />
        </CreateModelForm>
        <CreateForm onCancel={() => handleModalVisible(false)} modalVisible={createModalVisible}>
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
            rowKey="categoryId"
            type="form"
            columns={columns.slice(1,3)}
          />
        </CreateForm>
        {stepFormValues?<DetailForm onCancel={() => handleDetailModalVisible(false)} modalVisible={detailModalVisible}>
          <ProTable
            toolBarRender={() => [
              <Button type="primary" onClick={() => handleModalVisible(true)}>
                <PlusOutlined /> 新建
              </Button>,
            ]}
            request={(params, sorter, filter) => queryQues({ ...params, sorter, filter,categoryId:stepFormValues.categoryId })}
            rowKey="queryId"
            columns={queryCom}
          />
        </DetailForm>:null}
        
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

export default Faqmanage;