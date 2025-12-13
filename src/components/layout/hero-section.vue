<template>
  <!--
    HeroSection Component
    Large hero banner with background image, quote, and CTA

    Props:
    - title: Main heading text
    - subtitle: Secondary text or tagline
    - quote: Featured quote text
    - quoteAuthor: Quote attribution
    - imageUrl: Background image URL
    - showCta: Whether to show call-to-action buttons
    - height: Hero height (full, large, medium)
  -->
  <section
    :class="[
      'relative overflow-hidden flex items-center justify-center',
      heightClass
    ]"
  >
    <!-- Background Image with Overlay -->
    <div class="absolute inset-0 z-0">
      <img
        :src="imageUrl"
        :alt="title"
        class="w-full h-full object-cover"
        loading="eager"
      />
      <!-- Gradient Overlay -->
      <div class="absolute inset-0 bg-gradient-to-b from-primary/70 via-primary/50 to-primary" />
      <!-- Additional dark overlay for text readability -->
      <div class="absolute inset-0 bg-primary/30" />
    </div>

    <!-- Content -->
    <div class="relative z-10 container-content text-center py-20">
      <!-- Quote Block (if provided) -->
      <blockquote v-if="quote" class="mb-8 max-w-3xl mx-auto">
        <p class="text-2xl md:text-3xl lg:text-4xl font-heading italic text-white leading-relaxed">
          "{{ quote }}"
        </p>
        <footer v-if="quoteAuthor" class="mt-4 text-secondary text-lg">
          — {{ quoteAuthor }}
        </footer>
      </blockquote>

      <!-- Title -->
      <h1
        v-if="title && !quote"
        class="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6 leading-tight"
      >
        {{ title }}
      </h1>

      <!-- Subtitle -->
      <p
        v-if="subtitle"
        class="text-lg md:text-xl text-secondary max-w-2xl mx-auto mb-10"
      >
        {{ subtitle }}
      </p>

      <!-- CTA Buttons -->
      <div v-if="showCta" class="flex flex-wrap justify-center gap-4">
        <router-link
          to="/hotels"
          class="btn btn-primary px-8 py-3 text-lg"
        >
          Explore Hotels
        </router-link>
        <router-link
          to="/blog"
          class="btn btn-secondary px-8 py-3 text-lg"
        >
          Read Stories
        </router-link>
      </div>

      <!-- Scroll Indicator -->
      <div
        v-if="showScrollIndicator"
        class="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce"
      >
        <svg
          class="w-6 h-6 text-white/60"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </div>
  </section>
</template>

<script setup>
/**
 * HeroSection Component Logic
 *
 * Configurable hero banner for various page contexts
 */
import { computed } from 'vue'

// Component props with defaults
const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  subtitle: {
    type: String,
    default: ''
  },
  quote: {
    type: String,
    default: ''
  },
  quoteAuthor: {
    type: String,
    default: ''
  },
  imageUrl: {
    type: String,
    default: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=1600'
  },
  showCta: {
    type: Boolean,
    default: false
  },
  showScrollIndicator: {
    type: Boolean,
    default: false
  },
  height: {
    type: String,
    default: 'large', // full, large, medium
    validator: (value) => ['full', 'large', 'medium'].includes(value)
  }
})

// Compute height class based on prop
const heightClass = computed(() => {
  const heightMap = {
    full: 'min-h-screen',
    large: 'min-h-[80vh]',
    medium: 'min-h-[50vh]'
  }
  return heightMap[props.height] || heightMap.large
})
</script>
