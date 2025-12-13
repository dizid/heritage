<template>
  <!--
    AppHeader Component
    Global navigation header with logo, menu, and mobile hamburger

    Features:
    - Fixed positioning for persistent visibility
    - Transparent to solid background on scroll
    - Mobile-responsive hamburger menu
    - Active route highlighting
  -->
  <header
    :class="[
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
      isScrolled ? 'bg-primary/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
    ]"
  >
    <div class="container-content">
      <nav class="flex items-center justify-between h-20">
        <!-- Logo / Site Name -->
        <router-link
          to="/"
          class="flex items-center gap-3 group"
        >
          <!-- Logo Icon -->
          <div class="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
            <span class="text-xl font-heading font-bold text-white">H</span>
          </div>
          <!-- Site Name -->
          <div class="hidden sm:block">
            <span class="text-xl font-heading font-semibold text-white group-hover:text-accent transition-colors">
              Heritage Asia
            </span>
          </div>
        </router-link>

        <!-- Desktop Navigation -->
        <ul class="hidden md:flex items-center gap-8">
          <li v-for="link in navLinks" :key="link.path">
            <router-link
              :to="link.path"
              :class="[
                'relative py-2 text-sm font-medium transition-colors',
                isActiveRoute(link.path)
                  ? 'text-accent'
                  : 'text-white/80 hover:text-white'
              ]"
            >
              {{ link.name }}
              <!-- Active indicator -->
              <span
                v-if="isActiveRoute(link.path)"
                class="absolute bottom-0 left-0 right-0 h-0.5 bg-accent rounded-full"
              />
            </router-link>
          </li>
        </ul>

        <!-- Mobile Menu Button -->
        <button
          @click="toggleMobileMenu"
          class="md:hidden p-2 text-white hover:text-accent transition-colors"
          :aria-label="isMobileMenuOpen ? 'Close menu' : 'Open menu'"
          :aria-expanded="isMobileMenuOpen"
        >
          <!-- Hamburger / Close Icon -->
          <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              v-if="!isMobileMenuOpen"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
            <path
              v-else
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </nav>

      <!-- Mobile Menu Panel -->
      <Transition
        enter-active-class="transition-all duration-300 ease-out"
        enter-from-class="opacity-0 -translate-y-4"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition-all duration-200 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-4"
      >
        <div
          v-if="isMobileMenuOpen"
          class="md:hidden pb-6"
        >
          <ul class="flex flex-col gap-2">
            <li v-for="link in navLinks" :key="link.path">
              <router-link
                :to="link.path"
                @click="closeMobileMenu"
                :class="[
                  'block py-3 px-4 rounded-lg text-base font-medium transition-colors',
                  isActiveRoute(link.path)
                    ? 'bg-accent/20 text-accent'
                    : 'text-white/80 hover:bg-white/5 hover:text-white'
                ]"
              >
                {{ link.name }}
              </router-link>
            </li>
          </ul>
        </div>
      </Transition>
    </div>
  </header>
</template>

<script setup>
/**
 * AppHeader Component Logic
 *
 * Manages:
 * - Scroll detection for background change
 * - Mobile menu state
 * - Active route detection
 */
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'

// Navigation links configuration
const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Blog', path: '/blog' },
  { name: 'Hotels', path: '/hotels' },
  { name: 'About', path: '/about' }
]

// Reactive state
const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)
const route = useRoute()

/**
 * Check if the current route matches the link path
 * @param {string} path - The path to check
 * @returns {boolean} - True if route is active
 */
const isActiveRoute = (path) => {
  if (path === '/') {
    return route.path === '/'
  }
  return route.path.startsWith(path)
}

/**
 * Toggle mobile menu visibility
 */
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

/**
 * Close mobile menu (used after navigation)
 */
const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

/**
 * Handle scroll events for header background
 */
const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

// Lifecycle hooks for scroll listener
onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  handleScroll() // Check initial scroll position
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>
