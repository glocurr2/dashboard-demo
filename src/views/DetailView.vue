<template>
  <div>
    <Sidebar @nav-to-home="handleHomeEvent" />
    <div class="detail-container">
      <div class="detail-main-card">
        <h2 style="color: #444">Users</h2>
        <div id="usersTable">
          <div>
            <table style="width: 90%; font-size: 0.65em">
              <thead>
                <tr>
                  <th @click="sortBy('name')">
                    Name
                    <font-awesome-icon
                      :icon="['fas', 'sort']"
                      class="icon-sort"
                    />
                  </th>
                  <th @click="sortBy('email')">
                    Email
                    <font-awesome-icon
                      :icon="['fas', 'sort']"
                      class="icon-sort"
                    />
                  </th>
                  <th @click="sortBy('registrationDate')">
                    Registration Date
                    <font-awesome-icon
                      :icon="['fas', 'sort']"
                      class="icon-sort"
                    />
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in sortedItems" :key="item.id">
                  <td>{{ item.name }}</td>
                  <td>{{ item.email }}</td>
                  <td>{{ item.registrationDate }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { onMounted } from 'vue';
import Sidebar from '@/components/Sidebar.vue';
import { useUsersStore } from '@/stores/users';
import { useRouter } from 'vue-router';

const storeUsers = useUsersStore();

const router = useRouter();
const handleHomeEvent = () => {
  router.push('/');
};

onMounted(() => {
  storeUsers.loadUsers();
});
const items = ref(storeUsers.itemsUsers);
const sortColumn = ref();
const sortDirection = ref('asc');

const sortedItems = computed(() => {
  if (!sortColumn.value) {
    return items.value;
  }
  return [...items.value].sort((a, b) => {
    const aValue = a[sortColumn.value];
    const bValue = b[sortColumn.value];

    if (typeof aValue === 'string') {
      return sortDirection.value === 'asc'
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    } else {
      return sortDirection.value === 'asc' ? aValue - bValue : bValue - aValue;
    }
  });
});

const sortBy = (column: string) => {
  if (sortColumn.value === column) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc';
  } else {
    sortColumn.value = column;
    sortDirection.value = 'asc';
  }
};
</script>

<style scoped>
.detail-container {
  float: left;
  margin: 50px 20px 20px 20px;
}
.icon-sort {
  color: #05a2f7;
}
table {
  margin: auto;
  margin-top: 20px;
  margin-bottom: 40px;
}
th {
  cursor: pointer;
  padding-bottom: 6px;
}
td {
  text-align: left;
  border: 1px solid #8b8989;
  padding: 2px 4px;
}
table tr:nth-child(even) {
  background-color: #e4e2dd;
}
</style>
