<template>
  <!--
    HotelShowcase Section Component
    Displays a grid of featured hotel cards

    Props:
    - hotels: Array of hotel objects
    - title: Section heading
    - subtitle: Section description
    - limit: Maximum hotels to show
    - showViewAll: Whether to show "View All" link
  -->
  <section class="py-20 bg-secondary">
    <div class="container-content">
      <!-- Section Header -->
      <div class="text-center mb-12">
        <span class="inline-block px-4 py-1 bg-accent/20 text-accent text-sm font-medium rounded-full mb-4">
          Historic Properties
        </span>
        <h2 class="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
          {{ title }}
        </h2>
        <p v-if="subtitle" class="text-secondary text-lg max-w-2xl mx-auto">
          {{ subtitle }}
        </p>
      </div>

      <!-- Hotels Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <HotelCard
          v-for="hotel in displayHotels"
          :key="hotel.id"
          :hotel="hotel"
        />
      </div>

      <!-- View All Button -->
      <div v-if="showViewAll" class="text-center mt-12">
        <router-link
          to="/hotels"
          class="btn btn-primary px-8 py-3"
        >
          Explore All Historic Hotels
        </router-link>
      </div>

      <!-- Empty State -->
      <div
        v-if="displayHotels.length === 0"
        class="text-center py-16"
      >
        <p class="text-secondary text-lg">No hotels available.</p>
      </div>
    </div>
  </section>
</template>

<script setup>
/**
 * HotelShowcase Section Logic
 *
 * Displays a responsive grid of hotel cards
 */
import { computed } from 'vue'
import HotelCard from '@/components/ui/hotel-card.vue'

// Props definition
const props = defineProps({
  hotels: {
    type: Array,
    required: true
  },
  title: {
    type: String,
    default: 'Colonial Heritage Hotels'
  },
  subtitle: {
    type: String,
    default: 'Experience history in luxury accommodations across Southeast Asia'
  },
  limit: {
    type: Number,
    default: 6
  },
  showViewAll: {
    type: Boolean,
    default: true
  }
})

// Limit displayed hotels
const displayHotels = computed(() => {
  return props.hotels.slice(0, props.limit)
})
</script>
