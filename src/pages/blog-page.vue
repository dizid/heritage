<template>
  <!--
    BlogPage Component
    Article archive with search and category filtering

    Features:
    - Search bar
    - Category filter tabs
    - Responsive article grid
    - Pagination
  -->
  <div class="blog-page">
    <!-- Page Header -->
    <section class="pt-32 pb-12 bg-secondary">
      <div class="container-content">
        <div class="max-w-3xl">
          <h1 class="text-4xl md:text-5xl font-heading font-bold text-white mb-4">
            Heritage Stories
          </h1>
          <p class="text-secondary text-lg">
            Explore the rich tapestry of Southeast Asian heritage through our curated articles on history, culture, and historic hotels.
          </p>
        </div>
      </div>
    </section>

    <!-- Filters Section -->
    <section class="py-8 border-b border-white/10">
      <div class="container-content">
        <div class="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
          <!-- Search Bar -->
          <div class="w-full lg:w-80">
            <SearchBar
              v-model="searchQuery"
              placeholder="Search articles..."
            />
          </div>

          <!-- Category Filter -->
          <div class="w-full lg:flex-1 lg:max-w-2xl">
            <CategoryFilter
              :categories="categories"
              :selected-category="selectedCategory"
              @update:selected-category="selectedCategory = $event"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Articles Grid -->
    <section class="py-16">
      <div class="container-content">
        <!-- Results Count -->
        <p class="text-secondary mb-8">
          Showing {{ filteredArticles.length }} article{{ filteredArticles.length !== 1 ? 's' : '' }}
          <span v-if="searchQuery"> for "{{ searchQuery }}"</span>
          <span v-if="selectedCategory"> in {{ selectedCategoryName }}</span>
        </p>

        <!-- Articles Grid -->
        <div
          v-if="paginatedArticles.length > 0"
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <ArticleCard
            v-for="article in paginatedArticles"
            :key="article.id"
            :article="article"
          />
        </div>

        <!-- Empty State -->
        <div
          v-else
          class="text-center py-16"
        >
          <div class="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-tertiary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 class="text-xl font-heading font-semibold text-white mb-2">
            No articles found
          </h3>
          <p class="text-secondary">
            Try adjusting your search or filter criteria
          </p>
          <button
            @click="clearFilters"
            class="mt-4 btn btn-secondary"
          >
            Clear Filters
          </button>
        </div>

        <!-- Pagination -->
        <div
          v-if="totalPages > 1"
          class="flex justify-center items-center gap-2 mt-12"
        >
          <button
            @click="currentPage = currentPage - 1"
            :disabled="currentPage === 1"
            class="p-2 rounded-lg bg-secondary text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/10 transition-colors"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div class="flex gap-1">
            <button
              v-for="page in visiblePages"
              :key="page"
              @click="currentPage = page"
              :class="[
                'w-10 h-10 rounded-lg font-medium transition-colors',
                currentPage === page
                  ? 'bg-accent text-white'
                  : 'bg-secondary text-secondary hover:bg-white/10 hover:text-white'
              ]"
            >
              {{ page }}
            </button>
          </div>

          <button
            @click="currentPage = currentPage + 1"
            :disabled="currentPage === totalPages"
            class="p-2 rounded-lg bg-secondary text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/10 transition-colors"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
/**
 * BlogPage Component Logic
 *
 * Manages article filtering, search, and pagination
 */
import { ref, computed, watch } from 'vue'
import content from '@/data/content.json'
import ArticleCard from '@/components/ui/article-card.vue'
import SearchBar from '@/components/ui/search-bar.vue'
import CategoryFilter from '@/components/sections/category-filter.vue'

// Content data
const categories = content.categories

// Filter state
const searchQuery = ref('')
const selectedCategory = ref(null)
const currentPage = ref(1)
const articlesPerPage = 6

// Get selected category name
const selectedCategoryName = computed(() => {
  if (!selectedCategory.value) return ''
  const cat = categories.find(c => c.slug === selectedCategory.value)
  return cat ? cat.name : ''
})

// Filter articles based on search and category
const filteredArticles = computed(() => {
  let articles = [...content.articles]
    .sort((a, b) => new Date(b.date) - new Date(a.date))

  // Filter by category
  if (selectedCategory.value) {
    articles = articles.filter(a => a.category === selectedCategory.value)
  }

  // Filter by search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    articles = articles.filter(a =>
      a.title.toLowerCase().includes(query) ||
      a.excerpt.toLowerCase().includes(query) ||
      a.content.toLowerCase().includes(query)
    )
  }

  return articles
})

// Paginated articles
const paginatedArticles = computed(() => {
  const start = (currentPage.value - 1) * articlesPerPage
  const end = start + articlesPerPage
  return filteredArticles.value.slice(start, end)
})

// Total pages
const totalPages = computed(() => {
  return Math.ceil(filteredArticles.value.length / articlesPerPage)
})

// Visible page numbers for pagination
const visiblePages = computed(() => {
  const pages = []
  const maxVisible = 5
  let start = Math.max(1, currentPage.value - Math.floor(maxVisible / 2))
  let end = Math.min(totalPages.value, start + maxVisible - 1)

  if (end - start + 1 < maxVisible) {
    start = Math.max(1, end - maxVisible + 1)
  }

  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  return pages
})

// Reset to page 1 when filters change
watch([searchQuery, selectedCategory], () => {
  currentPage.value = 1
})

// Clear all filters
const clearFilters = () => {
  searchQuery.value = ''
  selectedCategory.value = null
  currentPage.value = 1
}
</script>
