import { Effect, ImmerReducer, Reducer, Subscription } from 'umi';
import {queryRule, setRule, trainRule, showRule, showProgress} from './service';
import { message } from 'antd';

let loading = false;

const Model = {
    namespace: 'recommend',
    state: {
        name: '',
    },
    effects: {
        *query({ payload:{data}},{call, put}) {
            //console.log(values);
            const result = yield call(queryRule,{data});
            //console.log(data.state);
            if(result.code==0){
                yield put({
                type:"getResult",
                payload: {data,result,loading},
                });
            }
        },
        *set({ payload:{values,data}},{call, put}){
            console.log(data);
            const result = yield call(setRule,{values});
            //console.log(result);
            if(result.code==0){
                message.success('Set Successfully');
                yield put({
                    type:"query",
                    payload: {data},
                });
            }
            else{
                message.error('Set Failed');
            }
        },
        *train({ payload:{values}},{call, put}){
            //console.log(values);
            loading = true;
            yield put({
                type:"getLoading",
                payload: {loading},
            });
            const result = yield call(trainRule,{values});
            console.log(result);
            if(result.code==0){
                loading = false;
                yield put({
                    type:"getLoading",
                    payload: {loading},
                });
                message.success('Train Successfully');
            }
            else{
                message.error('Train Failed');
            }
        
        },
        *progress({ payload:{value}},{call, put}){
            const result = yield call(showProgress,{value});
            console.log(result);
            if(result.code==0){
                yield put({
                    type:"getProgress",
                    payload: {progress: result.p},
                });
            }
        },
        *show({ payload:{values}},{call, put}) {
            //console.log(values);
            const result = yield call(showRule,{values});
            //console.log(data.state);
            if(result.code==0){
                yield put({
                    type:"getRecommend",
                    payload: {result,loading},
                });
            }
        },
    },
    reducers: {
        getResult(state,{payload}){
            const data =[{domain:payload.data.domain, uid:payload.data.uid, preference:payload.result.state}];
            const load = payload.loading;
            return {data,load};
        },
        getLoading(state,{payload}){
            const load=payload.loading;
            return {load};
        },
        getRecommend(state,{payload}){
            const id = [];
            payload.result.result.map((context)=>{
                id.push({result:context})
            })
            const load = payload.loading;
            console.log(id);
            return {id, load};
        },
        getProgress(state,{payload}){
           
            const progress=payload.progress;
            return {progress};
        }
    },
    subscriptions: {
        setup({ dispatch, history }) {
        return history.listen(({ pathname }) => {
            if (pathname === '/recommend') {
            dispatch({
                type: 'getLoading',
                payload:{loading},
            })
            }
        });
        }
    }
};
export default Model;