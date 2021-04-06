import request from 'umi-request';

export async function queryRule(params) {
  return request('/api/faqManagementCategory/list', {
    params,
  });
}
export async function trainModel(params) {
  return request('http://10.112.205.250:9900/model/create/', {
    method:'post',
    data: { ...params },
  });
}
export async function queryQues(params) {
  return request('/api/faqManagementQuery/list', {
    params,
  });
}

export async function removeRule(params) {
  return request('http://10.112.205.250:9900/category/delete', {
    method: 'POST',
    data: { ...params },
  });
}
export async function addRule(data) {
  return request('http://10.112.205.250:9900/category/create', {
    method: 'POST',
    data,
  });
}
export async function updateRule(params) {
  return request('http://10.112.205.250:9900/category/update', {
    method: 'POST',
    data: { ...params },
  });
}
