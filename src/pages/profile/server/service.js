import { options } from 'numeral';
import request from 'umi-request';

export async function queryAdvancedProfile() {
  return request('/api/profile/advanced');
}

export const queryOrder=async({values})=>{
  console.log(values);
  return request('/api/serviceTable/servquery', {
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


export const cancleOrder=async({values})=>{
  console.log(values);
  return request('/api/serviceOrder/cancleOrder', {
    method: 'post',
    data: values,
  })
}

export const nextState=async({values})=>{
  //console.log(values);
  return request('/api/orderServices/updateState', {
    method: 'post',
    data: values,
  })
}

export const communiCommend=async({values})=>{
 // console.log(values);
  return request('/api/orderServices/sCommuniCommend', {
    method: 'post',
    data: values,
  })
}

export const comment=async({values})=>{
  //console.log(values);
  return request('/api/orderServices/sComment', {
    method: 'post',
    data: values,
  })
}

export const trace=async(values)=>{
  console.log(values);
  return request('/api/orderServices/trace', {
    method: 'post',
    data: values,
  })
}

// export const upload = async(file)=>{
//   const filedata = new FormData();
//   filedata.append("file",file);
//   // delete options.headers
//   return request('/api/storage/create',{
    
//     method:'post',
//     headers:{
//       // 'Context-Type': "multipart/form-data"
//     },
//     requestType: 'form',
//     data: filedata,
// });
// }

export const uploadAll = async(fileList)=>{
  //console.log(fileList);
  const num = fileList.length
  const filedata = new FormData();
  for(let i = 0;i<num;i++){
    filedata.append("fileList",fileList[i].originFileObj);
  }
  console.log(filedata.get("fileList"));
  return request('/api/storage/multi_create',{
    method:'post',
    headers:{
      'Context-Type': "multipart/form-data"
      
    },
    requestType: 'form',
    data:filedata,
});
}

export const upload = async(values)=>{
  console.log(values);
  return request('/api/orderServices/uploadfile', {
    method: 'post',
    data: values,
  })
}

export const getprotocal = async({values})=>{
  values={...values, type:0};
  //console.log(values);
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

