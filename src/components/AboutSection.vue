<template>
  <section class="py-20 md:py-32 bg-white">
    <div class="container mx-auto px-6">
      <div class="text-center mb-16">
        <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-maghreb-dark mb-6">
          {{ t('about.title') }}
        </h2>
        <p class="text-lg md:text-xl text-black max-w-3xl mx-auto leading-relaxed">
          {{ t('about.description') }}
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div
          v-for="(value, index) in values"
          :key="index"
          class="text-center p-6 rounded-lg bg-maghreb-light hover:bg-maghreb-green hover:text-white transition-all duration-300 transform hover:scale-105 group"
        >
          <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-maghreb-green group-hover:bg-white flex items-center justify-center transition-colors duration-300">
            <component
              :is="value.icon"
              class="w-8 h-8 text-white group-hover:text-maghreb-green transition-colors duration-300"
            />
          </div>
          <h3 class="text-xl font-semibold mb-3 group-hover:text-white transition-colors duration-300">
            {{ value.title }}
          </h3>
          <p class="text-black group-hover:text-white/90 transition-colors duration-300">
            {{ value.description }}
          </p>
        </div>
      </div>

      <div class="mt-16 text-center">
        <div class="bg-gradient-to-r from-maghreb-green to-maghreb-red rounded-2xl p-8 text-white">
          <h3 class="text-2xl font-bold mb-4">{{ t('about.vision.title') }}</h3>
          <p class="text-lg opacity-90 max-w-2xl mx-auto">
            {{ t('about.vision.description') }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Users, Shield, Heart, Zap } from 'lucide-vue-next'
import { useLanguage } from '../composables/useLanguage'

const { t } = useLanguage()

interface Value {
  title: string
  description: string
  icon: any
}


const values = computed(() => [
  {
    title: t('about.values.unity.title'),
    description: t('about.values.unity.description'),
    icon: Users
  },
  {
    title: t('about.values.identity.title'),
    description: t('about.values.identity.description'),
    icon: Shield
  },
  {
    title: t('about.values.culture.title'),
    description: t('about.values.culture.description'),
    icon: Heart
  },
  {
    title: t('about.values.empowerment.title'),
    description: t('about.values.empowerment.description'),
    icon: Zap
  }
])
</script>

<style scoped>
.group:hover .group-hover\:bg-white {
  background-color: white;
}

.group:hover .group-hover\:text-maghreb-green {
  color: #006233;
}

.group:hover .group-hover\:text-white {
  color: white;
}

.group:hover .group-hover\:text-white\/90 {
  color: rgba(255, 255, 255, 0.9);
}
</style>