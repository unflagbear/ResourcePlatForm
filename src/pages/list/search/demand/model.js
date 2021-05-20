import { queryFakeList, queryResouce} from './service';

const Model = {
  namespace: 'listAndsearchAnddemand',
  state: {
    list: [],
    resourceData:{},
    total:0
  },
  effects: {
    *list({payload},{call,put}){
      console.log(payload);
      const response = yield call(queryResouce,payload);
      yield put ({
          type:'getDemandList',
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
    getDemandList(state,{payload}){
      return {...state,list: payload.data}
    }
  },
};
export default Model;
