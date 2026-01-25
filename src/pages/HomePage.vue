<template>
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

    <!-- Feedback Section -->
    <section id="feedback">
      <FeedbackSection />
    </section>

    <!-- Join Section -->
    <section id="join">
      <JoinSection @cta-click="handleJoinClick" />
    </section>
  </main>
</template>

<script setup lang="ts">
import HeroSection from '../components/HeroSection.vue'
import AboutSection from '../components/AboutSection.vue'
import InteractiveRoadmap from '../components/InteractiveRoadmap.vue'
import CommunityIntegration from '../components/CommunityIntegration.vue'
import JoinSection from '../components/JoinSection.vue'
import FeedbackSection from '../components/FeedbackSection.vue'
import { useCommunityMetrics } from '../composables/useCommunityMetrics'

// Initialize community metrics
const { trackEvent } = useCommunityMetrics()

const scrollToSection = (href: string) => {
  const element = document.querySelector(href)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

const handleJoinClick = () => {
  trackEvent('cta_click', { action: 'join_community', source: 'navigation' })
  // In a real application, this would open a registration modal or redirect to a signup page
  alert('Registration opens on February 17, 2026! Join our waitlist to be notified.')
}
</script>

<style scoped>
#hero {
  scroll-margin-top: 0;
}

#about, #community, #roadmap, #feedback, #join {
  scroll-margin-top: 80px;
}
</style>
