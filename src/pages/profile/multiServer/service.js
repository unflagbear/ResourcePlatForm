import request from 'umi-request';

export const queryOrder=async({values})=>{
  return request('/api/serviceDetails/custquery', {
    method: 'post',
    data: values,
  })
}
export const queryServer=async({values})=>{
  console.log(values);
  return request('/api/serviceTable/order_server_list', {
    method: 'post',
    data: values,
  })
}