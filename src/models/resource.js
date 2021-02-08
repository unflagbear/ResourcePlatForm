import { queryResouce, queryDetail } from '@/services/resource';

const ResourceModel = {
  namespace: 'resource',
  state: {
    resourceData: {},
    resourceDetail: {},
  },
  effects: {
    *list({ payload }, { call, put }) {
      const response = yield call(queryResouce, payload);
      yield put({
        type: 'getResourceList',
        payload: response,
      });
    },
    *detail({ payload }, { call, put }) {
      // console.log(`request payload:${JSON.stringify(payload)}`)
      const response = yield call(queryDetail, payload);

      yield put({
        type: 'getResourceDetail',
        payload: response,
      });
    },
  },
  reducers: {
    getResourceList(state, { payload }) {
      return { ...state, resourceData: payload.data };
    },
    getResourceDetail(state, { payload }) {
      return { ...state, resourceDetail: payload.data };
    },
  },
};

export default ResourceModel;
