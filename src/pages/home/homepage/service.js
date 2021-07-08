import request from 'umi-request';

export async function getCommend(value) {
  console.log(value);
  return request('http://10.112.120.61:12348/get_rec_full', {
    method:'get',
    params: value,
  });
}

export async function getUser() {
  return request('/api/user/currentUser', {
    method:'get',
  });
}




