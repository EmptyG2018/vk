<template>
  <a-card :title="title" :bordered="false" style="width: 100%">
    <template #extra>
      <a-space>
        <a-radio-group
          v-model:value="filter.sort"
          option-type="button"
          :options="sorts"
        />
      </a-space>
    </template>
    <a-table
      size="small"
      :data-source="data"
      :columns="columns"
      style="min-height: 429px"
    >
      <template #bodyCell="{ text, column, index }">
        <template v-if="column.key === 'value3'">
          <template v-if="index === 0">
            <FireFilled :style="{ color: '#e90000' }" /> {{ text }}
          </template>
          <template v-else-if="index === 1">
            <FireFilled :style="{ color: '#ff6a00' }" /> {{ text }}
          </template>
          <template v-else-if="index === 2">
            <FireFilled :style="{ color: '#ffe000' }" /> {{ text }}
          </template>
          <template v-else>{{ text }}</template>
        </template>
      </template>
    </a-table>
  </a-card>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, watchEffect } from 'vue';
import * as echarts from 'echarts';
import useRequest from '../hooks/useRequest';

withDefaults(
  defineProps<{
    title?: '红榜' | '黑榜';
  }>(),
  {
    title: '红榜',
  }
);

let echat: echarts.ECharts | undefined;

const sorts = [
  { label: '按完成量', value: 1 },
  { label: '按完成率', value: 2 },
];

const columns = [
  {
    title: '排名',
    dataIndex: 'value0',
    key: 'value0',
  },
  {
    title: '监管所',
    dataIndex: 'value1',
    key: 'value1',
  },
  {
    title: '负责人',
    dataIndex: 'value2',
    key: 'value2',
  },
  {
    title: '完成量',
    dataIndex: 'value3',
    key: 'value3',
  },
  {
    title: '完成率',
    dataIndex: 'value4',
    key: 'value4',
  },
];

const echatRef = ref();

const filter = reactive({
  sort: 1,
});

// 模拟数据
const mockData = (params: any) => {
  console.log(params);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          value1: '监管所',
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

const { data, run } = useRequest(mockData, {
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
  await run({ ...filter });
  mounteEchats();
});
</script>
