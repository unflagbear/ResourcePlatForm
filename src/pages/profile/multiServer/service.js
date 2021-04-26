import request from 'umi-request';

export const queryOrder=async({values})=>{
  return request('/api/serviceDetails/custquery', {
    method: 'post',
    data: values,
  })
}
export const queryServer=async()=>{
  return request('/api/serviceTable/server_list', {
    method: 'get',
    // data: values,
  })
}