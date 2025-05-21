<script lang="ts" setup>
import { useVbenModal } from '@vben/common-ui';

import { message } from 'ant-design-vue';

import { useVbenForm } from '#/adapter/form';
import { addCustomerApi } from '#/api';

defineOptions({
  name: 'FormModelDemo',
});

const [Form, formApi] = useVbenForm({
  handleSubmit: onSubmit,
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
    // modalApi.close();
  },
  onOpenChange(isOpen: boolean) {
    if (isOpen) {
      const { values } = modalApi.getData<Record<string, any>>();
      if (values) {
        formApi.setValues(values);
      }
    }
  },
  title: '新增客户',
});

function onSubmit(values: Record<string, any>) {
  message.loading({
    content: '正在提交中...',
    duration: 0,
    key: 'is-form-submitting',
  });
  modalApi.lock();
  // const resData = await addCustomerApi({
  //   page: page.currentPage,
  //   pageSize: page.pageSize,
  //   ...formValues,
  // });
  addCustomerApi(values)
    .then(() => {
      message.success({
        content: `提交成功：${JSON.stringify(values)}`,
        duration: 2,
        key: 'is-form-submitting',
      });
    })
    .catch(() => {
      modalApi.close();
    });
  // setTimeout(() => {
  //   modalApi.close();
  //   message.success({
  //     content: `提交成功：${JSON.stringify(values)}`,
  //     duration: 2,
  //     key: 'is-form-submitting',
  //   });
  // }, 3000);
}
</script>
<template>
  <Modal>
    <Form />
  </Modal>
</template>
