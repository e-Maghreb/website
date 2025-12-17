<template>
  <section class="py-16 bg-gradient-to-b from-maghreb-light to-white">
    <div class="container mx-auto px-4">
      <!-- Section Header -->
      <div class="text-center mb-12">
        <h2 class="text-4xl font-bold text-maghreb-dark mb-4">
          Our Journey Together
        </h2>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
          Watch our digital nation grow and unlock new features as we reach community milestones
        </p>
        
        <!-- Community Progress Overview -->
        <div class="mt-8 bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
          <div class="flex items-center justify-between mb-4">
            <span class="text-lg font-semibold text-maghreb-dark">Community Progress</span>
            <span class="text-2xl font-bold text-maghreb-green">{{ currentMembers }} Citizens</span>
          </div>
          <div class="w-full bg-gray-200 rounded-full h-4 mb-2">
            <div 
              class="bg-gradient-to-r from-maghreb-green to-maghreb-blue h-4 rounded-full transition-all duration-1000 ease-out"
              :style="{ width: progressPercentage + '%' }"
            ></div>
          </div>
          <div class="flex justify-between text-sm text-gray-600">
            <span>0</span>
            <span class="font-medium">Next Milestone: {{ nextMilestone.target }} Citizens</span>
            <span>{{ maxTarget }}</span>
          </div>
        </div>
      </div>

      <!-- Interactive Timeline -->
      <div class="relative">
        <!-- Timeline Line -->
        <div class="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-gray-300"></div>
        
        <!-- Milestone Cards -->
        <div class="space-y-12">
          <div 
            v-for="(milestone, index) in milestones" 
            :key="milestone.id"
            class="relative flex items-center"
            :class="{ 'flex-row-reverse': index % 2 === 1 }"
          >
            <!-- Milestone Card -->
            <div 
              class="w-5/12 cursor-pointer transition-all duration-300 hover:scale-105"
              @click="selectMilestone(milestone)"
              @mouseenter="hoveredMilestone = milestone.id"
              @mouseleave="hoveredMilestone = null"
            >
              <div 
                class="bg-white rounded-lg shadow-lg p-6 border-2 transition-all duration-300"
                :class="{
                  'border-maghreb-green shadow-xl': milestone.achieved,
                  'border-gray-200': !milestone.achieved,
                  'border-maghreb-gold shadow-lg': hoveredMilestone === milestone.id
                }"
              >
                <!-- Achievement Badge -->
                <div v-if="milestone.achieved" class="absolute -top-3 -right-3">
                  <div class="bg-maghreb-green text-white rounded-full p-2">
                    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                    </svg>
                  </div>
                </div>

                <!-- Milestone Header -->
                <div class="flex items-center justify-between mb-4">
                  <h3 class="text-xl font-bold text-maghreb-dark">{{ milestone.title }}</h3>
                  <span 
                    class="px-3 py-1 rounded-full text-sm font-medium"
                    :class="{
                      'bg-maghreb-green text-white': milestone.achieved,
                      'bg-gray-100 text-gray-600': !milestone.achieved
                    }"
                  >
                    {{ milestone.target }} Citizens
                  </span>
                </div>

                <!-- Milestone Description -->
                <p class="text-gray-600 mb-4">{{ milestone.description }}</p>

                <!-- Features Preview -->
                <div class="space-y-2">
                  <div 
                    v-for="feature in milestone.features.slice(0, 3)" 
                    :key="feature"
                    class="flex items-center text-sm"
                  >
                    <svg 
                      class="w-4 h-4 mr-2" 
                      :class="milestone.achieved ? 'text-maghreb-green' : 'text-gray-400'"
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                    >
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                    </svg>
                    <span :class="milestone.achieved ? 'text-gray-700' : 'text-gray-500'">{{ feature }}</span>
                  </div>
                  <div v-if="milestone.features.length > 3" class="text-sm text-gray-500">
                    +{{ milestone.features.length - 3 }} more features
                  </div>
                </div>

                <!-- Progress Indicator -->
                <div v-if="!milestone.achieved && currentMembers < milestone.target" class="mt-4">
                  <div class="flex justify-between text-xs text-gray-500 mb-1">
                    <span>{{ Math.max(0, milestone.target - currentMembers) }} more needed</span>
                    <span>{{ Math.min(100, Math.round((currentMembers / milestone.target) * 100)) }}%</span>
                  </div>
                  <div class="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      class="bg-gradient-to-r from-maghreb-yellow to-maghreb-orange h-2 rounded-full transition-all duration-1000"
                      :style="{ width: Math.min(100, (currentMembers / milestone.target) * 100) + '%' }"
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Timeline Dot -->
            <div class="absolute left-1/2 transform -translate-x-1/2 z-10">
              <div 
                class="w-6 h-6 rounded-full border-4 transition-all duration-300"
                :class="{
                  'bg-maghreb-green border-maghreb-green': milestone.achieved,
                  'bg-white border-gray-300': !milestone.achieved && currentMembers < milestone.target,
                  'bg-maghreb-yellow border-maghreb-yellow animate-pulse': !milestone.achieved && currentMembers >= milestone.target * 0.8
                }"
              ></div>
            </div>

            <!-- Spacer -->
            <div class="w-5/12"></div>
          </div>
        </div>
      </div>

      <!-- Milestone Detail Modal -->
      <div 
        v-if="selectedMilestone" 
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
        @click="selectedMilestone = null"
      >
        <div 
          class="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto"
          @click.stop
        >
          <div class="p-6">
            <div class="flex justify-between items-start mb-4">
              <div>
                <h3 class="text-2xl font-bold text-maghreb-dark">{{ selectedMilestone.title }}</h3>
                <p class="text-maghreb-green font-medium">{{ selectedMilestone.target }} Citizens Required</p>
              </div>
              <button 
                @click="selectedMilestone = null"
                class="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <p class="text-gray-600 mb-6">{{ selectedMilestone.description }}</p>

            <div class="mb-6">
              <h4 class="text-lg font-semibold text-maghreb-dark mb-3">Features & Benefits</h4>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div 
                  v-for="feature in selectedMilestone.features" 
                  :key="feature"
                  class="flex items-center p-3 bg-gray-50 rounded-lg"
                >
                  <svg class="w-5 h-5 text-maghreb-green mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                  </svg>
                  <span class="text-gray-700">{{ feature }}</span>
                </div>
              </div>
            </div>

            <div class="flex justify-center">
              <button 
                @click="shareMilestone(selectedMilestone)"
                class="bg-maghreb-green text-white px-6 py-3 rounded-lg font-medium hover:bg-maghreb-dark transition-colors"
              >
                Share This Milestone
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

interface Milestone {
  id: string
  title: string
  description: string
  target: number
  achieved: boolean
  features: string[]
  date?: string
}

const currentMembers = ref(2) // Based on Reddit community data
const hoveredMilestone = ref<string | null>(null)
const selectedMilestone = ref<Milestone | null>(null)

const milestones = ref<Milestone[]>([
  {
    id: '1',
    title: 'Foundation Phase',
    description: 'Building the core community and establishing our digital presence',
    target: 10,
    achieved: false,
    features: [
      'Basic community forum access',
      'Digital citizenship registration',
      'Welcome package and orientation',
      'Access to founding member Discord',
      'Early voting rights on community decisions'
    ],
    date: 'Q4 2025'
  },
  {
    id: '2',
    title: 'Growth & Governance',
    description: 'Implementing democratic governance and expanding community features',
    target: 50,
    achieved: false,
    features: [
      'Democratic voting system',
      'Community governance proposals',
      'Advanced member profiles',
      'Regional community groups',
      'Monthly community meetings'
    ],
    date: 'Q1 2026'
  },
  {
    id: '3',
    title: 'Digital Services',
    description: 'Launching essential digital services for all citizens',
    target: 100,
    achieved: false,
    features: [
      'Digital ID verification system',
      'Secure messaging platform',
      'Document storage service',
      'Community marketplace',
      'Event management system'
    ],
    date: 'Q2 2026'
  },
  {
    id: '4',
    title: 'Economic Integration',
    description: 'Creating economic opportunities and partnerships',
    target: 500,
    achieved: false,
    features: [
      'Digital currency integration',
      'Freelancer marketplace',
      'Business networking hub',
      'Investment opportunities',
      'Partnership with Maghreb businesses'
    ],
    date: 'Q3 2026'
  },
  {
    id: '5',
    title: 'Full Nation Status',
    description: 'Achieving full digital nation capabilities and recognition',
    target: 1000,
    achieved: false,
    features: [
      'Full diplomatic recognition',
      'International partnerships',
      'Advanced AI governance',
      'Cultural preservation programs',
      'Global Maghreb representation'
    ],
    date: 'Q4 2026'
  }
])

const maxTarget = computed(() => Math.max(...milestones.value.map(m => m.target)))

const progressPercentage = computed(() => {
  const nextMilestone = milestones.value.find(m => !m.achieved) || milestones.value[milestones.value.length - 1]
  return (currentMembers.value / maxTarget.value) * 100
})

const nextMilestone = computed(() => {
  return milestones.value.find(m => !m.achieved) || milestones.value[milestones.value.length - 1]
})

const selectMilestone = (milestone: Milestone) => {
  selectedMilestone.value = milestone
}

const shareMilestone = (milestone: Milestone) => {
  const text = `Help us reach ${milestone.target} citizens to unlock: ${milestone.title}! Join TheGreatMaghreb digital nation.`
  const url = `https://www.reddit.com/r/TheGreatMaghreb/`
  
  if (navigator.share) {
    navigator.share({
      title: `TheGreatMaghreb Milestone: ${milestone.title}`,
      text: text,
      url: url
    })
  } else {
    // Fallback to Twitter
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`
    window.open(twitterUrl, '_blank')
  }
}

// Simulate real-time member count updates
onMounted(() => {
  setInterval(() => {
    // Random fluctuation to simulate activity
    if (Math.random() > 0.7) {
      currentMembers.value += Math.floor(Math.random() * 3)
    }
  }, 30000) // Update every 30 seconds
})
</script>

<style scoped>
.maghreb-light {
  background-color: #f0f9f4;
}

.maghreb-dark {
  color: #1a472a;
}

.maghreb-green {
  background-color: #22c55e;
  color: white;
}

.maghreb-blue {
  background-color: #3b82f6;
}

.maghreb-yellow {
  background-color: #eab308;
}

.maghreb-orange {
  background-color: #f97316;
}
</style>