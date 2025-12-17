import { ref, computed, onMounted, onUnmounted } from 'vue'

export function useCountdown(targetDate) {
  const now = ref(new Date())
  let interval = null

  const timeRemaining = computed(() => {
    const target = new Date(targetDate)
    const difference = target.getTime() - now.value.getTime()
    return Math.max(0, difference)
  })

  const days = computed(() => Math.floor(timeRemaining.value / (1000 * 60 * 60 * 24)))
  const hours = computed(() => Math.floor((timeRemaining.value % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)))
  const minutes = computed(() => Math.floor((timeRemaining.value % (1000 * 60 * 60)) / (1000 * 60)))
  const seconds = computed(() => Math.floor((timeRemaining.value % (1000 * 60)) / 1000))

  const isExpired = computed(() => timeRemaining.value <= 0)

  const start = () => {
    interval = setInterval(() => {
      now.value = new Date()
    }, 1000)
  }

  const stop = () => {
    if (interval) {
      clearInterval(interval)
      interval = null
    }
  }

  onMounted(() => {
    start()
  })

  onUnmounted(() => {
    stop()
  })

  return {
    days,
    hours,
    minutes,
    seconds,
    isExpired,
    start,
    stop
  }
}