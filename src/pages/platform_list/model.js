import { queryFakeList, queryResouce} from './service';

const Model = {
  namespace: 'listAndplatform',
  state: {
    list: [],
    resourceData:{},
    total:0
  },
  effects: {
    *list({payload},{call,put}){
      const response = yield call(queryResouce,payload);
      yield put ({
        type:'getResourceList',
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
      return {...state,list: payload.data.records,total:payload.data.total}
    }
  },
};
export default Model;
