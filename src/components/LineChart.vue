<template>
  <div class="big-box-style">
    <h2 style="color: #444">Traffic {{ timeframe }}</h2>
    <div id="chartContainer" style="height: 310px">
      <Line id="lineChart" :data="chartData" :options="chartOptions" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Line } from 'vue-chartjs';
import { useMonthlyStore } from '@/stores/months';
import { getMonthString } from '@/use/useParseDates';
import { useGetDates } from '@/use/useGetDates';
defineExpose({ updateLineChart });

const { getDateToday, getDateYearAgo } = useGetDates();

const storeMonthly = useMonthlyStore();
let months: string[] = [];
let monthlyStats: number[] = [];

for (const monthly of storeMonthly.itemsMonthly) {
  months.push(monthly.month);
  monthlyStats.push(monthly.sessions);
}

let chartData = ref({
  name: 'LineChart',
  labels: months,
  datasets: [
    {
      label: 'Monthly Traffic',
      data: monthlyStats,
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1,
    },
  ],
});

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
};

function capitalize(theString: string) {
  if (!theString) return theString;
  return theString.charAt(0).toUpperCase() + theString.slice(1);
}

let timeframe = ref('');

function updateLineChart(
  beginMonthIndex: number,
  beginYearIndex: number,
  endMonthIndex: number,
  endYearIndex: number,
) {
  const monthBegin = getMonthString(beginMonthIndex);
  const monthEnd = getMonthString(endMonthIndex);
  const monthEndForChart = getMonthString(endMonthIndex + 1);
  timeframe.value =
    capitalize(monthBegin.toLowerCase()) +
    ' ' +
    beginYearIndex +
    ' to ' +
    capitalize(monthEnd.toLowerCase()) +
    ' ' +
    endYearIndex;

  const filteredStartEntry = storeMonthly.itemsMonthly
    .filter((value) => {
      return value.month === monthBegin && value.year === beginYearIndex;
    })
    .map((value) => value.id);

  const filteredEndEntry = storeMonthly.itemsMonthly
    .filter((value) => {
      return value.month === monthEndForChart && value.year === endYearIndex;
    })
    .map((value) => value.id);

  const startDateId = filteredStartEntry[0];
  const endDateId = filteredEndEntry[0];
  const newArray = storeMonthly.itemsMonthly.slice(startDateId, endDateId);
  let months = [];
  let monthlyStats = [];
  let monthlyIds = [];
  for (const monthly of newArray) {
    months.push(monthly.month);
    monthlyStats.push(monthly.sessions);
    monthlyIds.push(monthly.id);
  }

  chartData.value = {
    name: 'LineChart',
    labels: months,
    datasets: [
      {
        label: 'Monthly Traffic',
        data: monthlyStats,
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };
}

onMounted(() => {
  const dateToDate = ref(getDateToday());
  const dateFromDate = ref(getDateYearAgo());
  const beginYearIndex = new Date(dateFromDate.value!).getUTCFullYear();
  const beginMonthIndex = new Date(dateFromDate.value!).getMonth();
  const endYearIndex = new Date(dateToDate.value!).getUTCFullYear();
  const endMonthIndex = new Date(dateToDate.value!).getMonth();
  updateLineChart(beginMonthIndex, beginYearIndex, endMonthIndex, endYearIndex);
});
</script>
