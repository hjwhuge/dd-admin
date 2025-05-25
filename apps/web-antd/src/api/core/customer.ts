import { requestClient } from '#/api/request';

export namespace CustomerApi {
  export interface PageFetchParams {
    [key: string]: any;
    page: number;
    pageSize: number;
  }
  export interface PageResParams {
    userCode?: string;
    userName: string;
    userShortName: string;
    managerName: string;
    userType: string;
    managerPhone: string;
    address: string;
    merchandiser: string;
    line: string;
    fax: string;
    emailAddress: string;
    enble: string;
    remark: string;
    action: string;
  }
}

/**
 * 获取客户资料
 */
async function getCustomerApi(data: CustomerApi.PageFetchParams) {
  return requestClient.post<Array<CustomerApi.PageResParams>>(
    '/queryUser',
    data,
  );
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
