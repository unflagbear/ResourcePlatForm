import request from 'umi-request';

export async function queryRule(params) {
  console.log(params);
  return request('http://10.112.205.250:8453/nlu_api/query_example/', {
    //method: 'get',
    params,
  });
}

export const getRemoteList=async()=>{
  return request('http://10.112.205.250:8453/nlu_api/display_data/', {
    method: 'get',
  })
}

export const editRule=async(values)=>{
  console.log(values);
  return request('http://10.112.205.250:8453/nlu_api/update_example/', {
    method: 'post',
    params: values,
  })
}

export const deleteRule=async(values)=>{
  // console.log(values);
  return request('http://10.112.205.250:8453/nlu_api/delete_example/', {
    method: 'post',
    params: values,
    //data: { ...params, method: 'delete' },
  })
}
export const addRule=async(values)=>{
  return request('http://10.112.205.250:8453/nlu_api/create_example', {
    method: 'post',
    params: values,
  })
}