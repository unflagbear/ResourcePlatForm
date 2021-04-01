import request from 'umi-request';

export async function queryAdvancedProfile() {
  return request('/api/profile/advanced');
}

export const queryOrder=async({values})=>{
  return request('/api/serviceDetails/custquery', {
    method: 'post',
    data: values,
  })
}
