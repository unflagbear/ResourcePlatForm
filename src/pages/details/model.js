import { Effect, ImmerReducer, Reducer, Subscription } from 'umi';
import {getRemoteList, changeRule, deleteRule, createRule, testRule} from './service';
import { message } from 'antd';
import { useState } from 'react';

let resdata=[];
let modelname='';

export default{
    namespace: 'details',
    state: {
        name: '',
    },
    effects: {
        *getRemote({ payload }, { call, put }) {
            const data = yield call(getRemoteList);
            if(data){
                yield put({
                type:"getList",
                payload: data
                });
            }
        },
        *change({ payload:{values}},{call, put}){
            const data = yield call(changeRule, {values});
            if(data.result='successful'){
                message.success('Change Successfully');
            yield put({
                type:"getRemote",
            });
            }
            else{
                message.error('Change Failed');
            }
        },
        *delete({ payload:{values}},{call, put}){
            const data = yield call(deleteRule, {values});
            if(data.result=='successful'){
                message.success('Delete Successfully');
                yield put({
                    type:"getRemote",
                });
                }
            else{
                message.error('Delete Failed');
            }
        },
        *apply({ payload:{values}},{call, put}){
            const data = yield call(createRule, {values});
            if(data){
                message.success('Apply Successfully');
            }
            else{
                message.error('Apply Failed');
            }
        },
        *test({ payload:{values}},{call, put}){
            console.log(values);
            const data = yield call(testRule, {values});
            console.log(data);
            if(data){
                yield put({
                type:"getData",
                payload: data
                });
            }
            
        },
    },
    reducers: {
        getList(state,{payload}){
            let resData=[]
            let current_model = '';
            payload.map(((context)=>{
                if(context[5]=="running"){
                    current_model = context[1];
                  }
                resData.push({model_id:context[0],model_name:context[1],model_desc:context[2],model_path:context[3],create_time:context[4],model_status:context[5],train_log_path:context[6]})
                })
            )
            resdata=resData;
            modelname=current_model;
            return {resData,current_model};
        },
        getData(state,{payload}){
            let result = payload.intent;
            let resData = resdata;
            let current_model =  modelname;
            return {result, resData, current_model};
        }
    },
    
};