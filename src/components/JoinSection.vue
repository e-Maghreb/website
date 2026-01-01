<template>
  <section class="py-20 md:py-32 bg-white">
    <div class="container mx-auto px-6">
      <div class="text-center mb-16">
        <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-maghreb-dark mb-6">
          Become a Founding Citizen
        </h2>
        <p class="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
          Join our digital nation and help shape the future of e-Maghreb. Registration opens on February 17, 2026.
        </p>
      </div>

      <!-- Steps -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div
          v-for="(step, index) in steps"
          :key="index"
          class="text-center group"
        >
          <div class="relative mb-6">
            <!-- Step number -->
            <div class="w-16 h-16 mx-auto rounded-full bg-maghreb-green text-white flex items-center justify-center text-2xl font-bold mb-4 group-hover:bg-maghreb-red transition-colors duration-300">
              {{ step.number }}
            </div>
            <!-- Connector line (hidden on mobile and last item) -->
            <div
              v-if="index < steps.length - 1"
              class="hidden md:block absolute top-8 left-full w-full h-1 bg-maghreb-green/30 -translate-x-1/2"
            ></div>
          </div>

          <div class="bg-maghreb-light rounded-xl p-6 group-hover:bg-maghreb-green group-hover:text-white transition-all duration-300">
            <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-white flex items-center justify-center group-hover:bg-maghreb-light transition-colors duration-300">
              <component
                :is="step.icon"
                class="w-8 h-8 text-maghreb-green group-hover:text-maghreb-green transition-colors duration-300"
              />
            </div>
            <h3 class="text-xl font-semibold mb-3 group-hover:text-white transition-colors duration-300">
              {{ step.title }}
            </h3>
            <p class="text-gray-600 group-hover:text-white/90 transition-colors duration-300">
              {{ step.description }}
            </p>
          </div>
        </div>
      </div>

      <!-- Benefits -->
      <div class="bg-gradient-to-r from-maghreb-green to-maghreb-blue rounded-2xl p-8 text-white mb-12">
        <h3 class="text-2xl font-bold text-center mb-8">Founding Citizen Benefits</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            v-for="(benefit, index) in benefits"
            :key="index"
            class="text-center"
          >
            <div class="w-12 h-12 mx-auto mb-4 rounded-full bg-white/20 flex items-center justify-center">
              <component :is="benefit.icon" class="w-6 h-6" />
            </div>
            <h4 class="font-semibold mb-2">{{ benefit.title }}</h4>
            <p class="text-sm opacity-90">{{ benefit.description }}</p>
          </div>
        </div>
      </div>

      <!-- CTA -->
      <div class="text-center">
        <p class="text-lg text-gray-600 mb-6">
          Registration opens on <span class="font-bold text-maghreb-green">February 17, 2026</span>
        </p>
        <button
          @click="handleCtaClick"
          class="bg-maghreb-green hover:bg-maghreb-green/90 text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl disabled:bg-gray-400 disabled:cursor-not-allowed"
          :disabled="!isRegistrationOpen"
        >
          {{ isRegistrationOpen ? 'Register Now' : 'Join Waitlist' }}
        </button>
        <p v-if="!isRegistrationOpen" class="text-sm text-gray-500 mt-4">
          Be among the first to know when registration opens
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { defineEmits, computed } from 'vue'
import { Mail, IdCard, MessageCircle, Vote, Star, Users } from 'lucide-vue-next'

const emit = defineEmits<{
  ctaClick: []
}>()

// Check if registration is open (January 1, 2026)
const launchDate = new Date('2026-02-17T00:00:00')
const isRegistrationOpen = computed(() => new Date() >= launchDate)

interface Step {
  number: number
  title: string
  description: string
  icon: any
}

interface Benefit {
  title: string
  description: string
  icon: any
}

const steps: Step[] = [
  {
    number: 1,
    title: 'Sign Up with Email',
    description: 'Register your interest with a valid email address to join our founding citizen community',
    icon: Mail
  },
  {
    number: 2,
    title: 'Receive Digital ID',
    description: 'Get your unique digital citizenship ID and access credentials via secure email delivery',
    icon: IdCard
  },
  {
    number: 3,
    title: 'Join Community',
    description: 'Access exclusive Discord/forum channels and connect with fellow founding citizens',
    icon: MessageCircle
  }
]

const benefits: Benefit[] = [
  {
    title: 'Voting Rights',
    description: 'Participate in digital nation governance and decision-making processes',
    icon: Vote
  },
  {
    title: 'Early Access',
    description: 'Get priority access to new features and platform updates before public release',
    icon: Star
  },
  {
    title: 'Exclusive Network',
    description: 'Connect with Maghrebi professionals, entrepreneurs, and community leaders worldwide',
    icon: Users
  }
]

const handleCtaClick = () => {
  emit('ctaClick')
}
</script>

<style scoped>
.group:hover .group-hover\:bg-maghreb-red {
  background-color: #C1272D;
}

.group:hover .group-hover\:bg-maghreb-green {
  background-color: #006233;
}

.group:hover .group-hover\:text-white {
  color: white;
}

.group:hover .group-hover\:text-white\/90 {
  color: rgba(255, 255, 255, 0.9);
}
</style>