import request from '@/utils/request';

export async function queryKnowledgeGraph(params) {
    const filedata = new FormData();
    filedata.append("db",params.db)
    filedata.append("data",params.data)

  return request('http://10.112.205.250:10088/get_info',{
      method:'post',
      data:filedata,
      // headers:{'Content-Type': 'multipart/form-data',}
      // data:{db:params.db,data:null},
      requestType:'form'
  });
  
}
export async function searchBy(params) {
  
    const filedata = new FormData();
    const sql = `MATCH (n:\`${params.type}\`) where id(n)=${params.id} RETURN n LIMIT 25`
    filedata.append("db",params.db)
    filedata.append("data",sql)
    

  return request('http://10.112.205.250:10088/search_data',{
      method:'post',
      body:filedata,
      // headers:{'Content-Type': 'multipart/form-data',}
      // data:{db:params.db,data:null},
      requestType:'form'
  });
}