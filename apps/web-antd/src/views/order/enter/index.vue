<script lang="ts" setup>
import type { VbenFormProps } from '#/adapter/form';
import type {
  VxeGridListeners,
  VxeTableGridOptions,
} from '#/adapter/vxe-table';
import type { orderApi } from '#/api';

import { Page, useVbenModal } from '@vben/common-ui';

import { Button, message, Popconfirm } from 'ant-design-vue';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import {
  deletePutInStorage,
  putInStorageExamine,
  queryPutInStorage,
} from '#/api';

import FormModalEdit from './form.vue';
import FormModalPoundEdit from './formPound.vue';

const [FormModal, formModalApi] = useVbenModal({
  connectedComponent: FormModalEdit,
});

const [FormModalPound, formModalPoundApi] = useVbenModal({
  connectedComponent: FormModalPoundEdit,
});

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
      component: 'RangePicker',
      componentProps: {
        // 显示的时间格式
        showTime: {
          format: 'YYYY-MM-DD HH:mm:ss',
        },
      },
      fieldName: 'rangePicker',
      label: '入货时间',
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
    { field: 'userName', title: '客户名称', type: 'checkbox', align: 'left' },
    { field: 'productName', title: '产品名称' },
    { field: 'customerOderNumber', title: '来货单号' },
    { field: 'color', title: '颜色' },
    { field: 'specification', title: '规格' },
    { field: 'quantity', title: '数量' },
    { field: 'price', title: '单价' },
    { field: 'packagesNumber', title: '件数' },
    { field: 'unit', title: '单位/KG' },
    { field: 'basicPrice', title: '基本费用' },
    { field: 'remark', title: '备注' },
    { field: 'selfOrderNumber', title: '厂内订单号' },
    { field: 'examinePerson', title: '审批人员' },
    { field: 'examineTime', title: '审批时间' },
    {
      cellRender: { name: 'CellTag', options: StatusOptions },
      field: 'examineStatus',
      title: '审批状态',
    },
    { field: 'printNumber', title: '打印次数' },
    { field: 'amount', title: '金额' },
    {
      slots: { default: 'action' },
      field: 'action',
      fixed: 'right',
      title: '操作',
      width: 260,
      headerAlign: 'center',
      align: 'left',
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
        const resData = await queryPutInStorage({
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
      { name: '入货登记', code: 'add', status: 'primary' },
      { name: '删除', code: 'del', status: 'danger' },
    ],
  },
};

const gridEvents: VxeGridListeners = {
  toolbarButtonClick(params) {
    if (params.code === 'add') {
      oderAdd();
    }
    if (params.code === 'del') {
      const checkboxRecords = gridApi.grid.getCheckboxRecords();
      if (checkboxRecords && checkboxRecords.length > 0) {
        const params = checkboxRecords
          .map((item: orderApi.RowType) => item.selfOrderNumber)
          .join(',');
        oderDel(params);
      }
    }
  },
};

const oderAdd = () => {
  formModalApi.setData(null).open();
};

const oderEdit = (row: orderApi.RowType) => {
  formModalApi.setData(row).open();
};

// 删除客户
const oderDel = (selfOrderNumbers: string) => {
  deletePutInStorage({ selfOrderNumbers })
    .then(() => {
      message.success('删除成功');
      gridApi.query();
    })
    .catch(() => {});
};

// 入货审批
const orderExamine = (row: orderApi.RowType) => {
  putInStorageExamine({
    selfOrderNumber: row.selfOrderNumber,
    examineStatus: !row.examineStatus,
  })
    .then(() => {
      message.success('审批成功');
      gridApi.query();
    })
    .catch(() => {});
};

// 磅货
const pound = (row: orderApi.RowType) => {
  formModalPoundApi.setData(row).open();
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
      <template #action="{ row }">
        <Button type="link" @click="oderEdit(row)">编辑</Button>
        <Popconfirm
          title="确定要删除吗?"
          ok-text="确定"
          cancel-text="取消"
          @confirm="oderDel(row.selfOrderNumber)"
        >
          <Button type="link" danger>删除</Button>
        </Popconfirm>
        <Button type="link" @click="orderExamine(row)">
          {{ row.examineStatus ? '取消审批' : '审批' }}
        </Button>
        <Button type="link" @click="pound(row)"> 磅货 </Button>
      </template>
    </Grid>
    <FormModal @success="refreshGrid" />
    <FormModalPound @success="refreshGrid" />
  </Page>
</template>
