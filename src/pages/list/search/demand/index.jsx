import { Card, Col, Form, List, Row, Select, Typography, Image, Tag, Button,Space } from 'antd';
import React, { useEffect, useState } from 'react';
import { connect, history } from 'umi';
import moment from 'moment';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';

import ChatforAccessService from '@/components/ChatForAccessService';
import SubSelection from './components/SubSelection';
import StandardFormRow from './components/StandardFormRow';
import styles from './style.less';

const { Option } = Select;
const FormItem = Form.Item;
const { Paragraph } = Typography;


const Demand = ({ dispatch, listAndsearchAnddemand: { list = [], total = 0 }, loading }) => {
  const [chatLog, setChatLog] = useState(false);

  useEffect(() => {
    console.log("00000000");
    dispatch({
      type: 'listAndsearchAnddemand/list',
      payload: {
      },
    })
  }, []);
  console.log(list);

  const IconText = ({ icon, text }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );

  const cardList = list && (
    <List
      rowKey="id"
      loading={loading}
      // grid={{
      //   gutter: 16,
      //   xs: 1,
      //   sm: 2,
      //   md: 3,
      //   lg: 3,
      //   xl: 4,
      //   xxl: 4,
      // }}
      dataSource={list}
      itemLayout="horizontal"
      renderItem={(item) => (
        <List.Item
          className={styles.cardItem}
          actions={[
            <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
            <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
            <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
            // eslint-disable-next-line react/jsx-key
            <text>创建时间：{moment(item.createTime).format('LL')}</text>
          ]}
        >
          <List.Item.Meta title={<a href={`/details_demand?productID=${item.demandId}`}>【需求名称】：{item.demandName}</a>} description={<div>需求描述：{item.demandDesc}</div>}/>
        </List.Item>
      )}
    />
  );
  const formItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 16,
      },
    },
  };
  return (
    <div className={styles.coverCardList}>
      <h1>需求列表</h1>
      <div className={styles.cardList}>{cardList}</div>
      <div
        style={{
          zIndex: '999999',
          right: '38px',
          bottom: '49px',
          position: 'fixed',
          display: 'block',
        }}
      >

          <div style={{display: chatLog ? 'block' : 'none',
            position: 'absolute',
            overflow: 'hidden',
            left: '-333px',
            bottom: '45px', height: '554px', width: '460px',
            borderRadius:"20px",
            boxShadow:"4px 4px 5px 3px #999",
            }}>
            <ChatforAccessService />
          </div>

        <Button
          style={{ left: 30 }}
          type="primary"
          onClick={() => (chatLog ? setChatLog(false) : setChatLog(true))}
        >
          询问智能客服
        </Button>
      </div>
    </div>
  );
};

export default connect(({ listAndsearchAnddemand, loading }) => ({
  listAndsearchAnddemand,
  loading: loading.models.listAndsearchAnddemand,
}))(Demand);
