import request from '@/utils/request';

export async function queryResouce(params) {
  return request('/api/equipment/list', { params });
}

export async function queryDetail(params) {
  return request('api/equipment/detail', { params });
}
