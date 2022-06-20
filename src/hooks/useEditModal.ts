import { Ref, ref, reactive, computed } from 'vue';
import { Form } from 'ant-design-vue';
import useVisible from './useVisible';

type Records = {
  [key: string]: any;
};

export type BeforeFormData = {
  addData?: Records;
  editData?: Records;
};

type EditModalOption = {
  title: string;
  rules?: Records | Ref<Records>;
  visible: boolean;
  beforeSubmit?: (data: BeforeFormData) => Records | false;
  addSubmit?: (data: Records | undefined, done: () => void) => void;
  editSubmit?: (data: Records | undefined, done: () => void) => void;
};

const useEditModal = (formData: Records, option: EditModalOption) => {
  const { title, rules, visible, beforeSubmit, addSubmit, editSubmit } = option;
  const {
    visible: modalVisible,
    showVisible: showModalVisible,
    hideVisible: hideModalVisible,
  } = useVisible(visible);
  const { resetFields, validate, validateInfos } = Form.useForm(
    formData,
    rules
  );

  // 字典
  const dicts: Records = reactive({});

  // 是否修改弹窗
  const isModalUpdate = ref<boolean>(false);

  // 弹窗标题
  const modalTitle = computed<string>(
    () => (isModalUpdate.value ? '修改' : '新增') + title
  );

  // 设置字典
  const setDict = (dictMap: Records): void => {
    const keys = Object.keys(dictMap);

    for (let i = 0, j = keys.length; i < j; i += 1) {
      dicts[keys[i]] = dictMap[keys[i]];
    }
  };

  // 设置记录数据
  const setRecord = (
    record?: Records,
    editIntercept?: (record: Records) => void,
    addIntercept?: () => void
  ) => {
    resetFields();
    if (record) {
      isModalUpdate.value = true;
      const keys = Object.keys(record);

      // 不使用拦截器，记录编辑数据
      if (typeof editIntercept !== 'function') {
        for (let i = 0, j = keys.length; i < j; i += 1) {
          formData[keys[i]] = record[keys[i]];
        }
        return;
      }

      // 处理自定义编辑记录数据
      editIntercept(record);
    } else {
      isModalUpdate.value = false;
      if (typeof addIntercept !== 'function') return;

      // 处理自定义新增操作
      addIntercept();
    }
  };

  // 提交
  const submit = () => {
    validate().then(async () => {
      const formData: BeforeFormData = {};
      if (typeof beforeSubmit === 'function') {
        // 处理请求前，逻辑处理
        const beforeSubmitData = beforeSubmit(formData);

        if (!beforeSubmitData) return false;
      }

      // 处理修改请求操作
      if (isModalUpdate.value && typeof editSubmit === 'function')
        editSubmit(formData.editData, hideModalVisible);

      // 处理新增请求操作
      if (!isModalUpdate.value && typeof addSubmit === 'function')
        addSubmit(formData.addData, hideModalVisible);
    });
  };

  return {
    visible: modalVisible,
    dicts,
    modalTitle,
    isModalUpdate,
    validateInfos,
    openModal: showModalVisible,
    closeModal: hideModalVisible,
    setDict,
    setRecord,
    submit,
    resetFields,
  };
};

export default useEditModal;
