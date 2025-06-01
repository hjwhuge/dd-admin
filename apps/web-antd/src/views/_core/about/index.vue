<script setup lang="ts">
import { ref } from 'vue';

import { Page, useVbenModal } from '@vben/common-ui';

import { Button } from 'ant-design-vue';

import { aboutDevice, getNetWorkInfo } from '#/api';

import FormModalCustomer from './form.vue';

const [FormModal, formModalApi] = useVbenModal({
  connectedComponent: FormModalCustomer,
});

const basicItems: any = ref([
  {
    content: 'allUserCount',
    title: '总支持录入客户数',
    label: '',
  },
  {
    content: 'userCount',
    title: '当前客户数',
    label: '',
  },
  {
    content: 'allPutIntCount',
    title: '总支持入库数',
    label: '',
  },
  {
    content: 'putIntCount',
    title: '当前入库数',
    label: '',
  },
  {
    content: 'allOutCount',
    title: '总支持出库数',
    label: '',
  },
  {
    content: 'outCount',
    title: '当前出库数',
    label: '',
  },
  {
    content: 'version',
    title: '版本',
    label: '',
  },
  {
    content: 'systemId',
    title: '系统固件',
    label: '',
  },
  {
    content: 'mac',
    title: 'Mac地址',
    label: '',
  },
]);
const networkItems: any = ref([
  {
    content: 'ethIp',
    title: '有线网络Ip',
    label: '',
  },
  {
    content: 'ethGateway',
    title: '有线网络网关',
    label: '',
  },
  {
    content: 'ethMask',
    title: '有线网络掩码',
    label: '',
  },
  {
    content: 'ethDNS1',
    title: '有线网络DNS1',
    label: '',
  },
  {
    content: 'ethDNS2',
    title: '有线网络DNS2',
    label: '',
  },
  {
    content: 'wifiIp',
    title: '无线网络IP',
    label: '',
  },
  {
    content: 'wifiGateway',
    title: '无线网络网关',
    label: '',
  },
  {
    content: 'wifiMask',
    title: '无线网络掩码',
    label: '',
  },
  {
    content: 'wifiDNS1',
    title: '无线网络DNS1',
    label: '',
  },
  {
    content: 'wifiDNS2',
    title: '无线网络DNS2',
    label: '',
  },
]);
const newWorkData = ref({});
const getBasicData = () => {
  aboutDevice()
    .then((res) => {
      if (res) {
        basicItems.value = basicItems.value.map((item) => {
          item.label = res[item.content];
          return item;
        });
      }
    })
    .catch(() => {});
};
const getNetWorkData = () => {
  getNetWorkInfo()
    .then((res) => {
      if (res) {
        newWorkData.value = res;
        networkItems.value = networkItems.value.map((item) => {
          item.label = res[item.content];
          return item;
        });
      }
    })
    .catch(() => {});
};
getBasicData();
getNetWorkData();

const add = () => {
  formModalApi.setData(newWorkData.value).open();
};

/**
 * 刷新数据
 */
function refreshGrid() {
  getNetWorkData();
}
</script>

<template>
  <Page title="关于">
    <div class="card-box mb-4 p-5">
      <div>
        <h5 class="text-foreground text-lg">基本信息</h5>
      </div>
      <div class="mt-4">
        <dl class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <template v-for="item in basicItems" :key="item.title">
            <div class="border-border border-b px-4 py-6 sm:col-span-1 sm:px-0">
              <dt class="text-foreground text-sm font-medium leading-6">
                {{ item.title }}
              </dt>
              <dd class="text-foreground mt-1 text-sm leading-6 sm:mt-2">
                {{ item.label }}
              </dd>
            </div>
          </template>
        </dl>
      </div>
    </div>
    <div class="card-box p-5">
      <div class="flex justify-between">
        <h5 class="text-foreground text-lg">网络信息</h5>
        <Button type="primary" @click="add">设置有线网络</Button>
      </div>
      <div class="mt-4">
        <dl class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <template v-for="item in networkItems" :key="item.title">
            <div class="border-border border-b px-4 py-6 sm:col-span-1 sm:px-0">
              <dt class="text-foreground text-sm font-medium leading-6">
                {{ item.title }}
              </dt>
              <dd class="text-foreground mt-1 text-sm leading-6 sm:mt-2">
                {{ item.label }}
              </dd>
            </div>
          </template>
        </dl>
      </div>
    </div>
    <FormModal @success="refreshGrid" />
  </Page>
</template>
