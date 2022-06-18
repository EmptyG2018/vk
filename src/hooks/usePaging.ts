import { reactive } from 'vue';

export type Paging = {
  current: number;
  size: number;
};

const usePaging = (option: Paging = { current: 1, size: 16 }) => {
  // 当前分页
  const paging: Paging = reactive(option);

  // 分页跳转
  const jumpPage = (
    current: number,
    size: number,
    fn?: (paging: Paging) => void
  ): void => {
    paging.current = current;
    paging.size = size;
    if (typeof fn === 'function') fn(paging);
  };

  return { paging, jumpPage };
};

export default usePaging;
