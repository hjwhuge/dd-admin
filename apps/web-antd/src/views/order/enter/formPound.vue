<script lang="ts" setup>
import type { orderApi } from '#/api';

import { ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';

import { message } from 'ant-design-vue';

import { useVbenForm } from '#/adapter/form';
import { addOutStorage } from '#/api';

defineOptions({
  name: 'FormModelOrderEnter',
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
      fieldName: 'selfOrderNumber',
      label: '厂内单号',
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
      fieldName: 'packagesNumber',
      label: '件数',
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
      fieldName: 'basicPrice',
      label: '基本金额',
      rules: 'required',
    },
    {
      component: 'Input',
      fieldName: 'weight',
      label: '重量',
    },
    {
      component: 'InputNumber',
      fieldName: 'address',
      label: '出货地址',
    },
    {
      component: 'InputNumber',
      fieldName: 'remark',
      label: '备注',
    },
    {
      component: 'Input',
      fieldName: 'userName',
      label: '客户名称',
    },
    {
      component: 'Input',
      fieldName: 'phone',
      label: '联系人',
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
        await addOutStorage(data).then(() => {
          message.success({
            content: '磅货成功',
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
      const data = modalApi.getData<orderApi.RowType>();
      if (data) {
        formData.value = data;
        formApi.setValues(formData.value);
      }
    }
  },
  title: '磅货',
});

const formData = ref<orderApi.RowType>();
</script>
<template>
  <Modal>
    <Form />
  </Modal>
</template>
