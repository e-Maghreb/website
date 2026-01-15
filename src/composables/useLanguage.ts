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

function updateDocumentAttributes(lang: string) {
  document.documentElement.lang = lang
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
}

export function useLanguage() {
  const router = useRouter()
  const route = useRoute()

  // Sync language with URL
  watchEffect(() => {
    const langParam = route.params.lang as string
    if (langParam && ['fr', 'ar'].includes(langParam)) {
      if (currentLang.value !== langParam) {
        currentLang.value = langParam
        updateDocumentAttributes(langParam)
      }
    } else {
      // Default to en if no valid param (is rooted)
      if (currentLang.value !== 'en' && !langParam) {
        currentLang.value = 'en'
        updateDocumentAttributes('en')
      }
    }
  })

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
