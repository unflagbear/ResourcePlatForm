import {Form, Button, Col, Input, Popover, Progress, Row, Select, message, InputNumber, Cascader} from 'antd';
import React, { useState, useEffect } from 'react';
import {Link, connect, history, useLocation} from 'umi';
import styles from './style.less';
import data from '@/utils/classify/classifyNew.json'
import {CURRENT} from "@/components/Authorized/renderAuthorize";
import {modify} from "@/utils/classify/modify";

const FormItem = Form.Item;
const { Option } = Select;
const InputGroup = Input.Group;
const passwordStatusMap = {
  ok: <div className={styles.success}>强度：强</div>,
  pass: <div className={styles.warning}>强度：中</div>,
  poor: <div className={styles.error}>强度：太短</div>,
};
const passwordProgressMap = {
  ok: 'success',
  pass: 'normal',
  poor: 'exception',
};

const PlatformRegister = ({ submitting, dispatch, platformAndregister }) => {
  const [count, setcount] = useState(0);
  const [visible, setvisible] = useState(false);
  const [prefix, setprefix] = useState('86');
  const [popover, setpopover] = useState(false);
  const confirmDirty = false;
  const location = useLocation();
  const options =[];
  const classifyData = modify(data.科技服务资源);
  const { TextArea } = Input;
  const [account, setaccount]=useState(location.state.account)
  let optionS="";

  let interval;
  const [form] = Form.useForm();
  useEffect(() => {
    if (!platformAndregister) {
      return;
    }
    Object.keys(classifyData).forEach(key => {
      const befor = []
      Object.keys(classifyData[key]).forEach((num,item)=>{

        const child=[]
        if(typeof classifyData[key][num] === "object"){
          Object.keys(classifyData[key][num]).forEach(subitem=>{
            child.push({value:subitem,label:subitem})
          })
        }
        befor.push({value:num,label:num,children:child})
        // console.log(classifyData[key][num])
      })
      options.push({value:key,label:key,children:befor})
      // console.log(items)
    })

    console.log(account);
    if (platformAndregister.status === 'ok') {
      message.success('注册成功！');
      history.push({
        pathname: '/user/register-result',
        state: {
          account,
        },
      });
    }
  }, [platformAndregister]);
  useEffect(
    () => () => {
      clearInterval(interval);
    },
    [],
  );

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  }


  const onGetCaptcha = () => {
    let counts = 59;
    setcount(counts);
    interval = window.setInterval(() => {
      counts -= 1;
      setcount(counts);

      if (counts === 0) {
        clearInterval(interval);
      }
    }, 1000);
  };

  const getPasswordStatus = () => {
    const value = form.getFieldValue('password');

    if (value && value.length > 9) {
      return 'ok';
    }

    if (value && value.length > 5) {
      return 'pass';
    }

    return 'poor';
  };

  const onFinish = (values) => {
    console.log(values)
    optionS=values.serviceType[0]+"/"+values.serviceType[1];
    dispatch({
      type: 'platformAndregister/submit',
      payload: { ...values ,userAccount:account, serviceType:optionS},
    });
  };









  const renderPasswordProgress = () => {
    const value = form.getFieldValue('password');
    const passwordStatus = getPasswordStatus();
    return value && value.length ? (
      <div className={styles[`progress-${passwordStatus}`]}>
        <Progress
          status={passwordProgressMap[passwordStatus]}
          className={styles.progress}
          strokeWidth={6}
          percent={value.length * 10 > 100 ? 100 : value.length * 10}
          showInfo={false}
        />
      </div>
    ) : null;
  };
  return (
    <>
      <div className={styles.main}>
        <h3>平台注册</h3>
        <Form  form={form} name="UserRegister" onFinish={onFinish} layout="vertical">
          <FormItem
            label="邮箱"
            name="mail"
            rules={[
              {
                required: true,
                message: '请输入邮箱地址！',
              },
              {
                type: 'email',
                message: '邮箱地址格式错误！',
              },
            ]}
          >
            <Input size="large" />
          </FormItem>
          <FormItem
            label="平台名称"
            name="name"
            rules={[
              {
                required: true,
                message: '请输入平台名称！',
              },
              {
                type: 'string',
                message: '请输入平台名称！！',
              },
            ]}
          >
            <Input size="large" />
          </FormItem>
          <FormItem
            label="平台URL"
            name="url"
            rules={[
              {
                required: true,
                message: '请输入平台URL！',
              },
              {
                type: 'url',
                message: 'URL格式错误！',
              },
            ]}
          >
            <Input size="large"  />
          </FormItem>
          <FormItem
            label="平台联系地址"
            name="address"
            rules={[
              {
                type: 'string',
                message: '请输入合法地址！',
              },
            ]}
          >
            <Input size="large"  />
          </FormItem>
          <FormItem
            label="平台服务类型"
            name="serviceType"

            rules={[
              {
                required: true,
                message: '请选择平台服务类型！',
              },
            ]}
          >
            <Cascader options={options}    size="large"/>
          </FormItem>
          <FormItem
            label="服务描述"
            name="serviceDesc"
            rules={[
              {
                required:true,
                type: 'string',
                message: '请输入服务描述！',
              },
            ]}
          >
            <TextArea rows={4}  />
          </FormItem>
          <FormItem
            label="平台注册地址"
            name="registrationAddress"
            rules={[
              {
                type: 'string',
                message: '请输入平台注册地址！',
              },
            ]}
          >
            <Input size="large"  />
          </FormItem>
          <FormItem
            label="人员规模"
            name="staffSize"
            rules={[
              {
                type: 'integer',
                message: '请输入数值！',
              },
            ]}
          >
            <InputNumber
              style={{
                width: '100%',
              }}
              min={1}
              max={10000}
              placeholder="请输入数值"
              size="large"
            />
          </FormItem>
          <FormItem
            label="平台法人代表"
            name="legalRepresentative"
            rules={[
              {
                type: 'string',
                message: '请输入平台法人代表！',
              },
            ]}
          >
            <Input size="large"  />
          </FormItem>
          <Form.Item label="验证码:" >
            <Row gutter={8}>
              <Col span={12}>
                <Form.Item
                  name="captcha"
                  rules={[
                    {
                      required: true,
                      message: '请输入验证码！',
                    },
                  ]}
                >
                  <Input size="large" placeholder="验证码" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Button
                  size="large"
                  disabled={!!count}
                  className={styles.getCaptcha}
                  onClick={onGetCaptcha}
                >
                  {count ? `${count} s` : '获取验证码'}
                </Button>
              </Col>
            </Row>
          </Form.Item>
          <FormItem>
            <Button
              size="large"
              loading={submitting}
              className={styles.submit}
              type="primary"
              htmlType="submit"
            >
              注册
            </Button>
            <Link className={styles.login} to="/user/login">
              使用已有账户登录
            </Link>
          </FormItem>
        </Form>
      </div>
    </>
  );
};

export default connect(({ platformAndregister, loading }) => ({
  platformAndregister,
  submitting: loading.effects['platformAndregister/submit'],
}))(PlatformRegister);
