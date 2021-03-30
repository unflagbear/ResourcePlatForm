import request from '@/utils/request';

export async function queryKnowledgeGraph(params) {
    const filedata = new FormData();
    filedata.append("db",params.db)
    filedata.append("data",params.data)

  return request('/knowledge_graph/get_info',{
      method:'post',
      body:filedata,
      // headers:{'Content-Type': 'multipart/form-data',}
      // data:{db:params.db,data:null},
      // requestType:'form'
  });
}