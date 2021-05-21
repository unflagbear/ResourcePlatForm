import request from 'umi-request';

export async function fakeRegister(params) {
  console.log(params)
  return request('/api/serviceTable/register', {
    method: 'POST',
    data: params,
  });
}
