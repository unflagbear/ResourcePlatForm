import { queryFakeList, queryResouce} from './service';

const Model = {
  namespace: 'listAndsearchAndservice',
  state: {
    list: [],
    resourceData:{},
    total:0
  },
  effects: {
    *list({payload},{call,put}){
      //console.log("111111");
      const response = yield call(queryResouce,payload);
      yield put ({
          type:'getServiceList',
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
    getServiceList(state,{payload}){
      return {...state,list: payload.data.records,total:payload.data.total}
    }
  },
};
export default Model;
