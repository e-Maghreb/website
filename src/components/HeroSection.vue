<template>
  <section class="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-maghreb-green via-maghreb-blue to-maghreb-dark">
    <!-- Background Pattern -->
    <div class="absolute inset-0 opacity-10">
      <div class="absolute inset-0 bg-gradient-to-br from-transparent via-white/10 to-transparent"></div>
    </div>

    <!-- Content -->
    <div class="relative z-10 max-w-4xl mx-auto px-6 text-center text-white">
      <h1 class="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in">
        Welcome to TheGreatMaghreb
      </h1>
      <p class="text-xl md:text-2xl lg:text-3xl mb-8 text-maghreb-light animate-slide-up">
        Your Digital Nation
      </p>
      <p class="text-lg md:text-xl mb-12 text-maghreb-light opacity-90 max-w-2xl mx-auto animate-slide-up">
        Connecting Maghrebi citizens across the globe
      </p>

      <button
        @click="handleCtaClick"
        class="bg-maghreb-green hover:bg-maghreb-green/90 text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl animate-slide-up"
      >
        Become a Founding Citizen
      </button>
    </div>

    <!-- Scroll indicator -->
    <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
      <div class="w-6 h-10 border-2 border-white rounded-full flex justify-center">
        <div class="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { defineEmits } from 'vue'

const emit = defineEmits<{
  ctaClick: []
}>()

const handleCtaClick = () => {
  emit('ctaClick')
}
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 1s ease-in-out;
}

.animate-slide-up {
  animation: slideUp 0.8s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    transform: translateY(30px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>