import request from '@/utils/request';

export async function queryHomePageData() {
  return request('/api/data/homepage_data');
}