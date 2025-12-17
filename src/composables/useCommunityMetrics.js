import { ref, computed, onMounted, onUnmounted } from 'vue'

// Community metrics state
const communityMetrics = ref({
  totalMembers: 2,
  activeMembers: 2,
  newMembersThisWeek: 1,
  countriesRepresented: 3,
  regions: 5,
  discussionsCount: 0,
  topicsCount: 3,
  satisfactionRate: 95,
  engagementScore: 85,
  growthRate: 50, // Percentage growth this month
  retentionRate: 90,
  referralRate: 25,
  averageSessionDuration: 12, // minutes
  pageViews: 1247,
  uniqueVisitors: 89,
  bounceRate: 35,
  socialShares: 15,
  redditSubscribers: 2,
  redditActiveUsers: 2,
  discordMembers: 0,
  lastUpdated: new Date().toISOString()
})

// Engagement events tracking
const engagementEvents = ref([])
const sessionStart = ref(Date.now())

// Computed properties for derived metrics
const communityHealth = computed(() => {
  const metrics = communityMetrics.value
  const healthScore = (
    (metrics.engagementScore * 0.3) +
    (metrics.satisfactionRate * 0.25) +
    (metrics.growthRate * 0.2) +
    (metrics.retentionRate * 0.25)
  )
  
  if (healthScore >= 80) return { status: 'Excellent', color: 'text-green-600', bgColor: 'bg-green-100' }
  if (healthScore >= 60) return { status: 'Good', color: 'text-blue-600', bgColor: 'bg-blue-100' }
  if (healthScore >= 40) return { status: 'Fair', color: 'text-yellow-600', bgColor: 'bg-yellow-100' }
  return { status: 'Needs Attention', color: 'text-red-600', bgColor: 'bg-red-100' }
})

const growthTrend = computed(() => {
  const { growthRate } = communityMetrics.value
  return {
    trend: growthRate > 0 ? 'Growing' : 'Declining',
    direction: growthRate > 0 ? 'up' : 'down',
    color: growthRate > 0 ? 'text-green-600' : 'text-red-600',
    icon: growthRate > 0 ? '↗' : '↘'
  }
})

// Functions to track engagement
const trackEvent = (eventType, data = {}) => {
  const event = {
    id: Date.now() + Math.random(),
    type: eventType,
    data,
    timestamp: new Date().toISOString(),
    sessionDuration: Math.round((Date.now() - sessionStart.value) / 1000) // seconds
  }
  
  engagementEvents.value.push(event)
  
  // Update metrics based on event type
  updateMetrics(eventType, data)
  
  // Store in localStorage for persistence
  storeEngagementData()
}

const updateMetrics = (eventType, data) => {
  const metrics = communityMetrics.value
  
  switch (eventType) {
    case 'page_view':
      metrics.pageViews++
      if (data.unique) metrics.uniqueVisitors++
      break
      
    case 'social_share':
      metrics.socialShares++
      break
      
    case 'time_on_page':
      if (data.duration > 30) { // Only count meaningful engagement
        metrics.averageSessionDuration = Math.round(
          (metrics.averageSessionDuration * (metrics.pageViews - 1) + data.duration) / metrics.pageViews
        )
      }
      break
      
    case 'community_join':
      metrics.totalMembers++
      if (data.referral) metrics.referralRate = Math.round((metrics.referralRate * metrics.totalMembers + 100) / (metrics.totalMembers + 1))
      break
      
    case 'discussion_participation':
      metrics.discussionsCount++
      metrics.engagementScore = Math.min(100, metrics.engagementScore + 0.5)
      break
      
    case 'satisfaction_survey':
      if (data.rating) {
        metrics.satisfactionRate = Math.round(
          (metrics.satisfactionRate * (metrics.totalMembers - 1) + data.rating * 20) / metrics.totalMembers
        )
      }
      break
  }
  
  metrics.lastUpdated = new Date().toISOString()
}

// Simulate real-time updates
const simulateRealTimeUpdates = () => {
  const interval = setInterval(() => {
    const metrics = communityMetrics.value
    
    // Simulate random activity
    if (Math.random() > 0.8) {
      metrics.pageViews += Math.floor(Math.random() * 5)
      
      // Simulate member growth
      if (Math.random() > 0.95) {
        metrics.totalMembers += Math.floor(Math.random() * 3)
        metrics.newMembersThisWeek++
      }
      
      // Simulate engagement fluctuations
      if (Math.random() > 0.9) {
        metrics.engagementScore = Math.max(0, Math.min(100, metrics.engagementScore + (Math.random() - 0.5) * 2))
      }
      
      // Update growth rate
      metrics.growthRate = Math.round((metrics.newMembersThisWeek / Math.max(1, metrics.totalMembers)) * 100 * 4) // Monthly projection
      
      metrics.lastUpdated = new Date().toISOString()
      storeEngagementData()
    }
  }, 10000) // Update every 10 seconds
  
  return interval
}

// Storage functions
const storeEngagementData = () => {
  try {
    localStorage.setItem('communityMetrics', JSON.stringify(communityMetrics.value))
    localStorage.setItem('engagementEvents', JSON.stringify(engagementEvents.value.slice(-100))) // Keep last 100 events
  } catch (error) {
    console.warn('Failed to store engagement data:', error)
  }
}

const loadEngagementData = () => {
  try {
    const storedMetrics = localStorage.getItem('communityMetrics')
    const storedEvents = localStorage.getItem('engagementEvents')
    
    if (storedMetrics) {
      const parsed = JSON.parse(storedMetrics)
      // Only load if data is recent (less than 24 hours old)
      const dataAge = Date.now() - new Date(parsed.lastUpdated).getTime()
      if (dataAge < 24 * 60 * 60 * 1000) {
        communityMetrics.value = { ...communityMetrics.value, ...parsed }
      }
    }
    
    if (storedEvents) {
      engagementEvents.value = JSON.parse(storedEvents)
    }
  } catch (error) {
    console.warn('Failed to load engagement data:', error)
  }
}

// Analytics reporting
const generateAnalyticsReport = () => {
  const events = engagementEvents.value
  const metrics = communityMetrics.value
  
  const report = {
    summary: {
      totalEvents: events.length,
      sessionDuration: Math.round((Date.now() - sessionStart.value) / 1000),
      communityHealth: communityHealth.value,
      growthTrend: growthTrend.value
    },
    topEvents: events.reduce((acc, event) => {
      acc[event.type] = (acc[event.type] || 0) + 1
      return acc
    }, {}),
    engagementPatterns: {
      peakHours: calculatePeakHours(events),
      popularContent: getPopularContent(events),
      userJourney: analyzeUserJourney(events)
    },
    recommendations: generateRecommendations(metrics, events)
  }
  
  return report
}

const calculatePeakHours = (events) => {
  const hours = events.reduce((acc, event) => {
    const hour = new Date(event.timestamp).getHours()
    acc[hour] = (acc[hour] || 0) + 1
    return acc
  }, {})
  
  return Object.entries(hours)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 3)
    .map(([hour, count]) => ({ hour: parseInt(hour), count }))
}

const getPopularContent = (events) => {
  return events
    .filter(e => e.type === 'page_view' && e.data.page)
    .reduce((acc, event) => {
      const page = event.data.page
      acc[page] = (acc[page] || 0) + 1
      return acc
    }, {})
}

const analyzeUserJourney = (events) => {
  const journey = []
  let currentSession = []
  
  events.forEach((event, index) => {
    if (index === 0 || (new Date(event.timestamp) - new Date(events[index-1].timestamp)) > 1800000) { // 30 min gap
      if (currentSession.length > 0) {
        journey.push([...currentSession])
      }
      currentSession = [event.type]
    } else {
      currentSession.push(event.type)
    }
  })
  
  if (currentSession.length > 0) {
    journey.push(currentSession)
  }
  
  return journey.slice(-5) // Last 5 sessions
}

const generateRecommendations = (metrics, events) => {
  const recommendations = []
  
  if (metrics.engagementScore < 60) {
    recommendations.push({
      type: 'engagement',
      priority: 'high',
      message: 'Low engagement detected. Consider adding more interactive content or community events.'
    })
  }
  
  if (metrics.retentionRate < 70) {
    recommendations.push({
      type: 'retention',
      priority: 'high',
      message: 'Retention rate is below 70%. Implement onboarding improvements and regular check-ins.'
    })
  }
  
  if (metrics.growthRate < 10) {
    recommendations.push({
      type: 'growth',
      priority: 'medium',
      message: 'Growth rate is slow. Focus on referral programs and social media outreach.'
    })
  }
  
  if (metrics.satisfactionRate < 80) {
    recommendations.push({
      type: 'satisfaction',
      priority: 'medium',
      message: 'Satisfaction rate needs improvement. Conduct user surveys and address pain points.'
    })
  }
  
  return recommendations
}

// Initialize the composable
const initCommunityMetrics = () => {
  loadEngagementData()
  
  // Track initial page view
  trackEvent('page_view', { 
    page: window.location.pathname,
    unique: true,
    referrer: document.referrer
  })
  
  // Start real-time updates
  const updateInterval = simulateRealTimeUpdates()
  
  // Track time on page
  let startTime = Date.now()
  window.addEventListener('beforeunload', () => {
    const duration = Math.round((Date.now() - startTime) / 1000)
    trackEvent('time_on_page', { duration })
  })
  
  // Track social shares
  const originalShare = navigator.share
  if (originalShare) {
    navigator.share = async (data) => {
      trackEvent('social_share', { platform: 'native', content: data.text })
      return originalShare.call(navigator, data)
    }
  }
  
  return {
    cleanup: () => {
      clearInterval(updateInterval)
      storeEngagementData()
    }
  }
}

export function useCommunityMetrics() {
  // Initialize on first use
  let cleanup = null
  
  onMounted(() => {
    const { cleanup: cleanupFn } = initCommunityMetrics()
    cleanup = cleanupFn
  })
  
  onUnmounted(() => {
    if (cleanup) cleanup()
  })
  
  return {
    metrics: communityMetrics,
    events: engagementEvents,
    communityHealth,
    growthTrend,
    trackEvent,
    generateAnalyticsReport,
    updateMetrics
  }
}