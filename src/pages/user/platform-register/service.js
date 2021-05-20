import request from 'umi-request';

export async function fakeRegister(params) {
  console.log(params)
  return request('/api/platformInformation/register', {
    method: 'POST',
    data: params,
  });
}
