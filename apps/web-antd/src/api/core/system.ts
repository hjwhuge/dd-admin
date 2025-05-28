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
export { addAccount, deleteAcount, queryAcount, upPassword };
