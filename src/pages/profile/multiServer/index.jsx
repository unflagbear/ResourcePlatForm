import {
    DownOutlined,
    EllipsisOutlined,
    InfoCircleOutlined,
  } from '@ant-design/icons';
  import {
    Badge,
    Button,
    Card,
    List,
    Statistic,
    Descriptions,
    Dropdown,
    Menu,
  } from 'antd';
  import { GridContent, PageContainer, RouteContext } from '@ant-design/pro-layout';
  import React, { Component, Fragment } from 'react';
  import classNames from 'classnames';
  import { connect } from 'umi';
  import './advanced.css';
  import styles from './CardList.less';
  import { FrownOutlined, MehOutlined, SmileOutlined, UploadOutlined } from '@ant-design/icons';
  import { queryOrder, } from './service';
  //import Ellipsis from '@/components/Ellipsis';
  const ButtonGroup = Button.Group;

  const menu = (
    <Menu>
      <Menu.Item key="1">选项一</Menu.Item>
      <Menu.Item key="2">选项二</Menu.Item>
      <Menu.Item key="3">选项三</Menu.Item>
    </Menu>
  );

  const action = (
    <RouteContext.Consumer>
      {({ isMobile }) => {
        if (isMobile) {
          return (
            <Dropdown.Button
              type="primary"
              icon={<DownOutlined />}
              overlay={mobileMenu}
              placement="bottomRight"
            >
              主操作
            </Dropdown.Button>
          );
        }
  
        return (
          <Fragment>
            <ButtonGroup>
              <Button>撤回申请</Button>
              <Button>取消订单</Button>
              <Dropdown overlay={menu} placement="bottomRight">
                <Button>
                  <EllipsisOutlined />
                </Button>
              </Dropdown>
            </ButtonGroup>
            <Button type="primary">主操作</Button>
          </Fragment>
        );
      }}
    </RouteContext.Consumer>
  );

  const extra = (
    <div className={styles.moreInfo}>
      <Statistic title="状态" value="待审批" />
      <Statistic title="订单金额" value={568.08} prefix="¥" />
    </div>
  );
  
  const description = (item)=>(
    <RouteContext.Consumer>
      {({ isMobile }) => (
        <Descriptions className={styles.headerList} size="small" column={isMobile ? 1 : 2}>
          <Descriptions.Item label="服务商">{item.name}</Descriptions.Item>
          <Descriptions.Item label="订购产品">{item.service}</Descriptions.Item>
          <Descriptions.Item label="创建时间">{datetimeFormat(item.createTime)}</Descriptions.Item>
          <Descriptions.Item label="联系电话">{item.phone}</Descriptions.Item>
          <Descriptions.Item label="生效日期">{item.cycle}</Descriptions.Item>
          <Descriptions.Item label="备注">{item.note}</Descriptions.Item>
        </Descriptions>
      )}
    </RouteContext.Consumer>
  );
  function datetimeFormat(longTypeDate){  
    return new Date(parseInt(longTypeDate) ).toLocaleString().replace(/:\d{1,2}$/,' ');     
} 

  class Advanced extends Component {
    state = {
      tabActiveKey: 'detail',
      current: 0,
      order_data:{},
      id:0,
      rate:0,
    };
  
    async componentDidMount() {
        const { dispatch,location} = this.props;
        const { order_id, state, is_done } = location.query;
        this.setState({id: order_id, current: state, isDone: is_done});
        let values = order_id;
        try {
          await queryOrder({values}).then((res)=>{
              this.setState({order_data: res.data[0],communiDone:res.data[0].communiDone});
          });
          return true;
        } catch (error) {
          return false;
        }
    }
    onTabChange = (tabActiveKey) => {
      this.setState({
        tabActiveKey,
      });
    };
    render() {
      const { current, tabActiveKey } = this.state;
      
      return (
        <PageContainer
          title={"资源服务单号："+this.state.id}
          extra={action}
          className={styles.pageHeader}
          content={description(this.state.order_data)}
          extraContent={extra}
          tabActiveKey={tabActiveKey}
          onTabChange={this.onTabChange}
          tabList={[
            {
              key: 'detail',
              tab: '详情',
            },
            {
              key: 'rule',
              tab: '规则',
            },
          ]}
        >
          <div className={styles.main}>
            <GridContent>
            <div className={styles.cardList}>
          <List
            rowKey="id"
            // loading={loading}
            grid={{ gutter: 24, lg: 3, md: 2, sm: 1, xs: 1 }}
            //dataSource={['', ...list]}
                renderItem={item =>
                (
                    <List.Item key={'item.id'}>
                    <Card hoverable className={styles.card} actions={[<a>操作一</a>, <a>操作二</a>]}>
                        <Card.Meta
                        //avatar={<img alt="" className={styles.cardAvatar} src={'item.avatar'} />}
                        title={<a>{'item.title'}</a>}
                        description={
                            <Ellipsis className={styles.item} lines={3}>
                            {'item.description'}
                            </Ellipsis>
                        }
                        />
                    </Card>
                    </List.Item>
                ) 
                }
            />
               
        </div>
            </GridContent>
          </div>
        </PageContainer>
      );
    }
  }
  
  export default connect(({ profileCustomer, loading }) => ({
    profileCustomer,
    loading: loading.effects['profileAndadvanced/fetchAdvanced'],
  }))(Advanced);