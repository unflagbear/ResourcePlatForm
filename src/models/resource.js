import { queryResouce } from '@/services/resource';

const ResourceModel = {
  namespace: 'resource',
  state: {
    resourceData: {}
  },
  effects: {
      *list({payload},{call,put}){
          const response = yield call(queryResouce,payload);
          yield put ({
              type:'getResourceList',
              payload: response
          })
      }
  },
  reducers: {
      getResourceList(state,{payload}){
          return {...state,resourceData: payload.data}
      }
  }



}

export default ResourceModel;