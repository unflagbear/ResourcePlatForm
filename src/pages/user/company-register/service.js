import request from 'umi-request';

export async function fakeRegister(params) {
  return request('/api/company/register', {
    method: 'POST',
    data: params,
  });
}
