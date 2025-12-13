<template>
  <!--
    CategoryPage Component
    Category-filtered article archive

    Features:
    - Category header with description
    - Filtered articles grid
    - Related categories sidebar
  -->
  <div v-if="category" class="category-page">
    <!-- Category Hero -->
    <section class="pt-32 pb-12 bg-secondary">
      <div class="container-content">
        <div class="max-w-3xl">
          <!-- Category Badge -->
          <span
            class="inline-block px-4 py-1 text-sm font-medium rounded-full mb-4"
            :style="{ backgroundColor: `${category.color}20`, color: category.color }"
          >
            Category
          </span>

          <!-- Category Name -->
          <h1 class="text-4xl md:text-5xl font-heading font-bold text-white mb-4">
            {{ category.name }}
          </h1>

          <!-- Category Description -->
          <p class="text-secondary text-lg">
            {{ category.description }}
          </p>
        </div>
      </div>
    </section>

    <!-- Articles Section -->
    <section class="py-16">
      <div class="container-content">
        <div class="grid grid-cols-1 lg:grid-cols-4 gap-12">
          <!-- Articles Grid -->
          <div class="lg:col-span-3">
            <!-- Results Count -->
            <p class="text-secondary mb-8">
              {{ categoryArticles.length }} article{{ categoryArticles.length !== 1 ? 's' : '' }} in this category
            </p>

            <!-- Articles Grid -->
            <div
              v-if="categoryArticles.length > 0"
              class="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              <ArticleCard
                v-for="article in categoryArticles"
                :key="article.id"
                :article="article"
              />
            </div>

            <!-- Empty State -->
            <div
              v-else
              class="text-center py-16 bg-secondary rounded-xl"
            >
              <p class="text-secondary text-lg">No articles in this category yet.</p>
              <router-link to="/blog" class="btn btn-primary mt-4">
                Browse All Articles
              </router-link>
            </div>
          </div>

          <!-- Sidebar -->
          <div class="lg:col-span-1">
            <!-- Other Categories -->
            <div class="bg-secondary rounded-xl p-6 sticky top-24">
              <h3 class="text-lg font-heading font-semibold text-white mb-4">
                Other Categories
              </h3>
              <ul class="space-y-3">
                <li v-for="cat in otherCategories" :key="cat.id">
                  <router-link
                    :to="`/category/${cat.slug}`"
                    class="flex items-center gap-3 text-secondary hover:text-accent transition-colors"
                  >
                    <div
                      class="w-2 h-2 rounded-full"
                      :style="{ backgroundColor: cat.color }"
                    />
                    <span>{{ cat.name }}</span>
                    <span class="ml-auto text-tertiary text-sm">
                      {{ getArticleCount(cat.slug) }}
                    </span>
                  </router-link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Related Hotels (if Historic Hotels category) -->
    <section
      v-if="category.slug === 'historic-hotels' && relatedHotels.length > 0"
      class="py-16 bg-secondary"
    >
      <div class="container-content">
        <h2 class="text-2xl md:text-3xl font-heading font-bold text-white mb-8">
          Featured Historic Hotels
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <HotelCard
            v-for="hotel in relatedHotels"
            :key="hotel.id"
            :hotel="hotel"
            :compact="true"
          />
        </div>
        <div class="text-center mt-8">
          <router-link to="/hotels" class="btn btn-primary">
            View All Hotels
          </router-link>
        </div>
      </div>
    </section>
  </div>

  <!-- 404 State -->
  <div v-else class="min-h-screen flex items-center justify-center">
    <div class="text-center">
      <h1 class="text-4xl font-heading font-bold text-white mb-4">Category Not Found</h1>
      <p class="text-secondary mb-8">The category you're looking for doesn't exist.</p>
      <router-link to="/blog" class="btn btn-primary">
        Browse Articles
      </router-link>
    </div>
  </div>
</template>

<script setup>
/**
 * CategoryPage Component Logic
 *
 * Displays articles filtered by category
 */
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import content from '@/data/content.json'
import ArticleCard from '@/components/ui/article-card.vue'
import HotelCard from '@/components/ui/hotel-card.vue'

// Get route params
const route = useRoute()

// Find the category by slug
const category = computed(() => {
  return content.categories.find(c => c.slug === route.params.slug)
})

// Get articles in this category
const categoryArticles = computed(() => {
  if (!category.value) return []
  return content.articles
    .filter(a => a.category === category.value.slug)
    .sort((a, b) => new Date(b.date) - new Date(a.date))
})

// Get other categories (for sidebar)
const otherCategories = computed(() => {
  if (!category.value) return []
  return content.categories.filter(c => c.slug !== category.value.slug)
})

// Get related hotels (for historic hotels category)
const relatedHotels = computed(() => {
  return content.hotels.slice(0, 3)
})

/**
 * Get article count for a category
 */
const getArticleCount = (categorySlug) => {
  return content.articles.filter(a => a.category === categorySlug).length
}
</script>
