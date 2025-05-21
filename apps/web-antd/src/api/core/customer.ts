import { requestClient } from '#/api/request';

export namespace DemoTableApi {
  export interface PageFetchParams {
    [key: string]: any;
    page: number;
    pageSize: number;
  }
}

/**
 * 获取客户资料表格数据
 */
async function getCustomerTableApi(data: DemoTableApi.PageFetchParams) {
  return requestClient.post('/queryUser', data);
}

/**
 * 新增客户资料
 */
async function addCustomerApi(data: any) {
  return requestClient.post('/addUser', data);
}

export { addCustomerApi, getCustomerTableApi };
