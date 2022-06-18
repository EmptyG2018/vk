import { ref } from 'vue';

const useLoading = (state: boolean = false) => {
  // 当前显示
  const loading = ref<boolean>(state);

  // 隐藏加载状态
  const showLoading = (): void => {
    loading.value = true;
  };

  // 显示加载状态
  const hideLoading = (): void => {
    loading.value = false;
  };

  return {
    loading,
    showLoading,
    hideLoading,
  };
};

export default useLoading;
