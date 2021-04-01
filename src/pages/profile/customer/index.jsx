import {
    DownOutlined,
    EllipsisOutlined,
    InfoCircleOutlined,
  } from '@ant-design/icons';
  import {
    Badge,
    Button,
    Card,
    Statistic,
    Descriptions,
    Divider,
    Dropdown,
    Menu,
    Popover,
    Steps,
    message,
    Tooltip,
    Empty,
    Rate,
    Input,
    Upload,
    Spin
  } from 'antd';
  import { GridContent, PageContainer, RouteContext } from '@ant-design/pro-layout';
  import React, { Component, Fragment } from 'react';
  import classNames from 'classnames';
  import { connect } from 'umi';
  import styles from './style.less';
  import './advanced.css';
  import { FrownOutlined, MehOutlined, SmileOutlined, UploadOutlined } from '@ant-design/icons';
  import { queryOrder } from './service';
  
  const { Step } = Steps;
  const { TextArea } = Input;
  const ButtonGroup = Button.Group;
  const menu = (
    <Menu>
      <Menu.Item key="1">选项一</Menu.Item>
      <Menu.Item key="2">选项二</Menu.Item>
      <Menu.Item key="3">选项三</Menu.Item>
    </Menu>
  );
  const mobileMenu = (
    <Menu>
      <Menu.Item key="1">操作一</Menu.Item>
      <Menu.Item key="2">操作二</Menu.Item>
      <Menu.Item key="3">选项一</Menu.Item>
      <Menu.Item key="4">选项二</Menu.Item>
      <Menu.Item key="">选项三</Menu.Item>
    </Menu>
  );
  const param = {
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    onChange({ file, fileList }) {
      if (file.status !== 'uploading') {
        console.log(file, fileList);
      }
    },
    defaultFileList: [
      {
        uid: '1',
        name: 'xxx.doc',
        status: 'done',
        response: 'Server Error 500', // custom error message to show
        url: 'http://www.baidu.com/xxx.doc',
      },
      {
        uid: '2',
        name: 'yyy.doc',
        status: 'done',
        url: 'http://www.baidu.com/yyy.doc',
      },
      {
        uid: '3',
        name: 'zzz.png',
        status: 'error',
        response: 'Server Error 500', // custom error message to show
        url: 'http://www.baidu.com/zzz.png',
      },
    ],
  };
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
  function datetimeFormat(longTypeDate){  
  
    return new Date(parseInt(longTypeDate) ).toLocaleString().replace(/:\d{1,2}$/,' ');     
   } 
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
  const desc1 = (
    <div className={classNames(styles.textSecondary, styles.stepDescription)}>
      <Fragment>XXX公司</Fragment>
      <div>2016-12-12 12:32</div>
    </div>
  );
  const desc2 = (
    <div className={styles.stepDescription}>
      <Fragment>XXX公司负责中</Fragment>
      <div>
        <a href="">催一下</a>
      </div>
    </div>
  );
  const popoverContent = (
    <div
      style={{
        width: 160,
      }}
    >
      等待XXX公司反馈
      <span
        className={styles.textSecondary}
        style={{
          float: 'right',
        }}
      >
        <Badge
          status="default"
          text={
            <span
              style={{
                color: 'rgba(0, 0, 0, 0.45)',
              }}
            >
              等待反馈
            </span>
          }
        />
      </span>
      <div
        className={styles.textSecondary}
        style={{
          marginTop: 4,
        }}
      >
        已耗时：2小时25分钟
      </div>
    </div>
  );
  
  const customDot = (dot, { status }) => {
    if (status === 'process') {
      return (
        <Popover placement="topLeft" arrowPointAtCenter content={popoverContent}>
          {dot}
        </Popover>
      );
    }
  
    return dot;
  };
  const Apply=(props)=>{
    return(
      <div className='title-type'>
        {props.title}
        <div className='apply-type'>
          <Spin /> &nbsp;服务提供商处理申请中，请耐心等候
          <br/><br/>
          <Button type='primary'>提醒处理</Button>
        </div>
      </div>
    )
  }
  const Communi=(props)=>{
    const customIcons = {
      1: <FrownOutlined />,
      2: <FrownOutlined />,
      3: <MehOutlined />,
      4: <SmileOutlined />,
      5: <SmileOutlined />,
    };
    return(
      <div className='title-type'>
        {props.title}
        <div className='comment-type'>
          <p style={{fontSize:'15px',paddingTop: '20px'}}>沟通体验:</p>
          <Rate style={{marginTop: '5px',fontSize:'30px'}} defaultValue={3} character={({ index }) => customIcons[index + 1]} />
          <p style={{fontSize:'15px',marginTop: '10px'}}>对本次沟通的感受和意见:</p>
          <TextArea showCount maxLength={100} rows={8} placeholder={'请输入您的评价：'} style={{marginTop: '8px',width:'800px', margin:"0 auto"}}/>
          <Button type="primary" style={{float:'right',marginRight:'230px'}} On>{'提交'}</Button>
        </div>
      </div>
    )
  }
  
  const Protocal=(props)=>{
  
    return(
      <div className='title-type'>
        {props.title}
        <div className='apply-type'>
          <Spin /> &nbsp;服务提供商上传协议中，请耐心等候
          <br/><br/>
          <Button type='primary'>提醒上传</Button>
        </div>
      </div>
    )
  }
  
  const Download=()=>{
    return(
      <div>
        <Button size={'middle'} style={{marginLeft: '150px'}}>
            查看详细进度
        </Button>
        <Button type="primary" size={'middle'} style={{marginLeft: '20px'}}>
            下载相关文件
        </Button>
      </div>
    )
  }
  
  // const [buttonSize,setButtonSize]=useState('large');
  const Trace=(props)=>{
    //const { size } = this.state;
    return(
      <div className='title-type'>
        {props.title}
      <div className='protocal-type' style={{width: '500px',marginLeft: '100px',fontSize:'15px'}}>
        <Steps direction="vertical" current={2}>
          <Step title="需求阶段" description="Finished." />
          <Step title="设计阶段" description="Finished" />
          <Step title="开发阶段" description={<span>In progress<Download /></span>}/>
          <Step title="测试阶段" description="Waiting" />
          <Step title="系统交付" description="Waiting" />
        </Steps>
        
      </div>
      </div>
    )
  }
  
  const Check=(props)=>{
    return(
      <div className='title-type'>
        {props.title}
        <div className='protocal-type'>
          <p style={{marginTop:'20px',fontSize:'15px'}}>
            完成度: &nbsp;
            <Rate allowHalf defaultValue={2.5} />
          </p>
          <br />
          <p style={{fontSize:'15px'}}>
            准时性: &nbsp;
            <Rate allowHalf defaultValue={2.5} />
          </p>
          <Button type="primary" style={{float:'right',marginTop:'30px',marginRight:'150px'}}>提交</Button>
        </div>
      </div>
    )
  }
  
  const Comment=(props)=>{
    const customIcons1={
      1: <FrownOutlined />,
      2: <SmileOutlined />,
    }
    return(
      <div className='title-type'>
        {props.title}
      <div className='protocal-type' >
        <p style={{marginTop:'20px',fontSize:'15px'}}>
          总体评价: &nbsp;
          <Rate allowHalf defaultValue={2.5} />
        </p>
        <br />
        <p style={{fontSize:'15px'}}>
          专业水平: &nbsp;
          <Rate allowHalf defaultValue={2.5} />
        </p>
        <br />
        <p style={{fontSize:'15px'}}>
          响应速度: &nbsp;
          <Rate allowHalf defaultValue={2.5} />
        </p>
        <br />
        <p style={{fontSize:'15px'}}>
          服务体验: &nbsp;
          <Rate allowHalf defaultValue={2.5} />
        </p>
        <p style={{fontSize:'15px'}}> 合作愉快</p>
        <Rate style={{fontSize:'30px',marginLeft:20}}defaultValue={2} character={({ index }) => customIcons1[index + 1]} />
        <TextArea showCount maxLength={100} rows={8} placeholder={'请输入对本次服务的感受和意见：'} style={{marginTop: '8px',width:'800px', margin:"0 auto"}}/>
        <Button type="primary" style={{float:'right',marginTop:'30px',marginRight:'150px'}}>提交</Button>
        <br/>
      </div>
      </div>
    )
  }
  class Advanced extends Component {
    state = {
      tabActiveKey: 'detail',
      current: 0,
      order_data:{},
      id:0,
    };
  
    async componentDidMount() {
        const { dispatch,location,profileServer } = this.props;
        const { order_id } = location.query;
        this.setState({id: order_id});
        let values = order_id;
        // dispatch({
        //   type: 'profileServer/getOrderInfo',
        //   payload:{
        //     values,
        //   }
        // });
        try {
          await queryOrder({values}).then((res)=>{
              //console.log(res.data[0]);
              //order_data = res.data[0];
              this.setState({order_data: res.data[0]})
              console.log(this.state.order_data);
          });
         // hide();
          
          return true;
        } catch (error) {
          //hide();
        
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
      const steps = [
        {
          title: '申请服务',
          content: '正在申请中',
          component: <Apply title={'正在申请中'}></Apply>
        },
        {
          title: '线下沟通',
          content: '沟通完成后，请进行评价',
          component:<Communi title={'沟通完成后，请进行评价'}></Communi>
        },
        {
          title: '签署协议',
          content: '请上传协议',
          component: <Protocal title={'请上传协议'}></Protocal>
        },
        {
          title: '服务实施',
          content: '服务实施追踪中',
          component: <Trace title={'服务实施追踪中'}></Trace>
        },
        {
          title: '服务验收',
          content: '请评价服务验收成果',
          component: <Check title={'请评价服务验收成果'}></Check>
        },
        {
          title: '服务评价',
          content: '请进行综合服务评价',
          component: <Comment title={'请进行综合服务评价'}></Comment>
        },
      ];
      const next = () => {
        this.setState({
          current: current + 1,
        });
      };
  
      const prev = () => {
        this.setState({
          current: current - 1,
        });
      };
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
              <Card
                title="流程进度"
                style={{
                  marginBottom: 24,
                }}
              >
                <RouteContext.Consumer>
                  {({ isMobile }) => (
                    <>
                      <Steps
                        direction={isMobile ? 'vertical' : 'horizontal'}
                        progressDot={customDot}
                        current={current}
                      >
                        {steps.map(item => (
                          <Step key={item.title} title={item.title} />
                        ))}
                      </Steps>
                      {/* <div className='context-type'>
                        {steps[current].content}
                      </div> */}
                      {steps[current].component}
                      {/* <Communi context={steps[current].content}></Communi> */}
                      {/* <Protocal context={steps[current].content}></Protocal> */}
                      {/* <Trace></Trace> */}
                      {/* <Comment></Comment> */}
                      {/* <Check></Check> */}
                      <div className='steps-action'>
                        {current > 0 && (
                          <Button onClick={() => prev()}>
                            上一状态
                          </Button>
                        )}
                        {current < steps.length - 1 && (
                          <Button type="primary" style={{ margin: '8px' }} onClick={() => next()}>
                            下一状态
                          </Button>
                        )}
                        {current === steps.length - 1 && (
                          <Button 
                            type="primary"
                            style={{ margin: '8px' }}
                            onClick={() => message.success('Processing complete!')}
                          >
                            完成
                          </Button>
                        )}
                      </div>
                    </>
                  )}
                </RouteContext.Consumer>
              </Card>
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