<template>
  <div class="min-h-screen bg-white">
    <!-- Navigation -->
    <nav class="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-200">
      <div class="container mx-auto px-6 py-4">
        <div class="flex items-center justify-between">
          <div class="text-2xl font-bold">
            <span class="text-maghreb-red">e-</span><span class="text-maghreb-green">Maghreb</span>
          </div>
          <div class="hidden md:flex space-x-8">
            <a
              v-for="(item, index) in navItems"
              :key="index"
              :href="item.href"
              class="text-black hover:text-maghreb-green transition-colors duration-300 font-medium"
              @click.prevent="scrollToSection(item.href)"
            >
              {{ item.text }}
            </a>
          </div>
          <div class="flex items-center space-x-4">
            <!-- Join Button -->
            <button
              @click="scrollToSection('#join')"
              class="hidden sm:block bg-maghreb-red hover:bg-red-700 text-white font-bold py-2 px-6 rounded-full transition-all duration-300 transform hover:scale-105"
            >
              Join Now
            </button>

            <!-- Mobile Menu Button -->
            <button
              @click="toggleMobileMenu"
              class="md:hidden p-2 text-black hover:text-maghreb-green transition-colors relative z-50"
              aria-label="Toggle mobile menu"
            >
              <component :is="isMobileMenuOpen ? X : Menu" class="w-8 h-8" />
            </button>
          </div>
        </div>
      </div>

      <!-- Mobile Menu Overlay -->
      <transition
        enter-active-class="transition duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] origin-top"
        enter-from-class="transform scale-y-0 opacity-0"
        enter-to-class="transform scale-y-100 opacity-100"
        leave-active-class="transition duration-300 ease-in origin-top"
        leave-from-class="transform scale-y-100 opacity-100"
        leave-to-class="transform scale-y-0 opacity-0"
      >
        <div
          v-if="isMobileMenuOpen"
          class="absolute top-full left-0 w-full h-screen bg-white backdrop-blur-xl border-t border-gray-100 shadow-xl overflow-y-auto overflow-x-hidden pb-32"
        >
          <!-- Decorative Background -->
          <div class="absolute top-0 right-0 w-64 h-64 bg-maghreb-green/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
          <div class="absolute bottom-0 left-0 w-80 h-80 bg-maghreb-red/5 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3 pointer-events-none"></div>

          <div class="flex flex-col items-center justify-center pt-12 space-y-8 relative z-10">
            <a
              v-for="(item, index) in navItems"
              :key="index"
              :href="item.href"
              class="group flex items-center space-x-3 text-3xl md:text-4xl font-bold text-gray-900 hover:text-maghreb-green transition-all duration-300 py-2"
              @click.prevent="scrollToSection(item.href)"
            >
              <span class="w-2 h-2 rounded-full bg-maghreb-red opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-0 group-hover:scale-100"></span>
              <span>{{ item.text }}</span>
            </a>

            <div class="w-12 h-1 bg-gray-100 rounded-full my-4"></div>

            <button
              @click="scrollToSection('#join')"
              class="bg-gradient-to-r from-maghreb-red to-red-600 text-white font-bold py-4 px-10 rounded-full text-xl shadow-lg shadow-red-500/30 transition-all duration-300 transform hover:scale-105 hover:shadow-xl sm:hidden w-full max-w-xs"
            >
              Join Now
            </button>
          </div>

          <div class="text-center text-gray-400 text-sm mt-12 relative z-10 pb-8">
            <p>&copy; 2026 e-Maghreb. All rights reserved.</p>
          </div>
        </div>
      </transition>
    </nav>

    <!-- Main Content -->
    <main>
      <!-- Hero Section -->
      <section id="hero">
        <HeroSection @cta-click="scrollToSection('#join')" />
      </section>

      <!-- About Section -->
      <section id="about">
        <AboutSection />
      </section>

      <!-- Community Integration Section -->
      <section id="community">
        <CommunityIntegration />
      </section>

      <!-- Interactive Roadmap Section -->
      <section id="roadmap">
        <InteractiveRoadmap />
      </section>

      <!-- Social Proof Section -->
      <section id="social-proof">
        <SocialProof />
      </section>

      <!-- Join Section -->
      <section id="join">
        <JoinSection @cta-click="handleJoinClick" />
      </section>

    </main>

    <!-- Footer -->
    <FooterSection />

    <!-- Scroll to Top Button -->
    <button
      v-show="showScrollTop"
      @click="scrollToTop"
      class="fixed bottom-8 right-8 bg-maghreb-green hover:bg-maghreb-green/90 text-white p-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 z-50"
    >
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { Menu, X } from 'lucide-vue-next'
import HeroSection from './components/HeroSection.vue'
import AboutSection from './components/AboutSection.vue'
import InteractiveRoadmap from './components/InteractiveRoadmap.vue'
import CommunityIntegration from './components/CommunityIntegration.vue'
import SocialProof from './components/SocialProof.vue'
import JoinSection from './components/JoinSection.vue'
import FooterSection from './components/FooterSection.vue'
import { useCommunityMetrics } from './composables/useCommunityMetrics'
import { useAccessibility } from './composables/useAccessibility'

// Initialize community metrics and accessibility
const { metrics, trackEvent } = useCommunityMetrics()
const { accessibility, announceToScreenReader } = useAccessibility()

// Navigation items
const navItems = [
  { text: 'Home', href: '#hero' },
  { text: 'About', href: '#about' },
  { text: 'Community', href: '#community' },
  { text: 'Roadmap', href: '#roadmap' },
  { text: 'Stories', href: '#social-proof' },
  { text: 'Join', href: '#join' },
]

// Mobile menu state
const isMobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
  trackEvent('interaction', { action: 'toggle_mobile_menu', state: isMobileMenuOpen.value ? 'open' : 'closed' })

  if (isMobileMenuOpen.value) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
}


// Scroll to top functionality
const showScrollTop = ref(false)

const scrollToSection = (href: string) => {
  trackEvent('navigation', { target: href, source: 'nav_menu' })

  // Close mobile menu if open
  if (isMobileMenuOpen.value) {
    isMobileMenuOpen.value = false
    document.body.style.overflow = ''
  }

  const element = document.querySelector(href)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

const scrollToTop = () => {
  trackEvent('navigation', { target: 'top', source: 'scroll_button' })
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const handleScroll = () => {
  showScrollTop.value = window.scrollY > 300
}

// Event handlers
const handleJoinClick = () => {
  trackEvent('cta_click', { action: 'join_community', source: 'navigation' })
  // In a real application, this would open a registration modal or redirect to a signup page
  alert('Registration opens on February 17, 2026! Join our waitlist to be notified.')
}


// Lifecycle
onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style>
html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  padding: 0;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

#hero {
  scroll-margin-top: 0;
}

#about, #community, #roadmap, #social-proof, #join {
  scroll-margin-top: 80px;
}

/* Accessibility enhancements */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.sr-only:not(:focus):not(:active) {
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
  width: 1px;
}

/* Focus indicators */
*:focus {
  outline: none;
}

*:focus-visible {
  outline: 2px solid #C1272D; /* Maghreb Red */
  outline-offset: 2px;
}

/* Enhanced focus for form elements */
input:focus,
textarea:focus,
select:focus {
  outline: none;
  border-color: #006233; /* Maghreb Green */
  box-shadow: 0 0 0 3px rgba(0, 98, 51, 0.2);
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  * {
    border-color: currentColor !important;
  }

  button,
  a {
    text-decoration: underline;
  }

  .bg-maghreb-green {
    background-color: #166534 !important;
  }

  .text-maghreb-green {
    color: #166534 !important;
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }

  html {
    scroll-behavior: auto;
  }
}

/* Large text mode */
@media (prefers-reduced-motion: no-preference) {
  html {
    scroll-behavior: smooth;
  }
}

/* Skip link */
.skip-link {
  position: absolute;
  top: -40px;
  left: 6px;
  background: #22c55e;
  color: white;
  padding: 8px;
  text-decoration: none;
  border-radius: 4px;
  z-index: 100;
  transition: top 0.3s;
}

.skip-link:focus {
  top: 6px;
}

/* Button states for accessibility */
button:disabled,
button[aria-disabled="true"] {
  opacity: 0.6;
  cursor: not-allowed;
}

button[aria-busy="true"] {
  position: relative;
  color: transparent;
}

button[aria-busy="true"]::after {
  content: "";
  position: absolute;
  width: 16px;
  height: 16px;
  top: 50%;
  left: 50%;
  margin-left: -8px;
  margin-top: -8px;
  border: 2px solid #ffffff;
  border-radius: 50%;
  border-top-color: transparent;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Error states */
[aria-invalid="true"] {
  border-color: #dc2626 !important;
  box-shadow: 0 0 0 2px rgba(220, 38, 38, 0.2);
}

[role="alert"] {
  color: #dc2626;
  font-weight: 500;
  margin-top: 4px;
}

/* Announcement area for screen readers */
.announcement-area {
  position: absolute;
  left: -10000px;
  width: 1px;
  height: 1px;
  overflow: hidden;
}

/* Print styles */
@media print {
  .no-print {
    display: none !important;
  }

  * {
    background: transparent !important;
    color: black !important;
    box-shadow: none !important;
    text-shadow: none !important;
  }
}

/* Touch target size for mobile */
@media (max-width: 768px) {
  button,
  a,
  input,
  select,
  textarea {
    min-height: 44px;
    min-width: 44px;
  }
}
</style>