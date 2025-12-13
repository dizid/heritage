<template>
  <!--
    HomePage Component
    Landing page with hero, featured articles, and hotel showcase

    Sections:
    - Hero with quote and CTA
    - Featured Articles grid
    - Hotel Showcase
    - Categories navigation
  -->
  <div class="home-page">
    <!-- Hero Section -->
    <HeroSection
      :quote="site.quote"
      :quote-author="site.quoteAuthor"
      :image-url="heroImage"
      :show-cta="true"
      :show-scroll-indicator="true"
      height="full"
    />

    <!-- Featured Articles Section -->
    <FeaturedArticles
      :articles="latestArticles"
      title="Latest Stories"
      subtitle="Explore the rich heritage and history of Southeast Asia through our curated articles"
      :limit="5"
      :show-view-all="true"
    />

    <!-- Hotel Showcase Section -->
    <HotelShowcase
      :hotels="featuredHotels"
      title="Colonial Heritage Hotels"
      subtitle="Step into history at these legendary properties, where every corridor whispers tales of empires past"
      :limit="6"
      :show-view-all="true"
    />

    <!-- Categories Section -->
    <section class="py-20">
      <div class="container-content">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
            Explore by Category
          </h2>
          <p class="text-secondary text-lg max-w-2xl mx-auto">
            Dive deep into specific aspects of Southeast Asian heritage
          </p>
        </div>

        <!-- Category Cards Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <router-link
            v-for="category in categories"
            :key="category.id"
            :to="`/category/${category.slug}`"
            class="group relative overflow-hidden rounded-xl bg-secondary p-6 border border-white/5 hover:border-accent/30 transition-all duration-300"
          >
            <!-- Accent Line -->
            <div
              class="absolute top-0 left-0 right-0 h-1 transition-all duration-300 group-hover:h-2"
              :style="{ backgroundColor: category.color }"
            />

            <!-- Category Content -->
            <h3 class="font-heading font-semibold text-xl text-white mb-2 group-hover:text-accent transition-colors">
              {{ category.name }}
            </h3>
            <p class="text-secondary text-sm line-clamp-2">
              {{ category.description }}
            </p>

            <!-- Arrow Icon -->
            <div class="mt-4 flex items-center gap-2 text-accent text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
              <span>Explore</span>
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </router-link>
        </div>
      </div>
    </section>

    <!-- About Teaser Section -->
    <section class="py-20 bg-secondary">
      <div class="container-content">
        <div class="max-w-4xl mx-auto text-center">
          <h2 class="text-3xl md:text-4xl font-heading font-bold text-white mb-6">
            {{ site.tagline }}
          </h2>
          <p class="text-secondary text-lg mb-8 leading-relaxed">
            {{ site.description }}
          </p>
          <router-link to="/about" class="btn btn-primary px-8 py-3">
            Learn Our Story
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
/**
 * HomePage Component Logic
 *
 * Assembles the landing page from content data
 */
import { computed } from 'vue'
import content from '@/data/content.json'
import HeroSection from '@/components/layout/hero-section.vue'
import FeaturedArticles from '@/components/sections/featured-articles.vue'
import HotelShowcase from '@/components/sections/hotel-showcase.vue'

// Content data
const site = content.site
const categories = content.categories

// Hero background image
const heroImage = 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=1600'

// Get latest articles sorted by date
const latestArticles = computed(() => {
  return [...content.articles]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5)
})

// Get featured hotels
const featuredHotels = computed(() => {
  return content.hotels.slice(0, 6)
})
</script>
