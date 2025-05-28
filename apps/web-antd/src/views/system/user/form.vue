<script lang="ts" setup>
import type { UserApi } from '#/api';

import { ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';

import { message } from 'ant-design-vue';

import { useVbenForm } from '#/adapter/form';
import { addAccount } from '#/api';

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
      componentProps: {
        placeholder: '请输入',
      },
      fieldName: 'account',
      label: '账号',
      rules: 'required',
    },
    {
      component: 'Input',
      fieldName: 'password',
      label: '密码',
      rules: 'required',
    },
    {
      component: 'Select',
      componentProps: {
        options: [
          { label: '普通账户', value: '0' },
          { label: '管理员', value: '1' },
        ],
        placeholder: '请输入',
        width: 400,
      },
      fieldName: 'userType',
      label: '账号类型',
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
        await addAccount(data).then(() => {
          message.success({
            content: '新增成功',
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
      const data = modalApi.getData<UserApi.RowType>();
      if (data) {
        formData.value = data;
        formApi.setValues(formData.value);
      }
    }
  },
  title: '新增账号',
});

const formData = ref<UserApi.RowType>();
</script>
<template>
  <Modal>
    <Form />
  </Modal>
</template>
