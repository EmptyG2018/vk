<template>
  <a-layout :has-sider="false">
    <a-layout-header
      :style="{
        background: '#fff',
        padding: '0 24px',
        boxShadow: '0px 2px 4px 0px rgba(0,0,0,0.1)',
      }"
      >个挖个挖个</a-layout-header
    >
    <a-layout-content
      :style="{
        background: '#f0f2f5',
        padding: '16px 24px',
      }"
    >
      <a-card title="个转企进度" :bordered="false" style="width: 100%">
        <a-row>
          <a-col :span="12">
            <a-space direction="vertical" style="width: 100%">
              <a-row>
                <a-col :span="12">
                  <a-card title="全市任务进度" bordered style="width: 100%">
                  </a-card>
                </a-col>
                <a-col :span="12">
                  <IndustryRatio />
                </a-col>
              </a-row>
              <a-row>
                <a-col :span="24">
                  <a-card title="监管所红黑榜" bordered style="width: 100%">
                    <a-row>
                      <a-col :span="12">
                        <RankingList title="红榜" />
                      </a-col>
                      <a-col :span="12">
                        <RankingList title="红榜" />
                      </a-col>
                    </a-row>
                  </a-card>
                </a-col>
              </a-row>
            </a-space>
          </a-col>
          <a-col :span="12">
            <a-space direction="vertical" style="width: 100%">
              <RegionWorkComplete region="all" />
              <RegionWorkComplete region="area" />
            </a-space>
          </a-col>
        </a-row>
      </a-card>
    </a-layout-content>
  </a-layout>
</template>

<script setup lang="ts">
import { GetStatistics } from './services/statistics';
import useRequest from './hooks/useRequest';
import RankingList from './components/RankingList.vue';
import IndustryRatio from './components/IndustryRatio.vue';
import RegionWorkComplete from './components/RegionWorkComplete.vue';

const { data, loading } = useRequest(GetStatistics, {
  immediate: true,
});

</script>
