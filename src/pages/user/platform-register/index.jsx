import {Form, Button, Col, Input, Popover, Progress, Row, Select, message, InputNumber} from 'antd';
import React, { useState, useEffect } from 'react';
import { Link, connect, history } from 'umi';
import styles from './style.less';
import {CURRENT} from "@/components/Authorized/renderAuthorize";

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
  let interval;
  const [form] = Form.useForm();
  useEffect(() => {
    if (!platformAndregister) {
      return;
    }

    console.log(platformAndregister.status);
    const account = form.getFieldValue('mail');

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
    dispatch({
      type: 'platformAndregister/submit',
      payload: { ...values ,},
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
        <Form form={form} name="UserRegister" onFinish={onFinish}>
          <FormItem
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
            <Input size="large" placeholder="邮箱" />
          </FormItem>
          <FormItem
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
            <Input size="large" placeholder="平台名称" />
          </FormItem>
          <FormItem
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
            <Input size="large" placeholder="平台URL" />
          </FormItem>
          <FormItem
            name="address"
            rules={[
              {
                type: 'string',
                message: '请输入合法地址！',
              },
            ]}
          >
            <Input size="large" placeholder="平台联系地址" />
          </FormItem>
          <FormItem
            name="serviceType"
            rules={[
              {
                type: 'string',
                message: '请输入服务类型！',
              },
            ]}
          >
            <Input size="large" placeholder="平台服务类型" />
          </FormItem>
          <FormItem
            name="registrationAddress"
            rules={[
              {
                type: 'string',
                message: '请输入平台注册地址！',
              },
            ]}
          >
            <Input size="large" placeholder="平台注册地址" />
          </FormItem>
          <FormItem
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
              placeholder="人员规模，请输入数值"
              size="large"
            />
          </FormItem>
          <FormItem
            name="legalRepresentative"
            rules={[
              {
                type: 'string',
                message: '请输入平台法人代表！',
              },
            ]}
          >
            <Input size="large" placeholder="平台法人代表" />
          </FormItem>
          <FormItem
            name="professionDomain"
            rules={[
              {
                type: 'string',
                message: '请输入平台专业领域！',
              },
            ]}
          >
            <Input size="large" placeholder="专业领域" />
          </FormItem>

          <Row gutter={8}>
            <Col span={16}>
              <FormItem
                name="captcha"
                rules={[
                  {
                    required: true,
                    message: '请输入验证码！',
                  },
                ]}
              >
                <Input size="large" placeholder="验证码" />
              </FormItem>
            </Col>
            <Col span={8}>
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
