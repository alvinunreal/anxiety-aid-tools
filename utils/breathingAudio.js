// Audio utility for breathing exercise cues (Web Audio API)
class BreathingAudio {
  constructor() {
    this.enabled = false
    this.audioCache = {} // Cache for AudioBuffers
    this.currentTechnique = 'simple' // Default technique
    this.loaded = false
    this.audioContext = null
    this.currentSource = null

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

  // Initialize AudioContext
  _initAudioContext() {
    if (this.audioContext) return this.audioContext

    try {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)()
      return this.audioContext
    } catch (error) {
      console.error('Failed to create AudioContext:', error)
      return null
    }
  }

  // Set the breathing technique to use
  setTechnique(technique) {
    this.currentTechnique = technique || 'simple'
  }

  // Load audio buffer from URL
  async _loadAudioBuffer(url) {
    const ctx = this._initAudioContext()
    if (!ctx) {
      throw new Error('AudioContext not available')
    }

    try {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const arrayBuffer = await response.arrayBuffer()
      const audioBuffer = await ctx.decodeAudioData(arrayBuffer)
      return audioBuffer
    } catch (error) {
      throw new Error(`Unable to load audio at ${url}: ${error.message}`)
    }
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
      try {
        // Load both audio files using Web Audio API
        const [inhaleBuffer, exhaleBuffer] = await Promise.race([
          Promise.all([
            this._loadAudioBuffer(files.inhale),
            this._loadAudioBuffer(files.exhale)
          ]),
          new Promise((_, reject) =>
            setTimeout(() => reject(new Error('Audio loading timeout')), 10000)
          )
        ])

        this.audioCache[cacheKey] = {
          inhale: inhaleBuffer,
          exhale: exhaleBuffer
        }

        this.loaded = true
      } catch (err) {
        console.warn('Audio loading failed:', err)
      }
    }
  }

  // Prime audio for mobile - unlock AudioContext with user gesture
  async prime() {
    const audio = this.audioCache[this.currentTechnique]
    if (!audio) {
      await this.init()
    }

    const ctx = this._initAudioContext()
    if (!ctx) {
      console.warn('AudioContext not available')
      return
    }

    // CRITICAL: Unlock AudioContext with user gesture (solves Safari autoplay issue)
    if (ctx.state === 'suspended') {
      try {
        await ctx.resume()
        console.log('BreathingAudio: AudioContext unlocked successfully')
      } catch (err) {
        console.warn('AudioContext unlock failed:', err)
      }
    }
  }

  // Play inhale audio cue
  async playInhaleCue() {
    if (!this.enabled) return

    const audio = this.audioCache[this.currentTechnique]
    if (!audio || !audio.inhale) return

    const ctx = this._initAudioContext()
    if (!ctx) {
      console.warn('AudioContext not available')
      return
    }

    // Resume AudioContext if suspended (Safari requirement)
    if (ctx.state === 'suspended') {
      try {
        await ctx.resume()
      } catch (error) {
        console.warn('Failed to resume AudioContext:', error)
        return
      }
    }

    // Stop any currently playing audio first
    this.stopCurrentlyPlaying()

    try {
      // Create source node from buffer
      const source = ctx.createBufferSource()
      source.buffer = audio.inhale
      source.connect(ctx.destination)

      this.currentSource = source
      this.isPlaying = true

      source.onended = () => {
        this.currentSource = null
        this.isPlaying = false
      }

      source.start(0)
    } catch (err) {
      console.warn('Inhale audio error:', err)
      this.currentSource = null
      this.isPlaying = false
    }
  }

  // Play exhale audio cue
  async playExhaleCue() {
    if (!this.enabled) return

    const audio = this.audioCache[this.currentTechnique]
    if (!audio || !audio.exhale) return

    const ctx = this._initAudioContext()
    if (!ctx) {
      console.warn('AudioContext not available')
      return
    }

    // Resume AudioContext if suspended (Safari requirement)
    if (ctx.state === 'suspended') {
      try {
        await ctx.resume()
      } catch (error) {
        console.warn('Failed to resume AudioContext:', error)
        return
      }
    }

    // Stop any currently playing audio first
    this.stopCurrentlyPlaying()

    try {
      // Create source node from buffer
      const source = ctx.createBufferSource()
      source.buffer = audio.exhale
      source.connect(ctx.destination)

      this.currentSource = source
      this.isPlaying = true

      source.onended = () => {
        this.currentSource = null
        this.isPlaying = false
      }

      source.start(0)
    } catch (err) {
      console.warn('Exhale audio error:', err)
      this.currentSource = null
      this.isPlaying = false
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
    if (this.currentSource) {
      try {
        this.currentSource.stop()
      } catch (err) {
        // Source might already be stopped
      }

      try {
        this.currentSource.disconnect()
      } catch (err) {
        // Already disconnected
      }

      this.currentSource = null
      this.isPlaying = false
    }
  }

  // Stop currently playing audio for current technique
  stop() {
    this.stopCurrentlyPlaying()
  }

  // Stop all audio across all techniques (comprehensive cleanup)
  stopAll() {
    this.stopCurrentlyPlaying()
  }

  // Cleanup
  cleanup() {
    this.stopAll()

    // Clear audio buffers (they'll be garbage collected)
    this.audioCache = {}
    this.loaded = false
    this.isPlaying = false

    // Close AudioContext
    if (this.audioContext && this.audioContext.state !== 'closed') {
      try {
        this.audioContext.close()
      } catch (err) {
        console.warn('Error closing AudioContext:', err)
      }
      this.audioContext = null
    }
  }
}

export const breathingAudio = new BreathingAudio()