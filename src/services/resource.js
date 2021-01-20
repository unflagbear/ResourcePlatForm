import request from '@/utils/request';

export async function queryResouce() {
  return request('/api/equipment/list');
}