import request from '@/utils/request';

export async function getTest(params) {
    return request('/api/company/testGet', { params });
}
  