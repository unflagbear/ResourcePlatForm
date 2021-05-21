import request from 'umi-request';

export async function queryFakeList(params) {
  return request('/api/fake_list', {
    params,
  });
}

export async function queryResouce(params) {
   console.log(params)
  return request('/api/demand/show_all');
}
