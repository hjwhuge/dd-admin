<script lang="ts" setup>
import { Page } from '@vben/common-ui';

import { Button } from 'ant-design-vue';
import printJS from 'print-js';

defineOptions({ name: 'AppLogo' });

function jsonPrint() {
  printJS({
    printable: [
      { name: 'll', email: '123@gmail.com', phone: '123' },
      { name: 'qq', email: '456@gmail.com', phone: '456' },
    ],
    properties: ['name', 'email', 'phone'],
    type: 'json',
  });
}

function imagePrint() {
  printJS({
    printable: [
      'https://picsum.photos/600/600',
      'https://picsum.photos/600/600',
    ],
    type: 'image',
    header: 'Multiple Images',
    imageStyle: 'width:100%;',
  });
}
</script>

<template>
  <Page auto-content-height title="打印示例">
    <Button type="primary" @click="jsonPrint">打印</Button>

    <Button type="primary" class="mt-5" @click="imagePrint">
      Image Print
    </Button>
  </Page>
</template>
