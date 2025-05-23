import { requestClient } from '#/api/request';

export namespace DemoTableApi {
  export interface PageFetchParams {
    [key: string]: any;
    page: number;
    pageSize: number;
  }
}

/**
 * 获取客户资料
 */
async function getCustomerApi(data: DemoTableApi.PageFetchParams) {
  return requestClient.post('/queryUser', data);
}

/**
 * 新增客户资料
 */
async function addCustomerApi(data: any) {
  return requestClient.post('/addUser', data);
}

/**
 * 修改客户资料
 */
async function editCustomerApi(data: any) {
  return requestClient.post('/upUser', data);
}

/**
 * 删除客户资料
 */
async function delCustomerApi(data: any) {
  return requestClient.post('/deleteUser', data);
}

export { addCustomerApi, delCustomerApi, editCustomerApi, getCustomerApi };
