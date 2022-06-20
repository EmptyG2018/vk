<template>
  <br />
  <p align="center">useVisible</p>
  <a-switch v-model:checked="state" />
  <p>当前切换状态：{{ state }}</p>
  <button @click="on">开</button>
  <button @click="off">关</button>
  <hr />

  <br />
  <p align="center">useVisible</p>
  <a-button v-if="visible">我是小精灵</a-button>
  <p>当前显示状态：{{ visible }}</p>
  <button @click="showVisible">显示</button>
  <button @click="hideVisible">隐藏</button>
  <hr />

  <br />
  <p align="center">useLoading</p>
  <a-spin :spinning="loading">
    <a-alert
      message="Alert message title"
      description="Further details about the context of this alert."
    ></a-alert>
  </a-spin>
  <p>当前加载状态：{{ loading }}</p>
  <button @click="showLoading">显示加载</button>
  <button @click="hideLoading">隐藏加载</button>
  <hr />

  <br />
  <p align="center">usePaging</p>
  <a-pagination
    v-model:current="paging.current"
    v-model:pageSize="paging.size"
    :total="500"
  />
  <br />
  <p>当前分页索引：{{ paging.current }}，当前分页大小：{{ paging.size }}</p>
  <button @click="jumpPage(2, 32)">设置索引：2，分页：32</button>
  <hr />

  <br />
  <p align="center">useEditModal</p>
  <button @click="handleTestEditModalAction('add')">新增</button>
  <button @click="handleTestEditModalAction('edit')">修改</button>
  <hr />
  <TestEditModal ref="testEditModalRef" />

  <br />
  <p align="center">useFilter</p>
  <a-form layout="inline" autocomplete="off">
    <a-form-item label="名字" v-bind="validateInfos.username">
      <a-input v-model:value="formData.username">
        <template #prefix>
          <UserOutlined class="site-form-item-icon" />
        </template>
      </a-input>
    </a-form-item>

    <a-form-item label="性别" v-bind="validateInfos.sex">
      <a-radio-group v-model:value="formData.sex">
        <a-radio-button :value="1">男</a-radio-button>
        <a-radio-button :value="2">女</a-radio-button>
      </a-radio-group>
    </a-form-item>

    <a-form-item label="年龄" v-bind="validateInfos.age">
      <a-input-number v-model:value="formData.age" :min="1" :max="10" />
    </a-form-item>

    <a-form-item>
      <a-space>
        <a-button @click="resetFields">
          <template #icon><ReloadOutlined /></template>重置
        </a-button>
        <a-button type="primary" html-type="submit" @click="filterQuery">
          <template #icon><SearchOutlined /></template>查询
        </a-button>
      </a-space>
    </a-form-item>
  </a-form>
  <button @click="setFilterData">设置数据</button>
  <button @click="() => validate()">验证数据</button>
  <hr />
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';

import {
  UserOutlined,
  ReloadOutlined,
  SearchOutlined,
} from '@ant-design/icons-vue';
import TestEditModal from './components/TestEditModal.vue';
import useVisible from './hooks/useVisible';
import useToggle from './hooks/useToggle';
import useLoading from './hooks/useLoading';
import usePaging from './hooks/usePaging';
import useFilter from './hooks/useFilter';
// import useRequest from './hooks/useRequest';

const { visible, showVisible, hideVisible } = useVisible();
const { state, on, off } = useToggle();
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

const formData = reactive({
  username: '',
  sex: 1,
  age: 1,
});

// 校验规则
const rules = reactive({
  username: [
    {
      required: true,
      message: '请输入您的名字',
    },
  ],
  sex: [
    {
      required: true,
      message: '请选择性别',
    },
  ],
  age: [
    {
      required: true,
      message: '请输入年龄',
    },
  ],
});
const { validateInfos, resetFields, validate, filterQuery } = useFilter(
  formData,
  {
    rules,
    service: (data) => {
      console.log('data', data);
    },
  }
);

const setFilterData = () => {
  formData.username = '我是张三';
  formData.sex = 2;
  formData.age = 9;
};

// const mockService = () => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(true);
//     }, 2000);
//   });
// };

// const { run } = useRequest(mockService, {
//   immediate: false,
// });
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
