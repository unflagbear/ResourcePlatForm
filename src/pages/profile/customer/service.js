import request from 'umi-request';

export async function queryAdvancedProfile() {
  return request('/api/profile/advanced');
}

export const queryOrder=async({values})=>{
  return request('/api/serviceDetails/custquery', {
    method: 'post',
    data: values,
  })
}

export const nextState=async({values})=>{
  console.log(values);
  return request('/api/serviceOrder/updateState', {
    method: 'post',
    data: values,
  })
}

export const communiCommend=async({values})=>{
  console.log(values);
  return request('/api/serviceOrder/cCommuniCommend', {
    method: 'post',
    data: values,
  })
}

export const check=async({values})=>{
  console.log(values);
  return request('/api/serviceOrder/cCheck', {
    method: 'post',
    data: values,
  })
}

export const comment=async({values})=>{
  console.log(values);
  return request('/api/serviceOrder/cComment', {
    method: 'post',
    data: values,
  })
}

export const protocal = async({file})=>{
  //console.log(values);
  return request('/api/serviceOrder/protocal', {
    method: 'post',
    data: file,
  })
}
