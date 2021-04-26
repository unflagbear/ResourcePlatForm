import React from 'react'
import { Steps, Button, message,Card,Layout } from 'antd';
import SelectFilter from './component/SelectFilter.jsx'
import CommitTable from './component/CommitTable.jsx'
import ConfirmList from './component/ConfirmList.jsx'
import {connect} from "umi";

const { Step } = Steps;



const ServiceProgress = ({submitting,dispatch}) =>{
  const [current, setCurrent] = React.useState(0);
  const [form, setForm] = React.useState({});
  const [select,setSelect] = React.useState(["科学研究与试验发展服务", "自然科学、工程、农业和医学研究"]);
  const [result,setResult] = React.useState();
  const next = () => {
    if (select != null){
      setCurrent(current + 1);
    }
    else{
      message.error("请选择")
    }
  };
  const steps = [
    {
      title: '选择服务分类',
      content: <SelectFilter setSelect={setSelect} next={next}/>,
    },
    {
      title: '描述服务细节',
      content: <CommitTable setForm={setForm} next={next}setSelect={setSelect}select={select} setResult={setResult} current={current} setCurrent={setCurrent}/>,
    },
    {
      title: '确认服务发布',
      content: <ConfirmList form={form} result={result}/>,
    },
  ];
  const prev = () => {
    setCurrent(current - 1);
  };
  const onClick = () => {
    console.log(result)
    message.success('Processing complete!')
    dispatch({
      type: 'serviceAndregister/submit',
      payload: { ...result},
    });
  };
    return (
        <>
          <Card title="服务信息" bordered={false} style={{ width: "100%",height:900 }}
          extra={
            <div className="steps-action"style={{marginTop:"30px"}}>
              {current === steps.length - 1 && (
                <Button type="primary" htmlType="submit" onClick={onClick} >
                  确定
                </Button>
              )}
              {current > 0 && (
                <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
                  上一步
                </Button>
              )}
              {current < steps.length - 1 && (
                <Button type="primary" onClick={() => next()}>
                  下一步
                </Button>
              )}
            </div>
          }>
            <Steps current={current}>
              {steps.map(item => (
                <Step key={item.title} title={item.title} />
              ))}
            </Steps>
            <div className="steps-content" style={{height:"500px",marginTop:"10px"}}>{steps[current].content}</div>

          </Card>
        </>
    )

}

export default connect(({ serviceAndregister, loading }) => ({
  serviceAndregister,
  submitting: loading.effects['serviceAndregister/submit'],
}))(ServiceProgress);
