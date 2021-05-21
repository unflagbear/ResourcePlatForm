import request from 'umi-request';

export async function fakeRegister(params) {
  return request('/api/demand/create', {
    method: 'POST',
    data: params,
  });
}
