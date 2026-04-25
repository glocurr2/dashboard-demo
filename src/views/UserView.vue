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
                  <th @click="setCurrentSort('name')">
                    Name
                    <font-awesome-icon
                      :icon="['fas', 'sort']"
                      class="icon-sort"
                    />
                  </th>
                  <th @click="setCurrentSort('email')">
                    Email
                    <font-awesome-icon
                      :icon="['fas', 'sort']"
                      class="icon-sort"
                    />
                  </th>
                  <th @click="setCurrentSort('registrationDate')">
                    Registration Date
                    <font-awesome-icon
                      :icon="['fas', 'sort']"
                      class="icon-sort"
                    />
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in displayedItems" :key="item.id">
                  <td style="width: 33%">{{ item.name }}</td>
                  <td style="width: 33%">{{ item.email }}</td>
                  <td style="width: 33%">{{ item.registrationDate }}</td>
                </tr>
              </tbody>
            </table>
            <ul>
              <li
                v-for="n in pageNumbers"
                :key="n"
                style="
                  display: inline-block;
                  margin: auto;
                  margin-bottom: 20px;
                  padding: 5px;
                  font-size: 0.75em;
                  cursor: pointer;
                  text-decoration: underline;
                "
              >
                <span
                  :id="n.toString()"
                  class="page p-1"
                  @click="setCurrentPage(n)"
                >
                  {{ n }}</span
                >
              </li>
            </ul>
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
const currentSortDir = ref('asc');
const currentSort = ref();
const currentPage = ref(1);
const pageSize = ref(10);

function setCurrentSort(colName: string) {
  currentSort.value = colName;
}
function setCurrentPage(curPage: number) {
  currentPage.value = curPage;
  setPgHighlight(curPage.toString());
}

const displayedItems = computed(() => {
  const sorted = [...items.value].sort((a, b) => {
    let modifier = currentSortDir.value === 'desc' ? -1 : 1;
    return a[currentSort.value] > b[currentSort.value] ? modifier : -modifier;
  });

  const start = (currentPage.value - 1) * pageSize.value;
  return sorted.slice(start, start + pageSize.value);
});

function setPgHighlight(curPage: string) {
  const items = document.querySelectorAll('.p-selected');
  for (const item of items) {
    item.classList.remove('p-selected');
  }
  document.getElementById(curPage)?.classList.add('p-selected');
}

function numberOfPages() {
  const numOfItems = items.value.length;
  let numOfPages = numOfItems <= 10 ? 1 : numOfItems / 10;
  if (numOfPages % 1 !== 0) {
    numOfPages++;
    numOfPages = parseInt(numOfPages.toString());
  }
  return numOfPages;
}

const start = 1;
const end = numberOfPages();
const pageNumbers: number[] = Array.from(
  { length: end - start + 1 },
  (_, i) => start + i,
);
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
  margin-bottom: 10px;
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
.p-selected {
  background-color: #a5dfff;
}
</style>
