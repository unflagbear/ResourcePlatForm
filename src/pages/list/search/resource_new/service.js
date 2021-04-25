import request from 'umi-request';

export async function queryFakeList(params) {
  return request('/api/fake_list', {
    params,
    data:params.category
  });
}

export async function queryResouce(params) {
  return request('/api/equipment/list',{params});
}
export async function queryCompany(params) {
  return request('/api/company/list',{params});
}
export async function queryExpert(params) {
  return request('/api/expert/list',{params});
}
export async function queryPatent(params) {
  return request('/api/patentInfor/list',{params});
}
export async function queryMultiResouce(params) {
  console.log("api runnig")
  return request('/api/resource_data',{params});
}