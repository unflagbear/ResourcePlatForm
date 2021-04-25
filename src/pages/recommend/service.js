import request from 'umi-request';


export const queryRule=async({data})=>{
  return request('http://10.112.205.250:12348/state', {
    method: 'get',
    params: data,
  })
}

export async function resultRule(params) {
  console.log(params);
  return request('http://10.112.205.250:12348/get_detail_by_id/', {
    params,
  });
}

export const setRule=async({values})=>{
    return request('http://10.112.205.250:12348/setstate', {
      method: 'post',
      data: values,
    })
}

export const trainRule=async({values})=>{
    return request('http://10.112.205.250:12348/train', {
      method: 'get',
      params: values,
    }) 
}

export const showRule=async(values)=>{
    return request('http://10.112.205.250:12348/', {
      method: 'get',
      params: values,
    }) 
}

export const showProgress=async({value})=>{
  return request('http://10.112.205.250:12349/get_train_state', {
    method: 'get',
    params: value,
  }) 
}