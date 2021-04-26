import { queryResouce, queryDetail } from './service.js';

const ResourceModel = {
  namespace: 'platformDetails',
  state: {
    serviceData: {},
    platformDetail: {},
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
        type: 'getPlatformDetail',
        payload: response,
      });
    },
  },
  reducers: {
    getServiceList(state, { payload }) {
      console.log(payload.data);
      return { ...state, serviceData: payload.data };
    },
    getPlatformDetail(state, { payload }) {
      console.log(payload.data);
      return { ...state, platformDetail: payload.data };
    },
  },
};

export default ResourceModel;
