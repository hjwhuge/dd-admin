<script lang="ts" setup>
import type { orderApi } from '#/api';

import { computed, h, ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';

import { useDebounceFn } from '@vueuse/core';
import { message, Spin } from 'ant-design-vue';

import { useVbenForm } from '#/adapter/form';
import { editPutInStorage, getCustomerApi, putInStorage } from '#/api';

defineOptions({
  name: 'FormModelOrderEnter',
});

const emit = defineEmits(['success']);

const keyword = ref('');
const fetching = ref(false);
const customerList = ref<any>([]);
// 模拟远程获取数据
function fetchRemoteOptions() {
  fetching.value = true;
  return new Promise((resolve) => {
    getCustomerApi({ page: 1, pageSize: 100 })
      .then((res) => {
        customerList.value = res.data;
        const options = res.data.map((item) => ({
          label: item.userName,
          value: item.userCode,
        }));
        resolve(options);
      })
      .finally(() => {
        fetching.value = false;
      });
  });
}

const [Form, formApi] = useVbenForm({
  commonConfig: {
    // 在label后显示一个冒号
    colon: true,
    // 所有表单项
    componentProps: {
      class: 'w-full',
    },
  },
  schema: [
    {
      component: 'ApiSelect',
      // 对应组件的参数
      componentProps: () => {
        return {
          api: fetchRemoteOptions,
          // 禁止本地过滤
          filterOption: false,
          // 如果正在获取数据，使用插槽显示一个loading
          notFoundContent: fetching.value ? undefined : null,
          // 搜索词变化时记录下来， 使用useDebounceFn防抖。
          onSearch: useDebounceFn((value: string) => {
            keyword.value = value;
          }, 300),
          // 远程搜索参数。当搜索词变化时，params也会更新
          params: {
            keyword: keyword.value || undefined,
          },
          showSearch: true,
        };
      },
      // 字段名
      fieldName: 'userCode',
      // 界面显示的label
      label: '客户名称',
      renderComponentContent: () => {
        return {
          notFoundContent: fetching.value ? h(Spin) : undefined,
        };
      },
      rules: 'selectRequired',
    },
    {
      component: 'Input',
      fieldName: 'productName',
      label: '产品名称',
      rules: 'required',
    },
    {
      component: 'Input',
      fieldName: 'customerOderNumber',
      label: '来货单号',
    },
    {
      component: 'Input',
      fieldName: 'color',
      label: '颜色',
      rules: 'required',
    },
    {
      component: 'Input',
      fieldName: 'specification',
      label: '规格',
      rules: 'required',
    },
    {
      component: 'InputNumber',
      fieldName: 'quantity',
      label: '数量',
      rules: 'required',
    },
    {
      component: 'InputNumber',
      fieldName: 'price',
      label: '单价',
      rules: 'required',
    },
    {
      component: 'InputNumber',
      fieldName: 'packagesNumber',
      label: '件数',
    },
    {
      component: 'InputNumber',
      fieldName: 'weight',
      label: '重量',
      rules: 'required',
    },
    {
      component: 'InputNumber',
      fieldName: 'basicPrice',
      label: '基本费用',
    },
    {
      component: 'Input',
      fieldName: 'remark',
      label: '备注',
    },
  ],
  showDefaultActions: false,
});

const [Modal, modalApi] = useVbenModal({
  fullscreenButton: false,
  onCancel() {
    modalApi.close();
  },
  onConfirm: async () => {
    await formApi.validateAndSubmitForm();

    const { valid } = await formApi.validate();
    if (valid) {
      modalApi.lock();
      const data = await formApi.getValues();
      const userName = customerList.value.find(
        (item) => item.userCode === data.userCode,
      ).userName;
      data.userName = userName;
      try {
        await (formData.value?.selfOrderNumber
          ? editPutInStorage({
              selfOrderNumber: formData.value?.selfOrderNumber,
              ...data,
            }).then(() => {
              message.success({
                content: '更新成功',
              });
            })
          : putInStorage(data).then(() => {
              message.success({
                content: '新增成功',
              });
            }));
        modalApi.close();
        emit('success');
      } finally {
        modalApi.lock(false);
      }
    }
  },
  onOpenChange(isOpen: boolean) {
    if (isOpen) {
      const data = modalApi.getData<orderApi.RowType>();
      if (data) {
        formData.value = data;
        formApi.setValues(formData.value);
      }
    }
  },
  title: '入货登记',
});

const formData = ref<orderApi.RowType>();

const getTitle = computed(() => {
  return formData.value?.selfOrderNumber ? '入货编辑' : '入货登记';
});
</script>
<template>
  <Modal :title="getTitle">
    <Form />
  </Modal>
</template>
