import { queryFakeList, queryResouce,queryMultiResouce,queryExpert,queryCompany,queryPatent} from './service';

const Model = {
  namespace: 'listAndsearchAndResourceNew',
  state: {
    list: [],
    resourceData:{},
    total:0,
    data:{}
  },
  effects: {
    *equipment({payload},{call,put}){
      const response = yield call(queryResouce,payload);
      yield put ({
          type:'getResourceList',
          payload: response
      })
  },
  *expert({payload},{call,put}){
    const response = yield call(queryExpert,payload);
    yield put ({
        type:'getExpertList',
        payload: response
    })
},
*company({payload},{call,put}){
  const response = yield call(queryCompany,payload);
  yield put ({
      type:'getCompanyList',
      payload: response
  })
},
*patent({payload},{call,put}){
  const response = yield call(queryPatent,payload);
  yield put ({
      type:'getPatnetInforList',
      payload: response
  })
},
  *multiList({payload},{call,put}){
    const response = yield call(queryMultiResouce,payload);
    yield put ({
        type:'getMultiResource',
        payload: response
    })
  },
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryFakeList, payload);
      yield put({
        type: 'queryList',
        payload: Array.isArray(response) ? response : [],
      });
    },
  },
  reducers: {
    queryList(state, action) {
      return { ...state, list: action.payload };
    },
    getResourceList(state,{payload}){
      console.log(payload.data.records)
      return {...state,data: {equipmentList:payload.data.records},list:payload.data.records,total:payload.data.total}
    },
    getExpertList(state,{payload}){
      return {...state,data: {experts:payload.data.records},list:payload.data.records,total:payload.data.total}
    },
    getCompanyList(state,{payload}){
      return {...state,data: {companies:payload.data.records},list:payload.data.records,total:payload.data.total}
    },
    getPatnetInforList(state,{payload}){
      return {...state,data: {patentInfors:payload.data.records},list:payload.data.records,total:payload.data.total}
    },
    getMultiResource(state,{payload}){
      return {...state,data:payload.data}
    }
  },
};
export default Model;
