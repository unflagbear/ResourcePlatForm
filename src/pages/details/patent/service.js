import request from '@/utils/request';



export async function queryDetail(params) {
  return request('api/patent/detail', { params });
}

export async function queryKnowledgeGraph(params) {
  const filedata = new FormData();
  const sql = `MATCH (n:\`${params.type}\`) where id(n)=${params.id} RETURN n LIMIT 25`
  filedata.append("db",params.db)
  filedata.append("data",sql)

  return request('http://10.112.205.250:10088/search_data',{
    method:'post',
    body:filedata,

    headers:{'Content-Type': 'multipart/form-data',}
    // data:{db:params.db,data:null},
    // requestType:'form'
  });

}


export const apply=async(values)=>{
  console.log(values);
  return request('/api/apply/create', {
    method: 'post',
    data: values,
  })
}
