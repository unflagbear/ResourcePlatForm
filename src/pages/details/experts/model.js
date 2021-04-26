import { queryResouce, queryDetail } from './service.js';

const ResourceModel = {
  namespace: 'expertsDetails',
  state: {
    expertsData: {},
    expertsDetail: {},
  },
  effects: {
    *list({ payload }, { call, put }) {
      const response = yield call(queryResouce, payload);
      yield put({
        type: 'getExpertsList',
        payload: response,
      });
    },
    *detail({ payload }, { call, put }) {
      // console.log(`request payload:${JSON.stringify(payload)}`)
      const response = yield call(queryDetail, payload);

      yield put({
        type: 'getExpertsDetail',
        payload: response,
      });
    },
  },
  reducers: {
    getExpertsList(state, { payload }) {
      console.log(payload.data);
      return { ...state, serviceData: payload.data };
    },
    getExpertsDetail(state, { payload }) {
      console.log(payload.data);
      return { ...state, expertsDetail: payload.data };
    },
  },
};

export default ResourceModel;
