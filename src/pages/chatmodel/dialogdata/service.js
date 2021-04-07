import request from 'umi-request';

// export async function queryRule(params) {
//   return request('/nlu_api/display_data/', {
//     params,
//   });
// }

export const getRemoteList=async()=>{
  return request('http://10.112.205.250:8452/nlu_api/display_data/', {
    method: 'get',
  })
}

export const editRule=async({values})=>{
  // console.log(values);
  return request('http://10.112.205.250:8452/nlu_api/edit_example/', {
    method: 'get',
    params: values,
  })
}

export const deleteRule=async({values})=>{
  // console.log(values);
  return request('http://10.112.205.250:8452/nlu_api/del_example/', {
    method: 'get',
    params: values,
    //data: { ...params, method: 'delete' },
  })
}
export const addRule=async({values})=>{
  return request('http://10.112.205.250:8452/nlu_api/add_example', {
    method: 'get',
    params: values,
  })
}
