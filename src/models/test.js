import {getTest } from '@/services/test';

const TestModel = {
 namespace: 'test',
  state: {
    testData: {},
  },
  effects:{
    *test({ payload }, { call, put }) {
        const response = yield call(getTest, payload);
        yield put({
          type: 'getTestData',
          payload: response,
        });
      },
  },
  reducers:{
    getTestData(state, { payload }) {
      return { ...state, testData: payload.data };
    },
  },
}

export default TestModel;