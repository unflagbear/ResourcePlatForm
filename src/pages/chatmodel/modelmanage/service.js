import request from 'umi-request';

export const getRemoteList=async()=>{
  return request('http://10.112.205.250:8452/nlu_api/show_all_models/', {
    method: 'get',
  })
}

export const changeRule=async({values})=>{
  return request('http://10.112.205.250:8452/nlu_api/change_running_model/', {
    method: 'get',
    params: values,
  })
}

export const deleteRule=async({values})=>{
  return request('http://10.112.205.250:8452/nlu_api/delete_model/', {
    method: 'get',
    params: values,
    //data: { ...params, method: 'delete' },
  })
}
export const addRule=async({values})=>{
  return request('http://10.112.205.250:8452/nlu_api/create_model/', {
    method: 'get',
    params: values,
  })
}

export const testRule=async({values})=>{
  return request('http://10.112.205.250:8452/nlu_api/test_running_model/', {
    method: 'get',
    params: values,
  })
}

