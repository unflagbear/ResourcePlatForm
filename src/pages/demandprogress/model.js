import { fakeRegister } from './service';

const Model = {
  namespace: 'demandAndregister',
  state: {
    status: undefined,
    type:undefined,
    userId:undefined,

  },
  effects: {
    *submit({ payload }, { call, put }) {
      const response = yield call(fakeRegister, payload);
      yield put({
        type: 'registerHandle',
        payload: response,
      });
    },
  },
  reducers: {
    registerHandle(state, { payload }) {
      console.log(payload);
      return { ...state, status: payload.status };
    },
  },
};
export default Model;
