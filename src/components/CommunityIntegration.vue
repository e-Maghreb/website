<template>
  <section id="community" class="relative py-24 md:py-32 overflow-hidden bg-gradient-to-br from-maghreb-red via-black to-maghreb-green">
    <!-- Overlay Pattern -->
    <div class="absolute inset-0 opacity-10 pointer-events-none">
      <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
    </div>

    <div class="container mx-auto px-6 relative z-10">
      <div class="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
        <!-- Left Column: Content -->
        <div class="flex-1 text-left">
          <div class="inline-flex items-center px-4 py-2 rounded-full bg-white/10 border border-white/10 text-white font-medium text-sm mb-6 animate-fade-in backdrop-blur-sm">
            <Users class="w-4 h-4 mr-2" />
            {{ t('community.badge') }}
          </div>

          <h2 class="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-8 leading-tight">
            {{ t('community.title') }}
          </h2>

          <p class="text-xl text-white/80 mb-12 max-w-xl leading-relaxed">
            {{ t('community.subtitle') }}
          </p>

          <!-- Compact Features Grid -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12">
            <div
              v-for="(feature, index) in communityFeatures"
              :key="index"
              class="group flex items-start gap-4 p-4 rounded-2xl bg-black/20 border border-white/5 hover:bg-black/40 transition-all duration-300 transform hover:-translate-y-1"
            >
              <div class="flex-shrink-0 w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <component :is="feature.icon" class="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 class="text-lg font-bold text-white mb-1">{{ feature.title }}</h4>
                <p class="text-sm text-white/60 leading-snug">{{ feature.description }}</p>
              </div>
            </div>
          </div>

          <!-- CTA Buttons -->
          <div class="flex flex-wrap gap-6">
            <a
              href="https://www.reddit.com/r/eMaghreb/"
              target="_blank"
              rel="noopener noreferrer"
              class="relative group bg-white text-maghreb-dark font-bold py-4 px-10 rounded-2xl transition-all duration-300 flex items-center shadow-xl hover:shadow-2xl overflow-hidden hover:scale-105"
            >
              <svg class="w-6 h-6 mr-3 relative z-10 text-maghreb-red" fill="currentColor" viewBox="0 0 16 16">
                <path d="M6.167 8a.83.83 0 0 0-.83.83c0 .459.372.84.83.831a.831.831 0 0 0 0-1.661m1.843 3.647c.315 0 1.403-.038 1.976-.611a.23.23 0 0 0 0-.306.213.213 0 0 0-.306 0c-.353.363-1.126.487-1.67.487-.545 0-1.308-.124-1.671-.487a.213.213 0 0 0-.306 0 .213.213 0 0 0 0 .306c.564.563 1.652.61 1.977.61zm.992-2.807c0 .458.373.83.831.83s.83-.381.83-.83a.831.831 0 0 0-1.66 0z"/>
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.828-1.165c-.315 0-.602.124-.812.325-.801-.573-1.9-.945-3.121-.993l.534-2.501 1.738.372a.83.83 0 1 0 .83-.869.83.83 0 0 0-.744.468l-1.938-.41a.2.2 0 0 0-.153.028.2.2 0 0 0-.086.134l-.592 2.788c-1.24.038-2.358.41-3.17.992-.21-.2-.496-.324-.81-.324a1.163 1.163 0 0 0-.478 2.224q-.03.17-.029.353c0 1.795 2.091 3.256 4.669 3.256s4.668-1.451 4.668-3.256c0-.114-.01-.238-.029-.353.401-.181.688-.592.688-1.069 0-.65-.525-1.165-1.165-1.165"/>
              </svg>
              <span class="relative z-10">{{ t('community.ready.join_btn') }}</span>
            </a>
            <button
              @click="shareCommunity"
              class="group bg-white/10 hover:bg-white/20 text-white font-bold py-4 px-10 rounded-2xl transition-all duration-300 border border-white/20 flex items-center backdrop-blur-md"
            >
              <Share2 class="w-5 h-5 mr-3 group-hover:rotate-12 transition-transform duration-300" />
              {{ t('community.ready.share_btn') }}
            </button>
          </div>
        </div>

        <!-- Right Column: Visual Network Animation -->
        <div class="flex-1 relative h-[500px] w-full flex items-center justify-center">
          <!-- Central Hub -->
          <div class="relative z-20 w-32 h-32 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center shadow-[0_0_50px_rgba(255,255,255,0.1)] animate-pulse-slow">
             <div class="w-24 h-24 rounded-full bg-gradient-to-br from-maghreb-red to-maghreb-green opacity-80 flex items-center justify-center">
               <span class="text-3xl font-bold text-white tracking-widest">eM</span>
             </div>
          </div>

          <!-- Orbiting Nodes -->
          <div class="absolute inset-0 animate-spin-slow pointer-events-none">
            <!-- Node 1 -->
            <div class="absolute top-10 left-1/4 w-12 h-12 rounded-full bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center animate-float" style="animation-delay: 0s;">
              <Users class="w-5 h-5 text-maghreb-red/80" />
            </div>
            <!-- Node 2 -->
            <div class="absolute bottom-20 right-1/4 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center animate-float-delayed" style="animation-delay: 1s;">
              <MessageCircle class="w-4 h-4 text-maghreb-green/80" />
            </div>
             <!-- Node 3 -->
            <div class="absolute top-1/3 right-10 w-14 h-14 rounded-full bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center animate-float" style="animation-delay: 2s;">
              <Lightbulb class="w-6 h-6 text-maghreb-yellow/80" />
            </div>
          </div>

          <!-- Connecting Lines (SVG) -->
          <svg class="absolute inset-0 w-full h-full pointer-events-none opacity-30">
            <line x1="50%" y1="50%" x2="25%" y2="20%" stroke="white" stroke-width="1" stroke-dasharray="5,5" class="animate-dash" />
            <line x1="50%" y1="50%" x2="75%" y2="80%" stroke="white" stroke-width="1" stroke-dasharray="5,5" class="animate-dash" style="animation-delay: 1s;" />
            <line x1="50%" y1="50%" x2="85%" y2="35%" stroke="white" stroke-width="1" stroke-dasharray="5,5" class="animate-dash" style="animation-delay: 0.5s;" />
             <circle cx="50%" cy="50%" r="150" fill="none" stroke="white" stroke-opacity="0.05" stroke-width="1" />
             <circle cx="50%" cy="50%" r="220" fill="none" stroke="white" stroke-opacity="0.03" stroke-width="1" />
          </svg>

          <!-- Floating Status Card -->
          <div class="absolute -bottom-6 -right-6 md:right-0 bg-black/40 backdrop-blur-xl border border-white/10 p-5 rounded-2xl shadow-2xl animate-float hidden md:block z-30">
            <div class="flex items-center gap-4 mb-3">
              <div class="relative">
                <div class="w-10 h-10 rounded-full bg-maghreb-green/20 flex items-center justify-center text-green-400 font-bold text-xs border border-green-500/30">
                  <div class="w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
                </div>
              </div>
              <div>
                <h5 class="text-white font-bold text-sm">{{ totalMembers }} {{ t('roadmap.progress.citizens') }}</h5>
                <p class="text-white/60 text-[10px]">{{ t('community.new_proposal') }}</p>
              </div>
            </div>
             <div class="flex items-center gap-2">
                 <div class="h-1.5 w-1.5 rounded-full bg-maghreb-red/50"></div>
                 <div class="h-1.5 w-1.5 rounded-full bg-white/50"></div>
                 <div class="h-1.5 w-1.5 rounded-full bg-maghreb-green/50"></div>
                 <span class="text-[10px] text-white/40 ml-auto">{{ t('community.badge') }}</span>
             </div>
          </div>
        </div>
      </div>

      <!-- Share Modal -->
      <transition enter-active-class="transition duration-300 ease-out" enter-from-class="opacity-0 scale-95" enter-to-class="opacity-100 scale-100" leave-active-class="transition duration-200 ease-in" leave-from-class="opacity-100 scale-100" leave-to-class="opacity-0 scale-95">
        <div v-if="showShareModal" class="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-6" @click="closeShareModal">
          <div class="bg-maghreb-dark border border-white/10 rounded-[2.5rem] p-10 max-w-lg w-full shadow-2xl relative" @click.stop>
            <button @click="closeShareModal" class="absolute top-6 right-6 text-white/40 hover:text-white transition-colors">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>

            <h3 class="text-3xl font-extrabold text-white mb-4 text-center">{{ t('community.share_modal.title') }}</h3>
            <p class="text-gray-400 mb-10 text-center leading-relaxed">{{ t('community.share_modal.help_text') }}</p>

            <div class="grid grid-cols-2 gap-5">
              <button
                v-for="(platform, index) in sharePlatforms"
                :key="index"
                @click="shareOnPlatform(platform)"
                class="group flex flex-col items-center justify-center p-6 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300"
              >
                <div class="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-white/10 transition-all duration-300">
                  <component :is="platform.icon" class="w-7 h-7 text-white" />
                </div>
                <span class="text-sm font-semibold text-white/80">{{ platform.name }}</span>
              </button>
            </div>

            <div class="mt-10 pt-8 border-t border-white/5 flex justify-center">
              <p class="text-xs text-white/30 uppercase tracking-widest font-bold">{{ t('community.social_invite') }}</p>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Users, MessageCircle, Lightbulb, Calendar, Share2, Facebook, Twitter, Link2, Mail } from 'lucide-vue-next'
import { useLanguage } from '../composables/useLanguage'
import { useCommunityMetrics } from '../composables/useCommunityMetrics'

const { t } = useLanguage()
const { totalMembers } = useCommunityMetrics()

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
    url: 'https://www.facebook.com/sharer/sharer.php?u=https://e-maghreb.org/'
  },
  {
    name: 'Twitter',
    icon: Twitter,
    url: 'https://twitter.com/intent/tweet?text=Join e-Maghreb community - a digital nation for Maghrebi citizens!&url=https://e-maghreb.org/'
  },
  {
    name: 'Link',
    icon: Link2,
    url: 'copy'
  },
  {
    name: 'Email',
    icon: Mail,
    url: 'mailto:?subject=Join e-Maghreb Community&body=Join e-Maghreb community - a digital nation for Maghrebi citizens!%0D%0A%0D%0Ahttps://e-maghreb.org/'
  }
]

const shareCommunity = () => {
  showShareModal.value = true
}

const closeShareModal = () => {
  showShareModal.value = false
}

const shareOnPlatform = (platform: SharePlatform) => {
  if (platform.url === 'copy') {
    navigator.clipboard.writeText('https://e-maghreb.org/')
    alert(t('community.share_modal.copied'))
  } else {
    window.open(platform.url, '_blank', 'width=600,height=400')
  }
  closeShareModal()
}
</script>

<style scoped>
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.animate-float {
  animation: float 4s ease-in-out infinite;
}

.animate-float-delayed {
  animation: float 5s ease-in-out infinite reverse;
}

.animate-fade-in {
  animation: fadeIn 0.8s ease-out forwards;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-spin-slow {
  animation: spin 30s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.animate-pulse-slow {
  animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: .8; transform: scale(1.05); }
}

@keyframes dash {
  to {
    stroke-dashoffset: -20;
  }
}

.animate-dash {
  animation: dash 1s linear infinite;
}
</style>