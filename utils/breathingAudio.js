// Audio utility for breathing exercise cues
class BreathingAudio {
  constructor() {
    this.enabled = false
    this.inhaleAudio = null
    this.exhaleAudio = null
  }

  // Initialize audio on user interaction
  init() {
    if (!this.inhaleAudio) {
      this.inhaleAudio = new Audio('/audios/in.mp3')
      this.inhaleAudio.preload = 'auto'
    }
    if (!this.exhaleAudio) {
      this.exhaleAudio = new Audio('/audios/out.mp3')
      this.exhaleAudio.preload = 'auto'
    }
  }

  // Play inhale audio (4 seconds)
  playInhaleCue() {
    if (!this.enabled || !this.inhaleAudio) return

    // Reset and play
    this.inhaleAudio.currentTime = 0
    this.inhaleAudio.play().catch(err => {
      // Audio play failed, likely due to browser autoplay policy
    })
  }

  // Play exhale audio (6 seconds)
  playExhaleCue() {
    if (!this.enabled || !this.exhaleAudio) return

    // Reset and play
    this.exhaleAudio.currentTime = 0
    this.exhaleAudio.play().catch(err => {
      // Audio play failed, likely due to browser autoplay policy
    })
  }

  // Enable/disable audio
  setEnabled(enabled) {
    this.enabled = enabled
    if (enabled) {
      this.init()
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