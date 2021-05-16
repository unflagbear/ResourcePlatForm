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
    Typography,
  } from 'antd';
  import { GridContent, PageContainer, RouteContext } from '@ant-design/pro-layout';
  import React, { Component, Fragment } from 'react';
  import classNames from 'classnames';
  import { connect } from 'umi';
  import './advanced.css';
  import styles from './CardList.less';
  import { FrownOutlined, MehOutlined, SmileOutlined, PlusOutlined  } from '@ant-design/icons';
  import { queryOrder,queryServer } from './service';
import {history} from 'umi';

  //import Ellipsis from '@/components/Ellipsis';
  const ButtonGroup = Button.Group;
  const { Paragraph } = Typography;
  // const list = [{"id":"fake-list-0","owner":"付小小","title":"医药公司","avatar":"https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png","cover":"https://gw.alipayobjects.com/zos/rmsportal/uMfMFlvUuceEyPpotzlq.png","status":"active","percent":66,"logo":"https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png","href":"https://ant.design","updatedAt":"2021-04-25T04:06:21.748Z","createdAt":"2021-04-25T04:06:21.748Z","subDescription":"那是一种内在的东西， 他们到达不了，也无法触及的","description":"在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。","activeUser":194944,"newUser":1963,"star":124,"like":145,"message":15,"content":"段落示意：蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。","members":[{"avatar":"https://gw.alipayobjects.com/zos/rmsportal/ZiESqWwCXBRQoaPONSJe.png","name":"曲丽丽","id":"member1"},{"avatar":"https://gw.alipayobjects.com/zos/rmsportal/tBOxZPlITHqwlGjsJWaF.png","name":"王昭君","id":"member2"},{"avatar":"https://gw.alipayobjects.com/zos/rmsportal/sBxjgqiuHMGRkIjqlQCd.png","name":"董娜娜","id":"member3"}]},{"id":"fake-list-1","owner":"曲丽丽","title":"Angular","avatar":"https://gw.alipayobjects.com/zos/rmsportal/zOsKZmFRdUtvpqCImOVY.png","cover":"https://gw.alipayobjects.com/zos/rmsportal/iZBVOIhGJiAnhplqjvZW.png","status":"exception","percent":51,"logo":"https://gw.alipayobjects.com/zos/rmsportal/zOsKZmFRdUtvpqCImOVY.png","href":"https://ant.design","updatedAt":"2021-04-25T02:06:21.748Z","createdAt":"2021-04-25T02:06:21.748Z","subDescription":"希望是一个好东西，也许是最好的，好东西是不会消亡的","description":"在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。","activeUser":147500,"newUser":1798,"star":125,"like":172,"message":14,"content":"段落示意：蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。","members":[{"avatar":"https://gw.alipayobjects.com/zos/rmsportal/ZiESqWwCXBRQoaPONSJe.png","name":"曲丽丽","id":"member1"},{"avatar":"https://gw.alipayobjects.com/zos/rmsportal/tBOxZPlITHqwlGjsJWaF.png","name":"王昭君","id":"member2"},{"avatar":"https://gw.alipayobjects.com/zos/rmsportal/sBxjgqiuHMGRkIjqlQCd.png","name":"董娜娜","id":"member3"}]},{"id":"fake-list-2","owner":"林东东","title":"Ant Design","avatar":"https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png","cover":"https://gw.alipayobjects.com/zos/rmsportal/iXjVmWVHbCJAyqvDxdtx.png","status":"normal","percent":65,"logo":"https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png","href":"https://ant.design","updatedAt":"2021-04-25T00:06:21.748Z","createdAt":"2021-04-25T00:06:21.748Z","subDescription":"生命就像一盒巧克力，结果往往出人意料","description":"在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。","activeUser":168838,"newUser":1341,"star":149,"like":181,"message":18,"content":"段落示意：蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。","members":[{"avatar":"https://gw.alipayobjects.com/zos/rmsportal/ZiESqWwCXBRQoaPONSJe.png","name":"曲丽丽","id":"member1"},{"avatar":"https://gw.alipayobjects.com/zos/rmsportal/tBOxZPlITHqwlGjsJWaF.png","name":"王昭君","id":"member2"},{"avatar":"https://gw.alipayobjects.com/zos/rmsportal/sBxjgqiuHMGRkIjqlQCd.png","name":"董娜娜","id":"member3"}]},{"id":"fake-list-3","owner":"周星星","title":"Ant Design Pro","avatar":"https://gw.alipayobjects.com/zos/rmsportal/sfjbOqnsXXJgNCjCzDBL.png","cover":"https://gw.alipayobjects.com/zos/rmsportal/gLaIAoVWTtLbBWZNYEMg.png","status":"active","percent":67,"logo":"https://gw.alipayobjects.com/zos/rmsportal/sfjbOqnsXXJgNCjCzDBL.png","href":"https://ant.design","updatedAt":"2021-04-24T22:06:21.748Z","createdAt":"2021-04-24T22:06:21.748Z","subDescription":"城镇中有那么多的酒馆，她却偏偏走进了我的酒馆","description":"在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。","activeUser":101608,"newUser":1110,"star":187,"like":162,"message":17,"content":"段落示意：蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。","members":[{"avatar":"https://gw.alipayobjects.com/zos/rmsportal/ZiESqWwCXBRQoaPONSJe.png","name":"曲丽丽","id":"member1"},{"avatar":"https://gw.alipayobjects.com/zos/rmsportal/tBOxZPlITHqwlGjsJWaF.png","name":"王昭君","id":"member2"},{"avatar":"https://gw.alipayobjects.com/zos/rmsportal/sBxjgqiuHMGRkIjqlQCd.png","name":"董娜娜","id":"member3"}]},{"id":"fake-list-4","owner":"吴加好","title":"Bootstrap","avatar":"https://gw.alipayobjects.com/zos/rmsportal/siCrBXXhmvTQGWPNLBow.png","cover":"https://gw.alipayobjects.com/zos/rmsportal/gLaIAoVWTtLbBWZNYEMg.png","status":"exception","percent":69,"logo":"https://gw.alipayobjects.com/zos/rmsportal/siCrBXXhmvTQGWPNLBow.png","href":"https://ant.design","updatedAt":"2021-04-24T20:06:21.748Z","createdAt":"2021-04-24T20:06:21.748Z","subDescription":"那时候我只会想自己想要什么，从不想自己拥有什么","description":"在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。","activeUser":136107,"newUser":1686,"star":188,"like":185,"message":18,"content":"段落示意：蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。","members":[{"avatar":"https://gw.alipayobjects.com/zos/rmsportal/ZiESqWwCXBRQoaPONSJe.png","name":"曲丽丽","id":"member1"},{"avatar":"https://gw.alipayobjects.com/zos/rmsportal/tBOxZPlITHqwlGjsJWaF.png","name":"王昭君","id":"member2"},{"avatar":"https://gw.alipayobjects.com/zos/rmsportal/sBxjgqiuHMGRkIjqlQCd.png","name":"董娜娜","id":"member3"}]},{"id":"fake-list-5","owner":"朱偏右","title":"React","avatar":"https://gw.alipayobjects.com/zos/rmsportal/kZzEzemZyKLKFsojXItE.png","cover":"https://gw.alipayobjects.com/zos/rmsportal/iXjVmWVHbCJAyqvDxdtx.png","status":"normal","percent":86,"logo":"https://gw.alipayobjects.com/zos/rmsportal/kZzEzemZyKLKFsojXItE.png","href":"https://ant.design","updatedAt":"2021-04-24T18:06:21.748Z","createdAt":"2021-04-24T18:06:21.748Z","subDescription":"那是一种内在的东西， 他们到达不了，也无法触及的","description":"在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。","activeUser":180626,"newUser":1591,"star":118,"like":159,"message":16,"content":"段落示意：蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。","members":[{"avatar":"https://gw.alipayobjects.com/zos/rmsportal/ZiESqWwCXBRQoaPONSJe.png","name":"曲丽丽","id":"member1"},{"avatar":"https://gw.alipayobjects.com/zos/rmsportal/tBOxZPlITHqwlGjsJWaF.png","name":"王昭君","id":"member2"},{"avatar":"https://gw.alipayobjects.com/zos/rmsportal/sBxjgqiuHMGRkIjqlQCd.png","name":"董娜娜","id":"member3"}]},{"id":"fake-list-6","owner":"鱼酱","title":"Vue","avatar":"https://gw.alipayobjects.com/zos/rmsportal/ComBAopevLwENQdKWiIn.png","cover":"https://gw.alipayobjects.com/zos/rmsportal/iZBVOIhGJiAnhplqjvZW.png","status":"active","percent":85,"logo":"https://gw.alipayobjects.com/zos/rmsportal/ComBAopevLwENQdKWiIn.png","href":"https://ant.design","updatedAt":"2021-04-24T16:06:21.748Z","createdAt":"2021-04-24T16:06:21.748Z","subDescription":"希望是一个好东西，也许是最好的，好东西是不会消亡的","description":"在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。","activeUser":132406,"newUser":1548,"star":124,"like":119,"message":18,"content":"段落示意：蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。","members":[{"avatar":"https://gw.alipayobjects.com/zos/rmsportal/ZiESqWwCXBRQoaPONSJe.png","name":"曲丽丽","id":"member1"},{"avatar":"https://gw.alipayobjects.com/zos/rmsportal/tBOxZPlITHqwlGjsJWaF.png","name":"王昭君","id":"member2"},{"avatar":"https://gw.alipayobjects.com/zos/rmsportal/sBxjgqiuHMGRkIjqlQCd.png","name":"董娜娜","id":"member3"}]},{"id":"fake-list-7","owner":"乐哥","title":"Webpack","avatar":"https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png","cover":"https://gw.alipayobjects.com/zos/rmsportal/uMfMFlvUuceEyPpotzlq.png","status":"exception","percent":70,"logo":"https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png","href":"https://ant.design","updatedAt":"2021-04-24T14:06:21.748Z","createdAt":"2021-04-24T14:06:21.748Z","subDescription":"生命就像一盒巧克力，结果往往出人意料","description":"在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。","activeUser":179767,"newUser":1311,"star":168,"like":163,"message":14,"content":"段落示意：蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。","members":[{"avatar":"https://gw.alipayobjects.com/zos/rmsportal/ZiESqWwCXBRQoaPONSJe.png","name":"曲丽丽","id":"member1"},{"avatar":"https://gw.alipayobjects.com/zos/rmsportal/tBOxZPlITHqwlGjsJWaF.png","name":"王昭君","id":"member2"},{"avatar":"https://gw.alipayobjects.com/zos/rmsportal/sBxjgqiuHMGRkIjqlQCd.png","name":"董娜娜","id":"member3"}]}]
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
        // if (isMobile) {
        //   return (
        //     <Dropdown.Button
        //       type="primary"
        //       icon={<DownOutlined />}
        //       overlay={mobileMenu}
        //       placement="bottomRight"
        //     >
        //       主操作
        //     </Dropdown.Button>
        //   );
        // }

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
          {/* <Descriptions.Item label="服务商">{item.name}</Descriptions.Item> */}
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
      allData:{},
      list:[],
    };

    orderdata={
      order_data:{},
    }

    async componentDidMount() {
        const { dispatch,location} = this.props;
        const { order_id,  state, is_done } = location.query;
        this.setState({id: order_id, current: state, isDone: is_done});
        let values = order_id;
        //console.log(values);
        await queryServer({values}).then((res)=>{
          if(res.data==1){
              history.push(
                 {
                    pathname: '/profile_customer/customer/',
                    query: {
                    order_id: this.state.id,
                    state: this.state.current,
                    is_done: this.state.isDone,
                 }}
              )
          }
          else{
            this.setState({list: res.data});
          }
      });
        // dispatch({
        //   type: 'multiServer/fetchAdvanced',
        //   payload: {
        //     //count: 8,
        //     values,
        //   },
        // });
        
        try {

          await queryOrder({values}).then((res)=>{
              this.setState({order_data: res.data[0],communiDone:res.data[0].communiDone,allData:res.data});
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
      // const {
      //   multiServer: { list },
      //   loading,
      // } = this.props;
      const { current, tabActiveKey } = this.state;
      const { allData } = this.state;
      const nullData = {};
      console.log(allData);
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
            grid={{
              gutter: 16,
              xs: 1,
              sm: 2,
              md: 3,
              lg: 3,
              xl: 4,
              xxl: 4,
            }}
            
            dataSource={this.state.list}
            renderItem={(item) => {
                if (item && item.id) {
                  return (
                    <List.Item key={item.id}>
                      <Card
                        hoverable
                        title={"服务方"}
                        className={styles.card}
                        actions={[ <a key="option2" onClick={()=>{
                          history.push(
                             {
                                pathname: '/profile_customer/customer/',
                                query: {
                                order_id: this.state.id,
                                state: this.state.current,
                                is_done: this.state.isDone,
                             }}
                          )
                        }}>进度查看</a>]}
                      >
                        <Card.Meta
                          // avatar={<img alt="" className={styles.cardAvatar} src={item.avatar} />}
                          title={item.institution}
                          description={
                            <Paragraph
                              className={styles.item}
                              ellipsis={{
                                rows: 3,
                              }}
                            >
                              联系人：{item.contact}<br/>
                              联系方式：{item.phone}<br/>
                              地址：{item.location}<br/>
                              电子邮件:{item.email}

                            </Paragraph>
                          }
                        />
                      </Card>
                    </List.Item>
                  );
                }

                // return (
                //   <List.Item>
                //     <Button type="dashed" className={styles.newButton}>
                //       <PlusOutlined /> 新增产品
                //     </Button>
                //   </List.Item>
                // );
              }}
            />

        </div>
            </GridContent>
          </div>
        </PageContainer>
      );
    }
  }

  export default connect(({ multiServer, loading }) => ({
    multiServer,
    loading: loading.effects['profileAndadvanced/fetchAdvanced'],
  }))(Advanced);
