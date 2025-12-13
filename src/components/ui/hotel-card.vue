<template>
  <!--
    HotelCard Component
    Hotel preview card with image, details, and hover effects

    Props:
    - hotel: Hotel object with all property data
    - compact: Boolean for smaller card variant
  -->
  <article
    class="card group cursor-pointer overflow-hidden"
    @click="navigateToHotel"
  >
    <!-- Image Container with Overlay -->
    <div class="relative aspect-card overflow-hidden">
      <img
        :src="hotel.imageUrl"
        :alt="hotel.name"
        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
      />
      <!-- Gradient Overlay -->
      <div class="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/30 to-transparent" />

      <!-- Founded Badge -->
      <div class="absolute top-4 right-4 bg-accent/90 backdrop-blur-sm px-3 py-1 rounded-full">
        <span class="text-white text-sm font-medium">Est. {{ hotel.founded }}</span>
      </div>

      <!-- Hotel Info Overlay -->
      <div class="absolute bottom-0 left-0 right-0 p-5">
        <!-- Location -->
        <div class="flex items-center gap-2 text-white/80 text-sm mb-2">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>{{ hotel.location }}, {{ hotel.country }}</span>
        </div>

        <!-- Hotel Name -->
        <h3 class="font-heading font-semibold text-xl md:text-2xl text-white group-hover:text-accent transition-colors line-clamp-2">
          {{ hotel.name }}
        </h3>
      </div>
    </div>

    <!-- Content (not compact mode) -->
    <div v-if="!compact" class="p-5">
      <!-- Style Tag -->
      <div class="flex items-center gap-2 mb-3">
        <span class="px-3 py-1 bg-teal/20 text-teal text-xs font-medium rounded-full">
          {{ hotel.style }}
        </span>
      </div>

      <!-- Description -->
      <p class="text-secondary text-sm line-clamp-2 mb-4">
        {{ hotel.description }}
      </p>

      <!-- Highlights Preview -->
      <div class="flex flex-wrap gap-2">
        <span
          v-for="(highlight, index) in hotel.highlights.slice(0, 2)"
          :key="index"
          class="text-xs text-tertiary flex items-center gap-1"
        >
          <svg class="w-3 h-3 text-gold" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          {{ highlight.split(' ').slice(0, 3).join(' ') }}...
        </span>
      </div>

      <!-- View Details Link -->
      <div class="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
        <span class="text-accent font-medium text-sm flex items-center gap-2 group-hover:gap-3 transition-all">
          View Hotel
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </span>
        <span class="text-tertiary text-xs">
          by {{ hotel.founders }}
        </span>
      </div>
    </div>
  </article>
</template>

<script setup>
/**
 * HotelCard Component Logic
 *
 * Renders a hotel preview card with navigation
 */
import { useRouter } from 'vue-router'

// Props definition
const props = defineProps({
  hotel: {
    type: Object,
    required: true
  },
  compact: {
    type: Boolean,
    default: false
  }
})

// Router for navigation
const router = useRouter()

/**
 * Navigate to the hotel detail page
 */
const navigateToHotel = () => {
  router.push(`/hotels/${props.hotel.slug}`)
}
</script>
