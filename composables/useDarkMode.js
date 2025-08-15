export const useDarkMode = () => {
  const isDarkMode = ref(false)
  
  const toggleDarkMode = () => {
    isDarkMode.value = !isDarkMode.value
    updateTheme()
    saveThemePreference()
  }
  
  const setDarkMode = (dark) => {
    isDarkMode.value = dark
    updateTheme()
    saveThemePreference()
  }
  
  const updateTheme = () => {
    if (process.client) {
      const htmlElement = document.documentElement
      if (isDarkMode.value) {
        htmlElement.classList.add('dark')
      } else {
        htmlElement.classList.remove('dark')
      }
    }
  }
  
  const saveThemePreference = () => {
    if (process.client) {
      localStorage.setItem('darkMode', JSON.stringify(isDarkMode.value))
    }
  }
  
  const loadThemePreference = () => {
    if (process.client) {
      try {
        const saved = localStorage.getItem('darkMode')
        if (saved !== null) {
          isDarkMode.value = JSON.parse(saved)
        } else {
          // Check system preference
          const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
          isDarkMode.value = prefersDark
        }
        updateTheme()
      } catch (error) {
        console.warn('Failed to load theme preference:', error)
      }
    }
  }
  
  // Initialize theme on client side
  onMounted(() => {
    loadThemePreference()
    
    // Listen for system theme changes
    if (window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      const handleChange = (e) => {
        // Only auto-switch if user hasn't set a preference
        const saved = localStorage.getItem('darkMode')
        if (saved === null) {
          isDarkMode.value = e.matches
          updateTheme()
        }
      }
      
      mediaQuery.addEventListener('change', handleChange)
      
      // Cleanup listener
      onUnmounted(() => {
        mediaQuery.removeEventListener('change', handleChange)
      })
    }
  })
  
  return {
    isDarkMode: readonly(isDarkMode),
    toggleDarkMode,
    setDarkMode
  }
}