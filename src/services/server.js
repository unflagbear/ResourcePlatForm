import request from '@/utils/request';

export async function queryServer() {
  return request('/api/server');
}
// export async function queryCurrent() {
//   return request('/api/user/currentUser');
// }
// export async function queryNotices() {
//   return request('/api/notices');
// }
