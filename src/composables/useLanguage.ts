import { ref, watchEffect } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const currentLang = ref('en')

import en from '../locales/en.json'
import fr from '../locales/fr.json'
import ar from '../locales/ar.json'

const translations: Record<string, any> = {
  en,
  fr,
  ar
}

function updateMetaTag(selector: string, content: string) {
  const element = document.querySelector(selector)
  if (element) {
    element.setAttribute('content', content)
  }
}

function updateDocumentAttributes(lang: string) {
  document.documentElement.lang = lang
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'

  const t = translations[lang]?.meta
  if (t) {
    document.title = t.title
    updateMetaTag('meta[name="title"]', t.title)
    updateMetaTag('meta[name="description"]', t.description)
    updateMetaTag('meta[name="keywords"]', t.keywords)

    // OG tags
    updateMetaTag('meta[property="og:title"]', t.og_title)
    updateMetaTag('meta[property="og:description"]', t.og_description)

    // Twitter tags
    updateMetaTag('meta[property="twitter:title"]', t.og_title) // Using same as OG for simplicity unless different in JSON
    updateMetaTag('meta[property="twitter:description"]', t.og_description)
  }
}

let isWatcherSetup = false

export function useLanguage() {
  const router = useRouter()
  const route = useRoute()

  // Singleton watcher to sync language with URL
  if (!isWatcherSetup) {
    isWatcherSetup = true
    watchEffect(() => {
      const langParam = route.params.lang as string

      if (langParam && ['fr', 'ar'].includes(langParam)) {
        if (currentLang.value !== langParam) {
          currentLang.value = langParam
        }
        // Always update attributes when valid param exists to ensure DOM is in sync
        updateDocumentAttributes(langParam)
      } else {
        // Default to en if no valid param (is rooted)
        // Check strict undefined to avoid overriding during transient states
        if (langParam === undefined || langParam === null || langParam === '') {
          if (currentLang.value !== 'en') {
            currentLang.value = 'en'
          }
          // Always update attributes for English too
          updateDocumentAttributes('en')
        }
      }
    })
  }

  const setLanguage = async (lang: string) => {
    if (!translations[lang]) return

    // Manual path construction to ensure reliability
    const path = route.path
    const segments = path.split('/').filter(p => p)

    // Remove existing language prefix if present
    if (segments.length > 0 && ['fr', 'ar'].includes(segments[0])) {
      segments.shift()
    }

    let newPath = '/' + segments.join('/')

    // Add new language prefix if not English
    if (lang !== 'en') {
      // Ensure we don't end up with double slashes if path was empty/root
      newPath = `/${lang}${newPath === '/' ? '' : newPath}`
    }

    // Ensure root path is just '/'
    if (newPath === '') newPath = '/'

    await router.push({
      path: newPath,
      query: route.query,
      hash: route.hash
    })
  }

  const t = (key: string) => {
    const keys = key.split('.')
    let value = translations[currentLang.value]
    for (const k of keys) {
      if (value && value[k]) {
        value = value[k]
      } else {
        return key // Fallback
      }
    }
    return value
  }

  return {
    currentLang,
    setLanguage,
    t,
    availableLanguages: [
      { code: 'en', label: 'English' },
      { code: 'fr', label: 'Français' },
      { code: 'ar', label: 'العربية' }
    ]
  }
}
