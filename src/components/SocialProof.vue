<template>
  <section class="py-16 bg-gradient-to-br from-maghreb-light via-white to-maghreb-light">
    <div class="container mx-auto px-4">
      <!-- Section Header -->
      <div class="text-center mb-12">
        <h2 class="text-4xl font-bold text-maghreb-dark mb-4">
          Join Our Growing Community
        </h2>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
          See what our citizens are saying about building the future of the Maghreb digital nation
        </p>
      </div>

      <!-- Community Stats -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
        <div class="bg-white rounded-lg shadow-lg p-6 text-center">
          <div class="text-3xl font-bold text-maghreb-green mb-2">{{ communityStats.totalCitizens }}</div>
          <div class="text-gray-600">Total Citizens</div>
          <div class="text-sm text-maghreb-green mt-1">+{{ communityStats.newThisWeek }} this week</div>
        </div>

        <div class="bg-white rounded-lg shadow-lg p-6 text-center">
          <div class="text-3xl font-bold text-maghreb-blue mb-2">{{ communityStats.countries }}</div>
          <div class="text-gray-600">Countries Represented</div>
          <div class="text-sm text-maghreb-blue mt-1">{{ communityStats.regions }} regions</div>
        </div>

        <div class="bg-white rounded-lg shadow-lg p-6 text-center">
          <div class="text-3xl font-bold text-maghreb-orange mb-2">{{ communityStats.activeDiscussions }}</div>
          <div class="text-gray-600">Active Discussions</div>
          <div class="text-sm text-maghreb-orange mt-1">{{ communityStats.topics }} topics</div>
        </div>

        <div class="bg-white rounded-lg shadow-lg p-6 text-center">
          <div class="text-3xl font-bold text-maghreb-yellow mb-2">{{ communityStats.satisfaction }}%</div>
          <div class="text-gray-600">Satisfaction Rate</div>
          <div class="text-sm text-maghreb-yellow mt-1">Based on surveys</div>
        </div>
      </div>

      <!-- Testimonials Carousel -->
      <div class="relative mb-12">
        <div class="overflow-hidden">
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
                    <div class="w-20 h-20 rounded-full bg-gradient-to-br from-maghreb-green to-maghreb-blue flex items-center justify-center text-white text-2xl font-bold">
                      {{ testimonial.name.charAt(0) }}
                    </div>
                  </div>

                  <!-- Content -->
                  <div class="flex-1 text-center md:text-left">
                    <blockquote class="text-lg text-gray-700 mb-4 italic">
                      "{{ testimonial.quote }}"
                    </blockquote>
                    <div class="mb-2">
                      <div class="flex justify-center md:justify-start mb-2">
                        <div
                          v-for="star in 5"
                          :key="star"
                          class="w-5 h-5"
                          :class="star <= testimonial.rating ? 'text-yellow-400' : 'text-gray-300'"
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
          class="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-shadow"
          :class="{ 'opacity-50 cursor-not-allowed': currentSlide === 0 }"
          :disabled="currentSlide === 0"
        >
          <svg class="w-6 h-6 text-maghreb-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          @click="nextSlide"
          class="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-shadow"
          :class="{ 'opacity-50 cursor-not-allowed': currentSlide === testimonials.length - 1 }"
          :disabled="currentSlide === testimonials.length - 1"
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
          ></button>
        </div>
      </div>

      <!-- User Stories Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <div
          v-for="story in userStories"
          :key="story.id"
          class="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer"
          @click="openStory(story)"
        >
          <div class="flex items-center mb-4">
            <div class="w-12 h-12 rounded-full bg-gradient-to-br from-maghreb-yellow to-maghreb-orange flex items-center justify-center text-white font-bold mr-3">
              {{ story.name.charAt(0) }}
            </div>
            <div>
              <div class="font-semibold text-maghreb-dark">{{ story.name }}</div>
              <div class="text-sm text-gray-600">{{ story.category }}</div>
            </div>
          </div>
          <p class="text-gray-700 mb-4">{{ story.excerpt }}</p>
          <div class="flex items-center justify-between">
            <span class="text-sm text-maghreb-green font-medium">Read more →</span>
            <span class="text-xs text-gray-500">{{ story.readTime }} min read</span>
          </div>
        </div>
      </div>

      <!-- CTA Section -->
      <div class="text-center bg-gradient-to-r from-maghreb-green to-maghreb-blue rounded-lg p-8 text-white">
        <h3 class="text-2xl font-bold mb-4">Ready to Share Your Story?</h3>
        <p class="text-lg mb-6 opacity-90">
          Join thousands of Maghrebi citizens building the future together
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            @click="joinCommunity"
            class="bg-white text-maghreb-green px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Join Our Community
          </button>
          <button
            @click="shareStory()"
            class="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-maghreb-green transition-colors"
          >
            Share Your Story
          </button>
        </div>
      </div>

      <!-- Story Detail Modal -->
      <div
        v-if="selectedStory"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
        @click="selectedStory = null"
      >
        <div
          class="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto"
          @click.stop
        >
          <div class="p-6">
            <div class="flex justify-between items-start mb-4">
              <div class="flex items-center">
                <div class="w-16 h-16 rounded-full bg-gradient-to-br from-maghreb-yellow to-maghreb-orange flex items-center justify-center text-white font-bold text-xl mr-4">
                  {{ selectedStory.name.charAt(0) }}
                </div>
                <div>
                  <h3 class="text-xl font-bold text-maghreb-dark">{{ selectedStory.name }}</h3>
                  <p class="text-gray-600">{{ selectedStory.category }}</p>
                </div>
              </div>
              <button
                @click="selectedStory = null"
                class="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div class="prose max-w-none">
              <p class="text-gray-700 mb-4">{{ selectedStory.fullStory }}</p>
              <div class="bg-gray-50 rounded-lg p-4 mt-4">
                <h4 class="font-semibold text-maghreb-dark mb-2">Impact & Results</h4>
                <p class="text-gray-700">{{ selectedStory.impact }}</p>
              </div>
            </div>

            <div class="flex justify-center mt-6">
              <button
                @click="shareStory(selectedStory)"
                class="bg-maghreb-green text-white px-6 py-2 rounded-lg font-medium hover:bg-maghreb-dark transition-colors"
              >
                Share This Story
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

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

const testimonials = ref<Testimonial[]>([
  {
    id: '1',
    name: 'Amina B.',
    title: 'Software Engineer',
    location: 'Casablanca, Morocco',
    quote: 'TheGreatMaghreb has given me a sense of belonging to something bigger than myself. As a diaspora member, I finally feel connected to my roots while contributing to our digital future.',
    rating: 5
  },
  {
    id: '2',
    name: 'Karim T.',
    title: 'Entrepreneur',
    location: 'Tunis, Tunisia',
    quote: 'Being part of this digital nation has opened incredible opportunities for collaboration. I\'ve connected with talented Maghrebi professionals across three continents.',
    rating: 5
  },
  {
    id: '3',
    name: 'Sofia M.',
    title: 'Student',
    location: 'Algiers, Algeria',
    quote: 'As a young Algerian, TheGreatMaghreb represents hope for unity and progress. The community support has been amazing for my personal and professional growth.',
    rating: 5
  },
  {
    id: '4',
    name: 'Youssef L.',
    title: 'Digital Nomad',
    location: 'Barcelona, Spain',
    quote: 'Living abroad, TheGreatMaghreb keeps me connected to my culture and heritage. It\'s more than a platform - it\'s a movement for Maghrebi empowerment.',
    rating: 5
  }
])

const userStories = ref<UserStory[]>([
  {
    id: '1',
    name: 'Leila H.',
    category: 'Education & Career',
    excerpt: 'Found my dream job through TheGreatMaghreb network connections...',
    fullStory: 'After joining TheGreatMaghreb, I connected with professionals in my field who helped me navigate the job market. Through the community mentorship program, I landed a position at a tech company that values diversity and cultural understanding. The support I received was incredible.',
    impact: 'Successfully transitioned careers, increased salary by 40%, and now mentors other community members.',
    readTime: 3
  },
  {
    id: '2',
    name: 'Ahmed R.',
    category: 'Business Development',
    excerpt: 'Launched a successful startup with co-founders met through the platform...',
    fullStory: 'TheGreatMaghreb connected me with like-minded entrepreneurs from across the Maghreb region. We identified a common problem in cross-border trade and built a solution that now serves hundreds of businesses. The community provided both technical expertise and market insights.',
    impact: 'Generated $500K in revenue, created 15 jobs, and expanded to 3 countries.',
    readTime: 4
  },
  {
    id: '3',
    name: 'Nadia K.',
    category: 'Cultural Preservation',
    excerpt: 'Organized the largest virtual Maghrebi cultural festival...',
    fullStory: 'Using TheGreatMaghreb platform, I organized a week-long virtual cultural festival that brought together artists, musicians, and cultural experts from all five Maghreb countries. The event attracted over 10,000 participants and helped preserve traditional arts for future generations.',
    impact: 'Connected 200+ artists, preserved 15 traditional art forms, and inspired cultural initiatives in 8 cities.',
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
  window.open('https://www.reddit.com/r/TheGreatMaghreb/', '_blank')
}

const shareStory = (story?: UserStory) => {
  const text = story
    ? `Check out ${story.name}'s inspiring story in TheGreatMaghreb community! ${story.excerpt}`
    : 'Join TheGreatMaghreb and share your story with our growing digital nation!'

  const url = 'https://www.reddit.com/r/TheGreatMaghreb/'

  if (navigator.share) {
    navigator.share({
      title: 'TheGreatMaghreb Community Stories',
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

.prose {
  max-width: none;
}
</style>