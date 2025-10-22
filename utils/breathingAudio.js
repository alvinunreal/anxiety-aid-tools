// Audio utility for breathing exercise cues
class BreathingAudio {
  constructor() {
    this.enabled = false
    this.inhaleAudio = null
    this.exhaleAudio = null
    this.loaded = false
  }

  // Initialize and load audio on user interaction
  async init() {
    if (!this.inhaleAudio) {
      this.inhaleAudio = new Audio('/audios/in.mp3')
      this.inhaleAudio.preload = 'auto'
      this.inhaleAudio.load()
    }
    if (!this.exhaleAudio) {
      this.exhaleAudio = new Audio('/audios/out.mp3')
      this.exhaleAudio.preload = 'auto'
      this.exhaleAudio.load()
    }

    // Wait for both audio files to be loaded
    try {
      await Promise.all([
        new Promise((resolve) => {
          if (this.inhaleAudio.readyState >= 3) {
            resolve()
          } else {
            this.inhaleAudio.addEventListener('canplaythrough', resolve, { once: true })
          }
        }),
        new Promise((resolve) => {
          if (this.exhaleAudio.readyState >= 3) {
            resolve()
          } else {
            this.exhaleAudio.addEventListener('canplaythrough', resolve, { once: true })
          }
        })
      ])
      this.loaded = true
    } catch (err) {
      console.warn('Audio loading failed:', err)
    }
  }

  // Prime audio for mobile - play silently at volume 0 to unlock audio
  async prime() {
    if (!this.inhaleAudio || !this.exhaleAudio) {
      await this.init()
    }

    // Play both audio files at volume 0 to unlock audio playback on mobile
    const originalInhaleVolume = this.inhaleAudio.volume
    const originalExhaleVolume = this.exhaleAudio.volume

    try {
      this.inhaleAudio.volume = 0
      this.exhaleAudio.volume = 0

      await Promise.all([
        this.inhaleAudio.play().then(() => {
          this.inhaleAudio.pause()
          this.inhaleAudio.currentTime = 0
        }),
        this.exhaleAudio.play().then(() => {
          this.exhaleAudio.pause()
          this.exhaleAudio.currentTime = 0
        })
      ])

      this.inhaleAudio.volume = originalInhaleVolume
      this.exhaleAudio.volume = originalExhaleVolume
    } catch (err) {
      console.warn('Audio priming failed:', err)
    }
  }

  // Play inhale audio (4 seconds)
  playInhaleCue() {
    if (!this.enabled || !this.inhaleAudio) return

    // Reset and play
    this.inhaleAudio.currentTime = 0
    this.inhaleAudio.play().catch(err => {
      console.warn('Inhale audio play failed:', err)
    })
  }

  // Play exhale audio (6 seconds)
  playExhaleCue() {
    if (!this.enabled || !this.exhaleAudio) return

    // Reset and play
    this.exhaleAudio.currentTime = 0
    this.exhaleAudio.play().catch(err => {
      console.warn('Exhale audio play failed:', err)
    })
  }

  // Enable/disable audio
  async setEnabled(enabled) {
    this.enabled = enabled
    if (enabled && !this.loaded) {
      await this.init()
      await this.prime()
    }
  }

  // Stop currently playing audio
  stop() {
    if (this.inhaleAudio) {
      this.inhaleAudio.pause()
      this.inhaleAudio.currentTime = 0
    }
    if (this.exhaleAudio) {
      this.exhaleAudio.pause()
      this.exhaleAudio.currentTime = 0
    }
  }

  // Cleanup
  cleanup() {
    if (this.inhaleAudio) {
      this.inhaleAudio.pause()
      this.inhaleAudio = null
    }
    if (this.exhaleAudio) {
      this.exhaleAudio.pause()
      this.exhaleAudio = null
    }
  }
}

export const breathingAudio = new BreathingAudio()