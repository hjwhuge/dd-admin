<script lang="ts" setup>
import type { VbenFormProps } from '#/adapter/form';
import type {
  VxeGridListeners,
  VxeTableGridOptions,
} from '#/adapter/vxe-table';
import type { orderApi } from '#/api';

import { Page } from '@vben/common-ui';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { queryOutStorage } from '#/api';

const formOptions: VbenFormProps = {
  // 默认展开
  collapsed: true,
  fieldMappingTime: [
    ['rangePicker', ['startTime', 'endTime'], 'YYYY-MM-DD hh:mm:ss'],
  ],
  schema: [
    {
      component: 'Input',
      fieldName: 'userName',
      label: '客户名称',
    },
    {
      component: 'Input',
      fieldName: 'manager',
      label: '联系人',
    },
    {
      component: 'Input',
      fieldName: 'productName',
      label: '产品名称',
    },
    {
      component: 'Input',
      fieldName: 'selfOrderNumber',
      label: '厂内单号',
    },
    {
      component: 'Input',
      fieldName: 'customerOderNumber',
      label: '来货单号',
    },
    {
      component: 'Input',
      fieldName: 'address',
      label: '出货地址',
    },
    {
      component: 'RangePicker',
      fieldName: 'rangePicker',
      label: '出货时间',
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
    label: '已审批',
    value: true,
  },
  {
    color: 'error',
    label: '未审批',
    value: false,
  },
];

const gridOptions: VxeTableGridOptions<orderApi.RowType> = {
  checkboxConfig: {
    highlight: true,
    labelField: 'userName',
  },
  columns: [
    { title: '序号', type: 'seq', width: 50 },
    {
      field: 'selfOrderNumber',
      title: '厂内订单号',
      type: 'checkbox',
      align: 'left',
      width: 120,
    },
    { field: 'userName', title: '客户名称' },
    { field: 'productName', title: '产品名称' },
    { field: 'color', title: '颜色' },
    { field: 'specification', title: '规格' },
    { field: 'quantity', title: '数量' },
    { field: 'price', title: '单价' },
    { field: 'packagesNumber', title: '件数' },
    { field: 'unit', title: '单位/KG' },
    { field: 'basicPrice', title: '基本费用' },
    { field: 'remark', title: '备注' },
    { field: 'outOrderTime', title: '出货时间' },
    { field: 'upOrderTime', title: '更新时间' },
    { field: 'orderPerson', title: '开单人员' },
    { field: 'examinePerson', title: '审批人员' },
    { field: 'examineTime', title: '审批时间' },
    {
      cellRender: { name: 'CellTag', options: StatusOptions },
      field: 'examineStatus',
      title: '审批状态',
    },
    { field: 'printNumber', title: '打印次数' },
    { field: 'address', title: '出货地址' },
    { field: 'manager', title: '联系人' },
    { field: 'phone', title: '联系电话' },
    { field: 'amount', title: '金额' },
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
        const resData = await queryOutStorage({
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
    buttons: [{ name: '导出记录', code: 'add', status: 'primary' }],
  },
};

const gridEvents: VxeGridListeners = {
  toolbarButtonClick(params) {
    if (params.code === 'add') {
      customerAdd();
    }
  },
};

const customerAdd = () => {
  // formModalApi.setData(null).open();
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
    <Grid />
    <FormModal @success="refreshGrid" />
  </Page>
</template>
