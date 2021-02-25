import request from 'umi-request';

// export async function queryRule(params) {
//   return request('/nlu_api/display_data/', {
//     params,
//   });
// }

export const getRemoteList=async()=>{
  return request('/nlu_api/display_data/', {
    method: 'get',
  })
  .then(function(response) {
    //console.log(response);
    return response;
  })
  .catch(function(error) {
    return false;
  })
}

export const editRule=async({values})=>{
  console.log(values);
  return request('/nlu_api/edit_example/', {
    method: 'get',
    params: values,
  })
  .then(function(response) {
    return true;
  })
  .catch(function(error) {
     return false;
  });
}

export const deleteRule=async({values})=>{
  console.log(values);
  return request('/nlu_api/del_example/', {
    method: 'get',
    params: values,
    //data: { ...params, method: 'delete' },
  })
  .then(function(response) {
    return true;
  })
  .catch(function(error) {
     return false;
  });
}
export const addRule=async({values})=>{
  return request('/nlu_api/add_example', {
    method: 'get',
    params: values,
  })
  .then(function(response) {
    return true;
  })
  .catch(function(error) {
     return false;
  });
}
