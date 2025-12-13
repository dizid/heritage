<template>
  <!--
    AboutPage Component
    Site information, mission, and founder story

    Sections:
    - Hero with mission statement
    - Founder story
    - Focus areas
    - Philosophy
    - Contact info
  -->
  <div class="about-page">
    <!-- Hero Section -->
    <section class="pt-32 pb-20 bg-secondary">
      <div class="container-content">
        <div class="max-w-4xl mx-auto text-center">
          <!-- Tagline Badge -->
          <span class="inline-block px-4 py-1 bg-accent/20 text-accent text-sm font-medium rounded-full mb-6">
            {{ site.tagline }}
          </span>

          <!-- Main Heading -->
          <h1 class="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6 leading-tight">
            About Heritage Asia
          </h1>

          <!-- Mission Statement -->
          <p class="text-xl text-secondary leading-relaxed">
            {{ about.mission }}
          </p>
        </div>
      </div>
    </section>

    <!-- Philosophy Section -->
    <section class="py-20">
      <div class="container-content">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <!-- Content -->
          <div>
            <h2 class="text-3xl font-heading font-bold text-white mb-6">
              Our Philosophy
            </h2>
            <p class="text-secondary text-lg leading-relaxed mb-6">
              {{ about.philosophy }}
            </p>
            <p class="text-secondary leading-relaxed">
              We believe that heritage travel is more than sightseeing—it's a journey that deliberately
              seeks out experiences rooted in history, culture, and tradition. It emphasizes immersion
              beyond typical tourist experiences, connecting travelers with the authentic soul of
              Southeast Asia.
            </p>
          </div>

          <!-- Decorative Image -->
          <div class="relative">
            <div class="aspect-square rounded-2xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1528181304800-259b08848526?w=800"
                alt="Southeast Asian Temple"
                class="w-full h-full object-cover"
              />
            </div>
            <!-- Floating accent -->
            <div class="absolute -bottom-6 -left-6 w-32 h-32 bg-accent/20 rounded-2xl -z-10" />
            <div class="absolute -top-6 -right-6 w-24 h-24 bg-teal/20 rounded-2xl -z-10" />
          </div>
        </div>
      </div>
    </section>

    <!-- Focus Areas Section -->
    <section class="py-20 bg-secondary">
      <div class="container-content">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-heading font-bold text-white mb-4">
            What We Cover
          </h2>
          <p class="text-secondary text-lg max-w-2xl mx-auto">
            Our content focuses on the authentic heritage experiences that make Southeast Asia unique
          </p>
        </div>

        <!-- Focus Areas Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <div
            v-for="(area, index) in about.focusAreas"
            :key="index"
            class="flex items-start gap-4 p-6 bg-primary rounded-xl border border-white/5"
          >
            <!-- Icon -->
            <div class="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center shrink-0">
              <svg class="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  v-if="index === 0"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
                <path
                  v-else-if="index === 1"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
                <path
                  v-else-if="index === 2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"
                />
                <path
                  v-else
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064"
                />
              </svg>
            </div>

            <!-- Text -->
            <p class="text-secondary">{{ area }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Values Section -->
    <section class="py-20">
      <div class="container-content">
        <div class="max-w-4xl mx-auto">
          <h2 class="text-3xl font-heading font-bold text-white mb-12 text-center">
            Our Values
          </h2>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <!-- Value 1 -->
            <div class="text-center">
              <div class="w-16 h-16 bg-accent/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 class="text-xl font-heading font-semibold text-white mb-2">Authenticity</h3>
              <p class="text-secondary text-sm">
                We prioritize genuine heritage experiences over commercialized tourism
              </p>
            </div>

            <!-- Value 2 -->
            <div class="text-center">
              <div class="w-16 h-16 bg-teal/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 class="text-xl font-heading font-semibold text-white mb-2">Depth</h3>
              <p class="text-secondary text-sm">
                Our content goes beyond surface-level to explore the rich history behind every destination
              </p>
            </div>

            <!-- Value 3 -->
            <div class="text-center">
              <div class="w-16 h-16 bg-gold/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 class="text-xl font-heading font-semibold text-white mb-2">Preservation</h3>
              <p class="text-secondary text-sm">
                We advocate for responsible tourism that supports heritage conservation
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <section class="py-20 bg-secondary">
      <div class="container-content">
        <div class="max-w-2xl mx-auto text-center">
          <h2 class="text-3xl font-heading font-bold text-white mb-4">
            Get in Touch
          </h2>
          <p class="text-secondary text-lg mb-8">
            Have questions, suggestions, or partnership inquiries? We'd love to hear from you.
          </p>

          <!-- Contact Email -->
          <a
            :href="`mailto:${about.email}`"
            class="inline-flex items-center gap-3 px-8 py-4 bg-accent text-white rounded-xl hover:bg-accent-hover transition-colors"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span class="text-lg font-medium">{{ about.email }}</span>
          </a>

          <!-- Location -->
          <p class="mt-8 text-tertiary flex items-center justify-center gap-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>Based in {{ about.location }}</span>
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
/**
 * AboutPage Component Logic
 *
 * Displays site information and mission
 */
import content from '@/data/content.json'

// Content data
const site = content.site
const about = content.about
</script>
