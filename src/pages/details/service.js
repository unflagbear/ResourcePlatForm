import request from 'umi-request';

export const getRemoteList=async()=>{
  return request('/nlu_api/show_all_models/', {
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

export const changeRule=async({values})=>{
  return request('/nlu_api/change_running_model/', {
    method: 'get',
    params: values,
  })
  .then(function(response) {
    return response;
  })
  .catch(function(error) {
     return false;
  });
}

export const deleteRule=async({values})=>{
  return request('/nlu_api/delete_model/', {
    method: 'get',
    params: values,
    //data: { ...params, method: 'delete' },
  })
  .then(function(response) {
    return response;
  })
  .catch(function(error) {
     return false;
  });
}
export const createRule=async({values})=>{
  return request('/api/apply/create', {
    method: 'post',
    data: values,
  })
  .then(function(response) {
    return response;
  })
  .catch(function(error) {
     return false;
  });
}

export const testRule=async({values})=>{
  return request('/nlu_api/test_running_model/', {
    method: 'get',
    params: values,
  })
  .then(function(response) {
    return response;
  })
  .catch(function(error) {
     return false;
  });
}
