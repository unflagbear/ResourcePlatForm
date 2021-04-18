import { Effect, ImmerReducer, Reducer, Subscription } from 'umi';
import {queryRule,getRemoteList, changeRule, deleteRule, addRule, testRule} from './service';
import { message } from 'antd';
import { useState } from 'react';

let resdata=[];
let modelname='';

export default{
    namespace: 'modelmanage',
    state: {
        name: '',
    },
    effects: {
        *getRemote({ payload }, { call, put }) {
            const result= yield call(getRemoteList);
            if(result){
                yield put({
                type:"getList",
                payload: result.data,
                });
            }
        },
        *change({ payload:{values}},{call, put}){
            const result = yield call(changeRule, {values});
            //console.log(result);
            if(result.state_code==0){
                message.success('模型切换成功');
            yield put({
                type:"getRemote",
            });
            }
            else{
                message.error('模型切换失败');
            }
        },
        *delete({ payload:{values}},{call, put}){
            const result = yield call(deleteRule, {values});
            //console.log(result);
            if(result.state_code==0){
                message.success('删除成功');
                yield put({
                    type:"getRemote",
                });
                }
            else{
                message.error('删除失败');
            }
        },
        *add({ payload:{values}},{call, put}){
            const result = yield call(addRule, {values});
            if(result.state_code==0){
                message.success('添加成功');
                //yield call(queryRule);
                yield put({
                    type:"getRemote",
                });
            }
            else{
                message.error('添加失败');
            }
        },
        *test({ payload:{values}},{call, put}){
            //console.log(values);
            const result = yield call(testRule, {values});
            //console.log(result);
            if(result){
                yield put({
                type:"getData",
                payload: result
                });
            }
            
        },
    },
    reducers: {
        getList(state,{payload}){
            let resData=[]
            let current_model = '';
           // console.log(payload);
            payload.map(((context)=>{
                //console.log(context);
                if(context.model_status=="running"){
                    current_model = context.model_name;
                  }
                resData.push(context);
                //console.log(resData);
                })
            )
            resdata=resData;
            modelname=current_model;
           // console.log(current_model);
            return {resData,current_model};
        },
        getData(state,{payload}){
            let result = payload.data;
            let resData = resdata;
            let current_model =  modelname;
            return {result, resData, current_model};
        }
    },
    subscriptions: {
        setup({ dispatch, history }) {
        return history.listen(({ pathname }) => {
            if (pathname === '/chatmodel/modelmanage') {
            dispatch({
                type: 'getRemote',
            })
            }
        });
        }
    }
};

//export default Model;

