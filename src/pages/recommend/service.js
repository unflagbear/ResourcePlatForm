import request from 'umi-request';


export const queryRule=async({data})=>{
  return request('http://10.112.205.250:12348/state', {
    method: 'get',
    params: data,
  })
}

export async function expertRule(values) {
  console.log(values);
  return request('http://10.112.205.250:12348/get_0_detail_by_id', {
    method: 'post',
    data: values,
  });
}

export async function equipmentRule(values) {
  console.log(values);
  return request('http://10.112.205.250:12348/get_1_detail_by_id', {
    method: 'post',
    data: values,
  });
}

export async function patentRule(values) {
  console.log(values);
  return request('http://10.112.205.250:12348/get_2_detail_by_id', {
    method: 'post',
    data: values,
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