import request from 'umi-request';

export const queryOrder=async({values})=>{
  return request('/api/serviceDetails/custquery', {
    method: 'post',
    data: values,
  })
}