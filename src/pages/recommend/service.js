import request from 'umi-request';


export const queryRule=async({data})=>{
  return request('http://10.108.210.65:12348/state', {
    method: 'get',
    params: data,
  })
}

export const setRule=async({values})=>{
    return request('http://10.108.210.65:12348/setstate', {
      method: 'post',
      data: values,
    })
}

export const trainRule=async({values})=>{
    return request('http://10.108.210.65:12348/train', {
      method: 'get',
      params: values,
    }) 
}

export const showRule=async({values})=>{
    return request('http://10.108.210.65:12348/', {
      method: 'get',
      params: values,
    }) 
}