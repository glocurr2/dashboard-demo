<template>
  <div>
    <div class="main-container">
      <Sidebar @nav-to-detail="handleDetailEvent" />

      <div class="row1">
        <div class="input-container">
          <div class="time-period">TIME PERIOD</div>
          <label for="dateFrom" style="float: left">FROM: &nbsp;</label>
          <input
            type="date"
            id="dateFrom"
            min="2024-01-01"
            max="2026-12-31"
            class="date-input block rounded-md border-gray-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
            v-model="dateFromDate"
          />
          <div>
            <label for="dateTo" class="date-to">TO: &nbsp;</label>
            <input
              type="date"
              id="dateTo"
              min="2024-01-01"
              max="2026-12-31"
              class="date-input block rounded-md border-gray-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
              v-model="dateToDate"
            />
          </div>
          <div class="btn-container">
            <button
              @click="updateCharts(0, 0)"
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded btn-spacer"
            >
              GO
            </button>
          </div>
        </div>
        <div style="clear-both"></div>
      </div>

      <div class="row2" style="">
        <div class="gradient-background-pink mid-box-style">
          Total Users:<br />
          {{ totalUsers }}K
        </div>

        <div class="gradient-background-purple mid-box-style">
          New Users:<br />
          {{ newUsers }}K
        </div>

        <div class="gradient-background-blue mid-box-style mid-box-style-alt">
          Conversions:<br />
          {{ conversions }}K
        </div>
      </div>

      <div class="row3" style="">
        <div class="big-box-style">
          <h2 style="color: #444">Traffic {{ timeframe }}</h2>
          <div id="chartContainer" style="height: 310px">
            <Line id="lineChart" :data="chartData" :options="chartOptions" />
          </div>
        </div>
        <div class="break-row"></div>
        <div class="big-box-style pie-chart">
          <h2 style="color: #444">Conversions by Region</h2>
          <div>
            <Pie :data="chartData2" :options="chartOptions2" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Sidebar from '@/components/Sidebar.vue';
import { getMonthString } from '@/use/useParseDates';
import { Line } from 'vue-chartjs';
import { Pie } from 'vue-chartjs';
import { useCountryStore } from '@/stores/countries';
import { useMonthlyStore } from '@/stores/months';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from 'chart.js';

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
);

const router = useRouter();

const handleDetailEvent = () => {
  router.push('/detail');
};

let conversions = ref(100.35);
let newUsers = ref(54.04);
let totalUsers = ref(82.35);
let timeframe = ref('');

const dateFromDate = ref('2025-01-01');
const dateToDate = ref('2026-04-15');

const beginMonthIndex = new Date(dateFromDate.value).getMonth() + 1;
const endMonthIndex = new Date(dateToDate.value).getMonth() + 1;
const monthBegin = getMonthString(beginMonthIndex);
const monthEnd = getMonthString(endMonthIndex);
timeframe.value =
  capitalize(monthBegin.toLowerCase()) +
  ' ' +
  new Date(dateFromDate.value).getFullYear() +
  ' to ' +
  capitalize(monthEnd.toLowerCase()) +
  ' ' +
  new Date(dateToDate.value).getFullYear();

function capitalize(theString: string) {
  if (!theString) return theString;
  return theString.charAt(0).toUpperCase() + theString.slice(1);
}

let storeMonthly = useMonthlyStore();
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

const storeCountries = useCountryStore();
const countries: string[] = [];
interface Session {
  sessions: number;
}
let sessions: number[] = [];

for (const country of storeCountries.itemsCountries) {
  countries.push(country.country);
  sessions.push(country.sessions);
}

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);

const arrBkgdColors = ['#2065e7', '#bda8fc', '#8147f7', '#31e9f4', '#cc8b9d'];

let chartData2 = ref({
  labels: countries,
  datasets: [
    {
      backgroundColor: arrBkgdColors,
      data: sessions,
    },
  ],
});

const chartOptions2 = ref({
  responsive: true,
  maintainAspectRatio: false,
});

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
function randomFloat(min: number, max: number): number {
  const str = (Math.random() * (max - min) + min).toFixed(2);
  return parseFloat(str);
}

function updateCharts(beginInt: number | 0, endInt: number | 0) {
  //Update Line Chart
  const beginMonthIndex = new Date(dateFromDate.value).getMonth() + 1;
  const beginYearIndex: number = new Date(dateFromDate.value).getFullYear();
  const endMonthIndex = new Date(dateToDate.value).getMonth() + 1;
  const endYearIndex: number = new Date(dateToDate.value).getFullYear();
  console.log(beginMonthIndex, beginYearIndex, endMonthIndex, endYearIndex);

  let monthBegin = getMonthString(beginMonthIndex);
  let monthEnd = getMonthString(endMonthIndex);

  timeframe.value =
    capitalize(monthBegin.toLowerCase()) +
    ' ' +
    new Date(dateFromDate.value).getFullYear() +
    ' to ' +
    capitalize(monthEnd.toLowerCase()) +
    ' ' +
    new Date(dateToDate.value).getFullYear();

  const filteredStartEntry = storeMonthly.itemsMonthly
    .filter((value) => {
      return value.month === monthBegin && value.year === beginYearIndex;
    })
    .map((value) => value.id);

  const filteredEndEntry = storeMonthly.itemsMonthly
    .filter((value) => {
      return value.month === monthEnd && value.year === endYearIndex;
    })
    .map((value) => value.id);

  const startDateId = filteredStartEntry[0];
  const endDateId = filteredEndEntry[0];

  const newArray = storeMonthly.itemsMonthly.slice(startDateId, endDateId);
  console.log(newArray);
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

  //Update Pie Chart
  sessions = [];
  let USInt: number = randomInt(5030, 8030);
  let CanadaInt: number = randomInt(1800, 4100);
  let UKInt: number = randomInt(900, 1800);
  let OtherInt: number = randomInt(100, 500);
  sessions.push(USInt, CanadaInt, UKInt, 250, OtherInt);
  chartData2.value = {
    labels: countries,
    datasets: [
      {
        backgroundColor: arrBkgdColors,
        data: sessions,
      },
    ],
  };

  //UpdateUserData
  conversions.value = randomFloat(80.35, 150.24);
  newUsers.value = randomFloat(30.25, 55.24);
  totalUsers.value = randomFloat(50.35, 100.15);
}
</script>
<style scoped>
.new-class {
  background-color: rgb(91, 146, 116);
}
</style>
