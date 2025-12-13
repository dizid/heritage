<template>
  <!--
    ArticleCard Component
    Blog post card with image, category, title, excerpt, and meta

    Props:
    - article: Article object with all post data
    - featured: Boolean for larger featured styling
  -->
  <article
    :class="[
      'card group cursor-pointer overflow-hidden',
      featured ? 'md:flex' : ''
    ]"
    @click="navigateToArticle"
  >
    <!-- Image Container -->
    <div
      :class="[
        'relative overflow-hidden',
        featured ? 'md:w-1/2' : 'aspect-video'
      ]"
    >
      <img
        :src="article.imageUrl"
        :alt="article.title"
        :class="[
          'w-full h-full object-cover transition-transform duration-500 group-hover:scale-105',
          featured ? 'aspect-video md:aspect-auto md:h-full' : ''
        ]"
        loading="lazy"
      />
      <!-- Category Badge -->
      <div class="absolute top-4 left-4">
        <CategoryTag :category="article.categoryName" :slug="article.category" />
      </div>
    </div>

    <!-- Content -->
    <div
      :class="[
        'p-6',
        featured ? 'md:w-1/2 md:p-8 flex flex-col justify-center' : ''
      ]"
    >
      <!-- Date and Read Time -->
      <div class="flex items-center gap-4 text-sm text-tertiary mb-3">
        <time :datetime="article.date">
          {{ formatDate(article.date) }}
        </time>
        <span v-if="article.readTime" class="flex items-center gap-1">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {{ article.readTime }}
        </span>
      </div>

      <!-- Title -->
      <h3
        :class="[
          'font-heading font-semibold text-white group-hover:text-accent transition-colors mb-3 line-clamp-2',
          featured ? 'text-2xl md:text-3xl' : 'text-xl'
        ]"
      >
        {{ article.title }}
      </h3>

      <!-- Excerpt -->
      <p
        :class="[
          'text-secondary line-clamp-3',
          featured ? 'text-base md:text-lg' : 'text-sm'
        ]"
      >
        {{ article.excerpt }}
      </p>

      <!-- Read More Link -->
      <div class="mt-4 flex items-center gap-2 text-accent font-medium text-sm group-hover:gap-3 transition-all">
        <span>Read Article</span>
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </div>
    </div>
  </article>
</template>

<script setup>
/**
 * ArticleCard Component Logic
 *
 * Renders an article preview card with navigation
 */
import { useRouter } from 'vue-router'
import CategoryTag from './category-tag.vue'

// Props definition
const props = defineProps({
  article: {
    type: Object,
    required: true
  },
  featured: {
    type: Boolean,
    default: false
  }
})

// Router for navigation
const router = useRouter()

/**
 * Navigate to the full article page
 */
const navigateToArticle = () => {
  router.push(`/blog/${props.article.slug}`)
}

/**
 * Format date to readable string
 * @param {string} dateString - ISO date string
 * @returns {string} - Formatted date
 */
const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>
