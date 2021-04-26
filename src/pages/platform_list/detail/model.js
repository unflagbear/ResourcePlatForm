import { queryPlatform} from './service';

const Model = {
  namespace: 'detailAndplatform',
  state: {
    data: {},
    resourceData:{},
    total:0,
    status:undefined
  },
  effects: {
    *list({payload},{call,put}){
      const response = yield call(queryPlatform,payload);
      yield put ({
        type:'getDetail',
        payload: response
      })
    },
  },
  reducers: {
    getDetail(state,{payload}){
      return {...state,data: payload.data,status:payload.status}
    }
  },
};
export default Model;
