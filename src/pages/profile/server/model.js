import { queryAdvancedProfile,queryOrder } from './service';

const Model = {
  namespace: 'profileServer',
  state: {
    advancedOperation1: [],
    advancedOperation2: [],
    advancedOperation3: [],
  },
  effects: {
    *fetchAdvanced(_, { call, put }) {
      const response = yield call(queryAdvancedProfile);
      yield put({
        type: 'show',
        payload: response,
      });
    },
    *getOrderInfo({ payload:{values}},{call, put}){
      const response = yield call(queryOrder,{values});
      yield put ({
          type:'show',
          payload: response,
      })
    }
  },
  reducers: {
    show(state, { payload }) {
      let result = payload.data[0];
      console.log(result);
      return {result};
    },
  },
};
export default Model;
