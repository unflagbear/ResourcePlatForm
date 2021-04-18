import request from '@/utils/request';

export async function queryResouce(params) {
  return request('/api/serviceTable/list', { params });
}

export async function queryDetail(params) {
  return request('api/serviceTable/detail', { params });
}


export const apply=async(values)=>{
  console.log(values);
  return request('/api/apply/create', {
    method: 'post',
    data: values,
  })
}