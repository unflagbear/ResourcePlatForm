import { queryKnowledgeGraph} from './service.js';

const KnowledgeGraph = {
    namespace: 'KnowledgeGraph',
    state: {
      infor: {}
    },
    effects: {
        *getKnowledgeGraph({payload},{call,put}){
            const response = yield call(queryKnowledgeGraph,payload);
            yield put ({
                type:'getByDB',
                payload: response
            })
        }
    },
    reducers: {
        getByDB(state,{payload}){
            return {...state,infor: payload}
        }
    }
}
export default KnowledgeGraph;