import request from 'umi-request';

export async function queryRule(params) {
  return request('/api/serviceOrder/showSerOrders', {
    params,
  });
}
export async function removeRule(params) {
  return request('/faq_api/delete', {
    method: 'POST',
    data: { ...params },
  });
}
export async function addRule(data) {
  return request('/faq_api/create', {
    method: 'POST',
    data,
  });
}
export async function updateRule(params) {
  return request('/faq_api/update', {
    method: 'POST',
    data: { ...params },
  });
}