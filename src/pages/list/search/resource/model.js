import { queryFakeList, queryResouce,queryMultiResouce} from './service';

const Model = {
  namespace: 'listAndsearchAndResource',
  state: {
    list: [],
    resourceData:{},
    total:0,
    data:{}
  },
  effects: {
    *list({payload},{call,put}){
      const response = yield call(queryResouce,payload);
      yield put ({
          type:'getResourceList',
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
      return {...state,list: payload.data.records,total:payload.data.total}
    },
    getMultiResource(state,{payload}){
      return {...state,data:payload.data}
    }
  },
};
export default Model;
