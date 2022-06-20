import { ref } from 'vue';
import useLoading from './useLoading';

type Records = {
  [key: string]: any;
};

type RequestOption = {
  immediate?: boolean;
  defaultParams?: Records;
  onBefore?: (params?: Records) => void;
  onSuccess?: (result: any, params?: Records) => void;
  onError?: (error: any) => void;
  onFinally?: (params: Records | undefined, result: any, err: any) => void;
};

const useRequest = (
  service: (params?: Records) => Promise<any>,
  option: RequestOption = {}
) => {
  const { loading, showLoading, hideLoading } = useLoading(false);

  const data = ref<Records>();

  const error = ref<any>();

  const { immediate, defaultParams, onBefore, onSuccess, onError, onFinally } =
    option;

  const run = async (syncParams?: Records) => {
    if (typeof service !== 'function') return false;

    // const params = immediate ? defaultParams : syncParams;
    const params = syncParams || defaultParams;

    if (typeof onBefore === 'function') onBefore(params);

    showLoading();

    try {
      const result = await service(params);
      data.value = result;

      if (typeof onSuccess === 'function') onSuccess(data.value, params);
    } catch (err) {
      error.value = err;

      if (typeof onError === 'function') onError(error.value);
    } finally {
      hideLoading();

      if (typeof onFinally === 'function')
        onFinally(params, data.value, error.value);
    }
  };

  if (immediate) run();

  return {
    data,
    loading,
    error,
    run,
  };
};

export default useRequest;
