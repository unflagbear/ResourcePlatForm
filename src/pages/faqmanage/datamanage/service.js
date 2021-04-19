import request from 'umi-request';

export async function queryRule(params) {
  //console.log(params);
  return request('/api/faqManagementModel/list', {
    params,
  });
}
export async function removeRule(params) {
  return request('http://10.112.205.250:9900/delete', {
    method: 'POST',
    data: { ...params },
  });
}
export async function addRule(data) {
  return request('http://10.112.205.250:9900/create', {
    method: 'POST',
    data,
  });
}
export async function updateRule(params) {
  return request('http://10.112.205.250:9900/update', {
    method: 'POST',
    data: { ...params },
  });
}
