import { Ref, ref, reactive, computed } from 'vue';
import { Form } from 'ant-design-vue';
import useVisible from './useVisible';

type Records = {
  [key: string]: any;
};

type EditModalOption = {
  title: string;
  rules?: Records | Ref<Records>;
  visible: boolean;
  beforeSubmit?: () => void;
  addSubmit?: () => void;
  editSubmit?: () => void;
};

const useEditModal = (formData: Records, option: EditModalOption) => {
  const {
    title,
    rules,
    visible: modalVisible,
    beforeSubmit,
    addSubmit,
    editSubmit,
  } = option;
  const { visible, showVisible, hideVisible } = useVisible(modalVisible);
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
    record: Records,
    editIntercept: (record: Records) => void,
    addIntercept: () => void
  ) => {
    resetFields();
    if (record) {
      isModalUpdate.value = true;
      const keys = Object.keys(record);
      if (typeof editIntercept !== 'function') {
        // 不使用拦截器，记录编辑数据
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
      let addData;
      let editdata;
      if (typeof beforeSubmit === 'function') {
        const beforeSubmitOk = beforeSubmit((allFormData = {}) => {
          addFormData = allFormData?.addFormData;
          editFormData = allFormData?.editFormData;
        });
        if (!beforeSubmitOk) return false;
      }

      if (isModalUpdate.value) {
        if (typeof editService === 'function')
          editSubmit(editFormData, closeModal);
      } else if (typeof addService === 'function')
        addSubmit(addFormData, closeModal);
      return true;
    });
  };

  return {
    visible,
    dicts,
    modalTitle,
    isModalUpdate,
    validateInfos,
    openModal: showVisible,
    closeModal: hideVisible,
    setDict,
    setRecord,
    submit,
    resetFields,
  };
};

export default useEditModal;
