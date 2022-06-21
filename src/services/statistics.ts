import request from './request';

export const GetStatistics = () => {
  return request<API.GetStatistics>({
    url: '/tongji/getDataList',
    method: 'post',
  });
};
