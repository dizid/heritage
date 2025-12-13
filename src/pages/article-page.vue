<template>
  <!--
    ArticlePage Component
    Full article view with content, author info, and related articles

    Features:
    - Hero image with title overlay
    - Full article content
    - Author and date info
    - Category tags
    - Related articles
  -->
  <div v-if="article" class="article-page">
    <!-- Article Hero -->
    <section class="relative pt-20">
      <!-- Background Image -->
      <div class="absolute inset-0 h-[60vh]">
        <img
          :src="article.imageUrl"
          :alt="article.title"
          class="w-full h-full object-cover"
        />
        <div class="absolute inset-0 bg-gradient-to-b from-primary/60 via-primary/70 to-primary" />
      </div>

      <!-- Hero Content -->
      <div class="relative z-10 container-content pt-32 pb-20">
        <div class="max-w-4xl">
          <!-- Category -->
          <CategoryTag
            :category="article.categoryName"
            :slug="article.category"
            size="lg"
            class="mb-6"
          />

          <!-- Title -->
          <h1 class="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white mb-6 leading-tight">
            {{ article.title }}
          </h1>

          <!-- Meta Info -->
          <div class="flex flex-wrap items-center gap-6 text-secondary">
            <!-- Author -->
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
                <span class="text-white font-semibold">{{ article.author.charAt(0) }}</span>
              </div>
              <span class="font-medium text-white">{{ article.author }}</span>
            </div>

            <!-- Date -->
            <div class="flex items-center gap-2">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <time :datetime="article.date">{{ formatDate(article.date) }}</time>
            </div>

            <!-- Read Time -->
            <div v-if="article.readTime" class="flex items-center gap-2">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{{ article.readTime }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Article Content -->
    <section class="py-16">
      <div class="container-content">
        <div class="max-w-3xl mx-auto">
          <!-- Excerpt/Lead -->
          <p class="text-xl text-white leading-relaxed mb-8 font-medium">
            {{ article.excerpt }}
          </p>

          <!-- Main Content -->
          <div class="prose">
            <div v-html="formattedContent" />
          </div>

          <!-- Tags -->
          <div v-if="article.tags && article.tags.length > 0" class="mt-12 pt-8 border-t border-white/10">
            <h4 class="text-sm font-medium text-tertiary mb-4">Related Topics</h4>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="tag in article.tags"
                :key="tag"
                class="px-3 py-1 bg-white/5 text-secondary text-sm rounded-full"
              >
                #{{ tag }}
              </span>
            </div>
          </div>

          <!-- Share / Back -->
          <div class="mt-12 flex items-center justify-between">
            <router-link
              to="/blog"
              class="flex items-center gap-2 text-accent hover:gap-3 transition-all"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
              </svg>
              <span>Back to Articles</span>
            </router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- Related Articles -->
    <section v-if="relatedArticles.length > 0" class="py-16 bg-secondary">
      <div class="container-content">
        <h2 class="text-2xl md:text-3xl font-heading font-bold text-white mb-8">
          Related Articles
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <ArticleCard
            v-for="related in relatedArticles"
            :key="related.id"
            :article="related"
          />
        </div>
      </div>
    </section>
  </div>

  <!-- 404 State -->
  <div v-else class="min-h-screen flex items-center justify-center">
    <div class="text-center">
      <h1 class="text-4xl font-heading font-bold text-white mb-4">Article Not Found</h1>
      <p class="text-secondary mb-8">The article you're looking for doesn't exist.</p>
      <router-link to="/blog" class="btn btn-primary">
        Browse Articles
      </router-link>
    </div>
  </div>
</template>

<script setup>
/**
 * ArticlePage Component Logic
 *
 * Displays full article content with related articles
 */
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import content from '@/data/content.json'
import CategoryTag from '@/components/ui/category-tag.vue'
import ArticleCard from '@/components/ui/article-card.vue'

// Get route params
const route = useRoute()

// Find the article by slug
const article = computed(() => {
  return content.articles.find(a => a.slug === route.params.slug)
})

// Format article content with paragraphs
const formattedContent = computed(() => {
  if (!article.value) return ''

  return article.value.content
    .split('\n\n')
    .map(paragraph => `<p>${paragraph}</p>`)
    .join('')
})

// Get related articles (same category, exclude current)
const relatedArticles = computed(() => {
  if (!article.value) return []

  return content.articles
    .filter(a => a.category === article.value.category && a.id !== article.value.id)
    .slice(0, 3)
})

/**
 * Format date to readable string
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
