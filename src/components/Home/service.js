import request from 'umi-request';

export async function UpdateLog(value) {
  console.log(value);
  return request('http://10.112.120.61:12348/record_click', {
    method:'get',
    params: value,
  });
}



