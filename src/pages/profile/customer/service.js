import request from 'umi-request';

export async function queryAdvancedProfile() {
  return request('/api/profile/advanced');
}

export const queryOrder=async({values})=>{
  return request('/api/serviceTable/custquery', {
    method: 'post',
    data: values,
  })
}

export const getOrder=async({value})=>{
  return request('/api/serviceOrder/getOrder', {
    method: 'post',
    data: value,
  })
}

export const getTask=async({values})=>{
  console.log(values);
  return request('/api/orderServices/gettask', {
    method: 'post',
    data: values,
  })
}

export const nextState=async({values})=>{
  console.log(values);
  return request('/api/orderServices/updateState', {
    method: 'post',
    data: values,
  })
}

export const communiCommend=async({values})=>{
  console.log(values);
  return request('/api/orderServices/cCommuniCommend', {
    method: 'post',
    data: values,
  })
}

export const check=async({values})=>{
  console.log(values);
  return request('/api/orderServices/cCheck', {
    method: 'post',
    data: values,
  })
}

export const comment=async({values})=>{
  console.log(values);
  return request('/api/orderServices/cComment', {
    method: 'post',
    data: values,
  })
}

export const getprotocal = async({values})=>{
  values.type=0;
  console.log(values);
  return request('/api/orderServices/getfile', {
    method: 'post',
    data: values,
  })
}

export const gettrace = async({values})=>{
  values={...values, type:1};
  //console.log(values);
  return request('/api/orderServices/getfile', {
    method: 'post',
    data: values,
  })
}

export const getresult = async({values})=>{
  values={...values, type:2};
  //console.log(values);
  return request('/api/orderServices/getfile', {
    method: 'post',
    data: values,
  })
}

export const getorder = async(values)=>{
  console.log(values);
  return request('/api/orderServices/getOrder', {
    method: 'post',
    data: values,
  })
}




