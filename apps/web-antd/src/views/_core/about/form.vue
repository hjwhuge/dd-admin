<script lang="ts" setup>
import type { CustomerApi } from '#/api';

import { ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';

import { message } from 'ant-design-vue';

import { useVbenForm } from '#/adapter/form';
import { setNetworkInfo } from '#/api';

defineOptions({
  name: 'FormModelDemo',
});

const emit = defineEmits(['success']);

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
      component: 'Input',
      fieldName: 'ethIp',
      label: '有线网络Ip',
      rules: 'required',
    },
    {
      component: 'Input',
      fieldName: 'ethGateway',
      label: '有线网络网关',
      rules: 'required',
    },
    {
      component: 'Input',
      fieldName: 'ethMask',
      label: '有线网络掩码',
      rules: 'required',
    },
    {
      component: 'Input',
      fieldName: 'ethDNS1',
      label: '有线网络DNS1',
      rules: 'required',
    },
    {
      component: 'Input',
      fieldName: 'ethDNS2',
      label: '有线网络DNS2',
      rules: 'required',
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
      try {
        await setNetworkInfo(data).then(() => {
          message.success({
            content: '设置成功',
          });
        });
        modalApi.close();
        emit('success');
      } finally {
        modalApi.lock(false);
      }
    }
  },
  onOpenChange(isOpen: boolean) {
    if (isOpen) {
      const data = modalApi.getData<CustomerApi.RowType>();
      if (data) {
        formData.value = data;
        formApi.setValues(formData.value);
      }
    }
  },
  title: '新增客户',
});

const formData = ref<CustomerApi.RowType>();
</script>
<template>
  <Modal title="设置有线网络">
    <Form />
  </Modal>
</template>
