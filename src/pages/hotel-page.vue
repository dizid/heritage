<template>
  <!--
    HotelPage Component
    Individual hotel detail view

    Features:
    - Hero with hotel image
    - Hotel information and history
    - Key highlights
    - Notable guests
    - Related articles
  -->
  <div v-if="hotel" class="hotel-page">
    <!-- Hotel Hero -->
    <section class="relative pt-20">
      <!-- Background Image -->
      <div class="absolute inset-0 h-[70vh]">
        <img
          :src="hotel.imageUrl"
          :alt="hotel.name"
          class="w-full h-full object-cover"
        />
        <div class="absolute inset-0 bg-gradient-to-b from-primary/50 via-primary/60 to-primary" />
      </div>

      <!-- Hero Content -->
      <div class="relative z-10 container-content pt-40 pb-20">
        <div class="max-w-4xl">
          <!-- Style Badge -->
          <span class="inline-block px-4 py-1 bg-teal/20 text-teal text-sm font-medium rounded-full mb-6">
            {{ hotel.style }}
          </span>

          <!-- Hotel Name -->
          <h1 class="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-4">
            {{ hotel.name }}
          </h1>

          <!-- Location -->
          <div class="flex items-center gap-2 text-xl text-secondary mb-6">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>{{ hotel.location }}, {{ hotel.country }}</span>
          </div>

          <!-- Quick Facts -->
          <div class="flex flex-wrap gap-6 text-white/80">
            <div class="flex items-center gap-2">
              <svg class="w-5 h-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>Established {{ hotel.founded }}</span>
            </div>
            <div class="flex items-center gap-2">
              <svg class="w-5 h-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span>Founded by {{ hotel.founders }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Hotel Details -->
    <section class="py-16">
      <div class="container-content">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <!-- Main Content -->
          <div class="lg:col-span-2">
            <!-- Description -->
            <div class="prose mb-12">
              <h2>About This Property</h2>
              <p class="text-lg leading-relaxed">{{ hotel.description }}</p>
            </div>

            <!-- Highlights -->
            <div class="mb-12">
              <h2 class="text-2xl font-heading font-bold text-white mb-6">
                Property Highlights
              </h2>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div
                  v-for="(highlight, index) in hotel.highlights"
                  :key="index"
                  class="flex items-start gap-3 p-4 bg-secondary rounded-xl"
                >
                  <div class="w-8 h-8 bg-accent/20 rounded-lg flex items-center justify-center shrink-0">
                    <svg class="w-4 h-4 text-accent" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                    </svg>
                  </div>
                  <span class="text-secondary">{{ highlight }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Sidebar -->
          <div class="lg:col-span-1">
            <!-- Notable Guests Card -->
            <div class="bg-secondary rounded-xl p-6 mb-6">
              <h3 class="text-lg font-heading font-semibold text-white mb-4 flex items-center gap-2">
                <svg class="w-5 h-5 text-gold" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                Notable Guests
              </h3>
              <ul class="space-y-3">
                <li
                  v-for="(guest, index) in hotel.notableGuests"
                  :key="index"
                  class="flex items-center gap-3 text-secondary"
                >
                  <div class="w-2 h-2 rounded-full bg-accent" />
                  {{ guest }}
                </li>
              </ul>
            </div>

            <!-- Quick Info Card -->
            <div class="bg-secondary rounded-xl p-6">
              <h3 class="text-lg font-heading font-semibold text-white mb-4">
                Quick Info
              </h3>
              <dl class="space-y-4">
                <div>
                  <dt class="text-tertiary text-sm">Location</dt>
                  <dd class="text-white">{{ hotel.location }}, {{ hotel.country }}</dd>
                </div>
                <div>
                  <dt class="text-tertiary text-sm">Established</dt>
                  <dd class="text-white">{{ hotel.founded }}</dd>
                </div>
                <div>
                  <dt class="text-tertiary text-sm">Style</dt>
                  <dd class="text-white">{{ hotel.style }}</dd>
                </div>
                <div>
                  <dt class="text-tertiary text-sm">Founders</dt>
                  <dd class="text-white">{{ hotel.founders }}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Related Articles -->
    <section v-if="relatedArticles.length > 0" class="py-16 bg-secondary">
      <div class="container-content">
        <h2 class="text-2xl md:text-3xl font-heading font-bold text-white mb-8">
          Related Stories
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <ArticleCard
            v-for="article in relatedArticles"
            :key="article.id"
            :article="article"
          />
        </div>
      </div>
    </section>

    <!-- Back Navigation -->
    <section class="py-8">
      <div class="container-content">
        <router-link
          to="/hotels"
          class="inline-flex items-center gap-2 text-accent hover:gap-3 transition-all"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
          </svg>
          <span>Back to All Hotels</span>
        </router-link>
      </div>
    </section>
  </div>

  <!-- 404 State -->
  <div v-else class="min-h-screen flex items-center justify-center">
    <div class="text-center">
      <h1 class="text-4xl font-heading font-bold text-white mb-4">Hotel Not Found</h1>
      <p class="text-secondary mb-8">The hotel you're looking for doesn't exist.</p>
      <router-link to="/hotels" class="btn btn-primary">
        Browse Hotels
      </router-link>
    </div>
  </div>
</template>

<script setup>
/**
 * HotelPage Component Logic
 *
 * Displays individual hotel details
 */
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import content from '@/data/content.json'
import ArticleCard from '@/components/ui/article-card.vue'

// Get route params
const route = useRoute()

// Find the hotel by slug
const hotel = computed(() => {
  return content.hotels.find(h => h.slug === route.params.slug)
})

// Get related articles (about hotels category)
const relatedArticles = computed(() => {
  return content.articles
    .filter(a => a.category === 'historic-hotels')
    .slice(0, 3)
})
</script>
