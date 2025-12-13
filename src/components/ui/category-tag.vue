<template>
  <!--
    CategoryTag Component
    Clickable category label with accent styling

    Props:
    - category: Display name of the category
    - slug: URL slug for category page link
    - clickable: Whether the tag links to category page
    - size: Tag size variant (sm, md, lg)
  -->
  <component
    :is="clickable ? 'router-link' : 'span'"
    :to="clickable ? `/category/${slug}` : undefined"
    :class="[
      'inline-flex items-center font-medium rounded-full transition-colors',
      sizeClasses,
      clickable
        ? 'hover:bg-accent hover:text-white cursor-pointer'
        : '',
      colorClasses
    ]"
    @click.stop
  >
    {{ category }}
  </component>
</template>

<script setup>
/**
 * CategoryTag Component Logic
 *
 * Renders a styled category label/link
 */
import { computed } from 'vue'

// Props definition
const props = defineProps({
  category: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    default: ''
  },
  clickable: {
    type: Boolean,
    default: true
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value)
  },
  variant: {
    type: String,
    default: 'accent',
    validator: (value) => ['accent', 'teal', 'gold', 'muted'].includes(value)
  }
})

// Compute size classes based on prop
const sizeClasses = computed(() => {
  const sizeMap = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-xs',
    lg: 'px-4 py-1.5 text-sm'
  }
  return sizeMap[props.size] || sizeMap.md
})

// Compute color classes based on variant
const colorClasses = computed(() => {
  const colorMap = {
    accent: 'bg-accent/20 text-accent',
    teal: 'bg-teal/20 text-teal',
    gold: 'bg-gold/20 text-gold',
    muted: 'bg-white/10 text-secondary'
  }
  return colorMap[props.variant] || colorMap.accent
})
</script>
