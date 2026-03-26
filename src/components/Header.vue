<template>
  <!--main div-->
  <div style="position: relative">
    <div class="outer-container gradient-background">
      <div class="header-inner-container">
        <!--flex container-->
        <div class="flex-container">
          <!--logo area-->
          <div class="flex-item accu-logo-area">
            <div class="accu-logo-area-inner">
              <div class="accu-logo" @click="goHome()">Accurate Analytics</div>
              <div class="logo-image">
                <img
                  src="/src/assets/logo-accu.svg"
                  alt="accurate logo"
                  class="logo-image-svg"
                  @click="goHome()"
                />
              </div>
            </div>
          </div>
          <!--end logo area-->

          <!--right menu-->
          <div class="flex-item icons right-menu-items" aria-hidden="true">
            <span class="top-nav-item">Messages:</span>
            <font-awesome-icon :icon="['fas', 'message']" />
            <span class="top-nav-item">Profile:</span>
            <font-awesome-icon :icon="['fas', 'user']" />
            <span class="top-nav-item">Sign Out:</span>
            <font-awesome-icon :icon="['fas', 'sign-out-alt']" />
          </div>
          <!--end right menu-->
        </div>
        <!--END flex container-->
      </div>

      <!--hamburger-->
      <div class="hamburger-icon" @click="isVisible = !isVisible">
        <font-awesome-icon :icon="['fas', 'bars']" />
      </div>
      <!--END hamburger-->

      <!--hamburger dropdown-->
      <div id="hamburger-nav" @click="isVisible = !isVisible">
        <transition name="slide">
          <div
            v-show="isVisible"
            id="hamburger-dropdown"
            class="flex-item icons"
            aria-hidden="true"
          >
            <font-awesome-icon :icon="['fas', 'message']" />&nbsp;<span
              >Messages:</span
            ><br />
            <font-awesome-icon :icon="['fas', 'user']" />&nbsp;<span
              >Profile:</span
            ><br />
            <font-awesome-icon :icon="['fas', 'sign-out-alt']" />&nbsp;<span
              >Sign Out:</span
            ><br />
          </div>
        </transition>
      </div>
      <!--END hamburger dropdown-->
    </div>
  </div>
  <!--END main div-->
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const isVisible = ref(false);
const goHome = () => {
  router.push('/');
};

const handleResize = () => {
  console.log('Window resized');
  isVisible.value = false;
};

onMounted(() => {
  window.addEventListener('resize', handleResize);
});
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.2s ease;
  max-height: 200px;
  opacity: 0.5;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(-20px);
  max-height: 0;
  overflow: hidden;
}
</style>
