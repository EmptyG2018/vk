import { Ref } from 'vue';
import { Form } from 'ant-design-vue';

type Records = {
  [key: string]: any;
};

type FilterOption = {
  rules?: Records | Ref<Records>;
  service: (data: Records) => void;
};

const useFilter = (formData: Records, option: FilterOption) => {
  const { rules, service } = option;
  const { resetFields, validate, validateInfos } = Form.useForm(
    formData,
    rules
  );

  // 查询
  const filterQuery = () => {
    validate().then(async () => {
      if (typeof service === 'function') service(formData);
    });
  };

  return {
    validateInfos,
    resetFields,
    validate,
    filterQuery,
  };
};

export default useFilter;
