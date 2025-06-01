import { requestClient } from '#/api/request';

export namespace UserApi {
  export interface PageFetchParams {
    [key: string]: any;
    page: number;
    pageSize: number;
  }
  export interface RowType {
    account: string;
    password: string;
    userType: string;
    _X_ROW_KEY: string;
  }
  export interface PageResult {
    data: Array<RowType>;
    page: number;
    pageSize: number;
    totalSize: number;
  }
}

/**
 * 管理员查询账号列表
 */
async function queryAcount(data: UserApi.PageFetchParams) {
  return requestClient.post<Array<UserApi.PageResult>>('/queryAcount', data);
}

/**
 * 管理员增加账号
 */
async function addAccount(data: any) {
  return requestClient.post('/addAcount', data);
}

/**
 * 修改登录密码
 */
async function upPassword(data: any) {
  return requestClient.post('/upPassword', data);
}

/**
 * 删除账号
 */
async function deleteAcount(data: any) {
  return requestClient.post('/deleteAcount', data);
}

/**
 * 关于本机
 */
async function aboutDevice() {
  return requestClient.post('/aboutDevice');
}

/**
 * 清楚所有数据，超级管理人员操作，谨慎操作
 */
async function clearData(data: any) {
  return requestClient.post('/clearData', data);
}

/**
 * 获取系统日志列表
 */
async function getLogList() {
  return requestClient.post('/getLogList');
}

/**
 * 上传升级文件
 */
async function upVersion() {
  return requestClient.post('/upVersion');
}

/**
 * 获取网络信息
 */
async function getNetWorkInfo() {
  return requestClient.post('/getNetWorkInfo');
}

/**
 * 设置有线网络
 */
async function setNetworkInfo(data: any) {
  return requestClient.post('/setNetworkInfo', data);
}

export {
  aboutDevice,
  addAccount,
  clearData,
  deleteAcount,
  getLogList,
  getNetWorkInfo,
  queryAcount,
  setNetworkInfo,
  upPassword,
  upVersion,
};
