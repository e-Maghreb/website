<template>
  <section class="py-20 md:py-32 bg-maghreb-light">
    <div class="container mx-auto px-6">
      <div class="text-center mb-16">
        <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-maghreb-dark mb-6">
          Our Journey
        </h2>
        <p class="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
          Follow our roadmap as we build the digital nation for Maghrebi citizens worldwide
        </p>
      </div>

      <!-- Timeline -->
      <div class="relative">
        <!-- Timeline line -->
        <div class="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-maghreb-green/30 hidden lg:block"></div>
        <div class="absolute left-8 top-0 bottom-0 w-1 bg-maghreb-green/30 lg:hidden"></div>

        <div class="space-y-12">
          <div 
            v-for="(phase, index) in phases" 
            :key="index"
            :class="[
              'relative flex items-center',
              index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse',
              'flex-row'
            ]"
          >
            <!-- Timeline dot -->
            <div class="absolute left-8 lg:left-1/2 transform lg:-translate-x-1/2 w-4 h-4 rounded-full bg-maghreb-green z-10">
              <div class="absolute inset-0 rounded-full bg-maghreb-green animate-ping opacity-75"></div>
            </div>

            <!-- Content card -->
            <div :class="[
              'bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105',
              'ml-16 lg:ml-0 lg:w-5/12',
              index % 2 === 0 ? 'lg:mr-auto lg:pr-8' : 'lg:ml-auto lg:pl-8'
            ]">
              <div class="flex items-center mb-4">
                <div :class="[
                  'w-12 h-12 rounded-full flex items-center justify-center mr-4',
                  phase.status === 'completed' ? 'bg-maghreb-green text-white' :
                  phase.status === 'in-progress' ? 'bg-maghreb-yellow text-maghreb-dark' :
                  'bg-gray-200 text-gray-600'
                ]">
                  <component :is="phase.icon" class="w-6 h-6" />
                </div>
                <div>
                  <span :class="[
                    'inline-block px-3 py-1 rounded-full text-sm font-semibold mb-2',
                    phase.status === 'completed' ? 'bg-green-100 text-green-800' :
                    phase.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-600'
                  ]">
                    {{ phase.status === 'completed' ? 'Completed' : phase.status === 'in-progress' ? 'In Progress' : 'Upcoming' }}
                  </span>
                  <h3 class="text-xl font-bold text-maghreb-dark">{{ phase.title }}</h3>
                </div>
              </div>
              <p class="text-gray-600 mb-4">{{ phase.description }}</p>
              <div class="text-sm text-maghreb-blue font-semibold">
                {{ phase.timeline }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Progress indicator -->
      <div class="mt-16 text-center">
        <div class="bg-white rounded-2xl p-8 shadow-lg">
          <h3 class="text-2xl font-bold text-maghreb-dark mb-4">Overall Progress</h3>
          <div class="w-full bg-gray-200 rounded-full h-3 mb-4">
            <div 
              class="bg-gradient-to-r from-maghreb-green to-maghreb-blue h-3 rounded-full transition-all duration-1000"
              :style="{ width: overallProgress + '%' }"
            ></div>
          </div>
          <p class="text-lg font-semibold text-maghreb-dark">{{ overallProgress }}% Complete</p>
          <p class="text-gray-600 mt-2">On track for January 1, 2026 launch</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Target, Users, Code, Handshake, Rocket } from 'lucide-vue-next'
import { computed } from 'vue'

interface Phase {
  title: string
  description: string
  timeline: string
  status: 'completed' | 'in-progress' | 'upcoming'
  icon: any
}

const phases: Phase[] = [
  {
    title: 'Founding Vision & Identity',
    description: 'Established the core concept, mission, and visual identity of TheGreatMaghreb digital nation',
    timeline: 'Completed',
    status: 'completed',
    icon: Target
  },
  {
    title: 'Community Formation',
    description: 'Building the foundation community of founding citizens and establishing governance frameworks',
    timeline: 'Q4 2025',
    status: 'in-progress',
    icon: Users
  },
  {
    title: 'Digital Citizenship & Governance Prototype',
    description: 'Developing digital ID system and governance prototype for community testing',
    timeline: 'Q4 2025',
    status: 'in-progress',
    icon: Code
  },
  {
    title: 'Partnerships & Recognition',
    description: 'Establishing partnerships with Maghrebi organizations and seeking broader recognition',
    timeline: 'Q4 2025 - Q1 2026',
    status: 'upcoming',
    icon: Handshake
  },
  {
    title: 'Official Launch & Scaling',
    description: 'Official launch of TheGreatMaghreb digital nation with full platform features',
    timeline: 'January 1, 2026',
    status: 'upcoming',
    icon: Rocket
  }
]

const overallProgress = computed(() => {
  const completed = phases.filter(p => p.status === 'completed').length
  const inProgress = phases.filter(p => p.status === 'in-progress').length
  return Math.round(((completed + inProgress * 0.5) / phases.length) * 100)
})
</script>

<style scoped>
.animate-ping {
  animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
}

@keyframes ping {
  75%, 100% {
    transform: scale(2);
    opacity: 0;
  }
}
</style>