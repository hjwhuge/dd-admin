<script lang="ts" setup>
import type { VbenFormProps } from '#/adapter/form';
import type {
  VxeGridListeners,
  VxeTableGridOptions,
} from '#/adapter/vxe-table';
import type { CustomerApi } from '#/api';

import { Page, useVbenModal } from '@vben/common-ui';

import { Button, message, Popconfirm } from 'ant-design-vue';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { delCustomerApi, getCustomerApi } from '#/api';

import FormModalEdit from './customer-operate.vue';

const [FormModal, formModalApi] = useVbenModal({
  connectedComponent: FormModalEdit,
});

const formOptions: VbenFormProps = {
  // 默认展开
  collapsed: true,
  schema: [
    {
      component: 'Input',
      fieldName: 'userName',
      label: '客户名称',
    },
    {
      component: 'Input',
      fieldName: 'merchandiser',
      label: '厂内跟单人员',
    },
  ],
  // 控制表单是否显示折叠按钮
  showCollapseButton: false,
  // 是否在字段值改变时提交表单
  submitOnChange: false,
  // 按下回车时是否提交表单
  submitOnEnter: true,
};

const StatusOptions = [
  {
    color: 'success',
    label: '已启用',
    value: true,
  },
  {
    color: 'error',
    label: '已禁用',
    value: false,
  },
];

const gridOptions: VxeTableGridOptions<CustomerApi.RowType> = {
  checkboxConfig: {
    highlight: true,
    labelField: 'userName',
  },
  columns: [
    { title: '序号', type: 'seq', width: 50 },
    { field: 'userName', title: '客户名称', type: 'checkbox', align: 'left' },
    // { field: 'userName', title: '客户名称', align: 'left' },
    { field: 'userShortName', title: '客户简称' },
    { field: 'managerName', title: '联系人员姓名' },
    { slots: { default: 'userType' }, field: 'userType', title: '客户类型' },
    { field: 'managerPhone', title: '联系人员电话' },
    { field: 'address', title: '客户地址' },
    { field: 'merchandiser', title: '厂内跟单人员' },
    { field: 'line', title: '线路' },
    { field: 'fax', title: '传真' },
    { field: 'emailAddress', title: '电子邮箱' },
    {
      cellRender: { name: 'CellTag', options: StatusOptions },
      field: 'enble',
      title: '客户状态',
    },
    { field: 'remark', title: '备注' },
    {
      slots: { default: 'action' },
      field: 'action',
      fixed: 'right',
      title: '操作',
      width: 180,
    },
  ],
  exportConfig: {},
  height: 'auto',
  keepSource: true,
  pagerConfig: {},
  proxyConfig: {
    response: {
      result: 'data',
      total: 'totalSize',
      list: 'data',
    },
    ajax: {
      query: async ({ page }, formValues) => {
        // message.success(`Query params: ${JSON.stringify(formValues)}`);
        const resData = await getCustomerApi({
          page: page.currentPage,
          pageSize: page.pageSize,
          ...formValues,
        });
        return resData;
      },
    },
  },
  toolbarConfig: {
    custom: true,
    export: false,
    refresh: false,
    resizable: true,
    search: false,
    zoom: false,
    buttons: [
      { name: '新增', code: 'add', status: 'primary' },
      { name: '删除', code: 'del', status: 'danger' },
    ],
  },
};

const gridEvents: VxeGridListeners = {
  toolbarButtonClick(params) {
    if (params.code === 'add') {
      customerAdd();
    }
    if (params.code === 'del') {
      const checkboxRecords = gridApi.grid.getCheckboxRecords();
      if (checkboxRecords && checkboxRecords.length > 0) {
        const params = checkboxRecords
          .map((item: CustomerApi.RowType) => item.userCode)
          .join(',');
        customerDel(params);
      }
    }
  },
};

const customerAdd = () => {
  formModalApi.setData(null).open();
};

const customerEdit = (row: CustomerApi.RowType) => {
  formModalApi.setData(row).open();
};

// 删除客户
const customerDel = (userCodes: string) => {
  delCustomerApi({ userCodes })
    .then(() => {
      message.success('删除成功');
      gridApi.query();
    })
    .catch(() => {});
};

const [Grid, gridApi] = useVbenVxeGrid({
  formOptions,
  gridOptions,
  gridEvents,
});

/**
 * 刷新表格
 */
function refreshGrid() {
  gridApi.query();
}
</script>

<template>
  <Page auto-content-height>
    <Grid>
      <template #userType="{ row }">
        <span>{{ row.userType === '0' ? '普通客户' : '特殊客户' }}</span>
      </template>
      <template #action="{ row }">
        <Button type="link" @click="customerEdit(row)">编辑</Button>
        <Popconfirm
          title="确定要删除吗?"
          ok-text="确定"
          cancel-text="取消"
          @confirm="customerDel(row.userCode)"
        >
          <Button type="link" danger>删除</Button>
        </Popconfirm>
      </template>
    </Grid>
    <FormModal @success="refreshGrid" />
  </Page>
</template>
