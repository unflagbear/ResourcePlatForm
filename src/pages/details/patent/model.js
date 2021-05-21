import { queryDetail ,queryKnowledgeGraph} from './service.js';

const ResourceModel = {
  namespace: 'patent',
  state: {
    patentDetail: {},
  },
  effects: {
    *detail({ payload }, { call, put }) {
      // console.log(`request payload:${JSON.stringify(payload)}`)
      const response = yield call(queryDetail, payload);

      yield put({
        type: 'getPatentDetail',
        payload: response,
      });
    },
  },
  reducers: {
    getPatentDetail(state, { payload }) {
      console.log(payload.data);
      return { ...state, patentDetail: payload.data };
    },
  },
};

export default ResourceModel;
