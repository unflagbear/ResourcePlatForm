import { queryResouce, queryDetail } from './service.js';

const ResourceModel = {
  namespace: 'demandDetails',
  state: {
    demandData: {},
    demandDetail: {},
  },
  effects: {
    *list({ payload }, { call, put }) {
      const response = yield call(queryResouce, payload);
      yield put({
        type: 'getDemandList',
        payload: response,
      });
    },
    *detail({ payload }, { call, put }) {
      // console.log(`request payload:${JSON.stringify(payload)}`)
      console.log(payload)
      const response = yield call(queryDetail, payload);

      yield put({
        type: 'getDemandDetail',
        payload: response,
      });
    },
  },
  reducers: {
    getDemandList(state, { payload }) {
      console.log(payload.data);
      return { ...state, demandData: payload.data };
    },
    getDemandDetail(state, { payload }) {
      console.log(payload.data);
      return { ...state, demandDetail: payload.data };
    },
  },
};

export default ResourceModel;
