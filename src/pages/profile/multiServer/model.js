import { queryServer } from './service';

const Model = {
    namespace: 'multiServer',
    state: {
      list: [],
    },
    effects: {
      *fetchAdvanced(_, { call, put }) {
        const response = yield call(queryServer);
        console.log(response)
        yield put({
          type: 'show',
          payload: response,
        });
      },
    },
    reducers: {
      show(state, { payload }) {
          console.log(payload.data)
        return { ...state, list:payload.data };
      },
    },
  };
  export default Model;