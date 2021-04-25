import request from '@/utils/request';

export async function queryResouce(params) {
  return request('/api/serviceTable/list', { params });
}

export async function queryDetail(params) {
  return request('api/expert/detail', { params });
}


