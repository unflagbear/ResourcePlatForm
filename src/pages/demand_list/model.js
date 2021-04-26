import { queryFakeList} from './service';

const Model = {
  namespace: 'listAnddemand',
  state: {
    list: [],
    resourceData:{},
    total:0
  },
  effects: {
    *list({payload},{call,put}){
      const response = yield call(queryFakeList,payload);
      yield put ({
        type:'getResourceList',
        payload: response
      })
    },
  },
  reducers: {
    getResourceList(state,{payload}){
      return {...state,list: payload.data.list}
    }
  },
};
export default Model;
