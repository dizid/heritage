<template>
  <!--
    BookingCTA Component
    Trip.com affiliate booking call-to-action

    Props:
    - hotel: Hotel object with property data
  -->
  <div class="booking-cta bg-gradient-to-r from-teal/20 to-accent/20 rounded-xl p-6 border border-white/10">
    <h3 class="text-lg font-heading font-semibold text-white mb-2">
      Book This Hotel
    </h3>
    <p class="text-secondary text-sm mb-4">
      Check availability and rates on Trip.com
    </p>

    <a
      :href="affiliateLink"
      target="_blank"
      rel="noopener sponsored"
      class="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-white font-medium px-6 py-3 rounded-lg transition-colors w-full justify-center"
      @click="trackClick"
    >
      <span>Check Availability</span>
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
      </svg>
    </a>

    <p class="text-tertiary text-xs mt-3 text-center">
      We may earn a commission from bookings.
    </p>
  </div>
</template>

<script setup>
/**
 * BookingCTA Component Logic
 *
 * Displays Trip.com affiliate booking button
 */
import { computed } from 'vue'
import { getTripComHotelLink } from '@/utils/affiliateLinks'

const props = defineProps({
  hotel: {
    type: Object,
    required: true
  }
})

const affiliateLink = computed(() => getTripComHotelLink(props.hotel))

const trackClick = () => {
  if (window.gtag) {
    window.gtag('event', 'affiliate_click', {
      hotel_name: props.hotel.name,
      hotel_slug: props.hotel.slug,
      partner: 'tripcom'
    })
  }
}
</script>
