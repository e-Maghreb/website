<template>
  <div class="min-h-screen bg-white">
    <!-- Navigation -->
    <nav class="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-200">
      <div class="container mx-auto px-6 py-4">
        <div class="flex items-center justify-between">
          <div class="text-2xl font-bold text-maghreb-green">
            TheGreatMaghreb
          </div>
          <div class="hidden md:flex space-x-8">
            <a
              v-for="(item, index) in navItems"
              :key="index"
              :href="item.href"
              class="text-gray-700 hover:text-maghreb-green transition-colors duration-300 font-medium"
              @click.prevent="scrollToSection(item.href)"
            >
              {{ item.text }}
            </a>
          </div>
          <button
            @click="scrollToSection('#join')"
            class="bg-maghreb-green hover:bg-maghreb-green/90 text-white font-bold py-2 px-6 rounded-full transition-all duration-300 transform hover:scale-105"
          >
            Join Now
          </button>
        </div>
      </div>
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

      <!-- Launch Section -->
      <section id="launch">
        <LaunchSection
          launch-date="January 1, 2026"
          :target-date="launchDate"
          @signup="handleSignup"
        />
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
import HeroSection from './components/HeroSection.vue'
import AboutSection from './components/AboutSection.vue'
import InteractiveRoadmap from './components/InteractiveRoadmap.vue'
import CommunityIntegration from './components/CommunityIntegration.vue'
import SocialProof from './components/SocialProof.vue'
import JoinSection from './components/JoinSection.vue'
import LaunchSection from './components/LaunchSection.vue'
import FooterSection from './components/FooterSection.vue'
import { useCommunityMetrics } from './composables/useCommunityMetrics'
import { useAccessibility } from './composables/useAccessibility'
// Import lucide icons - will use SVG directly since lucide-react is React-specific

// Initialize community metrics and accessibility
const { metrics, trackEvent } = useCommunityMetrics()
const { accessibility, announceToScreenReader } = useAccessibility()

// Launch date
const launchDate = new Date('2026-01-01T00:00:00')

// Navigation items
const navItems = [
  { text: 'Home', href: '#hero' },
  { text: 'About', href: '#about' },
  { text: 'Community', href: '#community' },
  { text: 'Roadmap', href: '#roadmap' },
  { text: 'Stories', href: '#social-proof' },
  { text: 'Join', href: '#join' },
  { text: 'Launch', href: '#launch' }
]

// Scroll to top functionality
const showScrollTop = ref(false)

const scrollToSection = (href: string) => {
  trackEvent('navigation', { target: href, source: 'nav_menu' })
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
  alert('Registration opens on January 1, 2026! Join our waitlist to be notified.')
}

const handleSignup = (email: string) => {
  trackEvent('signup', { email: email.substring(0, 3) + '...', source: 'launch_section' })
  console.log('User signed up with email:', email)
  // In a real application, this would send the email to your backend
  alert(`Thank you for signing up with ${email}! You'll receive updates about our launch.`)
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

#about, #community, #roadmap, #social-proof, #join, #launch {
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
  outline: 2px solid #22c55e;
  outline-offset: 2px;
}

button:focus,
a:focus,
input:focus,
textarea:focus,
select:focus {
  outline: 2px solid #22c55e;
  outline-offset: 2px;
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