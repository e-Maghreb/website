<template>
  <section class="py-16 bg-gradient-to-br from-maghreb-light via-white to-maghreb-light">
    <div class="container mx-auto px-4">
      <!-- Section Header -->
      <div class="text-center mb-12">
        <h2 class="text-3xl md:text-4xl font-bold text-maghreb-dark mb-4">
          {{ t('social_proof.title') }}
        </h2>
        <p class="text-lg md:text-xl text-black max-w-3xl mx-auto">
          {{ t('social_proof.subtitle') }}
        </p>
      </div>

      <!-- Community Stats -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-16">
        <div class="bg-white rounded-lg shadow-lg p-6 text-center transform transition-transform hover:scale-105">
          <div class="text-3xl font-bold text-maghreb-green mb-2">{{ communityStats.totalCitizens }}</div>
          <div class="text-black font-medium">{{ t('social_proof.stats.citizens') }}</div>
          <div class="text-sm text-maghreb-green mt-1">{{ t('social_proof.stats.week').replace('{count}', String(communityStats.newThisWeek)) }}</div>
        </div>

        <div class="bg-white rounded-lg shadow-lg p-6 text-center transform transition-transform hover:scale-105">
          <div class="text-3xl font-bold text-maghreb-red mb-2">{{ communityStats.countries }}</div>
          <div class="text-black font-medium">{{ t('social_proof.stats.countries') }}</div>
          <div class="text-sm text-maghreb-red mt-1">{{ t('social_proof.stats.regions').replace('{count}', String(communityStats.regions)) }}</div>
        </div>

        <div class="bg-white rounded-lg shadow-lg p-6 text-center transform transition-transform hover:scale-105">
          <div class="text-3xl font-bold text-maghreb-yellow mb-2">{{ communityStats.activeDiscussions }}</div>
          <div class="text-black font-medium">{{ t('social_proof.stats.discussions') }}</div>
          <div class="text-sm text-maghreb-yellow mt-1">{{ t('social_proof.stats.topics').replace('{count}', String(communityStats.topics)) }}</div>
        </div>

        <div class="bg-white rounded-lg shadow-lg p-6 text-center transform transition-transform hover:scale-105">
          <div class="text-3xl font-bold text-maghreb-blue mb-2">{{ communityStats.satisfaction }}%</div>
          <div class="text-black font-medium">{{ t('social_proof.stats.satisfaction') }}</div>
          <div class="text-sm text-maghreb-blue mt-1">{{ t('social_proof.stats.surveys') }}</div>
        </div>
      </div>

      <!-- Testimonials Carousel -->
      <div class="relative mb-12">
        <div class="overflow-hidden px-4 md:px-12">
          <div
            class="flex transition-transform duration-500 ease-in-out"
            :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
          >
            <div
              v-for="(testimonial, index) in testimonials"
              :key="testimonial.id"
              class="w-full flex-shrink-0 px-4"
            >
              <div class="bg-white rounded-lg shadow-xl p-8 max-w-4xl mx-auto">
                <div class="flex flex-col md:flex-row items-center md:items-start gap-6">
                  <!-- Avatar -->
                  <div class="flex-shrink-0">
                    <div class="w-20 h-20 rounded-full bg-gradient-to-br from-maghreb-green to-maghreb-red flex items-center justify-center text-white text-2xl font-bold shadow-md">
                      {{ testimonial.name.charAt(0) }}
                    </div>
                  </div>

                  <!-- Content -->
                  <div class="flex-1 text-center md:text-left">
                    <blockquote class="text-lg text-black mb-4 italic">
                      "{{ testimonial.quote }}"
                    </blockquote>
                    <div class="mb-2">
                      <div class="flex justify-center md:justify-start mb-2">
                        <div
                          v-for="star in 5"
                          :key="star"
                          class="w-5 h-5"
                          :class="star <= testimonial.rating ? 'text-maghreb-yellow' : 'text-gray-300'"
                        >
                          <svg fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        </div>
                      </div>
                      <div class="font-semibold text-maghreb-dark">{{ testimonial.name }}</div>
                      <div class="text-gray-600 text-sm">{{ testimonial.title }} • {{ testimonial.location }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Navigation Buttons -->
        <button
          @click="prevSlide"
          class="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all hover:scale-110 z-10"
          :class="{ 'opacity-50 cursor-not-allowed': currentSlide === 0 }"
          :disabled="currentSlide === 0"
          aria-label="Previous testimonial"
        >
          <svg class="w-6 h-6 text-maghreb-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          @click="nextSlide"
          class="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all hover:scale-110 z-10"
          :class="{ 'opacity-50 cursor-not-allowed': currentSlide === testimonials.length - 1 }"
          :disabled="currentSlide === testimonials.length - 1"
          aria-label="Next testimonial"
        >
          <svg class="w-6 h-6 text-maghreb-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <!-- Dots Indicator -->
        <div class="flex justify-center mt-6 space-x-2">
          <button
            v-for="(testimonial, index) in testimonials"
            :key="index"
            @click="currentSlide = index"
            class="w-3 h-3 rounded-full transition-colors"
            :class="currentSlide === index ? 'bg-maghreb-green' : 'bg-gray-300'"
            :aria-label="`Go to testimonial ${index + 1}`"
          ></button>
        </div>
      </div>

      <!-- User Stories Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <div
          v-for="story in userStories"
          :key="story.id"
          class="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
          @click="openStory(story)"
        >
          <div class="flex items-center mb-4">
            <div class="w-12 h-12 rounded-full bg-gradient-to-br from-maghreb-yellow to-orange-500 flex items-center justify-center text-white font-bold mr-3 shadow-sm">
              {{ story.name.charAt(0) }}
            </div>
            <div>
              <div class="font-semibold text-maghreb-dark">{{ story.name }}</div>
              <div class="text-sm text-gray-600">{{ story.category }}</div>
            </div>
          </div>
          <p class="text-black mb-4 line-clamp-3">{{ story.excerpt }}</p>
          <div class="flex items-center justify-between mt-auto">
            <span class="text-sm text-maghreb-green font-medium flex items-center group">
              {{ t('social_proof.stories.read_more') }}
              <svg class="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </span>
            <span class="text-xs text-gray-500">{{ t('social_proof.stories.read_time').replace('{min}', String(story.readTime)) }}</span>
          </div>
        </div>
      </div>

      <!-- CTA Section -->
      <div class="text-center bg-gradient-to-r from-maghreb-green to-maghreb-red rounded-xl p-8 md:p-12 text-white shadow-2xl">
        <h3 class="text-2xl md:text-3xl font-bold mb-4">{{ t('social_proof.cta.title') }}</h3>
        <p class="text-lg md:text-xl mb-8 opacity-90 max-w-2xl mx-auto">
          {{ t('social_proof.cta.subtitle') }}
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            @click="joinCommunity"
            class="bg-white text-maghreb-green px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg"
          >
            {{ t('social_proof.cta.join_btn') }}
          </button>
          <button
            @click="shareStory()"
            class="border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/10 transition-all transform hover:scale-105"
          >
            {{ t('social_proof.cta.share_btn') }}
          </button>
        </div>
      </div>

      <!-- Story Detail Modal -->
      <div
        v-if="selectedStory"
        class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto"
        @click="selectedStory = null"
      >
        <div
          class="bg-white rounded-lg shadow-xl max-w-2xl w-full my-8 relative"
          @click.stop
        >
          <div class="p-6">
            <div class="flex justify-between items-start mb-6">
              <div class="flex items-center">
                <div class="w-16 h-16 rounded-full bg-gradient-to-br from-maghreb-yellow to-orange-500 flex items-center justify-center text-white font-bold text-xl mr-4 shadow-md">
                  {{ selectedStory.name.charAt(0) }}
                </div>
                <div>
                  <h3 class="text-xl font-bold text-maghreb-dark">{{ selectedStory.name }}</h3>
                  <p class="text-gray-600">{{ selectedStory.category }}</p>
                </div>
              </div>
              <button
                @click="selectedStory = null"
                class="text-gray-400 hover:text-gray-600 transition-colors p-2"
                aria-label="Close modal"
              >
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div class="prose max-w-none">
              <h4 class="text-lg font-semibold text-maghreb-dark mb-2">{{ t('social_proof.modal.story') }}</h4>
              <p class="text-black mb-6 leading-relaxed">{{ selectedStory.fullStory }}</p>

              <div class="bg-maghreb-light rounded-lg p-5 border-l-4 border-maghreb-green">
                <h4 class="font-semibold text-maghreb-dark mb-2">{{ t('social_proof.modal.impact') }}</h4>
                <p class="text-black/80">{{ selectedStory.impact }}</p>
              </div>
            </div>

            <div class="flex justify-center mt-8">
              <button
                @click="shareStory(selectedStory)"
                class="bg-maghreb-green text-white px-8 py-3 rounded-full font-medium hover:bg-green-700 transition-colors shadow-lg flex items-center"
              >
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
                {{ t('social_proof.modal.share_btn') }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useLanguage } from '../composables/useLanguage'

const { t } = useLanguage()

interface Testimonial {
  id: string
  name: string
  title: string
  location: string
  quote: string
  rating: number
}

interface UserStory {
  id: string
  name: string
  category: string
  excerpt: string
  fullStory: string
  impact: string
  readTime: number
}

interface CommunityStats {
  totalCitizens: number
  newThisWeek: number
  countries: number
  regions: number
  activeDiscussions: number
  topics: number
  satisfaction: number
}

const currentSlide = ref(0)
const selectedStory = ref<UserStory | null>(null)
const autoPlayInterval = ref<number | null>(null)

const communityStats = ref<CommunityStats>({
  totalCitizens: 2,
  newThisWeek: 1,
  countries: 3,
  regions: 5,
  activeDiscussions: 0,
  topics: 3,
  satisfaction: 95
})

const testimonials = computed<Testimonial[]>(() => [
  {
    id: '1',
    name: 'Amina B.',
    title: t('social_proof.testimonials.1.title'),
    location: 'Casablanca, Morocco',
    quote: t('social_proof.testimonials.1.quote'),
    rating: 5
  },
  {
    id: '2',
    name: 'Karim T.',
    title: t('social_proof.testimonials.2.title'),
    location: 'Tunis, Tunisia',
    quote: t('social_proof.testimonials.2.quote'),
    rating: 5
  },
  {
    id: '3',
    name: 'Sofia M.',
    title: t('social_proof.testimonials.3.title'),
    location: 'Algiers, Algeria',
    quote: t('social_proof.testimonials.3.quote'),
    rating: 5
  },
  {
    id: '4',
    name: 'Youssef L.',
    title: t('social_proof.testimonials.4.title'),
    location: 'Barcelona, Spain',
    quote: t('social_proof.testimonials.4.quote'),
    rating: 5
  }
])

const userStories = computed<UserStory[]>(() => [
  {
    id: '1',
    name: 'Leila H.',
    category: t('social_proof.stories.1.category'),
    excerpt: t('social_proof.stories.1.excerpt'),
    fullStory: t('social_proof.stories.1.full'),
    impact: t('social_proof.stories.1.impact'),
    readTime: 3
  },
  {
    id: '2',
    name: 'Ahmed R.',
    category: t('social_proof.stories.2.category'),
    excerpt: t('social_proof.stories.2.excerpt'),
    fullStory: t('social_proof.stories.2.full'),
    impact: t('social_proof.stories.2.impact'),
    readTime: 4
  },
  {
    id: '3',
    name: 'Nadia K.',
    category: t('social_proof.stories.3.category'),
    excerpt: t('social_proof.stories.3.excerpt'),
    fullStory: t('social_proof.stories.3.full'),
    impact: t('social_proof.stories.3.impact'),
    readTime: 5
  }
])

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % testimonials.value.length
}

const prevSlide = () => {
  currentSlide.value = currentSlide.value === 0 ? testimonials.value.length - 1 : currentSlide.value - 1
}

const openStory = (story: UserStory) => {
  selectedStory.value = story
}

const joinCommunity = () => {
  window.open('https://www.reddit.com/r/eMaghreb/', '_blank')
}

const shareStory = (story?: UserStory) => {
  const text = story
    ? `Check out ${story.name}'s inspiring story in e-Maghreb community! ${story.excerpt}`
    : 'Join e-Maghreb and share your story with our growing digital nation!'

  const url = 'https://www.reddit.com/r/eMaghreb/'

  if (navigator.share) {
    navigator.share({
      title: 'e-Maghreb Community Stories',
      text: text,
      url: url
    })
  } else {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`
    window.open(twitterUrl, '_blank')
  }
}

// Auto-play carousel
const startAutoPlay = () => {
  autoPlayInterval.value = window.setInterval(() => {
    nextSlide()
  }, 5000)
}

const stopAutoPlay = () => {
  if (autoPlayInterval.value) {
    clearInterval(autoPlayInterval.value)
    autoPlayInterval.value = null
  }
}

onMounted(() => {
  startAutoPlay()
})

onUnmounted(() => {
  stopAutoPlay()
})
</script>

<style scoped>
/* Scoped styles removed in favor of Tailwind config */
</style>