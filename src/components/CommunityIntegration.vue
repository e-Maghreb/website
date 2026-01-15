<template>
  <section class="py-20 md:py-32 bg-gradient-to-br from-maghreb-red via-black to-maghreb-green">
    <div class="container mx-auto px-6">
      <div class="text-center mb-16">
        <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
          {{ t('community.title') }}
        </h2>
        <p class="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
          {{ t('community.subtitle') }}
        </p>
      </div>

      <!-- Community Stats -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div
          v-for="(stat, index) in communityStats"
          :key="index"
          class="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center text-white hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
        >
          <div class="text-4xl md:text-5xl font-bold mb-2 text-white">
            {{ stat.count }}
          </div>
          <div class="text-lg opacity-90">{{ stat.label }}</div>
          <div class="text-sm opacity-70 mt-2">{{ stat.description }}</div>
        </div>
      </div>

      <!-- Community Features -->
      <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-12">
        <h3 class="text-2xl font-bold text-white mb-8 text-center">{{ t('community.features_title') }}</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div
            v-for="(feature, index) in communityFeatures"
            :key="index"
            class="text-center text-white"
          >
            <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-white/20 flex items-center justify-center">
              <component :is="feature.icon" class="w-8 h-8 text-white" />
            </div>
            <h4 class="font-semibold mb-2">{{ feature.title }}</h4>
            <p class="text-sm opacity-80">{{ feature.description }}</p>
          </div>
        </div>
      </div>

      <!-- CTA Section -->
      <div class="text-center">
        <div class="bg-white rounded-2xl p-8 max-w-2xl mx-auto">
          <h3 class="text-2xl font-bold text-maghreb-dark mb-4">{{ t('community.ready.title') }}</h3>
          <p class="text-black mb-6">
            {{ t('community.ready.description') }}
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://www.reddit.com/r/eMaghreb/"
              target="_blank"
              rel="noopener noreferrer"
              class="bg-maghreb-red hover:bg-maghreb-red/90 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
            >
              <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2A10 10 0 0 0 2 12c0 5.52 4.48 10 10 10s10-4.48 10-10A10 10 0 0 0 12 2zm5.75 13.3c-.23.3-.54.4-.88.23-1.3-.6-2.7-.9-4.2-.9s-2.9.3-4.2.9c-.34.17-.65.07-.88-.23-.3-.3-.2-.65.17-.88 1.6-.8 3.4-1.2 5.3-1.2s3.7.4 5.3 1.2c.37.23.47.58.17.88zM8.5 12.5c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm7 0c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2z"/>
              </svg>
              {{ t('community.ready.join_btn') }}
            </a>
            <button
              @click="shareCommunity"
              class="bg-maghreb-green hover:bg-maghreb-green/90 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
            >
              <Share2 class="w-5 h-5 mr-2" />
              {{ t('community.ready.share_btn') }}
            </button>
          </div>
        </div>
      </div>

      <!-- Share Modal -->
      <div v-if="showShareModal" class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50" @click="closeShareModal">
        <div class="bg-white rounded-2xl p-8 max-w-md mx-4" @click.stop>
          <h3 class="text-xl font-bold text-maghreb-dark mb-4">{{ t('community.share_modal.title') }}</h3>
          <p class="text-gray-600 mb-6">{{ t('community.share_modal.help_text') }}</p>
          <div class="grid grid-cols-2 gap-4">
            <button
              v-for="(platform, index) in sharePlatforms"
              :key="index"
              @click="shareOnPlatform(platform)"
              class="flex items-center justify-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors duration-300"
            >
              <component :is="platform.icon" class="w-5 h-5 mr-2" />
              {{ platform.name }}
            </button>
          </div>
          <button
            @click="closeShareModal"
            class="mt-6 w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded-lg transition-colors duration-300"
          >
            {{ t('community.share_modal.close') }}
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { Users, MessageCircle, Lightbulb, Calendar, Share2, Facebook, Twitter, Link2, Mail } from 'lucide-vue-next'
import { useLanguage } from '../composables/useLanguage'

const { t } = useLanguage()

interface CommunityStat {
  count: string
  label: string
  description: string
}

interface CommunityFeature {
  title: string
  description: string
  icon: any
}

interface SharePlatform {
  name: string
  icon: any
  url: string
}

const showShareModal = ref(false)

// Community stats - would be fetched from Reddit API in production
const communityStats = computed(() => [
  { count: '2', label: t('community.stats.members'), description: t('community.stats.growing') },
  { count: '2', label: t('community.stats.online'), description: t('community.stats.active') },
  { count: '0', label: t('community.stats.discussions'), description: t('community.stats.join') }
])

const communityFeatures = computed(() => [
  {
    title: t('community.features.discussions.title'),
    description: t('community.features.discussions.description'),
    icon: MessageCircle
  },
  {
    title: t('community.features.exchange.title'),
    description: t('community.features.exchange.description'),
    icon: Lightbulb
  },
  {
    title: t('community.features.events.title'),
    description: t('community.features.events.description'),
    icon: Calendar
  },
  {
    title: t('community.features.network.title'),
    description: t('community.features.network.description'),
    icon: Users
  }
])

const sharePlatforms: SharePlatform[] = [
  {
    name: 'Facebook',
    icon: Facebook,
    url: 'https://www.facebook.com/sharer/sharer.php?u=https://www.reddit.com/r/eMaghreb/'
  },
  {
    name: 'Twitter',
    icon: Twitter,
    url: 'https://twitter.com/intent/tweet?text=Join%20e-Maghreb%20Reddit%20community%20-%20a%20digital%20nation%20for%20Maghrebi%20citizens!&url=https://www.reddit.com/r/eMaghreb/'
  },
  {
    name: 'Copy Link',
    icon: Link2,
    url: 'copy'
  },
  {
    name: 'Email',
    icon: Mail,
    url: 'mailto:?subject=Join e-Maghreb Community&body=Check out e-Maghreb Reddit community: https://www.reddit.com/r/eMaghreb/'
  }
]

// Simulate fetching Reddit data
const fetchRedditData = async () => {
  try {
    // In production, this would call the Reddit API
    // For now, we'll use placeholder data based on the web search
    console.log('Fetching Reddit community data...')

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Update with real data when Reddit API is available
    // This would typically come from: https://www.reddit.com/r/eMaghreb/about.json
  } catch (error) {
    console.error('Error fetching Reddit data:', error)
  }
}

const shareCommunity = () => {
  showShareModal.value = true
}

const closeShareModal = () => {
  showShareModal.value = false
}

const shareOnPlatform = (platform: SharePlatform) => {
  if (platform.url === 'copy') {
    navigator.clipboard.writeText('https://www.reddit.com/r/eMaghreb/')
    alert(t('community.share_modal.copied'))
  } else {
    window.open(platform.url, '_blank', 'width=600,height=400')
  }
  closeShareModal()
}

onMounted(() => {
  fetchRedditData()
})
</script>

<style scoped>
.bg-maghreb-red\/20 {
  background-color: rgba(193, 39, 45, 0.2);
}

.bg-maghreb-yellow\/20 {
  background-color: rgba(255, 215, 0, 0.2);
}
</style>