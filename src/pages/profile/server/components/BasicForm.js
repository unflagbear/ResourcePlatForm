import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { formatMessage, FormattedMessage } from 'umi';
import {
  Form,
  Input,
  DatePicker,
  Select,
  Button,
  Card,
  InputNumber,
  Radio,
  Icon,
  Tooltip,
} from 'antd'; // import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import styles from './style.less';

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

@connect(({ loading }) => ({
  submitting: loading.effects['form/submitRegularForm'],
}))
class BasicForms extends PureComponent {
  handleSubmit = (e) => {
    const { dispatch, form } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        dispatch({
          type: 'form/submitRegularForm',
          payload: values,
        });
      }
    });
  };

  render() {
    const { submitting } = this.props;
    const {
      form: { getFieldDecorator, getFieldValue },
    } = this.props;
    const formItemLayout = {
      labelCol: {
        xs: {
          span: 24,
        },
        sm: {
          span: 7,
        },
      },
      wrapperCol: {
        xs: {
          span: 24,
        },
        sm: {
          span: 12,
        },
        md: {
          span: 10,
        },
      },
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
      //   <PageHeaderWrapper
      //     title={<FormattedMessage id="app.forms.basic.title" />}
      //     content={<FormattedMessage id="app.forms.basic.description" />}
      //   >
      <Card bordered={false}>
        <Form
          onSubmit={this.handleSubmit}
          hideRequiredMark
          style={{
            marginTop: 8,
          }}
        >
          <FormItem {...formItemLayout} label="form.title.label">
            {getFieldDecorator('title', {
              rules: [
                {
                  required: true,
                  message: 'validation.title.required',
                },
              ],
            })(<Input placeholder="form.title.placeholder" />)}
          </FormItem>
          <FormItem {...formItemLayout} label="form.date.label">
            {getFieldDecorator('date', {
              rules: [
                {
                  required: true,
                  message: 'validation.date.required',
                },
              ],
            })(
              <RangePicker
                style={{
                  width: '100%',
                }}
                placeholder={['form.date.placeholder.start', 'form.date.placeholder.end']}
              />,
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="form.goal.label">
            {getFieldDecorator('goal', {
              rules: [
                {
                  required: true,
                  message: 'validation.goal.required',
                },
              ],
            })(
              <TextArea
                style={{
                  minHeight: 32,
                }}
                placeholder="form.goal.placeholder"
                rows={4}
              />,
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="form.standard.label">
            {getFieldDecorator('standard', {
              rules: [
                {
                  required: true,
                  message: 'validation.standard.required',
                },
              ],
            })(
              <TextArea
                style={{
                  minHeight: 32,
                }}
                placeholder="form.standard.placeholder"
                rows={4}
              />,
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={
              <span>
                form.client.label
                <em className={styles.optional}>
                  form.optional
                  <Tooltip title="form.client.label.tooltip">
                    <Icon
                      type="info-circle-o"
                      style={{
                        marginRight: 4,
                      }}
                    />
                  </Tooltip>
                </em>
              </span>
            }
          >
            {getFieldDecorator('client')(<Input placeholder="form.client.placeholder" />)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={
              <span>
                form.invites.label
                <em className={styles.optional}>form.optional</em>
              </span>
            }
          >
            {getFieldDecorator('invites')(<Input placeholder="form.invites.placeholder" />)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={
              <span>
                form.weight.label
                <em className={styles.optional}>form.optional</em>
              </span>
            }
          >
            {getFieldDecorator('weight')(
              <InputNumber placeholder="form.weight.placeholder" min={0} max={100} />,
            )}
            <span className="ant-form-text">%</span>
          </FormItem>
          <FormItem {...formItemLayout} label="form.public.label" help="form.public.label.help">
            <div>
              {getFieldDecorator('public', {
                initialValue: '1',
              })(
                <Radio.Group>
                  <Radio value="1">form.public.radio.public</Radio>
                  <Radio value="2">form.public.radio.partially-public</Radio>
                  <Radio value="3">form.public.radio.private</Radio>
                </Radio.Group>,
              )}
              <FormItem
                style={{
                  marginBottom: 0,
                }}
              >
                {getFieldDecorator('publicUsers')(
                  <Select
                    mode="multiple"
                    placeholder="form.publicUsers.placeholder"
                    style={{
                      margin: '8px 0',
                      display: getFieldValue('public') === '2' ? 'block' : 'none',
                    }}
                  >
                    <Option value="1">form.publicUsers.option.A</Option>
                    <Option value="2">form.publicUsers.option.B</Option>
                    <Option value="3">form.publicUsers.option.C</Option>
                  </Select>,
                )}
              </FormItem>
            </div>
          </FormItem>
          <FormItem
            {...submitFormLayout}
            style={{
              marginTop: 32,
            }}
          >
            <Button type="primary" htmlType="submit" loading={submitting}>
              form.submit
            </Button>
            <Button
              style={{
                marginLeft: 8,
              }}
            >
              form.save
            </Button>
          </FormItem>
        </Form>
      </Card> //   </PageHeaderWrapper>
    );
  }
}

export default Form.create()(BasicForms);
