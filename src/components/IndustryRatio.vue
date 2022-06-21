<template>
  <a-spin :spinning="loading">
    <a-card :title="cardTitle" bordered style="width: 100%">
      <div
        ref="echatRef"
        :style="{
          width: '100%',
          height: '540px',
        }"
      ></div>
    </a-card>
  </a-spin>
</template>

<script setup lang="ts">
import { ref, onMounted, watchEffect } from 'vue';
import * as echarts from 'echarts';
import useRequest from '../hooks/useRequest';

let echat: echarts.ECharts | undefined;

const cardTitle = '行业分布';

const echatRef = ref();

// 模拟数据
const mockData = (params: any) => {
  console.log(params);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          label: '互联网',
          value: 14780,
        },
        {
          label: '电子',
          value: 14780,
        },
        {
          label: '金融',
          value: 14780,
        },
        {
          label: '服装业',
          value: 14780,
        },
        {
          label: '零售',
          value: 14780,
        },
        {
          label: '餐饮',
          value: 14780,
        },
      ]);
    }, 1000);
  });
};

const { data, loading, run } = useRequest(mockData, {
  immediate: false,
});

const mounteEchats = () => {
  const option = {
    tooltip: {
      trigger: 'item',
    },
    legend: {
      bottom: '5%',
      left: 'center',
    },
    series: [
      {
        type: 'pie',
        radius: ['40%', '60%'],
        label: {
          show: true,
          formatter: '{b}: {d}%',
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '40',
            fontWeight: 'bold',
          },
        },
        data: data.value,
      },
    ],
  };

  echat?.setOption(option);
};

onMounted(async () => {
  echat = echarts.init(echatRef.value);
});

watchEffect(async () => {
  await run();
  mounteEchats();
});
</script>
