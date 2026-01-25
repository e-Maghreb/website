import { ref, computed, onMounted, onUnmounted } from 'vue'

// Community metrics state
const totalMembers = ref(39) // Initial count from Reddit
const lastUpdated = ref(new Date().toISOString())

// Milestone definitions - Shared across components
const milestonesRaw = [
  { id: '1', target: 100, translationKey: 'roadmap.milestones.1' },
  { id: '2', target: 500, translationKey: 'roadmap.milestones.2' },
  { id: '3', target: 1000, translationKey: 'roadmap.milestones.3' },
  { id: '4', target: 5000, translationKey: 'roadmap.milestones.4' },
  { id: '5', target: 10000, translationKey: 'roadmap.milestones.5' }
]

const fetchRedditStats = async () => {
  try {
    const response = await fetch('https://www.reddit.com/r/eMaghreb/about.json')
    const json = await response.json()
    if (json.data && json.data.subscribers) {
      totalMembers.value = json.data.subscribers
      lastUpdated.value = new Date().toISOString()
    }
  } catch (error) {
    console.error('Failed to fetch Reddit stats:', error)
  }
}

// Global computed properties
const milestonesProgress = computed(() => {
  return milestonesRaw.map(m => ({
    ...m,
    achieved: totalMembers.value >= m.target
  }))
})

const nextMilestone = computed(() => {
  return milestonesProgress.value.find(m => !m.achieved) || milestonesProgress.value[milestonesProgress.value.length - 1]
})

const lastAchievedMilestone = computed(() => {
  const achieved = [...milestonesProgress.value].reverse().find(m => m.achieved)
  return achieved || { id: '0', target: 0 }
})

const currentProgressPercentage = computed(() => {
  const start = lastAchievedMilestone.value.target
  const end = nextMilestone.value.target
  if (start === end) return 100
  const progress = ((totalMembers.value - start) / (end - start)) * 100
  return Math.max(0, Math.min(100, progress))
})

// Singleton state management
let initialized = false
let updateInterval = null
let activeComponents = 0

const initMetrics = () => {
  fetchRedditStats()

  // Update every 5 minutes
  updateInterval = setInterval(fetchRedditStats, 5 * 60 * 1000)

  return () => {
    if (updateInterval) {
      clearInterval(updateInterval)
      updateInterval = null
    }
  }
}

export function useCommunityMetrics() {
  let cleanupFn = null

  onMounted(() => {
    activeComponents++
    if (!initialized) {
      cleanupFn = initMetrics()
      initialized = true
    }
  })

  onUnmounted(() => {
    activeComponents--
    if (activeComponents === 0 && initialized) {
      if (cleanupFn) cleanupFn()
      initialized = false
    }
  })

  return {
    totalMembers,
    lastUpdated,
    milestones: milestonesProgress,
    nextMilestone,
    lastAchievedMilestone,
    currentProgressPercentage
  }
}