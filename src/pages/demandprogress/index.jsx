import React from 'react'
import { Steps, Button, message,Card,Layout } from 'antd';
import SelectFilter from './component/SelectFilter.jsx'
import CommitTable from './component/CommitTable.jsx'
import ConfirmList from './component/ConfirmList.jsx'
import {connect, history} from "umi";

const { Step } = Steps;



const DemandProgress = ({submitting,dispatch}) =>{
  const [current, setCurrent] = React.useState(0);
  const [form, setForm] = React.useState({});
  const [select,setSelect] = React.useState(["科学研究与试验发展服务", "自然科学、工程、农业和医学研究"]);
  const [result,setResult] = React.useState();
  const next = () => {
    if(current===1){
      message.error("请提交")
    }else
    if (select != null){
      setCurrent(current + 1);
    }

  };
  const steps = [
    {
      title: '选择服务分类',
      content: <SelectFilter setSelect={setSelect} next={next}/>,
    },
    {
      title: '描述需求细节',
      content: <CommitTable setForm={setForm} next={next}setSelect={setSelect}select={select} setResult={setResult} current={current} setCurrent={setCurrent}/>,
    },
    {
      title: '确认需求发布',
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
      type: 'demandAndregister/submit',
      payload: { ...result},
    });
    history.push({
      pathname: 'list',
    });
  };
  return (
    <>
      <Card title="需求信息" bordered={false} style={{ width: "100%",height:900 }}
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

export default connect(({ demandAndregister, loading }) => ({
  demandAndregister,
  submitting: loading.effects['demandAndregister/submit'],
}))(DemandProgress);
