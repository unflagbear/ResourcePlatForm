import { Effect, ImmerReducer, Reducer, Subscription } from 'umi';
import {getRemoteList, editRule, deleteRule, addRule} from './service';
import { message } from 'antd';


const Model = {
    namespace: 'dialogdata',
    state: {
        name: '',
    },
    effects: {
        *getRemote({ payload }, { call, put }) {
            //console.log('failed');
            const data = yield call(getRemoteList);
            console.log(data);
            if(data){
                yield put({
                type:"getList",
                payload: data
                });
            }
        },
        *edit({ payload:{values}},{call, put}){
            console.log(values);
            const data = yield call(editRule, {values});
            if(data){
                message.success('Edit Successfully');
            yield put({
                type:"getRemote",
            });
            }
            else{
                message.error('Edit Failed');
            }
        },
        *delete({ payload:{values}},{call, put}){
            //console.log(values);
            const data = yield call(deleteRule, {values});
            //console.log(data);
            if(data){
                message.success('Delete Successfully');
                yield put({
                    type:"getRemote",
                });
                }
            else{
                message.error('Delete Failed');
            }
        },
        *add({ payload:{values}},{call, put}){
        
            // console.log(values);
            const data = yield call(addRule, {values});
            if(data){
                message.success('Add Successfully');
                yield put({
                    type:"getRemote",
                });
            }
            else{
                message.error('Add Failed');
            }
        },
    },
    reducers: {
        getList(state,{payload}){
            let resData=[]
            let num = 0
            payload.map(({intent,examples})=>{
                examples.map((context)=>{
                  resData.push({intent,context,id:num++})
                })
            })
            //console.log(resData);
            return {resData};
        },
    },
    subscriptions: {
        setup({ dispatch, history }) {
        return history.listen(({ pathname }) => {
            if (pathname === '/chatmodel/datamanage') {
            dispatch({
                type: 'getRemote',
            })
            }
        });
        }
    }
};
export default Model;