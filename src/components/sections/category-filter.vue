<template>
  <!--
    CategoryFilter Section Component
    Horizontal scrollable category tabs for filtering

    Props:
    - categories: Array of category objects
    - selectedCategory: Currently selected category slug
    - showAll: Whether to show "All" option
  -->
  <div class="relative">
    <!-- Gradient fade for scroll indication -->
    <div class="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-primary to-transparent pointer-events-none z-10 md:hidden" />

    <!-- Scrollable Category Tabs -->
    <div class="overflow-x-auto scrollbar-hide -mx-4 px-4 pb-4">
      <div class="flex gap-3 min-w-max">
        <!-- All Categories Option -->
        <button
          v-if="showAll"
          @click="selectCategory(null)"
          :class="[
            'px-5 py-2.5 rounded-full text-sm font-medium transition-all whitespace-nowrap',
            selectedCategory === null
              ? 'bg-accent text-white shadow-lg shadow-accent/30'
              : 'bg-secondary text-secondary hover:bg-white/10 hover:text-white'
          ]"
        >
          All
        </button>

        <!-- Category Tabs -->
        <button
          v-for="category in categories"
          :key="category.slug"
          @click="selectCategory(category.slug)"
          :class="[
            'px-5 py-2.5 rounded-full text-sm font-medium transition-all whitespace-nowrap',
            selectedCategory === category.slug
              ? 'bg-accent text-white shadow-lg shadow-accent/30'
              : 'bg-secondary text-secondary hover:bg-white/10 hover:text-white'
          ]"
        >
          {{ category.name }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
/**
 * CategoryFilter Section Logic
 *
 * Manages category selection state
 */

// Props definition
defineProps({
  categories: {
    type: Array,
    required: true
  },
  selectedCategory: {
    type: String,
    default: null
  },
  showAll: {
    type: Boolean,
    default: true
  }
})

// Emits
const emit = defineEmits(['update:selectedCategory'])

/**
 * Handle category selection
 * @param {string|null} categorySlug - Selected category or null for all
 */
const selectCategory = (categorySlug) => {
  emit('update:selectedCategory', categorySlug)
}
</script>

<style scoped>
/* Hide scrollbar for category tabs */
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
</style>
