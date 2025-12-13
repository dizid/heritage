<template>
  <!--
    HotelsPage Component
    Hotel directory with filtering by country

    Features:
    - Hero section
    - Country filter
    - Responsive hotel grid
    - Hotel cards with details
  -->
  <div class="hotels-page">
    <!-- Page Hero -->
    <HeroSection
      title="Historic Hotels of Southeast Asia"
      subtitle="Discover legendary colonial properties where every corridor whispers tales of empires past"
      :image-url="heroImage"
      height="medium"
    />

    <!-- Filter Section -->
    <section class="py-8 border-b border-white/10">
      <div class="container-content">
        <div class="flex flex-wrap gap-3">
          <!-- All Countries Button -->
          <button
            @click="selectedCountry = null"
            :class="[
              'px-5 py-2.5 rounded-full text-sm font-medium transition-all',
              selectedCountry === null
                ? 'bg-accent text-white shadow-lg shadow-accent/30'
                : 'bg-secondary text-secondary hover:bg-white/10 hover:text-white'
            ]"
          >
            All Countries
          </button>

          <!-- Country Buttons -->
          <button
            v-for="country in countries"
            :key="country"
            @click="selectedCountry = country"
            :class="[
              'px-5 py-2.5 rounded-full text-sm font-medium transition-all',
              selectedCountry === country
                ? 'bg-accent text-white shadow-lg shadow-accent/30'
                : 'bg-secondary text-secondary hover:bg-white/10 hover:text-white'
            ]"
          >
            {{ country }}
          </button>
        </div>
      </div>
    </section>

    <!-- Hotels Grid -->
    <section class="py-16">
      <div class="container-content">
        <!-- Results Count -->
        <p class="text-secondary mb-8">
          Showing {{ filteredHotels.length }} historic hotel{{ filteredHotels.length !== 1 ? 's' : '' }}
          <span v-if="selectedCountry"> in {{ selectedCountry }}</span>
        </p>

        <!-- Hotels Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <HotelCard
            v-for="hotel in filteredHotels"
            :key="hotel.id"
            :hotel="hotel"
          />
        </div>

        <!-- Empty State -->
        <div
          v-if="filteredHotels.length === 0"
          class="text-center py-16"
        >
          <p class="text-secondary text-lg">No hotels found for this filter.</p>
        </div>
      </div>
    </section>

    <!-- Info Section -->
    <section class="py-16 bg-secondary">
      <div class="container-content">
        <div class="max-w-4xl mx-auto text-center">
          <h2 class="text-3xl font-heading font-bold text-white mb-6">
            The Heritage Experience
          </h2>
          <p class="text-secondary text-lg leading-relaxed mb-8">
            These legendary hotels offer more than accommodation—they provide a gateway to Southeast Asia's colonial past.
            From the literary salons of Raffles Singapore to the revolutionary history of Hotel Majapahit,
            each property tells a unique story of empire, independence, and cultural fusion.
          </p>
          <router-link
            to="/blog/heritage-hotel-booking-guide"
            class="btn btn-primary"
          >
            Read Our Booking Guide
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
/**
 * HotelsPage Component Logic
 *
 * Displays hotel directory with country filtering
 */
import { ref, computed } from 'vue'
import content from '@/data/content.json'
import HeroSection from '@/components/layout/hero-section.vue'
import HotelCard from '@/components/ui/hotel-card.vue'

// Hero background
const heroImage = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1600'

// Filter state
const selectedCountry = ref(null)

// Get unique countries from hotels
const countries = computed(() => {
  const countrySet = new Set(content.hotels.map(h => h.country))
  return Array.from(countrySet).sort()
})

// Filter hotels by selected country
const filteredHotels = computed(() => {
  if (!selectedCountry.value) {
    return content.hotels
  }
  return content.hotels.filter(h => h.country === selectedCountry.value)
})
</script>
