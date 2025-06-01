<script lang="ts" setup>
import type { UserApi } from '#/api';

import { ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';

import { message } from 'ant-design-vue';

import { useVbenForm } from '#/adapter/form';
import { upPassword } from '#/api';

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
      fieldName: 'passowrd',
      label: '原密码',
      rules: 'required',
    },
    {
      component: 'Input',
      fieldName: 'newPassword',
      label: '新密码',
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
        await upPassword(data).then(() => {
          message.success({
            content: '修改成功',
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
  title: '修改密码',
});

const formData = ref<UserApi.RowType>();
</script>
<template>
  <Modal>
    <Form />
  </Modal>
</template>
