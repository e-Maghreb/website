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

      <!-- Roadmap Section -->
      <section id="roadmap">
        <RoadmapSection />
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
      <ArrowUp class="w-6 h-6" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import HeroSection from './components/HeroSection.vue'
import AboutSection from './components/AboutSection.vue'
import RoadmapSection from './components/RoadmapSection.vue'
import JoinSection from './components/JoinSection.vue'
import LaunchSection from './components/LaunchSection.vue'
import FooterSection from './components/FooterSection.vue'
import { ArrowUp } from 'lucide-vue-next'

// Launch date
const launchDate = new Date('2026-01-01T00:00:00')

// Navigation items
const navItems = [
  { text: 'Home', href: '#hero' },
  { text: 'About', href: '#about' },
  { text: 'Roadmap', href: '#roadmap' },
  { text: 'Join', href: '#join' },
  { text: 'Launch', href: '#launch' }
]

// Scroll to top functionality
const showScrollTop = ref(false)

const scrollToSection = (href: string) => {
  const element = document.querySelector(href)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const handleScroll = () => {
  showScrollTop.value = window.scrollY > 300
}

// Event handlers
const handleJoinClick = () => {
  // In a real application, this would open a registration modal or redirect to a signup page
  alert('Registration opens on January 1, 2026! Join our waitlist to be notified.')
}

const handleSignup = (email: string) => {
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

#about, #roadmap, #join, #launch {
  scroll-margin-top: 80px;
}
</style>