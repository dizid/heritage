<template>
  <!--
    SearchBar Component
    Search input with icon and clear button

    Props:
    - modelValue: Bound search query (v-model)
    - placeholder: Input placeholder text
  -->
  <div class="relative">
    <!-- Search Icon -->
    <div class="absolute left-4 top-1/2 -translate-y-1/2 text-tertiary pointer-events-none">
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    </div>

    <!-- Search Input -->
    <input
      type="text"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :placeholder="placeholder"
      class="w-full pl-12 pr-12 py-3 bg-secondary border border-white/10 rounded-xl text-white placeholder-tertiary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
    />

    <!-- Clear Button -->
    <button
      v-if="modelValue"
      @click="$emit('update:modelValue', '')"
      class="absolute right-4 top-1/2 -translate-y-1/2 text-tertiary hover:text-white transition-colors"
      aria-label="Clear search"
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  </div>
</template>

<script setup>
/**
 * SearchBar Component Logic
 *
 * Two-way bound search input with clear functionality
 */
defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: 'Search articles...'
  }
})

defineEmits(['update:modelValue'])
</script>
