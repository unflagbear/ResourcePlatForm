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
    Spin,
    Progress,
    Alert
  } from 'antd';
  import { GridContent, PageContainer, RouteContext } from '@ant-design/pro-layout';
  import React, { Component, Fragment } from 'react';
  import classNames from 'classnames';
  import { connect } from 'umi';
  import styles from './style.less';
  import './advanced.css';
  import { FrownOutlined, MehOutlined, SmileOutlined, UploadOutlined } from '@ant-design/icons';
  import { queryOrder, nextState, communiCommend, check, comment, getprotocal, getresult, getorder} from './service';
  
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
  const Description1 = (props)=>{
    const {item} = props;
    return(
    item?<div>
    <Descriptions
      style={{
        marginBottom: 16,
      }}
      title={item.name}
      column={2}
    >
      <Descriptions.Item label="上传方">服务提供商</Descriptions.Item>
      <Descriptions.Item label="上传时间">{datetimeFormat(item.addTime)}</Descriptions.Item>
      <Descriptions.Item label="描述">协议文件</Descriptions.Item>
      <Descriptions.Item label="文件链接"><a href={"http://localhost:9870/"+item.url}> 点击下载</a></Descriptions.Item>
    </Descriptions>
    <Divider
      style={{
        margin: '16px 0',
      }}
    />
    </div> :null
  )}
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
    const {setRate, setCommtext, onClick, done} = props;
    //console.log(done);

    return( done==null?
      <div className='title-type'>
        {props.title}
        <div className='comment-type'>
          <p style={{fontSize:'15px',paddingTop: '20px'}}>沟通体验:</p>
          <Rate style={{marginTop: '5px',fontSize:'30px'}} defaultValue={3} onChange={(value)=>{setRate(value)}} character={({ index }) => customIcons[index + 1]} />
          <p style={{fontSize:'15px',marginTop: '10px'}}>对本次沟通的感受和意见:</p>
          <TextArea showCount maxLength={100} rows={8} placeholder={'请输入您的评价：'} onChange={setCommtext} style={{marginTop: '8px',width:'800px', margin:"0 auto"}}/>
          <Button type="primary" style={{float:'right',marginRight:'230px' }} onClick={onClick}>{'提交'}</Button>
        </div>
      </div>:
       <div className='title-type'>
        {"评价已提交"}
        <div className='apply-type'>
            <Spin /> &nbsp;服务提供商提交评价中，请耐心等候
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
          <Button type='primary' onClick={()=>{message.success("提醒已发送")}} >提醒上传</Button>
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
  
function datetimeFormat(longTypeDate){  
    return new Date(parseInt(longTypeDate) ).toLocaleString().replace(/:\d{1,2}$/,' ');     
} 
  // const [buttonSize,setButtonSize]=useState('large');
  const Trace=(props)=>{
    //const { size } = this.state;

    const {item} = props;
    return(
      <div className='title-type'>
        {props.title}
      <div className='protocal-type' style={{fontSize:'15px'}}>
        <Card
            style={{
              width: '80%',
              marginLeft: '8%',
            }}
            headStyle={{textAlign: 'left'}}
            type="inner"
            bordered={true}
            title={'服务实施任务'}
          >
          <Descriptions
            style={{
            marginBottom: 16,
            }}
            title={'服务名称'+name}
            column={2}
            >
            {/* <Descriptions.Item label="服务名称">服务提供商</Descriptions.Item> */}
            <Descriptions.Item label="开始时间">{datetimeFormat(item.start)}</Descriptions.Item>
            <Descriptions.Item label="预计完成时间">{datetimeFormat(item.end)}</Descriptions.Item>
            <Descriptions.Item label="工作目标" span={2} style={{textAlign: 'left'}}>{item.goal}</Descriptions.Item>
            <Descriptions.Item label="预计成果" span={2}>{item.result}</Descriptions.Item>
          </Descriptions>
          <Alert
            closable
            showIcon
            message="服务提供商提交服务成果后，可进入服务验收阶段。"
            style={{ marginBottom: 4 , width:'50%'}}
            />
        </Card>
      </div>
      </div>
    )
  }
  
  const Check=(props)=>{
    const {setComple, setPunct, onClick} = props;
    return(
      <div className='title-type'>
        {props.title}
        <div className='protocal-type'>
          <p style={{marginTop:'20px',fontSize:'15px'}}>
            完成度: &nbsp;
            <Rate defaultValue={3} onChange={(value)=>{setComple(value)}}/>
          </p>
          <br />
          <p style={{fontSize:'15px'}}>
            准时性: &nbsp;
            <Rate defaultValue={3} onChange={(value)=>{setPunct(value)}}/>
          </p>
          <Button type="primary" style={{float:'right',marginTop:'30px',marginRight:'150px'}} onClick={onClick}>提交</Button>
        </div>
      </div>
    )
  }
  
  const Comment=(props)=>{
    const customIcons1={
      1: <FrownOutlined />,
      2: <SmileOutlined />,
    }
    const {setComment, setProf, setSpeed,setExper, setFeel,setCommtext, onClick, done} = props;
    return(done==null?
      <div className='title-type'>
        {props.title}
      <div className='protocal-type' >
        <p style={{marginTop:'20px',fontSize:'15px'}}>
          总体评价: &nbsp;
          <Rate  defaultValue={3} onChange={(value)=>{setComment(value)}} />
        </p>
        <br />
        <p style={{fontSize:'15px'}}>
          专业水平: &nbsp;
          <Rate defaultValue={3} onChange={(value)=>{setProf(value)}}/>
        </p>
        <br />
        <p style={{fontSize:'15px'}}>
          响应速度: &nbsp;
          <Rate defaultValue={3} onChange={(value)=>{setSpeed(value)}}/>
        </p>
        <br />
        <p style={{fontSize:'15px'}}>
          服务体验: &nbsp;
          <Rate defaultValue={3} onChange={(value)=>{setExper(value)}}/>
        </p>
        <p style={{fontSize:'15px'}}> 合作愉快</p>
        <Rate style={{fontSize:'30px',marginLeft:20}}defaultValue={2} onChange={(value)=>{setFeel(value)}}character={({ index }) => customIcons1[index + 1]} />
        <TextArea showCount maxLength={100} rows={8} placeholder={'请输入对本次服务的感受和意见：'} onChange={setCommtext} style={{marginTop: '8px',width:'800px', margin:"0 auto"}}/>
        <Button type="primary" onClick = {onClick} style={{float:'right',marginTop:'30px',marginRight:'150px'}}>提交</Button>
        <br/>
      </div>
      </div>:
      <div className='title-type'>
        {"评价已提交"}
        <div className='apply-type'>
            {/* <Progress type="circle" percent={100} width={70} /> &nbsp;评价已提交，订单完成 */}
            <Spin /> &nbsp;服务商提交评价中，请耐心等候
        </div>
        </div>    
    )
  }
  class Advanced extends Component {
    state = {
      tabActiveKey: 'detail',
      current: 0,
      order_data:{},
      protocalfileInfo:[],
      tracefileInfo:[],
      resultfileInfo:[],
      id:0,
      rate:0,
      comm_text:'',
      comment:0,
      prof:0,
      speed:0,
      exper:0,
      feel:0,
      comple:0,
      punct:0,
      communiDone:null,
      commentDone:null,
      isDone: 0,
      task:{},
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
          await getprotocal({values}).then((res)=>{
            this.setState({protocalfileInfo:res.data});
          });
          //console.log('dwef');
        //   await gettrace({values}).then((res)=>{
        //       console.log('dwef');
        //     this.setState({tracefileInfo:res.data});
        //   });
        //   console.log('swef');
        //   await getresult({values}).then((res)=>{
        //     this.setState({resultfileInfo:res.data});
        //   });
          await getorder(values).then((res)=>{
            this.setState({task:{name:res.data.taskName, start:res.data.startDate, end:res.data.endDate, goal:res.data.taskGoal, result:res.data.taskResult}});
            //console.log(this.state.task);
        });
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

    setRate=(value)=>{
        //console.log(value);
        this.setState({rate:value});
      }
    
      setCommtext=(e)=>{
        //console.log(e.target.value);
        this.setState({comm_text: e.target.value});
      }
    
      setComment = (value)=>{
        this.setState({comment:value});
      }
      setProf = (value)=>{
        this.setState({prof:value});
      }
      setSpeed = (value)=>{
        this.setState({speed:value});
      }
      setExper = (value)=>{
        this.setState({exper:value});
      }
    
      setFeel = (value) => {
        this.setState({feel:value});
      }

      setComple = (value) => {
        this.setState({comple:value});
      }

      setPunct = (value) => {
        this.setState({punct:value});
      }
    
      communiSubmit = async()=>{
        let values = {order_id: this.state.id, state:this.state.current,rate: this.state.rate, text: this.state.comm_text};
        //console.log(values);
        try {
          await communiCommend({values}).then((res)=>{  
            this.setState({
                current: res.data.state,
                communiDone: res.data.done,
              });    
          });
          return true;
        } catch (error) {
          return false;
        }
      }

      checkSubmit = async()=>{
        let values = {order_id: this.state.id, state:this.state.current,comple: this.state.comple, punct: this.state.punct};
        try {
          await check({values}).then((res)=>{  
            this.setState({
                current: this.state.current+1,
              });   
          });
          return true;
        } catch (error) {
          return false;
        }
      }
    
      commentSubmit = async()=>{
        let values = {order_id: this.state.id, state:this.state.current,comment: this.state.comment, prof:this.state.prof, speed:this.state.speed, exper: this.state.exper, feel: this.state.feel, text: this.state.comm_text};
        try {
          await comment({values}).then((res)=>{  
            if(res.data==true){

                message.success("评价提交成功");
            }
            this.setState({
                commentDone: 1,
              });     
          });
          return true;
        } catch (error) {
          return false;
        }
      }
  
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
          component:<Communi title={'沟通完成后，请进行评价'} setRate ={this.setRate.bind(this)} setCommtext = {this.setCommtext.bind(this)} onClick = {this.communiSubmit.bind(this)} done = {this.state.communiDone}></Communi>
        },
        {
          title: '签署协议',
          content: '请上传协议',
          component: <Protocal title={'请上传协议'}></Protocal>
        },
        {
          title: '服务实施',
          content: '服务实施追踪中',
          component: <Trace title={'服务实施追踪中'} item={this.state.task}></Trace>
        },
        {
          title: '服务验收',
          content: '请评价服务验收成果',
          component: <Check title={'请评价服务验收成果'} setComple ={this.setComple.bind(this)} setPunct = {this.setPunct.bind(this)} onClick = {this.checkSubmit.bind(this)}></Check>
        },
        {
          title: '服务评价',
          content: '请进行综合服务评价',
          component: <Comment title={'请进行综合服务评价'} setComment = {this.setComment.bind(this)} setProf = {this.setProf.bind(this)} setSpeed = {this.setSpeed.bind(this)} setExper = {this.setExper.bind(this)} setFeel = {this.setFeel.bind(this)} setCommtext = {this.setCommtext.bind(this)} onClick = {this.commentSubmit.bind(this)} done = {this.state.commentDone}></Comment>
        },
      ];
      const next = async() => {
        this.setState({
          current: current + 1,
        });
        let values={order_id: this.state.id, state: current+1};
      try {
        await nextState({values}).then((res)=>{     
        });
        return true;
      } catch (error) {
        return false;
      }
      };
  
      const prev = async() => {
        this.setState({
          current: current - 1,
        });
        let values={order_id: this.state.id, state: current-1};
        try {
            await nextState({values}).then((res)=>{     
            });
            return true;
        } catch (error) {
            return false;
        }
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
            {this.state.isDone==0?
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
              </Card>:
              <div />}
              <Card
              title="项目文件"
              style={{
                marginBottom: 24,
              }}
              bordered={false}
            >
              <Card type="inner" title="协议文件">
                  {
                    this.state.protocalfileInfo!=null?
                    this.state.protocalfileInfo.map((value)=>{
                      console.log(value);
                      return <Description1 item={value}/>
                    }):<div />
                  }
              </Card>
              <Card type="inner" title="服务实施阶段文件">
                  {
                    this.state.tracefileInfo!=null?
                    this.state.tracefileInfo.map((value)=>{
                      console.log(value);
                      return <Description1 item={value}/>
                    }):<div />
                  }
              </Card>
              <Card type="inner" title="成果提交阶段文件">
                  {
                    this.state.resultfileInfo!=null?
                    this.state.resultfileInfo.map((value)=>{
                      console.log(value);
                      return <Description1 item={value}/>
                    }):<div />
                  }
              </Card>
            </Card>
            <Card
              title="沟通记录"
              style={{
                marginBottom: 24,
              }}
              bordered={false}
            >
              <Empty />
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