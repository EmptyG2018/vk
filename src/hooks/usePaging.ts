import { reactive } from 'vue';

export type PagingOption = {
  current: number;
  size: number;
};

const usePaging = (option: PagingOption = { current: 1, size: 16 }) => {
  // 当前分页
  const paging: PagingOption = reactive(option);

  // 分页跳转
  const jumpPage = (
    current: number,
    size: number,
    fn?: (paging: PagingOption) => void
  ): void => {
    paging.current = current;
    paging.size = size;
    if (typeof fn === 'function') fn(paging);
  };

  return { paging, jumpPage };
};

export default usePaging;
