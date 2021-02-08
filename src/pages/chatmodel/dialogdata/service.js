import request from 'umi-request';

export async function queryRule(params) {
  return request('/api/dialogData/list', {
    params,
  });
}
export async function removeRule(params) {
  return request('/api/dialogData/remove', {
    method: 'POST',
    data: { ...params, method: 'delete' },
  });
}
export async function addRule(params) {
  return request('/api/dialogData/add', {
    method: 'POST',
    data: { ...params, method: 'post' },
  });
}
export async function updateRule(params) {
  return request('/api/dialogData/update', {
    method: 'POST',
    data: { ...params, method: 'update' },
  });
}
