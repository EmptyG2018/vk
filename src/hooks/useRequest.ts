// type Records = {
//   [key: string]: any;
// };

type RequestOption = {
  immediate?: boolean;
};

const useRequest = (service: () => void, option: RequestOption = {}) => {
  const { immediate } = option;
  console.log(immediate);
};

export default useRequest;
