import request from 'umi-request';

export async function fakeRegister(params) {
  return request('/api/user/register', {
    method: 'POST',
    data: params,
  });
}
