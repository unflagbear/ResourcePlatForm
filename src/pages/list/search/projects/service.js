import request from 'umi-request';

export async function queryFakeList(params) {
  return request('/api/fake_list', {
    params,
  });
}

export async function queryResouce(params) {
  return request('/api/equipment/list',{params});
}