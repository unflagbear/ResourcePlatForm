import request from 'umi-request';

export async function queryFakeList(params) {
  return request('/api/platformInformation/list', {
    params,
  });
}

export async function queryResouce(params) {
  return request('/api/serviceTable/list',{params});
}
