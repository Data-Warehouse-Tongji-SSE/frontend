import request from '@/utils/request';

const Server = 'http://8.133.173.118:8899';
const BASE_URL = 'http://mockjs.docway.net/mock/1b5MYNv513x'


export async function getAllItems(){
  return request('/api/getAllItems');
}
export async function getAllUser(){
  return request('/api/getAllUser');
}
export async function getAllOrder(){
  return request('/api/getAllOrders');
}

export async function getSalesAnalysisByUser(userId,startTime=  '1',endTime = '2'){
  return request('/api/getSalesAnalysisByUser'+'?userId='+userId+'&startTime='+startTime+'&endTime='+endTime);
}

export async function queryRule(params) {
  return request('/api/getAllItems', {
    params,
  });
}
export async function removeRule(params) {
  return request('/api/rule', {
    method: 'POST',
    data: { ...params, method: 'delete' },
  });
}
export async function addRule(params) {
  return request('/api/rule', {
    method: 'POST',
    data: { ...params, method: 'post' },
  });
}
export async function updateRule(params) {
  return request('/api/rule', {
    method: 'POST',
    data: { ...params, method: 'update' },
  });
}
