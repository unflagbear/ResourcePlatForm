import request from 'umi-request';

export async function queryRule({values}) {
  console.log(values);
  return request('/api/serviceOrder/showOrders', {
    method:'post',
    data: values,
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