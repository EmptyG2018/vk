<template>
  <br />
  <p align="center">useVisible</p>
  <hr />
  {{ visible }}
  <button @click="showVisible">显示</button>
  <button @click="hideVisible">隐藏</button>

  <br />
  <p align="center">useLoading</p>
  <hr />
  {{ loading }}
  <button @click="showLoading">显示加载</button>
  <button @click="hideLoading">隐藏加载</button>

  <br />
  <p align="center">usePaging</p>
  <hr />
  <p>当前分页索引：{{ paging.current }}，当前分页大小：{{ paging.size }}</p>
  <button @click="jumpPage(2, 32)">设置索引：2，分页：32</button>

  <br />
  <p align="center">useEditModal</p>
  <hr />
  <button></button>
</template>

<script setup lang="ts">
import useVisible from './hooks/useVisible';
import useLoading from './hooks/useLoading';
import usePaging from './hooks/usePaging';

const { visible, showVisible, hideVisible } = useVisible();
const { loading, showLoading, hideLoading } = useLoading();
const { paging, jumpPage } = usePaging();
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
