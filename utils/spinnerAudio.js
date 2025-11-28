/**
 * Audio utility for fidget spinner - plays click sounds based on rotation
 */

export class SpinnerAudio {
  constructor() {
    this.audioContext = null
    this.clickBuffer = null
    this.isMuted = false
    this.lastRotation = 0
    this.clickThreshold = 15 // Degrees of rotation per click
    this.accumulatedRotation = 0
  }

  async init() {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)()
      await this.loadClickSound()
    }
  }

  async loadClickSound() {
    try {
      const response = await fetch('/audios/fidget-spinner/click.mp3')
      const arrayBuffer = await response.arrayBuffer()
      this.clickBuffer = await this.audioContext.decodeAudioData(arrayBuffer)
    } catch (error) {
      console.warn('Failed to load click sound:', error)
    }
  }

  /**
   * Update based on rotation and velocity
   * @param {number} rotation - Current rotation in degrees
   * @param {number} velocity - The spinner's velocity
   */
  update(rotation, velocity) {
    if (this.isMuted || !this.audioContext) return

    const absVelocity = Math.abs(velocity)
    
    // Only play if velocity is significant
    if (absVelocity < 0.3) {
      return
    }

    // Resume audio context if suspended
    if (this.audioContext.state === 'suspended') {
      this.audioContext.resume()
    }

    // Calculate rotation delta
    const rotationDelta = Math.abs(rotation - this.lastRotation)
    this.accumulatedRotation += rotationDelta
    this.lastRotation = rotation

    // Adjust click frequency based on velocity (faster = more frequent clicks)
    const dynamicThreshold = Math.max(5, this.clickThreshold - absVelocity * 0.5)

    // Trigger click when threshold is met
    if (this.accumulatedRotation >= dynamicThreshold) {
      this.playClick(absVelocity)
      this.accumulatedRotation = 0
    }
  }

  /**
   * Play a single click sound
   * @param {number} velocity - Current velocity for volume variation
   */
  playClick(velocity) {
    if (!this.audioContext || !this.clickBuffer) return

    const source = this.audioContext.createBufferSource()
    source.buffer = this.clickBuffer

    // Create gain for volume control based on velocity
    const gainNode = this.audioContext.createGain()
    const volume = Math.min(0.3 + velocity * 0.02, 0.7)
    gainNode.gain.value = volume

    // Slight playback rate variation for more natural feel
    source.playbackRate.value = 0.95 + Math.random() * 0.1

    // Connect and play
    source.connect(gainNode)
    gainNode.connect(this.audioContext.destination)
    source.start()
  }

  reset() {
    this.accumulatedRotation = 0
  }

  setMuted(muted) {
    this.isMuted = muted
    if (muted) {
      this.stop()
    }
  }

  toggleMute() {
    this.setMuted(!this.isMuted)
    return this.isMuted
  }

  cleanup() {
    this.stop()
    if (this.audioContext) {
      this.audioContext.close()
      this.audioContext = null
    }
  }
}
