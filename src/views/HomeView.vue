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
            max="2027-12-31"
            class="date-input block rounded-md border-gray-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
            v-model="dateFromDate"
          />
          <div>
            <label for="dateTo" class="date-to">TO: &nbsp;</label>
            <input
              type="date"
              id="dateTo"
              min="2024-01-01"
              max="2027-12-31"
              class="date-input block rounded-md border-gray-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
              v-model="dateToDate"
            />
          </div>
          <div class="btn-container">
            <button
              @click="
                (triggerLineUpdate(), triggerPieUpdate(), updateUserData())
              "
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded btn-spacer"
            >
              GO
            </button>
          </div>
        </div>
        <div style="clear-both"></div>
      </div>

      <div class="row2">
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

      <div class="row3">
        <LineChart ref="lineRef" />
        <div class="break-row"></div>
        <PieChart ref="pieRef" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useGetDates } from '@/use/useGetDates';
import Sidebar from '@/components/Sidebar.vue';
import PieChart from '@/components/PieChart.vue';
import LineChart from '@/components/LineChart.vue';
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
ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);

const router = useRouter();

const handleDetailEvent = () => {
  router.push('/detail');
};

const lineRef = ref(null);

const { getDateToday, getDateYearAgo } = useGetDates();
const dateToDate = ref(getDateToday());
const dateFromDate = ref(getDateYearAgo());

const triggerLineUpdate = () => {
  const beginYearIndex = new Date(dateFromDate.value!).getUTCFullYear();
  const beginMonthIndex = new Date(dateFromDate.value!).getMonth();
  const endYearIndex = new Date(dateToDate.value!).getUTCFullYear();
  const endMonthIndex = new Date(dateToDate.value!).getMonth();
  (lineRef.value as any).updateLineChart(
    beginMonthIndex,
    beginYearIndex,
    endMonthIndex,
    endYearIndex,
  );
};

const pieRef = ref(null);
const triggerPieUpdate = () => {
  (pieRef.value as any).updatePieChart();
};

let conversions = ref(100.35);
let newUsers = ref(54.04);
let totalUsers = ref(82.35);

function randomFloat(min: number, max: number): number {
  const str = (Math.random() * (max - min) + min).toFixed(2);
  return parseFloat(str);
}
const updateUserData = () => {
  conversions.value = randomFloat(80.35, 150.24);
  newUsers.value = randomFloat(30.25, 55.24);
  totalUsers.value = randomFloat(50.35, 100.15);
};
</script>
<style scoped></style>
