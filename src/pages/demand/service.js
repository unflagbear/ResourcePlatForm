import request from 'umi-request';

export async function queryDemand(params) {
  console.log(params);
  return request('/api/demand/list/', {
    //method: 'get',
    params,
  });
}

export const getDemandList=async()=>{
  return request('/api/demand/show_all/', {
    method: 'get',
  })
}

export const editDemand=async(values)=>{
  console.log(values);
  return request('/api/demand/update', {
    method: 'post',
    data: values,
  })
}

export const deleteDemand=async(values)=>{
  console.log(values);
  return request('/api/demand/delete', {
    method: 'post',
    params: values,
    //data: { ...params, method: 'delete' },
  })
}
export const addDemand=async(values)=>{
  return request('/api/demand/create', {
    method: 'post',
    data: values,
  })
}
