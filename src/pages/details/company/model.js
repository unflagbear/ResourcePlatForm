import { queryResouce, queryDetail } from './service.js';

const ResourceModel = {
  namespace: 'companyDetails',
  state: {
    companyData: {},
    companyDetail: {},
  },
  effects: {
    *list({ payload }, { call, put }) {
      const response = yield call(queryResouce, payload);
      yield put({
        type: 'getCompanyList',
        payload: response,
      });
    },
    *detail({ payload }, { call, put }) {
      // console.log(`request payload:${JSON.stringify(payload)}`)
      const response = yield call(queryDetail, payload);

      yield put({
        type: 'getCompanyDetail',
        payload: response,
      });
    },
  },
  reducers: {
    getCompanyList(state, { payload }) {
      console.log(payload.data);
      return { ...state, serviceData: payload.data };
    },
    getCompanyDetail(state, { payload }) {
      console.log(payload.data);
      return { ...state, companyDetail: payload.data };
    },
  },
};

export default ResourceModel;
