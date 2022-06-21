<template>
  <a-spin :spinning="loading">
    <a-card :title="cardTitle" bordered style="width: 100%">
      <template #extra>
        <a-space>
          <a-radio-group
            v-model:value="filter.sort"
            option-type="button"
            :options="sorts"
          />
        </a-space>
      </template>
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
import { ref, reactive, computed, onMounted, watchEffect } from 'vue';
import * as echarts from 'echarts';
import useRequest from '../hooks/useRequest';

const props = withDefaults(
  defineProps<{
    region?: 'all' | 'area';
    title?: string;
    id?: number;
  }>(),
  {
    region: 'all',
    title: '',
    id: 0,
  }
);

let echat: echarts.ECharts | undefined;

const sorts = [
  { label: '按完成量', value: 1 },
  { label: '按完成率', value: 2 },
];

const echatRef = ref();

const filter = reactive({
  sort: 1,
});

// const isNull = computed(() => !!(props.id && props.title));

// 卡片标题
const cardTitle = computed(() => {
  if (props.region === 'all') return '各区完成情况';
  return props.title && props.title + '局监管所完成情况';
});

// 模拟数据
const mockData = (params: any) => {
  console.log(params);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          label: '大鹏区',
          value1: 14780,
          value2: 9482,
        },
        {
          label: '深山区',
          value1: 14780,
          value2: 9482,
        },
        {
          label: '盐田区',
          value1: 14780,
          value2: 9482,
        },
        {
          label: '南山区',
          value1: 14780,
          value2: 9482,
        },
        {
          label: '光明区',
          value1: 14780,
          value2: 9482,
        },
        {
          label: '坪山区',
          value1: 14780,
          value2: 9482,
        },
        {
          label: '龙岗区',
          value1: 14780,
          value2: 9482,
        },
        {
          label: '罗湖区',
          value1: 14780,
          value2: 9482,
        },
        {
          label: '福田区',
          value1: 14780,
          value2: 9482,
        },
      ]);
    }, 1000);
  });
};

const { data, loading, run } = useRequest(mockData, {
  immediate: false,
});

const echatData = computed(() => {
  const xAxisData = [];
  const completeData = [];
  const completeRatioData = [];
  const reocrds = data?.value || [];
  for (let i = 0, j = reocrds.length; i < j; i++) {
    xAxisData.push(reocrds[i].label);
    completeData.push(reocrds[i]?.value1);
    completeRatioData.push(reocrds[i]?.value2);
  }
  return {
    xAxisData,
    completeData,
    completeRatioData,
  };
});

const mounteEchats = () => {
  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
      formatter: function (params: any) {
        let relVal = params[0].name;
        for (let i = 0, l = params.length; i < l; i++) {
          relVal +=
            '<br/>' +
            params[i].marker +
            params[i].seriesName +
            '：' +
            params[i].value +
            '个';
        }
        return relVal;
      },
    },
    legend: {
      icon: 'circle',
      right: '0',

      selectedMode: 'quote',
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      boundaryGap: [0, 0.01],
      data: echatData.value.xAxisData,
    },
    yAxis: {
      type: 'value',
      name: '单位：家',
      splitLine: {
        show: true,
        lineStyle: {
          type: 'dashed',
        },
      },
    },
    series: [
      {
        name: '任务数',
        type: 'bar',
        data: echatData.value.completeData,
        barMaxWidth: 28,
        itemStyle: {
          color: 'red',
        },
      },
      {
        name: '已完成',
        type: 'bar',
        data: echatData.value.completeRatioData,
        barMaxWidth: 28,
        itemStyle: {
          color: 'blue',
        },
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
