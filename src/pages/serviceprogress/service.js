import request from 'umi-request';

export async function fakeRegister(params) {
  return request('/api/serviceTable/register', {
    method: 'POST',
    data: params,
  });
}
