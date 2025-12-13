<template>
  <!--
    FeaturedArticles Section Component
    Displays a grid of featured article cards

    Props:
    - articles: Array of article objects
    - title: Section heading
    - subtitle: Section description
    - limit: Maximum articles to show
    - showViewAll: Whether to show "View All" link
  -->
  <section class="py-20">
    <div class="container-content">
      <!-- Section Header -->
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <h2 class="text-3xl md:text-4xl font-heading font-bold text-white mb-3">
            {{ title }}
          </h2>
          <p v-if="subtitle" class="text-secondary text-lg max-w-2xl">
            {{ subtitle }}
          </p>
        </div>
        <router-link
          v-if="showViewAll"
          to="/blog"
          class="inline-flex items-center gap-2 text-accent font-medium hover:gap-3 transition-all shrink-0"
        >
          View All Articles
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </router-link>
      </div>

      <!-- Articles Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <!-- Featured First Article (larger) -->
        <div v-if="displayArticles.length > 0" class="md:col-span-2 lg:col-span-2">
          <ArticleCard :article="displayArticles[0]" :featured="true" />
        </div>

        <!-- Remaining Articles -->
        <div
          v-for="article in displayArticles.slice(1)"
          :key="article.id"
          class="lg:col-span-1"
        >
          <ArticleCard :article="article" />
        </div>
      </div>

      <!-- Empty State -->
      <div
        v-if="displayArticles.length === 0"
        class="text-center py-16"
      >
        <p class="text-secondary text-lg">No articles available.</p>
      </div>
    </div>
  </section>
</template>

<script setup>
/**
 * FeaturedArticles Section Logic
 *
 * Displays a responsive grid of article cards
 */
import { computed } from 'vue'
import ArticleCard from '@/components/ui/article-card.vue'

// Props definition
const props = defineProps({
  articles: {
    type: Array,
    required: true
  },
  title: {
    type: String,
    default: 'Latest Stories'
  },
  subtitle: {
    type: String,
    default: ''
  },
  limit: {
    type: Number,
    default: 5
  },
  showViewAll: {
    type: Boolean,
    default: true
  }
})

// Limit displayed articles
const displayArticles = computed(() => {
  return props.articles.slice(0, props.limit)
})
</script>
