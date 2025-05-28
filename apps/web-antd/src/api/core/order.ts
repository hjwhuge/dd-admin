import { requestClient } from '#/api/request';

export namespace orderApi {
  export interface PageFetchParams {
    [key: string]: any;
    page: number;
    pageSize: number;
  }
  export interface RowType {
    uuserCode?: string;
    userName: string;
    productName: string;
    customerOderNumber: string;
    color: string;
    specification: string;
    quantity: number;
    price: number;
    packagesNumber: number;
    unit: string;
    basicPrice: number;
    remark: string;
    selfOrderNumber: string;
    examinePerson: string;
    examineTime: string;
    examineStatus: boolean;
    printNumber: number;
    amount: number;
  }
  export interface PageResult {
    data: Array<RowType>;
    page: number;
    pageSize: number;
    totalSize: number;
  }
}

/**
 * 获取入货列表
 */
async function queryPutInStorage(data: orderApi.PageFetchParams) {
  return requestClient.post<Array<orderApi.PageResult>>(
    '/queryPutInStorage',
    data,
  );
}

/**
 * 入货
 */
async function putInStorage(data: any) {
  return requestClient.post('/putInStorage', data);
}

/**
 * 入货审批
 */
async function putInStorageExamine(data: any) {
  return requestClient.post('/putInStorageExamine', data);
}

/**
 * 编辑入货
 */
async function editPutInStorage(data: any) {
  return requestClient.post('/editePutInStorage', data);
}

/**
 * 删除入货
 */
async function deletePutInStorage(data: any) {
  return requestClient.post('/deletePutInStorage', data);
}

/**
 * 磅货
 */
async function addOutStorage(data: any) {
  return requestClient.post('/addOutStorage', data);
}

/**
 * 出货列表
 */
async function queryOutStorage(data: any) {
  return requestClient.post('/queryOutStorage', data);
}

/**
 * 导出出货列表
 */
async function exportOutStorage(data: any) {
  return requestClient.post('/exportOutStorage', data);
}

export {
  addOutStorage,
  deletePutInStorage,
  editPutInStorage,
  exportOutStorage,
  putInStorage,
  putInStorageExamine,
  queryOutStorage,
  queryPutInStorage,
};
