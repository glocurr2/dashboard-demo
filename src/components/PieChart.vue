<template>
  <div class="big-box-style pie-chart">
    <h2 style="color: #444">Conversions by Region</h2>
    <div>
      <Pie :data="chartData2" :options="chartOptions2" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { Pie } from 'vue-chartjs';
import { useCountryStore } from '@/stores/countries';
defineExpose({ updatePieChart });

const arrBkgdColors = ['#2065e7', '#bda8fc', '#8147f7', '#31e9f4', '#cc8b9d'];

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

//Update Pie Chart
function updatePieChart() {
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
}
</script>
