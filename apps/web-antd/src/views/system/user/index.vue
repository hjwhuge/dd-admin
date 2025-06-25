<script lang="ts" setup>
import type { VbenFormProps } from '#/adapter/form';
import type {
  VxeGridListeners,
  VxeTableGridOptions,
} from '#/adapter/vxe-table';
import type { UserApi } from '#/api';

import { Page, useVbenModal } from '@vben/common-ui';

import { Button, message, Popconfirm } from 'ant-design-vue';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { deleteAcount, queryAcount } from '#/api';

import FormModalEdit from './form.vue';
import FormModalPassword from './formPassword.vue';

const [FormModal, formModalApi] = useVbenModal({
  connectedComponent: FormModalEdit,
});
const [FormModalPd, formModalApiPassword] = useVbenModal({
  connectedComponent: FormModalPassword,
});

const formOptions: VbenFormProps = {
  // 默认展开
  collapsed: true,
  schema: [
    {
      component: 'Input',
      fieldName: 'account',
      label: '账号',
    },
  ],
  // 控制表单是否显示折叠按钮
  showCollapseButton: false,
  // 是否在字段值改变时提交表单
  submitOnChange: false,
  // 按下回车时是否提交表单
  submitOnEnter: true,
};

const gridOptions: VxeTableGridOptions<UserApi.RowType> = {
  checkboxConfig: {
    highlight: true,
    labelField: 'account',
  },
  columns: [
    { title: '序号', type: 'seq', width: 50 },
    { field: 'account', title: '账号', type: 'checkbox', align: 'left' },
    { field: 'password', title: '密码' },
    { slots: { default: 'userType' }, field: 'userType', title: '账号类型' },
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
        const resData = await queryAcount({
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
          .map((item: UserApi.RowType) => item.account)
          .join(',');
        customerDel(params);
      }
    }
  },
};

const customerAdd = () => {
  formModalApi.setData(null).open();
};

const customerEdit = (row: UserApi.RowType) => {
  formModalApiPassword.setData(row).open();
};

// 删除客户
const customerDel = (account: string) => {
  deleteAcount({ account })
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
        <span>{{ row.userType === '1' ? '管理员' : '普通账户' }}</span>
      </template>
      <template #action="{ row }">
        <Button type="link" @click="customerEdit(row)">修改密码</Button>
        <Popconfirm
          title="确定要删除吗?"
          ok-text="确定"
          cancel-text="取消"
          @confirm="customerDel(row.account)"
        >
          <Button type="link" danger>删除</Button>
        </Popconfirm>
      </template>
    </Grid>
    <FormModal @success="refreshGrid" />
    <FormModalPd @success="refreshGrid" />
  </Page>
</template>
