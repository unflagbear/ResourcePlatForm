import request from 'umi-request';

export async function queryFakeList(params) {
  return request('/api/fake_list', {
    params,
  });
}

export async function queryResouce({data,...params}) {
   //console.log(data)
  return request('/api/serviceTable/list',{
    params
    // data
  });
}