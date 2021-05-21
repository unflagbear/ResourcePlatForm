
import { queryKnowledgeGraph,searchBy} from './service.js';

const KnowledgeGraph = {
    namespace: 'KnowledgeGraph',
    state: {
      infor: {},
      result:{},
    },
    effects: {
        *getKnowledgeGraph({payload},{call,put}){
            const response = yield call(queryKnowledgeGraph,payload);
            console.log(response)
            yield put ({
                type:'getByDB',
                payload: response
            })
        },
        *searchKnowledge({payload},{call,put}){
            const response = yield call(searchBy,payload);
            console.log(response)
            yield put ({
                type:'result',
                payload: response
            })
        }
    },
    reducers: {
        getByDB(state,{payload}){
            return {...state,infor: payload}
        },
        result(state,{payload}){
            return {...state,result: payload}
        }
    }
}
export default KnowledgeGraph;