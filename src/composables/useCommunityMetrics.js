import { ref, onMounted, onUnmounted } from 'vue'

// Community metrics state
const totalMembers = ref(39) // Initial count from Reddit
const lastUpdated = ref(new Date().toISOString())

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

// Singleton state management
let initialized = false
let updateInterval = null
let activeComponents = 0

const initMetrics = () => {
  fetchRedditStats()

  // Update every 5 minutes instead of every 10s to be more reasonable
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
    lastUpdated
  }
}