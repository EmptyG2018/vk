<template>
  <a-modal
    :visible="visible"
    :mask-closable="false"
    :title="modalTitle"
    cancel-text="取消"
    ok-text="保存"
    @cancel="closeModal"
    @ok="submit"
  >
    {{ dicts }}
    <a-form
      label-align="right"
      :label-col="{ span: 6 }"
      :wrapper-col="{ span: 14 }"
      autocomplete="off"
    >
      <a-form-item label="标题" v-bind="validateInfos.title">
        <a-input
          v-model:value="formData.title"
          type="text"
          placeholder="请输入标题"
        />
      </a-form-item>

      <a-form-item label="名字" v-bind="validateInfos.name">
        <a-input
          v-model:value="formData.name"
          type="text"
          placeholder="请输入名字"
        />
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script setup lang="ts">
import { reactive } from 'vue';
import useEditModal from '../hooks/useEditModal';

// 弹窗标题
const title = '素材相册';

// 校验规则
const rules = reactive({
  title: [
    {
      required: true,
      message: '请输入标题',
    },
  ],
  name: [
    {
      required: true,
      message: '请输入名字',
    },
  ],
});

// 弹窗表单数据
const formData = reactive({
  title: '',
  name: '',
});
const addSubmit = async (
  data: { [key: string]: any } | undefined,
  done: () => void
) => {
  console.log('新增', data);
  done();
};

const editSubmit = async (
  data: { [key: string]: any } | undefined,
  done: () => void
) => {
  console.log('修改', data);
  done();
};

const {
  visible,
  modalTitle,
  dicts,
  validateInfos,
  setDict,
  setRecord: customRecord,
  openModal,
  closeModal,
  submit,
} = useEditModal(formData, {
  title,
  rules,
  visible: false,
  addSubmit,
  editSubmit,
});

const setRecord = (data: any) => {
  customRecord(
    data,
    (record) => {
      formData.title = '11111';
      formData.name = '22222';
    },
    () => {
      formData.title = '3333';
      formData.name = '4444';
    }
  );
};

defineExpose({ setDict, setRecord, open: openModal });
</script>
