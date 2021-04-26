import { fakeRegister } from './service';

const Model = {
  namespace: 'userAndregister',
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
      return { ...state, status: payload.status ,type:payload.message};
    },
  },
};
export default Model;
