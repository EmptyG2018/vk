import { ref } from 'vue';

const useVisible = (state: boolean = false) => {
  // 当前显示
  const visible = ref<boolean>(state);

  // 设置隐藏
  const showVisible = (): void => {
    visible.value = true;
  };

  // 设置显示
  const hideVisible = (): void => {
    visible.value = false;
  };

  return {
    visible,
    showVisible,
    hideVisible,
  };
};

export default useVisible;
