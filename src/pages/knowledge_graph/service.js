import request from '@/utils/request';

export async function queryKnowledgeGraph(params) {
    const filedata = new FormData();
    filedata.append("db",params.db)
    filedata.append("data",params.data)

  return request('http://10.108.210.65:10081/get_info',{
      method:'post',
      body:filedata,
      // headers:{'Content-Type': 'multipart/form-data',}
      // data:{db:params.db,data:null},
      // requestType:'form'
  });
}