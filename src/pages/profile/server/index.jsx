import { DownOutlined, EllipsisOutlined, InfoCircleOutlined } from '@ant-design/icons';
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
  Progress,
  Input,
  Upload,
  Spin,
  InputNumber,
  DatePicker,
  Form,
} from 'antd'; // import {View,Text} from "react-native";

import { GridContent, PageContainer, RouteContext } from '@ant-design/pro-layout';
import React, { Component, Fragment, useState } from 'react';
import classNames from 'classnames';
import { connect, useLocation, formatMessage, FormattedMessage } from 'umi';
import styles from './style.less';
import './advanced.css';
import { FrownOutlined, MehOutlined, SmileOutlined, UploadOutlined } from '@ant-design/icons';
import Layout from 'antd/lib/layout/layout';
import Sider from 'antd/lib/layout/Sider';
import { history } from 'umi';
import BasicForms from './components/BasicForm';
import {
  queryOrder,
  nextState,
  communiCommend,
  comment,
  upload,
  uploadAll,
  getprotocal,
  gettrace,
  getresult,
  cancleOrder,
  trace,
} from './service';

const { Step } = Steps;
const { TextArea } = Input;
const { RangePicker } = DatePicker;
const ButtonGroup = Button.Group;
const FormItem = Form.Item;
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
  defaultFileList: [
  ],
}; 

const extra = (
  <div className={styles.moreInfo}>
    <Statistic title="状态" value="待审批" />
    <Statistic title="订单金额" value={568.08} prefix="¥" />
  </div>
);

function datetimeFormat(longTypeDate) {
  return new Date(parseInt(longTypeDate)).toLocaleString().replace(/:\d{1,2}$/, ' ');
}

const description = (item) =>
  item ? (
    <RouteContext.Consumer>
      {({ isMobile }) => (
        <Descriptions className={styles.headerList} size="small" column={isMobile ? 1 : 2}>
          <Descriptions.Item label="创建人">{item.name}</Descriptions.Item>
          <Descriptions.Item label="订购产品">{item.service}</Descriptions.Item>
          <Descriptions.Item label="创建时间">{datetimeFormat(item.createTime)}</Descriptions.Item>
          <Descriptions.Item label="联系电话">{item.phone}</Descriptions.Item>
          <Descriptions.Item label="生效日期">{item.cycle}</Descriptions.Item>
          <Descriptions.Item label="备注">{item.note}</Descriptions.Item>
        </Descriptions>
      )}
    </RouteContext.Consumer>
  ) : null;

const Description1 = (props) => {
  const { item } = props;
  return item ? (
    <div>
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
        <Descriptions.Item label="文件链接">
          <a href={`http://localhost:9870/${item.url}`}> 点击下载</a>
        </Descriptions.Item>
      </Descriptions>
      <Divider
        style={{
          margin: '16px 0',
        }}
      />
    </div>
  ) : null;
};

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

const Apply = (props) => {
  const { next, cancle } = props;
  return (
    <div className="title-type">
      {props.title}
      <div className="apply-type">
        <Button
          style={{
            float: 'left',
            marginLeft: '42%',
          }}
          onClick={cancle}
        >
          拒绝申请
        </Button>
        <Button
          style={{
            float: 'right',
            marginRight: '42%',
          }}
          onClick={next}
          type="primary"
        >
          同意申请
        </Button>
        {/* <Spin /> &nbsp;服务提供商处理申请中，请耐心等候 */}
      </div>
    </div>
  );
};

const Communi = (props) => {
  const customIcons = {
    1: <FrownOutlined />,
    2: <FrownOutlined />,
    3: <MehOutlined />,
    4: <SmileOutlined />,
    5: <SmileOutlined />,
  };
  const { setRate, setCommtext, onClick, done } = props; // console.log(done);

  return done == null ? (
    <div className="title-type">
      {props.title}
      <div className="comment-type">
        <p
          style={{
            fontSize: '15px',
            paddingTop: '20px',
          }}
        >
          沟通体验:
        </p>
        <Rate
          style={{
            fontSize: '30px',
          }}
          defaultValue={3}
          onChange={(value) => {
            setRate(value);
          }}
          character={({ index }) => customIcons[index + 1]}
        />
        <p
          style={{
            fontSize: '15px',
            marginTop: '15px',
          }}
        >
          对本次沟通的感受和意见:
        </p>
        <TextArea
          showCount
          maxLength={100}
          rows={8}
          placeholder={'请输入您的评价：'}
          onChange={setCommtext}
          style={{
            marginTop: '8px',
            width: '800px',
            margin: '0 auto',
          }}
        />
        <Button
          type="primary"
          style={{
            float: 'right',
            marginRight: '230px',
          }}
          onClick={onClick}
        >
          {'提交'}
        </Button>
      </div>
    </div>
  ) : (
    <div className="title-type">
      {'评价已提交'}
      <div className="apply-type">
        <Spin /> &nbsp;客户提交评价中，请耐心等候
      </div>
    </div>
  );
};

const Protocal = (props) => {
  const { SetFilelist, protocalSubmit } = props;
  return (
    <div className="title-type">
      {props.title}
      <div
        className="protocal-type"
        style={{
          width: '500px',
          margin: '0 auto',
          fontSize: '15px',
        }}
      >
        请选择需要上传的文件或图片
        <br />
        <br />
        <Upload
          {...param}
          onChange={({ file, fileList }) => {
            if (file.status !== 'uploading') {
              console.log(file, fileList);
              SetFilelist(fileList);
            }
          }} // action = {async(file)=>{
          //   console.log(file);
          //   await uploadAll(file).then((res)=>{
          // }); }}
        >
          <Button icon={<UploadOutlined />}>选择文件</Button>
        </Upload>
        <br />
        {/* <Button style={{float:'left',marginLeft:'15px'}}>{'终止服务'}</Button> */}
        <Button
          type="primary"
          style={{
            float: 'right',
            marginRight: '20px',
          }}
          onClick={protocalSubmit}
        >
          {'上传协议'}
        </Button>
      </div>
    </div>
  );
};

const Process = (props) => {
  return (
    <div>
      <GridContent>
        <Card
          title="详细进度"
          style={{
            marginLeft: 0,
            width: '100%',
          }}
          headStyle={{
            textAlign: 'left',
          }}
        >
          预计完成时间&nbsp;&nbsp;
          <Input
            style={{
              width: 200,
            }}
          />
          &nbsp;&nbsp;&nbsp;&nbsp;
          <Button>提交</Button>
          <br />
          <br />
          <div
            className="protocal-type"
            style={{
              width: '500px',
              margin: '0 auto',
              fontSize: '15px',
            }}
          >
            请选择需要上传的文件或图片
            <br />
            <br />
            <Upload {...param}>
              <Button icon={<UploadOutlined />}>选择文件</Button>
            </Upload>
            <br />
            {/* <Button style={{float:'left',marginLeft:'15px'}}>{'终止服务'}</Button> */}
            <Button
              type="primary"
              style={{
                float: 'right',
                marginRight: '20px',
              }}
            >
              {'上传相关文件'}
            </Button>
          </div>
          <br />
          <br />
          <Button
            size={'middle'}
            style={{
              float: 'left',
            }}
          >
            延期
          </Button>
        </Card>
      </GridContent>
    </div>
  );
};

const Trace = (props) => {
  const { order_id ,next} = props;
  const [form] = Form.useForm();

  const onFinsh = async(value) => {
    console.log(value);
    const values={order_id:order_id, name:value.name, start:value.date[0]._d, end:value.date[1]._d, goal: value.goal, result: value.result };
    await trace(values).then((res)=>{
      if(res.data=="success"){
        message.success("提交成功");
        next();
      }
    });
  };

  const onFinishFailed = () => {
    console.log('Failed', errorInfo);
  };

  const submitFormLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 10,
        offset: 7,
      },
    },
  };
  return (
    <div className="title-type">
      {props.title}
      <div
        style={{
          height: 600,
          padding: 0,
        }}
      >
        <div
          className="protocal-type"
          style={{
            marginLeft: '150px',
            fontSize: '15px',
          }}
        >
          <Card
            style={{
              width: '70%',
              marginLeft: '10%',
            }}
            bordered={true}
            title={'服务实施阶段信息收集'}
          >
            <Form form={form} onFinish={onFinsh} onFinishFailed={onFinishFailed}>
              <FormItem label="服务名称" name='name'>
                <Input
                  style={{
                    width: '40%',
                  }}
                  placeholder="请输入你所提供的服务"
                />
              </FormItem>

              <FormItem label="起止日期" name='date'>
                <RangePicker
                  style={{
                    width: '40%',
                  }}
                  placeholder={['开始日期', '结束日期']}
                />
              </FormItem>
              <FormItem label="工作目标" name='goal'>
                <TextArea
                  style={{
                    minHeight: 32,
                    width: '40%',
                  }}
                  placeholder="请输入你的阶段性工作目标"
                  rows={4}
                />
              </FormItem>
              <FormItem label="预计成果" name='result'>
                <TextArea
                  style={{
                    minHeight: 32,
                    width: '40%',
                  }}
                  placeholder="请输入成果交付物名称"
                  rows={4}
                />
              </FormItem>
              <Button style={{
                  marginTop: 22,
                  float: 'right',
                  marginRight: '10%',
                }}
                  type="primary"
                  onClick={() => {
                    form.submit();
                  }}
                >
                  提交
                </Button>
              {/* <FormItem
                {...submitFormLayout}
                style={{
                  marginTop: 22,
                  float: 'right',
                  marginRight: '10%',
                }}
              >
                <Button
                  type="primary"
                  onClick={() => {
                    form.submit();
                  }}
                >
                  提交
                </Button>
              </FormItem> */}
            </Form>
          </Card>
        </div>

        <br />
      </div>
    </div>
  );
};

const ResultSubmit = (props) => {
  const { SetFilelist, resultSubmit, done } = props;
  return done == null ? (
    <div className="title-type">
      {props.title}
      <div
        className="protocal-type"
        style={{
          width: '500px',
          margin: '0 auto',
          fontSize: '15px',
        }}
      >
        请选择需要上传的文件或图片
        <br />
        <br />
        <Upload
          {...param}
          onChange={({ file, fileList }) => {
            if (file.status !== 'uploading') {
              console.log(file, fileList);
              SetFilelist(fileList);
            }
          }}
        >
          <Button icon={<UploadOutlined />}>选择文件</Button>
        </Upload>
        <br />
        {/* <Button style={{float:'left',marginLeft:'15px'}}>{'终止服务'}</Button> */}
        <Button
          type="primary"
          style={{
            float: 'right',
            marginRight: '20px',
          }}
          onClick={resultSubmit}
        >
          上传文件
        </Button>
      </div>
    </div>
  ) : (
    <div className="title-type">
      {'成果已提交'}
      <div className="apply-type">
        {/* <Progress type="circle" percent={100} width={70} /> &nbsp;评价已提交，订单完成 */}
        <Spin /> &nbsp;客户验收中，请耐心等候
      </div>
    </div>
  );
};

const Comment = (props) => {
  const customIcons1 = {
    1: <FrownOutlined />,
    2: <SmileOutlined />,
  };
  const { setComment, setFeel, onClick, done } = props;
  return done == null ? (
    <div className="title-type">
      {props.title}
      <div className="protocal-type">
        <p
          style={{
            marginTop: '20px',
            fontSize: '15px',
          }}
        >
          总体评价: &nbsp;
          <Rate
            defaultValue={3}
            onChange={(value) => {
              setComment(value);
            }}
          />
        </p>
        <p
          style={{
            fontSize: '15px',
          }}
        >
          {' '}
          合作愉快
        </p>
        <div
          style={{
            marginLeft: 20,
          }}
        >
          <Rate
            style={{
              fontSize: '30px',
            }}
            defaultValue={2}
            onChange={(value) => {
              setFeel(value);
            }}
            character={({ index }) => customIcons1[index + 1]}
          />
        </div>
        <Button
          type="primary"
          onClick={()=>this.communiSubmit}
          style={{
            float: 'right',
            marginTop: '30px',
            marginRight: '240px',
          }}
        >
          提交
        </Button>
        <br />
      </div>
    </div>
  ) : (
    <div className="title-type">
      评价已提交
      <div className="apply-type">
        {/* <Progress type="circle" percent={100} width={70} /> &nbsp;评价已提交，订单完成 */}
        <Spin /> &nbsp;客户提交评价中，请耐心等候
      </div>
    </div>
  );
}; // const location = useLocation();
// const { order_id } = location.query;

class Advanced extends Component {
  state = {
    tabActiveKey: 'detail',
    current: 0,
    order_data: {},
    protocalfileInfo: [],
    tracefileInfo: [],
    resultfileInfo: [],
    id: 0,
    rate: 0,
    comm_text: '',
    comment: 0,
    feel: 0,
    communiDone: null,
    commentDone: null,
    resultDone: null,
    fileList: [],
    isDone: 0,
    hideProcess: false,
    isMobile: false,
  };

  async componentDidMount() {
    const { dispatch, location, profileServer } = this.props;
    const { order_id, state, is_done } = location.query; // console.log(is_done);
    // console.log(componentDidMount)
    this.setState({
      id: order_id,
      current: state,
      isDone: is_done,
    });

    if (state != 0) {
      this.setState({
        hideProcess: true,
        isMobile: true,
      });
    }

    const values = order_id;

    try {
      await queryOrder({
        values,
      }).then((res) => {
        this.setState({
          order_data: res.data[0],
          communiDone: res.data[0].communiDone,
          resultDone: res.data[0].resultDone,
        });
      });
      await getprotocal({
        values,
      }).then((res) => {
        this.setState({
          protocalfileInfo: res.data,
        });
      });
      await gettrace({
        values,
      }).then((res) => {
        this.setState({
          tracefileInfo: res.data,
        });
      });
      await getresult({
        values,
      }).then((res) => {
        this.setState({
          resultfileInfo: res.data,
        });
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

  setRate = (value) => {
    // console.log(value);
    this.setState({
      rate: value,
    });
  };

  setCommtext = (e) => {
    // console.log(e.target.value);
    this.setState({
      comm_text: e.target.value,
    });
  };

  setComment = (value) => {
    this.setState({
      comment: value,
    });
  };

  setFeel = (value) => {
    this.setState({
      feel: value,
    });
  };

  communiSubmit = async () => {
    const values = {
      order_id: this.state.id,
      state: this.state.current,
      rate: this.state.rate,
      text: this.state.comm_text,
    }; // console.log(values);

    try {
      await communiCommend({
        values,
      }).then((res) => {
        message.success('评价提交成功');
        this.setState({
          current: res.data.state,
          communiDone: 1,
        });
      });
      return true;
    } catch (error) {
      return false;
    }
  };

  SetFilelist = (fileList) => {
    this.setState({
      fileList,
    });
  };

  protocalSubmit = async () => {
    // console.log(this.state.fileList);
    await uploadAll(this.state.fileList).then(async (res) => {
      if ((res.status = 'ok')) {
        message.success('文件上传成功');
        this.setState({
          current: this.state.current + 1,
        });
        const values = {
          order_id: this.state.id,
          state: this.state.current + 1,
          type: 0,
          data: res.data,
        };
        console.log(values);
        await upload(values).then((res) => {});
      }
    });
  };

  commentSubmit = async () => {
    const values = {
      order_id: this.state.id,
      state: this.state.current,
      comment: this.state.comment,
      feel: this.state.feel,
    };

    try {
      await comment({
        values,
      }).then((res) => {
        if (res.data == true) {
          message.success('评价提交成功');
        }

        this.setState({
          commentDone: 1,
        });
      });
      return true;
    } catch (error) {
      return false;
    }
  };

  resultSubmit = async () => {
    // console.log(this.state.fileList);
    await uploadAll(this.state.fileList).then(async (res) => {
      if ((res.status = 'ok')) {
        message.success('文件上传成功');
        this.setState({
          resultDone: 1,
        });
        const values = {
          order_id: this.state.id,
          state: this.state.current + 1,
          type: 2,
          data: res.data,
        }; // console.log(values);

        await upload(values).then((res) => {});
      }
    });
  };

  nextp = async () => {
    this.setState({
      current: this.state.current + 1,
      hideProcess: true,
    });
    const values = {
      order_id: this.state.id,
      state: this.state.current + 1,
    };
    try {
      await nextState({
        values,
      }).then((res) => {});
      return true;
    } catch (error) {
      return false;
    }
  }; 
  render() {

    const { current, tabActiveKey } = this.state;

    const steps = [
      {
        title: '申请服务',
        content: '处理申请',
        component: <Apply title={'处理申请'}></Apply>,
      },
      {
        title: '线下沟通',
        content: '沟通完成后，请进行评价',
        component: (
          <Communi
            title={'沟通完成后，请进行评价'}
            setRate={this.setRate.bind(this)}
            setCommtext={this.setCommtext.bind(this)}
            // onClick={this.communiSubmit.bind(this)}
            done={this.state.communiDone}
          ></Communi>
        ),
      },
      {
        title: '签署协议',
        content: '请上传协议',
        component: (
          <Protocal
            title={'请上传协议'}
            SetFilelist={this.SetFilelist.bind(this)}
            protocalSubmit={this.protocalSubmit.bind(this)}
          ></Protocal>
        ),
      },
      {
        title: '服务实施',
        content: '服务实施阶段',
        component: <Trace title={'服务实施追踪中'} order_id={this.state.id} next={this.nextp.bind(this)}></Trace>,
      },
      {
        title: '成果提交',
        content: '请提交服务成果',
        component: (
          <ResultSubmit
            title={'请提交服务成果'}
            SetFilelist={this.SetFilelist.bind(this)}
            resultSubmit={this.resultSubmit.bind(this)}
            done={this.state.resultDone}
          ></ResultSubmit>
        ),
      },
      {
        title: '服务评价',
        content: '请提交服务评价',
        component: (
          <Comment
            title={'请提交服务评价'}
            setComment={this.setComment.bind(this)}
            setFeel={this.setFeel.bind(this)}
            onClick={this.commentSubmit.bind(this)}
            done={this.state.commentDone}
          ></Comment>
        ),
      },
    ];

    const next = async () => {
      this.setState({
        current: current + 1,
        hideProcess: true,
        isMobile: true,
      });

      const values = {
        order_id: this.state.id,
        state: current + 1,
      };

      try {
        await nextState({
          values,
        }).then((res) => {});
        return true;
      } catch (error) {
        return false;
      }
    };

    const prev = async () => {
      this.setState({
        current: current - 1,
      });
      const values = {
        order_id: this.state.id,
        state: current - 1,
      };

      try {
        await nextState({
          values,
        }).then((res) => {});
        return true;
      } catch (error) {
        return false;
      }
    };

    const cancle = async () => {
      this.setState({
        isDone: -1,
      });
      const values = {
        order_id: this.state.id,
      };
      await cancleOrder({
        values,
      }).then((res) => {});
      history.push({
        pathname: '/profile_server/sOrderDone/',
      });
    };

    const action = ({ isMobile }) => {
      return (
        <RouteContext.Consumer>
          {() => {
            console.log(isMobile);

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
                  <Button
                    onClick={() => {
                      next();
                      message.success('请求通过，进入线下沟通环节');
                    }}
                  >
                    通过请求
                  </Button>
                  <Button onClick={cancle}>拒绝请求</Button>
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
    };

    return (
      <PageContainer
        title={`资源服务单号：${this.state.id}`}
        extra={action({
          isMobile: this.state.isMobile,
        })}
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
            {this.state.isDone == 0 ? (
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
                        {steps.map((item) => (
                          <Step key={item.title} title={item.title} />
                        ))}
                      </Steps>
                      {/* <div className='context-type'>
                   {steps[current].content}
                  </div> */}
                      {this.state.hideProcess ? steps[current].component : <div></div>}
                      <div className="steps-action">
                        {current > 0 && <Button onClick={() => prev()}>上一状态</Button>}
                        {current < steps.length - 1 && (
                          <Button
                            type="primary"
                            style={{
                              margin: '8px',
                            }}
                            onClick={next}
                          >
                            下一状态
                          </Button>
                        )}
                        {current === steps.length - 1 && (
                          <Button
                            type="primary"
                            style={{
                              margin: '8px',
                            }}
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
            ) : (
              <div />
            )}
            <Card
              title="项目文件"
              style={{
                marginBottom: 24,
              }}
              bordered={false}
            >
              <Card type="inner" title="协议文件">
                {this.state.protocalfileInfo != null ? (
                  this.state.protocalfileInfo.map((value) => {
                    console.log(value);
                    return <Description1 item={value} />;
                  })
                ) : (
                  <div />
                )}
              </Card>
              <Card type="inner" title="服务实施阶段文件">
                {this.state.tracefileInfo != null ? (
                  this.state.tracefileInfo.map((value) => {
                    console.log(value);
                    return <Description1 item={value} />;
                  })
                ) : (
                  <div />
                )}
              </Card>
              <Card type="inner" title="成果提交阶段文件">
                {this.state.resultfileInfo != null ? (
                  this.state.resultfileInfo.map((value) => {
                    console.log(value);
                    return <Description1 item={value} />;
                  })
                ) : (
                  <div />
                )}
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

export default connect(({ profileServer }) => ({
  profileServer,

}))(Advanced);
