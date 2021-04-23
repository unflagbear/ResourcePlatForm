import request from 'umi-request';

export async function queryFakeList(params) {
  return request('/api/fake_list', {
    params,
    data:params.category
  });
}

export async function queryResouce(params) {
  return request('/api/equipment/list',{params});
}
export async function queryMultiResouce(params) {
  return request('/api/resource_data',{params});
}