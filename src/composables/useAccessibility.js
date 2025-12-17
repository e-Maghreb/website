import { ref, onMounted, onUnmounted } from 'vue'

// Accessibility state
const accessibility = ref({
  reducedMotion: false,
  highContrast: false,
  largeText: false,
  screenReader: false,
  keyboardNavigation: false,
  focusVisible: true,
  announcements: []
})

// Announcement system for screen readers
const announceToScreenReader = (message, priority = 'polite') => {
  const announcement = {
    id: Date.now() + Math.random(),
    message,
    priority,
    timestamp: new Date().toISOString()
  }
  
  accessibility.value.announcements.push(announcement)
  
  // Remove announcement after 3 seconds
  setTimeout(() => {
    const index = accessibility.value.announcements.findIndex(a => a.id === announcement.id)
    if (index > -1) {
      accessibility.value.announcements.splice(index, 1)
    }
  }, 3000)
}

// Detect user preferences
const detectUserPreferences = () => {
  // Check for reduced motion preference
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  accessibility.value.reducedMotion = mediaQuery.matches
  
  // Listen for changes
  const handleMotionChange = (e) => {
    accessibility.value.reducedMotion = e.matches
    announceToScreenReader(
      e.matches ? 'Reduced motion mode enabled' : 'Reduced motion mode disabled',
      'polite'
    )
  }
  
  mediaQuery.addEventListener('change', handleMotionChange)
  
  // Check for high contrast preference
  const highContrastQuery = window.matchMedia('(prefers-contrast: high)')
  accessibility.value.highContrast = highContrastQuery.matches
  
  const handleContrastChange = (e) => {
    accessibility.value.highContrast = e.matches
    announceToScreenReader(
      e.matches ? 'High contrast mode enabled' : 'High contrast mode disabled',
      'polite'
    )
  }
  
  highContrastQuery.addEventListener('change', handleContrastChange)
  
  return () => {
    mediaQuery.removeEventListener('change', handleMotionChange)
    highContrastQuery.removeEventListener('change', handleContrastChange)
  }
}

// Focus management
const focusManagement = {
  trapFocus(container) {
    const focusableElements = container.querySelectorAll(
      'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select, [tabindex]:not([tabindex="-1"])'
    )
    
    const firstElement = focusableElements[0]
    const lastElement = focusableElements[focusableElements.length - 1]
    
    const handleTabKey = (e) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus()
            e.preventDefault()
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus()
            e.preventDefault()
          }
        }
      }
    }
    
    container.addEventListener('keydown', handleTabKey)
    firstElement?.focus()
    
    return () => container.removeEventListener('keydown', handleTabKey)
  },
  
  skipToContent(targetId) {
    const target = document.getElementById(targetId)
    if (target) {
      target.setAttribute('tabindex', '-1')
      target.focus()
      announceToScreenReader(`Skipped to ${targetId.replace(/-/g, ' ')}`)
    }
  },
  
  announceNavigation(currentSection) {
    announceToScreenReader(`Navigated to ${currentSection}`, 'polite')
  }
}

// Keyboard navigation
const keyboardNavigation = {
  setupArrowKeyNavigation(container, items, onSelect) {
    let currentIndex = 0
    
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        currentIndex = (currentIndex + 1) % items.length
        items[currentIndex].focus()
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        currentIndex = (currentIndex - 1 + items.length) % items.length
        items[currentIndex].focus()
      } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        onSelect(items[currentIndex], currentIndex)
      }
    }
    
    container.addEventListener('keydown', handleKeyDown)
    return () => container.removeEventListener('keydown', handleKeyDown)
  },
  
  setupModalKeyboardNavigation(modal, onClose) {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
      }
    }
    
    modal.addEventListener('keydown', handleEscape)
    return () => modal.removeEventListener('keydown', handleEscape)
  }
}

// ARIA attributes and roles
const ariaHelpers = {
  setLiveRegion(element, message, priority = 'polite') {
    element.setAttribute('aria-live', priority)
    element.textContent = message
    
    // Clear after announcement
    setTimeout(() => {
      element.textContent = ''
    }, 1000)
  },
  
  setProgressBar(element, value, max, label) {
    element.setAttribute('role', 'progressbar')
    element.setAttribute('aria-valuenow', value)
    element.setAttribute('aria-valuemax', max)
    element.setAttribute('aria-label', label)
  },
  
  setButtonState(button, disabled, loading = false) {
    button.disabled = disabled
    button.setAttribute('aria-disabled', disabled)
    
    if (loading) {
      button.setAttribute('aria-busy', 'true')
      button.setAttribute('aria-label', 'Loading, please wait')
    } else {
      button.removeAttribute('aria-busy')
      button.removeAttribute('aria-label')
    }
  },
  
  setErrorMessage(element, message) {
    element.setAttribute('role', 'alert')
    element.setAttribute('aria-live', 'assertive')
    element.textContent = message
  }
}

// Color contrast utilities
const colorContrast = {
  // Calculate relative luminance
  getLuminance(color) {
    const rgb = color.match(/\d+/g)
    if (!rgb) return 0
    
    const [r, g, b] = rgb.map(c => {
      const sRGB = parseInt(c) / 255
      return sRGB <= 0.03928 ? sRGB / 12.92 : Math.pow((sRGB + 0.055) / 1.055, 2.4)
    })
    
    return 0.2126 * r + 0.7152 * g + 0.0722 * b
  },
  
  // Calculate contrast ratio between two colors
  getContrastRatio(color1, color2) {
    const lum1 = this.getLuminance(color1)
    const lum2 = this.getLuminance(color2)
    const brightest = Math.max(lum1, lum2)
    const darkest = Math.min(lum1, lum2)
    
    return (brightest + 0.05) / (darkest + 0.05)
  },
  
  // Check if contrast meets WCAG standards
  meetsWCAGStandards(foreground, background, level = 'AA') {
    const ratio = this.getContrastRatio(foreground, background)
    const requiredRatio = level === 'AAA' ? 7 : 4.5
    return ratio >= requiredRatio
  }
}

// Image accessibility
const imageAccessibility = {
  // Generate alt text for images
  generateAltText(imageSrc, context = '') {
    const filename = imageSrc.split('/').pop().split('.')[0]
    const cleanName = filename.replace(/[-_]/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
    
    return context ? `${context} - ${cleanName}` : cleanName
  },
  
  // Check if image has proper alt text
  hasAltText(img) {
    return img.hasAttribute('alt') && img.getAttribute('alt').trim().length > 0
  },
  
  // Set proper image attributes
  setImageAttributes(img, altText, context = '') {
    const finalAltText = altText || this.generateAltText(img.src, context)
    img.setAttribute('alt', finalAltText)
    img.setAttribute('role', 'img')
    
    // Add loading="lazy" for performance
    if (!img.hasAttribute('loading')) {
      img.setAttribute('loading', 'lazy')
    }
  }
}

// Form accessibility
const formAccessibility = {
  // Associate label with input
  associateLabel(input, labelText) {
    const label = document.createElement('label')
    label.textContent = labelText
    label.setAttribute('for', input.id || this.generateId('input'))
    
    if (!input.id) {
      input.id = label.getAttribute('for')
    }
    
    return label
  },
  
  // Generate unique IDs
  generateId(prefix = 'element') {
    return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  },
  
  // Set form field error state
  setFieldError(input, errorMessage) {
    input.setAttribute('aria-invalid', 'true')
    input.setAttribute('aria-describedby', `${input.id}-error`)
    
    const errorElement = document.getElementById(`${input.id}-error`)
    if (errorElement) {
      ariaHelpers.setErrorMessage(errorElement, errorMessage)
    }
  },
  
  // Clear form field error state
  clearFieldError(input) {
    input.removeAttribute('aria-invalid')
    input.removeAttribute('aria-describedby')
    
    const errorElement = document.getElementById(`${input.id}-error`)
    if (errorElement) {
      errorElement.textContent = ''
      errorElement.removeAttribute('role')
      errorElement.removeAttribute('aria-live')
    }
  }
}

// Initialize accessibility features
const initAccessibility = () => {
  // Detect user preferences
  const cleanup = detectUserPreferences()
  
  // Add skip link
  const skipLink = document.createElement('a')
  skipLink.href = '#main-content'
  skipLink.textContent = 'Skip to main content'
  skipLink.className = 'sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-maghreb-green text-white p-2 rounded z-50'
  document.body.insertBefore(skipLink, document.body.firstChild)
  
  // Add main content landmark
  const main = document.querySelector('main')
  if (main) {
    main.id = 'main-content'
    main.setAttribute('tabindex', '-1')
  }
  
  // Add screen reader announcement area
  const announcementArea = document.createElement('div')
  announcementArea.className = 'sr-only'
  announcementArea.setAttribute('aria-live', 'polite')
  announcementArea.setAttribute('aria-atomic', 'true')
  document.body.appendChild(announcementArea)
  
  // Listen for navigation changes
  const handleNavigation = () => {
    focusManagement.announceNavigation(window.location.hash || 'home')
  }
  
  window.addEventListener('hashchange', handleNavigation)
  
  // Keyboard navigation enhancements
  document.addEventListener('keydown', (e) => {
    // Enhanced keyboard navigation
    if (e.key === '/' && e.ctrlKey) {
      e.preventDefault()
      const searchInput = document.querySelector('[type="search"]')
      if (searchInput) searchInput.focus()
    }
  })
  
  return () => {
    cleanup()
    window.removeEventListener('hashchange', handleNavigation)
    skipLink.remove()
    announcementArea.remove()
  }
}

export function useAccessibility() {
  let cleanup = null
  
  onMounted(() => {
    cleanup = initAccessibility()
  })
  
  onUnmounted(() => {
    if (cleanup) cleanup()
  })
  
  return {
    accessibility,
    announceToScreenReader,
    focusManagement,
    keyboardNavigation,
    ariaHelpers,
    colorContrast,
    imageAccessibility,
    formAccessibility
  }
}