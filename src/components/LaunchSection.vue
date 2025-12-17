<template>
  <section class="py-20 md:py-32 bg-gradient-to-br from-maghreb-dark via-maghreb-blue to-maghreb-green">
    <div class="container mx-auto px-6 text-center text-white">
      <div class="max-w-4xl mx-auto">
        <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
          Official Launch
        </h2>
        <p class="text-xl md:text-2xl mb-12 opacity-90">
          TheGreatMaghreb Digital Nation
        </p>

        <!-- Launch Date -->
        <div class="bg-white/10 rounded-2xl p-8 mb-12 backdrop-blur-sm">
          <h3 class="text-2xl font-bold mb-4">Launch Date</h3>
          <p class="text-3xl md:text-4xl font-bold text-maghreb-yellow">
            January 1, 2026
          </p>
        </div>

        <!-- Countdown Timer -->
        <div v-if="!countdown.isExpired.value" class="mb-12">
          <h3 class="text-2xl font-bold mb-8">Countdown to Launch</h3>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            <div 
              v-for="(unit, index) in timeUnits" 
              :key="index"
              class="bg-white/10 rounded-xl p-6 backdrop-blur-sm animate-countdown-tick"
            >
              <div class="text-3xl md:text-5xl font-bold text-maghreb-yellow mb-2">
                {{ unit.value }}
              </div>
              <div class="text-sm md:text-lg opacity-90 uppercase tracking-wide">
                {{ unit.label }}
              </div>
            </div>
          </div>
        </div>

        <!-- Launch Message -->
        <div v-else class="mb-12">
          <div class="bg-maghreb-yellow text-maghreb-dark rounded-2xl p-8">
            <h3 class="text-3xl font-bold mb-4">🎉 We Are Live!</h3>
            <p class="text-xl">TheGreatMaghreb Digital Nation has officially launched!</p>
          </div>
        </div>

        <!-- Email Signup Form -->
        <div class="bg-white/10 rounded-2xl p-8 backdrop-blur-sm">
          <h3 class="text-2xl font-bold mb-4">Stay Updated</h3>
          <p class="text-lg mb-6 opacity-90">
            Be the first to know when we launch and receive exclusive updates
          </p>
          
          <form @submit.prevent="handleSignup" class="max-w-md mx-auto">
            <div class="flex flex-col sm:flex-row gap-4">
              <input
                v-model="email"
                type="email"
                placeholder="Enter your email address"
                class="flex-1 px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:border-maghreb-yellow focus:ring-2 focus:ring-maghreb-yellow/50 transition-all duration-300"
                required
              />
              <button
                type="submit"
                class="bg-maghreb-yellow hover:bg-maghreb-yellow/90 text-maghreb-dark font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                :disabled="!email || isSubmitting"
              >
                {{ isSubmitting ? 'Signing Up...' : 'Sign Up to Be Notified' }}
              </button>
            </div>
          </form>
          
          <p v-if="submitMessage" :class="[
            'mt-4 text-sm',
            submitSuccess ? 'text-green-300' : 'text-red-300'
          ]">
            {{ submitMessage }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { defineEmits, ref, computed } from 'vue'
import { useCountdown } from '../composables/useCountdown'

const emit = defineEmits<{
  signup: [email: string]
}>()

const props = defineProps<{
  launchDate: string
  targetDate: Date
}>()

const email = ref('')
const isSubmitting = ref(false)
const submitMessage = ref('')
const submitSuccess = ref(false)

// Initialize countdown
const countdown = useCountdown(props.targetDate)

const timeUnits = computed(() => [
  { label: 'Days', value: countdown.days.value.toString().padStart(2, '0') },
  { label: 'Hours', value: countdown.hours.value.toString().padStart(2, '0') },
  { label: 'Minutes', value: countdown.minutes.value.toString().padStart(2, '0') },
  { label: 'Seconds', value: countdown.seconds.value.toString().padStart(2, '0') }
])

const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

const handleSignup = async () => {
  if (!email.value) {
    submitMessage.value = 'Please enter your email address'
    submitSuccess.value = false
    return
  }

  if (!validateEmail(email.value)) {
    submitMessage.value = 'Please enter a valid email address'
    submitSuccess.value = false
    return
  }

  isSubmitting.value = true
  submitMessage.value = ''

  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    emit('signup', email.value)
    submitMessage.value = 'Successfully signed up! You\'ll receive updates about our launch.'
    submitSuccess.value = true
    email.value = ''
  } catch (error) {
    submitMessage.value = 'Something went wrong. Please try again.'
    submitSuccess.value = false
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
.animate-countdown-tick {
  animation: countdownTick 1s ease-in-out infinite;
}

@keyframes countdownTick {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.02);
  }
}
</style>