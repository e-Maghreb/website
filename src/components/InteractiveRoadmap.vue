<template>
  <section class="py-16 bg-gradient-to-b from-maghreb-light to-white">
    <div class="container mx-auto px-4">
      <!-- Section Header -->
      <div class="text-center mb-12">
        <h2 class="text-3xl md:text-4xl font-bold text-maghreb-dark mb-4">
          {{ t('roadmap.title') }}
        </h2>
        <p class="text-lg md:text-xl text-black max-w-3xl mx-auto">
          {{ t('roadmap.subtitle') }}
        </p>

        <!-- Community Progress Overview -->
        <div class="mt-8 bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-auto border border-gray-100">
          <div class="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-4">
            <div class="text-left">
              <span class="text-sm uppercase tracking-wider font-bold text-gray-400 block mb-1">{{ t('roadmap.progress.title') }}</span>
              <h3 class="text-3xl font-black text-maghreb-dark flex items-center">
                {{ currentMembers }}
                <span class="text-lg font-medium text-gray-500 ml-2">{{ t('roadmap.progress.citizens') }}</span>
              </h3>
            </div>
            <div class="text-left md:text-right">
              <span class="text-sm font-bold text-maghreb-red block mb-1">{{ t('roadmap.progress.next_goal', { title: nextMilestoneTitle }) }}</span>
              <span class="text-xl font-bold text-maghreb-green">{{ nextMilestone.target }} {{ t('roadmap.progress.citizens') }}</span>
              <p class="text-xs text-gray-400 mt-1">{{ t('roadmap.progress.needed', { count: Math.max(0, nextMilestone.target - currentMembers) }) }}</p>
            </div>
          </div>

          <div class="relative pt-1">
            <div class="flex mb-2 items-center justify-between">
              <div>
                <span class="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-maghreb-green bg-maghreb-green/10">
                  {{ t('roadmap.progress.percentage_to_milestone', { percentage: Math.round(progressPercentage) }) }}
                </span>
              </div>
            </div>
            <div class="overflow-hidden h-4 mb-4 text-xs flex rounded-full bg-gray-100 shadow-inner">
              <div
                :style="{ width: progressPercentage + '%' }"
                class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-maghreb-green via-maghreb-yellow to-maghreb-red transition-all duration-1000 ease-out"
              ></div>
            </div>
          </div>

          <div class="flex justify-between text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">
            <span>{{ lastAchievedMilestone.target }} {{ t('roadmap.progress.citizens') }}</span>
            <span>{{ t('roadmap.progress.target_label', { target: nextMilestone.target }) }}</span>
          </div>
        </div>
      </div>

      <!-- Interactive Timeline -->
      <div class="relative">
        <!-- Timeline Line -->
        <div class="absolute left-8 md:left-1/2 transform -translate-x-px h-full w-0.5 bg-gray-300"></div>

        <!-- Milestone Cards -->
        <div class="space-y-12">
          <div
            v-for="(milestone, index) in milestones"
            :key="milestone.id"
            class="relative flex flex-col md:flex-row items-center"
            :class="{ 'md:flex-row-reverse': index % 2 === 1 }"
          >
            <!-- Milestone Card -->
            <div
              class="w-full pl-20 md:pl-0 md:w-5/12 cursor-pointer transition-all duration-300 hover:scale-105"
              @click="selectMilestone(milestone)"
              @mouseenter="hoveredMilestone = milestone.id"
              @mouseleave="hoveredMilestone = null"
            >
              <div
                class="bg-white rounded-lg shadow-lg p-6 border-2 transition-all duration-300"
                :class="{
                  'border-maghreb-green shadow-xl': milestone.achieved,
                  'border-gray-200': !milestone.achieved,
                  'border-maghreb-yellow shadow-lg': hoveredMilestone === milestone.id
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
                <div class="flex flex-wrap items-center justify-between mb-4 gap-2">
                  <h3 class="text-xl font-bold text-maghreb-dark">{{ milestone.title }}</h3>
                  <span
                    class="px-3 py-1 rounded-full text-sm font-medium"
                    :class="{
                      'bg-maghreb-green text-white': milestone.achieved,
                      'bg-gray-100 text-gray-600': !milestone.achieved
                    }"
                  >
                    {{ milestone.target }} {{ t('roadmap.progress.citizens') }}
                  </span>
                </div>

                <!-- Milestone Description -->
                <p class="text-black mb-4">{{ milestone.description }}</p>

                <!-- Features Preview -->
                <div class="space-y-2">
                  <div
                    v-for="feature in milestone.features.slice(0, 3)"
                    :key="feature"
                    class="flex items-center text-sm"
                  >
                    <svg
                      class="w-4 h-4 mr-2 flex-shrink-0"
                      :class="milestone.achieved ? 'text-maghreb-green' : 'text-gray-400'"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                    </svg>
                    <span :class="milestone.achieved ? 'text-black' : 'text-black'">{{ feature }}</span>
                  </div>
                  <div v-if="milestone.features.length > 3" class="text-sm text-black">
                    {{ t('roadmap.modal.more_features').replace('{count}', String(milestone.features.length - 3)) }}
                  </div>
                </div>

                <!-- Progress Indicator -->
                <div v-if="!milestone.achieved && currentMembers < milestone.target" class="mt-4">
                  <div class="flex justify-between text-xs text-gray-500 mb-1">
                    <span>{{ t('roadmap.progress.needed').replace('{count}', String(Math.max(0, milestone.target - currentMembers))) }}</span>
                    <span>{{ Math.min(100, Math.round((currentMembers / milestone.target) * 100)) }}%</span>
                  </div>
                  <div class="w-full bg-gray-200 rounded-full h-2">
                    <div
                      class="bg-gradient-to-r from-maghreb-yellow to-orange-500 h-2 rounded-full transition-all duration-1000"
                      :style="{ width: Math.min(100, (currentMembers / milestone.target) * 100) + '%' }"
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Timeline Dot -->
            <div class="absolute left-8 md:left-1/2 transform -translate-x-1/2 z-10 -ml-[0.5px] md:ml-0">
              <div
                class="w-6 h-6 rounded-full border-4 transition-all duration-300"
                :class="{
                  'bg-maghreb-green border-maghreb-green': milestone.achieved,
                  'bg-white border-gray-300': !milestone.achieved && currentMembers < milestone.target,
                  'bg-maghreb-yellow border-maghreb-yellow animate-pulse': !milestone.achieved && currentMembers >= milestone.target * 0.8
                }"
              ></div>
            </div>

            <!-- Spacer for Desktop -->
            <div class="hidden md:block md:w-5/12"></div>
          </div>
        </div>
      </div>

      <!-- Milestone Detail Modal -->
      <div
        v-if="selectedMilestone"
        class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto"
        @click="selectedMilestone = null"
      >
        <div
          class="bg-white rounded-lg shadow-xl max-w-2xl w-full my-8 relative"
          @click.stop
        >
          <div class="p-6">
            <div class="flex justify-between items-start mb-4">
              <div>
                <h3 class="text-2xl font-bold text-maghreb-dark">{{ selectedMilestone.title }}</h3>
                <p class="text-maghreb-green font-medium">{{ t('roadmap.modal.required').replace('{count}', String(selectedMilestone.target)) }}</p>
              </div>
              <button
                @click="selectedMilestone = null"
                class="text-gray-400 hover:text-gray-600 transition-colors p-2"
                aria-label="Close modal"
              >
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <p class="text-black mb-6">{{ selectedMilestone.description }}</p>

            <div class="mb-6">
              <h4 class="text-lg font-semibold text-maghreb-dark mb-3">{{ t('roadmap.modal.features') }}</h4>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div
                  v-for="feature in selectedMilestone.features"
                  :key="feature"
                  class="flex items-center p-3 bg-gray-50 rounded-lg"
                >
                  <svg class="w-5 h-5 text-maghreb-green mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                  </svg>
                  <span class="text-black">{{ feature }}</span>
                </div>
              </div>
            </div>

            <div class="flex justify-center">
              <button
                @click="shareMilestone(selectedMilestone)"
                class="bg-maghreb-green text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors"
              >
                {{ t('roadmap.modal.share_btn') }}
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
import { useLanguage } from '../composables/useLanguage'
import { useCommunityMetrics } from '../composables/useCommunityMetrics'

const { t } = useLanguage()
const {
  totalMembers: currentMembers,
  milestones: sharedMilestones,
  nextMilestone,
  lastAchievedMilestone,
  currentProgressPercentage: progressPercentage
} = useCommunityMetrics()

interface Milestone {
  id: string
  title: string
  description: string
  target: number
  achieved: boolean
  features: string[]
  date?: string
}

const hoveredMilestone = ref<string | null>(null)
const selectedMilestone = ref<Milestone | null>(null)

// Map shared milestones to include translations
const milestones = computed<Milestone[]>(() => {
  return sharedMilestones.value.map(m => ({
    ...m,
    title: t(`${m.translationKey}.title`),
    description: t(`${m.translationKey}.description`),
    features: t(`${m.translationKey}.features`),
    date: m.id === '1' ? 'Q4 2025' :
          m.id === '2' ? 'Q1 2026' :
          m.id === '3' ? 'Q2 2026' :
          m.id === '4' ? 'Q3 2026' : 'Q4 2026'
  }))
})

const maxTarget = computed(() => Math.max(...milestones.value.map(m => m.target)))

const nextMilestoneTitle = computed(() => {
  return t(`${nextMilestone.value.translationKey}.title`)
})

const selectMilestone = (milestone: Milestone) => {
  selectedMilestone.value = milestone
}

const shareMilestone = (milestone: Milestone) => {
  const text = `Help us reach ${milestone.target} citizens to unlock: ${milestone.title}! Join e-Maghreb digital nation.`
  const url = `https://www.reddit.com/r/eMaghreb/`

  if (navigator.share) {
    navigator.share({
      title: `e-Maghreb Milestone: ${milestone.title}`,
      text: text,
      url: url
    })
  } else {
    // Fallback to Twitter
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`
    window.open(twitterUrl, '_blank')
  }
}
</script>

<style scoped>
/* Scoped styles removed in favor of Tailwind config */
</style>