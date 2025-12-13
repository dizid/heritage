/**
 * Heritage Asia - Main Application Entry Point
 *
 * This file bootstraps the Vue 3 application with:
 * - Vue Router for client-side routing
 * - Global styles via Tailwind CSS
 */

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Import global styles (Tailwind CSS 4)
import './assets/main.css'

// Create and configure the Vue application
const app = createApp(App)

// Register Vue Router for SPA navigation
app.use(router)

// Mount the application to the DOM
app.mount('#app')
