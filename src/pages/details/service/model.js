import { queryResouce, queryDetail } from './service.js';

const ResourceModel = {
  namespace: 'serviceDetails',
  state: {
    serviceData: {},
    serviceDetail: {},
  },
  effects: {
    *list({ payload }, { call, put }) {
      const response = yield call(queryResouce, payload);
      yield put({
        type: 'getServiceList',
        payload: response,
      });
    },
    *detail({ payload }, { call, put }) {
      // console.log(`request payload:${JSON.stringify(payload)}`)
      const response = yield call(queryDetail, payload);

      yield put({
        type: 'getServiceDetail',
        payload: response,
      });
    },
  },
  reducers: {
    getServiceList(state, { payload }) {
      console.log(payload.data);
      return { ...state, serviceData: payload.data };
    },
    getServiceDetail(state, { payload }) {
      console.log(payload.data);
      return { ...state, serviceDetail: payload.data };
    },
  },
};

export default ResourceModel;
