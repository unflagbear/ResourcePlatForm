import request from 'umi-request';

export const getRemoteList=async()=>{
  return request('http://10.112.205.250:8453/nlu_api/query_model/', {
    method: 'get',
  })
}

export async function queryRule(params) {
  console.log(params);
  return request('http://10.112.205.250:8453/nlu_api/query_model/', {
    params,
  });
}

export const changeRule=async(values)=>{
  return request('http://10.112.205.250:8453/nlu_api/change_running_model/', {
    method: 'post',
    params: values,
  })
}

export const deleteRule=async(values)=>{
  return request('http://10.112.205.250:8453/nlu_api/delete_model/', {
    method: 'post',
    params: values,
    //data: { ...params, method: 'delete' },
  })
}
export const addRule=async(values)=>{
  return request('http://10.112.205.250:8453/nlu_api/create_model/', {
    method: 'post',
    params: values,
  })
}

export const testRule=async({values})=>{
  return request('http://10.112.205.250:8453/nlu_api/test_running_model/', {
    method: 'get',
    params: values,
  })
}

