import request from 'umi-request';

export async function queryAdvancedProfile() {
  return request('/api/profile/advanced');
}

export const queryOrder=async({values})=>{
  return request('/api/serviceDetails/query', {
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
  return request('/api/serviceOrder/sCommuniCommend', {
    method: 'post',
    data: values,
  })
}

export const comment=async({values})=>{
  console.log(values);
  return request('/api/serviceOrder/sComment', {
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

