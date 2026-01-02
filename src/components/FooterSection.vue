<template>
  <footer class="bg-maghreb-dark text-white py-12">
    <div class="container mx-auto px-6">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <!-- Brand -->
        <div class="md:col-span-2">
          <h3 class="text-2xl font-bold mb-4 text-maghreb-green">e-Maghreb</h3>
          <p class="text-white mb-6 max-w-md">
            A digital nation uniting Maghrebi citizens globally through technology, culture, and community.
          </p>
          <div class="flex space-x-4">
            <a
              v-for="(social, index) in socialLinks"
              :key="index"
              :href="social.url"
              :aria-label="social.name"
              class="w-10 h-10 rounded-full bg-maghreb-green/20 hover:bg-maghreb-green flex items-center justify-center transition-colors duration-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              <component :is="social.icon" class="w-5 h-5" />
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div>
          <h4 class="text-lg font-semibold mb-4">Quick Links</h4>
          <ul class="space-y-2">
            <li v-for="(link, index) in quickLinks" :key="index">
              <a
                :href="link.href"
                class="text-white hover:text-maghreb-green transition-colors duration-300"
                @click.prevent="scrollToSection(link.href)"
              >
                {{ link.text }}
              </a>
            </li>
          </ul>
        </div>

        <!-- Contact -->
        <div>
          <h4 class="text-lg font-semibold mb-4">Contact</h4>
          <div class="space-y-2">
            <a
              href="mailto:hello@e-maghreb.org"
              class="flex items-center text-white hover:text-maghreb-green transition-colors duration-300"
            >
              <Mail class="w-4 h-4 mr-2" />
              hello@e-maghreb.org
            </a>
            <div class="flex items-center text-white">
              <Globe class="w-4 h-4 mr-2" />
              e-maghreb.org
            </div>
          </div>
        </div>
      </div>

      <!-- Divider -->
      <div class="border-t border-gray-700 mt-12 pt-8">
        <div class="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <!-- Legal Notice -->
          <div class="text-sm text-gray-400 text-center md:text-left">
            <p class="mb-2">
              <strong>Legal Notice:</strong> e-Maghreb is a digital nation initiative and non-governmental entity.
            </p>
            <p>
              © 2025 e-Maghreb. All rights reserved.
            </p>
          </div>

          <!-- Additional Links -->
          <div class="flex space-x-6 text-sm">
            <router-link
              to="/privacy-policy"
              class="text-gray-400 hover:text-maghreb-green transition-colors duration-300"
            >
              Privacy Policy
            </router-link>
            <router-link
              to="/terms-of-service"
              class="text-gray-400 hover:text-maghreb-green transition-colors duration-300"
            >
              Terms of Service
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { Facebook, Twitter, Instagram, Linkedin, Mail, Globe } from 'lucide-vue-next'

interface SocialLink {
  name: string
  url: string
  icon: any
}

interface QuickLink {
  text: string
  href: string
}

const socialLinks: SocialLink[] = [
  {
    name: 'Facebook',
    url: 'https://facebook.com/e-maghreb',
    icon: Facebook
  },
  {
    name: 'Twitter',
    url: 'https://twitter.com/e-maghreb',
    icon: Twitter
  },
  {
    name: 'Instagram',
    url: 'https://instagram.com/e-maghreb',
    icon: Instagram
  },
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com/company/e-maghreb',
    icon: Linkedin
  }
]

const quickLinks: QuickLink[] = [
  { text: 'About', href: '#about' },
  { text: 'Roadmap', href: '#roadmap' },
  { text: 'Join', href: '#join' }
]

const scrollToSection = (href: string) => {
  const element = document.querySelector(href)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<style scoped>
footer {
  background: linear-gradient(135deg, #000000 0%, #006233 100%);
}
</style>