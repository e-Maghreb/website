<template>
  <section class="py-16 md:py-24 bg-white">
    <div class="container mx-auto px-6">
      <div class="text-center mb-12">
        <h2 class="text-3xl md:text-4xl font-bold text-maghreb-dark mb-6">
          {{ t('feedback_section.title') }}
        </h2>
        <p class="text-lg md:text-xl text-black max-w-3xl mx-auto mb-8">
          {{ t('feedback_section.subtitle') }}
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div v-for="(feature, index) in features" :key="index" class="bg-maghreb-light/30 rounded-xl p-8 text-center hover:bg-maghreb-light transition-colors duration-300">
          <div class="w-16 h-16 mx-auto mb-6 rounded-full bg-white flex items-center justify-center text-maghreb-green shadow-sm">
            <component :is="feature.icon" class="w-8 h-8" />
          </div>
          <h3 class="text-xl font-semibold text-maghreb-dark mb-3">
            {{ feature.title }}
          </h3>
          <p class="text-black/80">
            {{ feature.description }}
          </p>
        </div>
      </div>

      <div class="text-center">
        <a
          href="https://emaghreb.featurebase.app/"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center justify-center bg-maghreb-green hover:bg-green-700 text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
        >
          <span>{{ t('feedback_section.cta') }}</span>
          <ArrowRight class="w-5 h-5 ml-2" />
        </a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Lightbulb, ThumbsUp, Activity, ArrowRight } from 'lucide-vue-next'
import { useLanguage } from '../composables/useLanguage'

const { t } = useLanguage()

const features = computed(() => [
  {
    title: t('feedback_section.features.suggest.title'),
    description: t('feedback_section.features.suggest.desc'),
    icon: Lightbulb
  },
  {
    title: t('feedback_section.features.vote.title'),
    description: t('feedback_section.features.vote.desc'),
    icon: ThumbsUp
  },
  {
    title: t('feedback_section.features.track.title'),
    description: t('feedback_section.features.track.desc'),
    icon: Activity
  }
])
</script>
