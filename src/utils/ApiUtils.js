import request from '@/utils/request';


export async function getAllItems(){
  return request('/api/getAllItems');
}
export async function getAllUser(){
  return request('/api/getAllUser');
}
export async function getAllOrder(){
  return request('/api/getAllOrders');
}

export async function getSalesAnalysisByUser(userId,startTime='2020-12-22 00:00:00',endTime ='2020-12-29 00:00:00'){
  return request('/api/getSalesAnalysisByUser'+'?userId='+userId+'&startTime='+startTime+'&endTime='+endTime);
}
export async function getSalesAnalysisByItem(itemId,startTime='2020-12-22 00:00:00',endTime ='2020-12-29 00:00:00'){
  return request('/api/getSalesAnalysisByItem'+'?itemId='+itemId+'&startTime='+startTime+'&endTime='+endTime);
}

export async function getSalesAnalysis(){
  return request('/api/getSalesAnalysis?startTime=2020-12-22 00:00:00&endTime=2020-12-29 00:00:00');
}

export async function getBestCustomer(){
  return request('/api/getBestCustomer');
}

export async function getTopSellingItem(){
  return request('/api/getTopSellingItem');
}

export async function queryRule(params){
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
