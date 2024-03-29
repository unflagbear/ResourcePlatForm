import { PlusOutlined } from '@ant-design/icons';
import { Button, message, Drawer,Input,Divider } from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import ProDescriptions from '@ant-design/pro-descriptions';
import CreateForm from './components/CreateForm';

import { queryRule, updateRule, trainModel, removeRule } from './service';

/**
 * 添加节点
 * @param fields
 */

const handleAdd = async (fields) => {
  const hide = message.loading('正在添加');

  try {
    await trainModel({ domain:fields.domain,name: fields.name,categories: fields.categories });
    hide();
    message.success('添加成功');
    return true;
  } catch (error) {
    hide();
    message.error('添加失败请重试！');
    return false;
  }
};
/**
 * 更新节点
 * @param fields
 */

const handleUpdate = async (fields) => {
  const hide = message.loading('正在配置');

  try {
    await updateRule({
      name: fields.name,
      record_id: fields.recordId,
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
  selectedRows.map((row) =>removeRule({record_id:row.recordId}) )
}
const request = async () => [
  { label: '询问专利类型相关', value: 1 },
  { label: '询问专利关键词相关', value: 2 },
  { label: '询问专利申请机构相关', value: 3 },
  { label: '询问专利申请时间相关', value: 4 },
  { label: '询问库中专利范围相关', value: 5 },
  { label: '找不到合适的专利', value: 6 },
  { label: '询问研究方向相关', value: 7 },
  { label: '询问研究领域相关', value: 8 },
  { label: '询问任职机构相关', value: 9 },
  { label: '询问库中专家范围', value: 10 },
  { label: '找不到合适的专家', value: 11 },
  { label: '询问设备用途相关', value: 12 },
  { label: '询问设备类型相关', value: 13 },
  { label: '询问设备所属机构相关', value: 14 },
  { label: '询问库中设备范围', value: 15 },
  { label: '找不到合适的设备', value: 16 },
  { label: '你是谁', value: 17 },
  { label: '怎么操作', value: 18 }
];
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

const Faqmanage = () => {
  const [createModalVisible, handleModalVisible] = useState(false);
  // const [updateModalVisible, handleUpdateModalVisible] = useState(false);
  // const [stepFormValues, setStepFormValues] = useState({});
  const actionRef = useRef();
  const [row, setRow] = useState();
  const [selectedRowsState, setSelectedRows] = useState([]);
  const creatcol = [
    {
      title: '模型名',
      dataIndex: 'name',
      valueType: 'textarea',
    },
    {
      title: '领域',
      dataIndex: 'domain',
      valueEnum: {
        'patent': {
          text: '专家',
        },
        'expert': {
          text: '专利',
        },
        'equipment': {
          text: '仪器',
        }
      }
    },
    {
      title: '问题类型（多选）',
      dataIndex: 'categories',
      // hideInForm: true,
      valueType: 'checkbox',
      request,
      params:{},
    }
  ]
  const columns = [
    {
      title: '记录id',
      dataIndex: 'recordId',
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
      title: '模型名',
      dataIndex: 'name',
      valueType: 'textarea',
    },
    {
      title: '领域',
      dataIndex: 'domain',
      valueType: 'textarea',
    },
    {
      title: '数据路径',
      dataIndex: 'dataPath',
      valueType: 'textarea',
    },{
      title: '类别数量',
      dataIndex: 'categoryNum',
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
      title: '状态',
      dataIndex: 'state',
      hideInForm: true,
      valueEnum: {
        '1': {
          text: '正在训练',
          status: 'Processing',
        },
        '2': {
          text: '上线中',
          status: 'Success',
        },
        '-1': {
          text: '错误',
          status: 'Error',
        },
        '0':{
          text: '就绪',
          status: 'Default',
        }
      }
    },{
      title: '备注',
      dataIndex: 'comment',
      valueType: 'textarea',
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
        {record.state==='2'?null:
        <span>
          <a
              onClick={async() => {
                // handleUpdateModalVisible(true);
                // setStepFormValues(record);
                const success = await handleUpdate(record);
                if (success) {


                  if (actionRef.current) {
                    actionRef.current.reload();
                  }
                }
              }}
            >
              上线
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
      ),
    },
  ];
  return (
    <>
      <PageContainer>
        <ProTable
          headerTitle="查询表格"
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
            {/* <Button type="primary">批量审批</Button> */}
          </FooterToolbar>
        )}
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
            rowKey="recordId"
            type="form"
            columns={creatcol}
          />
        </CreateForm>
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