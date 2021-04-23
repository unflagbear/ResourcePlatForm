import { Form, Button, Col, Input, Popover, Progress, Row, Select, message ,InputNumber} from 'antd';
import React, { useState, useEffect } from 'react';
import { Link, connect, history } from 'umi';
import styles from './style.less';

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

const CompanyRegister = ({ submitting, dispatch, companyAndregister }) => {
  const [count, setcount] = useState(0);
  const [visible, setvisible] = useState(false);
  const [prefix, setprefix] = useState('86');
  const [popover, setpopover] = useState(false);
  const [usertype, settype] = useState(1);
  const [userid, setid]=useState(null);
  const confirmDirty = false;
  let interval;
  const [form] = Form.useForm();
  useEffect(() => {
    if (!companyAndregister) {
      return;
    }

    const account = form.getFieldValue('mail');

    if (companyAndregister.status === 'ok') {
      message.success('注册成功！');
      history.push({
        pathname: '/user/register-result',
        state: {
          account,
        },
      });
    }
  }, [companyAndregister]);
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



  const onFinish = (values) => {
    console.log(values)
    dispatch({
      type: 'companyAndregister/submit',
      payload: { ...values, telephone:prefix+values.telephone, },
    });
  };



  const changePrefix = (value) => {
    setprefix(value);
  };

  return (
    <>
      <div className={styles.main}>
        <h3>供应商注册</h3>
        <Form form={form} name="CompanyRegister" onFinish={onFinish}>
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
                message: '请输入供应商名称！',
              },
              {
                type: 'string',
                message: '请输入供应商名称！！',
              },
            ]}
          >
            <Input size="large" placeholder="供应商名称" />
          </FormItem>
          <FormItem
            name="website"
            rules={[
              {
                required: false,
                message: '请输入供应商URL！',
              },
              {
                type: 'url',
                message: 'URL格式错误！',
              },
            ]}
          >
            <Input size="large" placeholder="供应商URL" />
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
            <Input size="large" placeholder="供应商联系地址" />
          </FormItem>
          <FormItem
            name="establishmentDate"
            rules={[
              {
                type: 'date',
                message: '日期格式错误！',
              },
            ]}
          >
            <Input size="large" placeholder="供应商成立时间" />
          </FormItem>
          <FormItem
            name="registeredAddress"
            rules={[
              {
                type: 'string',
                message: '请输入供应商注册地址！',
              },
            ]}
          >
            <Input size="large" placeholder="供应商注册地址" />
          </FormItem>
          <FormItem
            name="registerCapital"
            rules={[
              {
                type: 'string',
                message: '请输入供应商注册资本！',
              },
            ]}
          >
            <Input size="large" placeholder="供应商注册资本" />
          </FormItem>
          <FormItem
            name="state"
            rules={[
              {
                type: 'string',
                message: '请输入供应商状态！',
              },
            ]}
          >
            <Input size="large" placeholder="供应商状态" />
          </FormItem>
          <FormItem
            name="type"
            rules={[
              {
                type: 'string',
                message: '请输入供应商公司类型！',
              },
            ]}
          >
            <Input size="large" placeholder="供应商公司类型" />
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
            name="industry"
            rules={[
              {
                type: 'string',
                message: '请输入供应商服务类型！',
              },
            ]}
          >
            <Input size="large" placeholder="服务类型" />
          </FormItem>
          <FormItem
            name="registrationAuthority"
            rules={[
              {
                type: 'string',
                message: '请输入供应商注册机构！',
              },
            ]}
          >
            <Input size="large" placeholder="供应商注册机构" />
          </FormItem>
          <FormItem
            name="usedName"
            rules={[
              {
                type: 'string',
                message: '请输入供应商曾用名！',
              },
            ]}
          >
            <Input size="large" placeholder="供应商曾用名" />
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

export default connect(({ companyAndregister, loading }) => ({
  companyAndregister,
  submitting: loading.effects['companyAndregister/submit'],
}))(CompanyRegister);
