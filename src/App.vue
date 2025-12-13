<template>
  <!--
    Heritage Asia - Root Application Component

    Layout structure:
    - AppHeader: Fixed navigation with logo and menu
    - RouterView: Dynamic page content
    - AppFooter: Site footer with links and info
  -->
  <div class="app-wrapper min-h-screen bg-primary text-white flex flex-col">
    <!-- Global Navigation Header -->
    <AppHeader />

    <!-- Main Content Area - Dynamic based on route -->
    <main class="flex-1">
      <RouterView v-slot="{ Component }">
        <!-- Smooth page transitions -->
        <Transition name="fade" mode="out-in">
          <component :is="Component" />
        </Transition>
      </RouterView>
    </main>

    <!-- Global Footer -->
    <AppFooter />
  </div>
</template>

<script setup>
/**
 * Root component that provides the main layout structure.
 * All pages render within the RouterView between header and footer.
 */
import AppHeader from '@/components/layout/app-header.vue'
import AppFooter from '@/components/layout/app-footer.vue'
</script>

<style>
/* Page transition animations */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
