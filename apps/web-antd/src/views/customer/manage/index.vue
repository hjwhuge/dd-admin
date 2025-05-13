<script lang="ts" setup>
import type { VbenFormProps } from '#/adapter/form';
import type {
  VxeGridListeners,
  VxeTableGridOptions,
} from '#/adapter/vxe-table';

import { Page, useVbenModal } from '@vben/common-ui';

import { Button, message, Popconfirm } from 'ant-design-vue';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { getExampleTableApi } from '#/api';

import FormModalDemo from './customer-operate.vue';

const [FormModal, formModalApi] = useVbenModal({
  connectedComponent: FormModalDemo,
});

const openFormModal = () => {
  formModalApi
    .setData({
      // 表单值
      values: { field1: 'abc', field2: '123' },
    })
    .open();
};

interface RowType {
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

const formOptions: VbenFormProps = {
  // 默认展开
  collapsed: true,
  fieldMappingTime: [['date', ['start', 'end']]],
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

const gridOptions: VxeTableGridOptions<RowType> = {
  checkboxConfig: {
    highlight: true,
    labelField: 'name',
  },
  columns: [
    { title: '序号', type: 'seq', width: 50 },
    { align: 'left', field: 'userName', title: '客户名称', type: 'checkbox' },
    { field: 'userShortName', title: '客户简称' },
    { field: 'managerName', title: '联系人员姓名' },
    { field: 'userType', title: '客户类型' },
    { field: 'managerPhone', title: '联系人员电话' },
    { field: 'address', title: '客户地址' },
    { field: 'merchandiser', title: '厂内跟单人员' },
    { field: 'line', title: '线路' },
    { field: 'fax', title: '传真' },
    { field: 'emailAddress', title: '电子邮箱' },
    { field: 'enble', title: '客户状态' },
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
    ajax: {
      query: async ({ page }, formValues) => {
        message.success(`Query params: ${JSON.stringify(formValues)}`);
        return await getExampleTableApi({
          page: page.currentPage,
          pageSize: page.pageSize,
          ...formValues,
        });
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
    buttons: [{ name: '新增', code: 'myAdd', status: 'primary' }],
  },
};

const gridEvents: VxeGridListeners = {
  toolbarButtonClick(params) {
    console.log(params.code);
    openFormModal();
  },
};

// 修改客户

const customerDel = () => {
  console.log(6666);
};

const [Grid] = useVbenVxeGrid({
  formOptions,
  gridOptions,
  gridEvents,
});
</script>

<template>
  <Page auto-content-height>
    <Grid>
      <template #action>
        <Button type="link" @click="openFormModal">编辑</Button>
        <Popconfirm
          title="确定要删除吗?"
          ok-text="确定"
          cancel-text="取消"
          @confirm="customerDel"
        >
          <Button type="link" danger>删除</Button>
        </Popconfirm>
      </template>
    </Grid>
    <FormModal />
  </Page>
</template>
