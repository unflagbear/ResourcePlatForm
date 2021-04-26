import request from 'umi-request';

export async function queryFakeList() {
  return request('/api/fake_list',);
}

