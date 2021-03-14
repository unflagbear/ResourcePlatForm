import { Table, Button, Space } from 'antd';
import React, { useEffect,useState } from 'react'

const data = [
    {
      key: '1',
      field: '专利',
      ID: 10,
      preference: 98,
    },
    {
      key: '2',
      field: '专利',
      ID: 10,
      preference: 48,
    },
    {
      key: '3',
      field: '专利',
      ID: 10,
      preference: 38,
    },
    {
      key: '4',
      field: '专利',
      ID: 10,
      preference: 1034,
    },
  ];

const ShowTable=()=> {
    
    const onChange=(pagination, filters, sorter, extra) =>{
        console.log('params', pagination, filters, sorter, extra);
    }

    const columns = [
    {
        title: '领域',
        dataIndex: 'field',
    },
    {
        title: '用户ID',
        dataIndex: 'ID',
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
    return (
        <div>
          <Space style={{ marginBottom: 16 }}>

          </Space>
          <Table columns={columns} dataSource={data} onChange={onChange} />
        </div>
    );
}

export default ShowTable;