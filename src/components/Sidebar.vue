<template>
  <div class="sidebar">
    <div class="sidebar-box">
      <div class="sidebar-blue-accent"></div>
      <div class="sidebar-blue-accent2"></div>
      <div id="left-nav">
        <ul>
          <li @click="emitHomeEvent()">
            <font-awesome-icon
              ref="homeCaret"
              :icon="['fa', 'square-poll-vertical']"
              :id="'home-caret'"
              :class="[
                thisRoute.path !== '/'
                  ? 'inactive-caret-style'
                  : 'active-caret-style',
              ]"
            />
            <span class="underline pl-4">Home</span>
          </li>
          <li @click="emitUsersEvent()">
            <font-awesome-icon
              :icon="['fa', 'square-poll-vertical']"
              :id="'users-caret'"
              :class="[
                thisRoute.path !== '/detail'
                  ? 'inactive-caret-style'
                  : 'active-caret-style',
              ]"
            />
            <span class="underline pl-4">Users:</span>
          </li>
          <li>
            <font-awesome-icon
              :icon="['fa', 'square-poll-vertical']"
              class="greyout-caret-style"
            />
            <span class="inactive-nav-item">Behavior:</span>
          </li>
          <li>
            <font-awesome-icon
              :icon="['fa', 'square-poll-vertical']"
              class="greyout-caret-style"
            />
            <span class="inactive-nav-item">Acquisitions:</span>
          </li>
          <li>
            <font-awesome-icon
              :icon="['fa', 'square-poll-vertical']"
              class="greyout-caret-style"
            />
            <span class="inactive-nav-item">Conversions:</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineEmits } from 'vue';
import { useRoute } from 'vue-router';

const thisRoute = useRoute();
const emit = defineEmits(['nav-to-detail', 'nav-to-home']);

function emitUsersEvent() {
  emit('nav-to-detail');
}
function emitHomeEvent() {
  emit('nav-to-home');
}
</script>

<style scoped></style>
