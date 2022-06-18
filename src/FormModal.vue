<template>
  <span @click="open">
    <slot></slot>
  </span>
  <a-modal
    :visible="visible"
    :mask-closable="false"
    :title="modalTitle"
    cancel-text="取消"
    ok-text="保存"
    @cancel="closeModal"
    @ok="submit"
  >
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
import useEditModal from './hooks/useEditModal';

const props = defineProps({
  hasTag: {
    type: Boolean,
    default: true,
  },
});

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

const beforeSubmit = (done) => {
  console.log('请求前操作');
  done.editAdd = {};
  done.addData = {};
  return done;
};

const addService = async (parmData, done) => {
  console.log('新增', parmData);
  done();
};

const editService = async (parmData, done) => {
  console.log('修改', parmData);
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
  modalVisible: false,
  beforeSubmit,
  addService,
  editService,
});

// 设置参数
const setRecord = (data) => {
  customRecord(
    data,
    (record) => {
      formData.materialId = record.materialId;
      formData.contentType = record.contentType;
      formData.title = record.title;
      formData.url = record.url;
      fileList.value = [
        {
          uid: '-1',
          status: 'done',
          fileType: record.contentType,
          url: record.url,
        },
      ];

      // 需要处理分类数据类型
      const menuId = `${record.menuId}`;
      formData.menuId = menuId
        ? deepFindMenuChain(dicts?.menus || [], menuId).reverse()
        : [];

      // 存在标签功能时，才回显数据
      if (props.hasTag) {
        const tags = record.tags
          ? record.tags.split(',').map((item) => item * 1)
          : [];
        formData.tags = tags;
      }
    },
    () => {
      fileList.value = [];
      formData.menuId = [];
    }
  );
};

defineExpose({ setDict, setRecord, open: openModal });
</script>
