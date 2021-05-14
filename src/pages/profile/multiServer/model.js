import { queryServer } from './service';

const Model = {
    namespace: 'multiServer',
    state: {
      list: [],
    },
    effects: {
      *fetchAdvanced({payload:{values}}, { call, put }) {
        console.log(values);
        const response = yield call(queryServer({values}));
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
