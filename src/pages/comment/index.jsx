import React, { useEffect } from 'react'
import {
    Button,
  } from 'antd';
import {connect,history,useLocation} from 'umi'

const Comment = ({ dispatch, test: { testData = {} } })=>{
  const {query} = useLocation()
  // const [data,setData] = useState('欢迎观临')//[变量名，变量赋值函数] 命名规范set[变量名]
  const {test} = query // 等价于 const test = location.query.test 如果没有这个对象 test = null
  const goToHome = ()=>{
    history.push({
      pathname: '/comment',
      query:{
        test:"1"
      }
    });
  }
  useEffect(
  ()=>{
    if(dispatch){
      dispatch({
        type: 'test/test',
        payload: {
          data:test || "2",
        },
      });
    }
  },
  [test])
    return (
        <>
        <div style={{width:"300px",height:"200px"}}> 
          <Button  onClick={()=>goToHome()}> {testData?`请求获取到了：${testData.input}`:"没有路由参数"} </Button> 
        </div>
        </>
    )
}

export default connect(({ test }) => ({
  test
}))(Comment);
