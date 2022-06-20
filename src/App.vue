<template>
  <br />
  <p align="center">useVisible</p>
  {{ visible }}
  <button @click="showVisible">显示</button>
  <button @click="hideVisible">隐藏</button>
  <hr />

  <br />
  <p align="center">useLoading</p>
  {{ loading }}
  <button @click="showLoading">显示加载</button>
  <button @click="hideLoading">隐藏加载</button>
  <hr />

  <br />
  <p align="center">usePaging</p>
  <p>当前分页索引：{{ paging.current }}，当前分页大小：{{ paging.size }}</p>
  <button @click="jumpPage(2, 32)">设置索引：2，分页：32</button>
  <hr />

  <br />
  <p align="center">useEditModal</p>
  <button @click="handleTestEditModalAction('add')">新增</button>
  <button @click="handleTestEditModalAction('edit')">修改</button>
  <hr />
  <TestEditModal ref="testEditModalRef" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import TestEditModal from './components/TestEditModal.vue';
import useVisible from './hooks/useVisible';
import useLoading from './hooks/useLoading';
import usePaging from './hooks/usePaging';

const { visible, showVisible, hideVisible } = useVisible();
const { loading, showLoading, hideLoading } = useLoading();
const { paging, jumpPage } = usePaging();

const testEditModalRef = ref<InstanceType<typeof TestEditModal>>();

const handleTestEditModalAction = (type: 'add' | 'edit') => {
  const mockData = {
    id: 123,
    title: 'demo',
    name: '我叫张三',
  };
  testEditModalRef.value?.setDict({
    sin: [],
  });
  testEditModalRef.value?.setRecord(type === 'edit' ? mockData : undefined);
  testEditModalRef.value?.open();
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
