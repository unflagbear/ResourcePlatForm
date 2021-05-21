import { Effect, ImmerReducer, Reducer, Subscription } from 'umi';
import {getDemandList, editDemand, deleteDemand, addDemand} from './service';
import { message } from 'antd';


const Model1 = {
  namespace: 'Demand',
  state: {
    name: '',
  },
  effects: {
    *getRemote({ payload }, { call, put }) {
      //console.log('failed');
      const data = yield call(getDemandList);
      console.log(data);
      if(data){
        yield put({
          type:"getList",
          payload: {data}
        });
      }
    },
    *edit({ payload:{values}},{call, put}){
      console.log(values);
      const data = yield call(editDemand, {values});
      if(data){
        message.success('Edit Successfully');
        yield put({
          type:"getRemote",
        });
      }
      else{
        message.error('Edit Failed');
      }
    },
    *delete({ payload:{values}},{call, put}){
      //console.log(values);
      const data = yield call(deleteDemand, {values});
      //console.log(data);
      if(data){
        message.success('Delete Successfully');
        yield put({
          type:"getRemote",
        });
      }
      else{
        message.error('Delete Failed');
      }
    },
    *add({ payload:{values}},{call, put}){

      // console.log(values);
      const data = yield call(addDemand, {values});
      if(data){
        message.success('Add Successfully');
        yield put({
          type:"getRemote",
        });
      }
      else{
        message.error('Add Failed');
      }
    },
  },
  reducers: {
    getList(state,{payload}){
      let resData=[]
      let num = 0
      payload.map(({intent,examples})=>{
        examples.map((context)=>{
          resData.push({intent,context,id:num++})
        })
      })
      //console.log(resData);
      return {resData};
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/chatmodel/datamanage') {
          dispatch({
            type: 'getRemote',
          })
        }
      });
    }
  }
};
export default Model1;
