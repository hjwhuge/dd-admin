<script lang="ts" setup>
import type { CustomerApi } from '#/api';

import { computed, ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';

import { message } from 'ant-design-vue';

import { useVbenForm } from '#/adapter/form';
import { addCustomerApi, editCustomerApi } from '#/api';

defineOptions({
  name: 'FormModelDemo',
});

const emit = defineEmits(['success']);

const [Form, formApi] = useVbenForm({
  schema: [
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入',
      },
      fieldName: 'userName',
      label: '客户名称',
      rules: 'required',
    },
    {
      component: 'Input',
      fieldName: 'userShortName',
      label: '客户简称',
      rules: 'required',
    },
    {
      component: 'Input',
      fieldName: 'managerName',
      label: '联系人员姓名',
      rules: 'required',
    },
    {
      component: 'Select',
      componentProps: {
        options: [
          { label: '普通客户', value: '0' },
          { label: '特殊客户', value: '1' },
        ],
        placeholder: '请输入',
        width: 400,
      },
      fieldName: 'userType',
      label: '客户类型',
      rules: 'required',
    },
    {
      component: 'Input',
      fieldName: 'managerPhone',
      label: '联系人员电话',
    },
    {
      component: 'Input',
      fieldName: 'address',
      label: '客户地址',
    },
    {
      component: 'Input',
      fieldName: 'merchandiser',
      label: '厂内跟单人员',
      rules: 'required',
    },
    {
      component: 'Input',
      fieldName: 'line',
      label: '线路',
    },
    {
      component: 'Input',
      fieldName: 'fax',
      label: '传真',
    },
    {
      component: 'Input',
      fieldName: 'emailAddress',
      label: '电子邮箱',
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
      try {
        await (formData.value?.userCode
          ? editCustomerApi({
              userCode: formData.value?.userCode,
              ...data,
            }).then(() => {
              message.success({
                content: '更新成功',
              });
            })
          : addCustomerApi(data).then(() => {
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
      const data = modalApi.getData<CustomerApi.PageResParams>();
      if (data) {
        formData.value = data;
        formApi.setValues(formData.value);
      }
    }
  },
  title: '新增客户',
});

const formData = ref<CustomerApi.PageResParams>();

const getTitle = computed(() => {
  return formData.value?.userCode ? '新增客户' : '编辑客户';
});
</script>
<template>
  <Modal :title="getTitle">
    <Form />
  </Modal>
</template>
