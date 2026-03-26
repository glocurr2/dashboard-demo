<template>
  <div>
    <Header />
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import Header from './components/Header.vue';
import { useCountryStore } from './stores/countries';
const storeCountries = useCountryStore();
import { useMonthlyStore } from './stores/months';
const storeMonthly = useMonthlyStore();
import { useUsersStore } from './stores/users';
const storeUsers = useUsersStore();

onMounted(() => {
  storeCountries.loadItems();
  storeMonthly.loadMonths();
  storeUsers.loadUsers();
});
</script>
<style scoped></style>
