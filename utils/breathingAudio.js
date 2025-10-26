// Audio utility for breathing exercise cues
class BreathingAudio {
  constructor() {
    this.enabled = false
    this.singleAudioElement = null // Single audio element for all playback
    this.currentTechnique = 'simple' // Default technique
    this.loaded = false

    // Audio file mapping for different techniques
    this.audioFiles = {
      simple: {
        inhale: '/audios/breathing/breath-in.mp3',
        exhale: '/audios/breathing/breath-out.mp3'
      },
      box: {
        inhale: '/audios/breathing/4-4-4-4-in-rest.mp3',
        exhale: '/audios/breathing/4-4-4-4-out-rest.mp3'
      },
      calming: {
        inhale: '/audios/breathing/4-7-8-in-rest.mp3',
        exhale: '/audios/breathing/4-7-8-out.mp3'
      },
      quick: {
        inhale: '/audios/breathing/3-3-3-in-rest.mp3',
        exhale: '/audios/breathing/3-3-3-out.mp3'
      },
      energizing: {
        inhale: '/audios/breathing/4-4-6-in-rest.mp3',
        exhale: '/audios/breathing/4-4-6-out.mp3'
      }
    }
    this.isPlaying = false
  }

  // Set the breathing technique to use
  setTechnique(technique) {
    this.currentTechnique = technique || 'simple'
  }

  // Initialize single audio element on user interaction (critical for iOS)
  async init(technique = null) {
    if (technique) {
      this.setTechnique(technique)
    }

    const files = this.audioFiles[this.currentTechnique]
    if (!files) {
      console.warn(`Unknown technique: ${this.currentTechnique}`)
      return
    }

    // Create single audio element if it doesn't exist
    if (!this.singleAudioElement) {
      this.singleAudioElement = new Audio()
      this.singleAudioElement.preload = 'auto'
      this.singleAudioElement.autoplay = false
      this.singleAudioElement.loop = false

      // Add event listener to track when audio ends
      this.singleAudioElement.addEventListener('ended', () => {
        this.isPlaying = false
      })
    }

    this.loaded = true
  }

  // Prime audio for mobile - play silently at volume 0 to unlock audio
  async prime() {
    if (!this.singleAudioElement) {
      await this.init()
    }

    if (!this.singleAudioElement) return

    const files = this.audioFiles[this.currentTechnique]
    if (!files) return

    const originalVolume = this.singleAudioElement.volume

    try {
      // Play a short silent sound to unlock audio on iOS
      this.singleAudioElement.volume = 0
      this.singleAudioElement.src = files.inhale

      await this.singleAudioElement.play()
      this.singleAudioElement.pause()
      this.singleAudioElement.currentTime = 0

      this.singleAudioElement.volume = originalVolume
    } catch (err) {
      console.warn('Audio priming failed:', err)
    }
  }

  // Play inhale audio cue
  playInhaleCue() {
    if (!this.enabled) return

    if (!this.singleAudioElement) return

    const files = this.audioFiles[this.currentTechnique]
    if (!files || !files.inhale) return

    // Stop any currently playing audio first (important for iOS)
    this.stopCurrentlyPlaying()

    // Change source and play
    try {
      this.singleAudioElement.src = files.inhale
      this.singleAudioElement.currentTime = 0
      this.singleAudioElement.volume = 1.0

      const playPromise = this.singleAudioElement.play()
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            this.isPlaying = true
          })
          .catch(err => {
            console.warn('Inhale audio play failed:', err)
            this.isPlaying = false
          })
      }
    } catch (err) {
      console.warn('Inhale audio error:', err)
    }
  }

  // Play exhale audio cue
  playExhaleCue() {
    if (!this.enabled) return

    if (!this.singleAudioElement) return

    const files = this.audioFiles[this.currentTechnique]
    if (!files || !files.exhale) return

    // Stop any currently playing audio first (important for iOS)
    this.stopCurrentlyPlaying()

    // Change source and play
    try {
      this.singleAudioElement.src = files.exhale
      this.singleAudioElement.currentTime = 0
      this.singleAudioElement.volume = 1.0

      const playPromise = this.singleAudioElement.play()
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            this.isPlaying = true
          })
          .catch(err => {
            console.warn('Exhale audio play failed:', err)
            this.isPlaying = false
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
      this.stopCurrentlyPlaying()
    }

    this.enabled = enabled

    if (technique && technique !== this.currentTechnique) {
      // Stop current audio before switching technique
      this.stopCurrentlyPlaying()
      this.setTechnique(technique)
    }

    if (enabled && !this.singleAudioElement) {
      await this.init()
      await this.prime()
    }
  }

  // Stop currently playing audio
  stopCurrentlyPlaying() {
    if (this.singleAudioElement) {
      try {
        this.singleAudioElement.pause()
        this.singleAudioElement.currentTime = 0
      } catch (err) {
        console.warn('Error stopping audio:', err)
      }
      this.isPlaying = false
    }
  }

  // Stop currently playing audio (alias for consistency)
  stop() {
    this.stopCurrentlyPlaying()
  }

  // Stop all audio (alias for consistency)
  stopAll() {
    this.stopCurrentlyPlaying()
  }

  // Cleanup
  cleanup() {
    if (this.singleAudioElement) {
      try {
        this.singleAudioElement.pause()
        this.singleAudioElement.src = ''
        this.singleAudioElement.load()
      } catch (err) {
        console.warn('Error during cleanup:', err)
      }
      this.singleAudioElement = null
    }

    this.loaded = false
    this.isPlaying = false
  }
}

export const breathingAudio = new BreathingAudio()