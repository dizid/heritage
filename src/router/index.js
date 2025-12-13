/**
 * Vue Router Configuration
 * Heritage Asia - Client-side routing
 *
 * Routes:
 * - Home: Landing page with hero and featured content
 * - Blog: Article archive with filtering
 * - Article: Individual article view
 * - Hotels: Hotel directory
 * - Hotel: Individual hotel detail
 * - About: Site information
 * - Category: Category-filtered archives
 */

import { createRouter, createWebHistory } from 'vue-router'

// Lazy-load page components for optimal bundle splitting
const HomePage = () => import('@/pages/home-page.vue')
const BlogPage = () => import('@/pages/blog-page.vue')
const ArticlePage = () => import('@/pages/article-page.vue')
const HotelsPage = () => import('@/pages/hotels-page.vue')
const HotelPage = () => import('@/pages/hotel-page.vue')
const AboutPage = () => import('@/pages/about-page.vue')
const CategoryPage = () => import('@/pages/category-page.vue')

// Route definitions
const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
    meta: {
      title: 'Heritage Asia - Where Travel And History Collide'
    }
  },
  {
    path: '/blog',
    name: 'Blog',
    component: BlogPage,
    meta: {
      title: 'Blog - Heritage Asia'
    }
  },
  {
    path: '/blog/:slug',
    name: 'Article',
    component: ArticlePage,
    meta: {
      title: 'Article - Heritage Asia'
    }
  },
  {
    path: '/hotels',
    name: 'Hotels',
    component: HotelsPage,
    meta: {
      title: 'Historic Hotels - Heritage Asia'
    }
  },
  {
    path: '/hotels/:slug',
    name: 'Hotel',
    component: HotelPage,
    meta: {
      title: 'Hotel - Heritage Asia'
    }
  },
  {
    path: '/about',
    name: 'About',
    component: AboutPage,
    meta: {
      title: 'About - Heritage Asia'
    }
  },
  {
    path: '/category/:slug',
    name: 'Category',
    component: CategoryPage,
    meta: {
      title: 'Category - Heritage Asia'
    }
  },
  {
    // Catch-all 404 redirect to home
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

// Create router instance with HTML5 history mode
const router = createRouter({
  history: createWebHistory(),
  routes,
  // Scroll to top on route change
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0, behavior: 'smooth' }
    }
  }
})

// Update document title on navigation
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'Heritage Asia'
  next()
})

export default router
