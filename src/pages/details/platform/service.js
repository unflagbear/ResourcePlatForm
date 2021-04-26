import request from '@/utils/request';

export async function queryResouce(params) {
  return request('/api/serviceTable/user_service', { params });
}

export async function queryDetail(params) {
  return request('api/platformInformation/detail', { params });
}


export const apply=async(values)=>{
  console.log(values);
  return request('/api/apply/create', {
    method: 'post',
    data: values,
  })
}
