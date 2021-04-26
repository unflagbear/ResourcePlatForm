import request from 'umi-request';

export async function queryPlatform(params) {
  return request('/api/platformInformation/detail', {
    params,
  });
}

