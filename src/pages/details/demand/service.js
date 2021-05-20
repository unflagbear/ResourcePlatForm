import request from '@/utils/request';

export async function queryResouce(params) {
  return request('/api/serviceTable/list', { params });
}

export async function queryDetail(params) {
  return request('api/demand/query', { params });
}


export const apply=async(values)=>{
  console.log(values);
  return request('/api/apply/create', {
    method: 'post',
    data: values,
  })
}

export const update=async(values)=> {
  console.log(values);
  return request('/api/demand/update', {
    method: 'post',
    data: values,
  })
}
