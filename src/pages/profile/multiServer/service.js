import request from 'umi-request';

export const queryOrder=async({values})=>{
  return request('/api/serviceSet/mulServiceQuery', {
    method: 'post',
    data: values,
  })
}
export const queryService=async({values})=>{
  console.log(values);
  return request('/api/serviceSet/order_server_list', {
    method: 'post',
    data: values,
  })
}