<script lang="ts" setup>
import type { VxeTableGridOptions } from '#/adapter/vxe-table';
import type { UserApi } from '#/api';

import { Page } from '@vben/common-ui';

import { Button } from 'ant-design-vue';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { getLogList } from '#/api';

const gridOptions: VxeTableGridOptions<UserApi.RowType> = {
  checkboxConfig: {
    highlight: false,
    labelField: '',
  },
  columns: [
    // { title: '序号', type: 'seq', width: 50 },
    { field: 'code', title: '日志编号', align: 'center' },
    { slots: { default: 'url' }, field: 'url', title: '日志下载地址' },
  ],
  exportConfig: {},
  height: 'auto',
  keepSource: true,
  pagerConfig: {},
  proxyConfig: {
    response: {
      result: 'data',
      total: '',
      list: '',
    },
    ajax: {
      query: async () => {
        const resData = await getLogList();
        return { data: resData };
      },
    },
  },
  toolbarConfig: {
    custom: false,
    export: false,
    refresh: false,
    resizable: true,
    search: false,
    zoom: false,
  },
};

const [Grid] = useVbenVxeGrid({
  gridOptions,
});
</script>

<template>
  <Page auto-content-height title="日志列表">
    <Grid>
      <template #url="{ row }">
        <Button type="link" :href="row.url">下载</Button>
      </template>
    </Grid>
  </Page>
</template>
