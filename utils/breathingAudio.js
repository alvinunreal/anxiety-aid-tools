// Audio utility for breathing exercise cues
class BreathingAudio {
  constructor() {
    this.enabled = false
    this.audioCache = {} // Cache for different audio instances
    this.currentTechnique = 'simple' // Default technique
    this.loaded = false

    // Audio file mapping for different techniques
    this.audioFiles = {
      simple: {
        inhale: '/audios/breath-in.mp3',
        exhale: '/audios/breath-out.mp3'
      },
      box: {
        inhale: '/audios/4-4-4-4-in-rest.mp3',
        exhale: '/audios/4-4-4-4-out-rest.mp3'
      },
      calming: {
        inhale: '/audios/4-7-8-in-rest.mp3',
        exhale: '/audios/4-7-8-out.mp3'
      },
      quick: {
        inhale: '/audios/3-3-3-in-rest.mp3',
        exhale: '/audios/3-3-3-out.mp3'
      },
      energizing: {
        inhale: '/audios/4-4-6-in-rest.mp3',
        exhale: '/audios/4-4-6-out.mp3'
      }
    }
    this.isPlaying = false
    this.currentlyPlayingAudio = null
  }

  // Set the breathing technique to use
  setTechnique(technique) {
    this.currentTechnique = technique || 'simple'
  }

  // Initialize and load audio on user interaction
  async init(technique = null) {
    if (technique) {
      this.setTechnique(technique)
    }

    const files = this.audioFiles[this.currentTechnique]
    if (!files) {
      console.warn(`Unknown technique: ${this.currentTechnique}`)
      return
    }

    // Create cache key for this technique
    const cacheKey = this.currentTechnique

    if (!this.audioCache[cacheKey]) {
      const inhaleAudio = new Audio(files.inhale)
      inhaleAudio.preload = 'auto'
      // iOS optimization: set explicit properties
      inhaleAudio.autoplay = false
      inhaleAudio.loop = false
      inhaleAudio.load()

      const exhaleAudio = new Audio(files.exhale)
      exhaleAudio.preload = 'auto'
      // iOS optimization: set explicit properties
      exhaleAudio.autoplay = false
      exhaleAudio.loop = false
      exhaleAudio.load()

      // Add event listeners to track when audio ends (helps with iOS)
      inhaleAudio.addEventListener('ended', () => {
        if (this.currentlyPlayingAudio === inhaleAudio) {
          this.currentlyPlayingAudio = null
          this.isPlaying = false
        }
      })

      exhaleAudio.addEventListener('ended', () => {
        if (this.currentlyPlayingAudio === exhaleAudio) {
          this.currentlyPlayingAudio = null
          this.isPlaying = false
        }
      })

      this.audioCache[cacheKey] = {
        inhale: inhaleAudio,
        exhale: exhaleAudio
      }

      // Wait for both audio files to be loaded
      try {
        await Promise.all([
          new Promise((resolve, reject) => {
            if (inhaleAudio.readyState >= 3) {
              resolve()
            } else {
              const timeoutId = setTimeout(() => {
                reject(new Error('Audio loading timeout'))
              }, 10000) // 10 second timeout

              inhaleAudio.addEventListener('canplaythrough', () => {
                clearTimeout(timeoutId)
                resolve()
              }, { once: true })

              inhaleAudio.addEventListener('error', (e) => {
                clearTimeout(timeoutId)
                reject(e)
              }, { once: true })
            }
          }),
          new Promise((resolve, reject) => {
            if (exhaleAudio.readyState >= 3) {
              resolve()
            } else {
              const timeoutId = setTimeout(() => {
                reject(new Error('Audio loading timeout'))
              }, 10000) // 10 second timeout

              exhaleAudio.addEventListener('canplaythrough', () => {
                clearTimeout(timeoutId)
                resolve()
              }, { once: true })

              exhaleAudio.addEventListener('error', (e) => {
                clearTimeout(timeoutId)
                reject(e)
              }, { once: true })
            }
          })
        ])
        this.loaded = true
      } catch (err) {
        console.warn('Audio loading failed:', err)
      }
    }
  }

  // Prime audio for mobile - play silently at volume 0 to unlock audio
  async prime() {
    const audio = this.audioCache[this.currentTechnique]
    if (!audio) {
      await this.init()
    }

    const currentAudio = this.audioCache[this.currentTechnique]
    if (!currentAudio) return

    // Play both audio files at volume 0 to unlock audio playback on mobile
    const originalInhaleVolume = currentAudio.inhale.volume
    const originalExhaleVolume = currentAudio.exhale.volume

    try {
      currentAudio.inhale.volume = 0
      currentAudio.exhale.volume = 0

      await Promise.all([
        currentAudio.inhale.play().then(() => {
          currentAudio.inhale.pause()
          currentAudio.inhale.currentTime = 0
        }),
        currentAudio.exhale.play().then(() => {
          currentAudio.exhale.pause()
          currentAudio.exhale.currentTime = 0
        })
      ])

      currentAudio.inhale.volume = originalInhaleVolume
      currentAudio.exhale.volume = originalExhaleVolume
    } catch (err) {
      console.warn('Audio priming failed:', err)
    }
  }

  // Play inhale audio cue
  playInhaleCue() {
    if (!this.enabled) return

    const audio = this.audioCache[this.currentTechnique]
    if (!audio || !audio.inhale) return

    // Stop any currently playing audio first (important for iOS)
    this.stopCurrentlyPlaying()

    // Reset and play
    try {
      audio.inhale.currentTime = 0
      audio.inhale.volume = 1.0

      const playPromise = audio.inhale.play()
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            this.isPlaying = true
            this.currentlyPlayingAudio = audio.inhale
          })
          .catch(err => {
            console.warn('Inhale audio play failed:', err)
            this.isPlaying = false
            this.currentlyPlayingAudio = null
          })
      }
    } catch (err) {
      console.warn('Inhale audio error:', err)
    }
  }

  // Play exhale audio cue
  playExhaleCue() {
    if (!this.enabled) return

    const audio = this.audioCache[this.currentTechnique]
    if (!audio || !audio.exhale) return

    // Stop any currently playing audio first (important for iOS)
    this.stopCurrentlyPlaying()

    // Reset and play
    try {
      audio.exhale.currentTime = 0
      audio.exhale.volume = 1.0

      const playPromise = audio.exhale.play()
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            this.isPlaying = true
            this.currentlyPlayingAudio = audio.exhale
          })
          .catch(err => {
            console.warn('Exhale audio play failed:', err)
            this.isPlaying = false
            this.currentlyPlayingAudio = null
          })
      }
    } catch (err) {
      console.warn('Exhale audio error:', err)
    }
  }

  // Enable/disable audio
  async setEnabled(enabled, technique = null) {
    // Stop all audio when disabling
    if (!enabled) {
      this.stopAll()
    }

    this.enabled = enabled

    if (technique && technique !== this.currentTechnique) {
      // Stop current audio before switching technique
      this.stopCurrentlyPlaying()
      this.setTechnique(technique)
    }

    if (enabled && !this.audioCache[this.currentTechnique]) {
      await this.init()
      await this.prime()
    }
  }

  // Stop currently playing audio (single instance)
  stopCurrentlyPlaying() {
    if (this.currentlyPlayingAudio) {
      try {
        this.currentlyPlayingAudio.pause()
        this.currentlyPlayingAudio.currentTime = 0
      } catch (err) {
        console.warn('Error stopping audio:', err)
      }
      this.currentlyPlayingAudio = null
      this.isPlaying = false
    }
  }

  // Stop currently playing audio for current technique
  stop() {
    this.stopCurrentlyPlaying()

    const audio = this.audioCache[this.currentTechnique]
    if (audio) {
      try {
        if (audio.inhale) {
          audio.inhale.pause()
          audio.inhale.currentTime = 0
        }
        if (audio.exhale) {
          audio.exhale.pause()
          audio.exhale.currentTime = 0
        }
      } catch (err) {
        console.warn('Error stopping technique audio:', err)
      }
    }
  }

  // Stop all audio across all techniques (comprehensive cleanup)
  stopAll() {
    this.stopCurrentlyPlaying()

    Object.values(this.audioCache).forEach(audio => {
      try {
        if (audio.inhale) {
          audio.inhale.pause()
          audio.inhale.currentTime = 0
        }
        if (audio.exhale) {
          audio.exhale.pause()
          audio.exhale.currentTime = 0
        }
      } catch (err) {
        console.warn('Error in stopAll:', err)
      }
    })
  }

  // Cleanup
  cleanup() {
    this.stopAll()

    // Remove event listeners and nullify audio objects
    Object.values(this.audioCache).forEach(audio => {
      try {
        if (audio.inhale) {
          audio.inhale.pause()
          audio.inhale.src = ''
          audio.inhale.load()
          audio.inhale = null
        }
        if (audio.exhale) {
          audio.exhale.pause()
          audio.exhale.src = ''
          audio.exhale.load()
          audio.exhale = null
        }
      } catch (err) {
        console.warn('Error during cleanup:', err)
      }
    })

    this.audioCache = {}
    this.loaded = false
    this.isPlaying = false
    this.currentlyPlayingAudio = null
  }
}

export const breathingAudio = new BreathingAudio()