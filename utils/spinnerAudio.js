/**
 * Audio utility for fidget spinner - generates discrete click sounds based on rotation
 */

export class SpinnerAudio {
  constructor() {
    this.audioContext = null
    this.isMuted = false
    this.lastRotation = 0
    this.clickThreshold = 15 // Degrees of rotation per click
    this.accumulatedRotation = 0
  }

  init() {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)()
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
   * Play a single metallic click sound
   * @param {number} velocity - Current velocity for pitch/volume variation
   */
  playClick(velocity) {
    if (!this.audioContext) return

    const now = this.audioContext.currentTime

    // Create a short burst of white noise for click
    const duration = 0.02 // Very short click
    const bufferSize = this.audioContext.sampleRate * duration
    const noiseBuffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate)
    const output = noiseBuffer.getChannelData(0)
    
    for (let i = 0; i < bufferSize; i++) {
      output[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize) // Decay envelope
    }

    // Create buffer source
    const source = this.audioContext.createBufferSource()
    source.buffer = noiseBuffer

    // Create gain for volume control
    const gainNode = this.audioContext.createGain()
    const volume = Math.min(0.1 + velocity * 0.015, 0.3)
    gainNode.gain.setValueAtTime(volume, now)
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + duration)

    // Create high-pass filter for metallic character
    const highpass = this.audioContext.createBiquadFilter()
    highpass.type = 'highpass'
    const filterFreq = 2000 + velocity * 100
    highpass.frequency.setValueAtTime(filterFreq, now)
    highpass.Q.value = 1

    // Create bandpass filter for click sharpness
    const bandpass = this.audioContext.createBiquadFilter()
    bandpass.type = 'bandpass'
    const clickFreq = 3000 + velocity * 150
    bandpass.frequency.setValueAtTime(clickFreq, now)
    bandpass.Q.value = 15

    // Connect audio graph
    source.connect(highpass)
    highpass.connect(bandpass)
    bandpass.connect(gainNode)
    gainNode.connect(this.audioContext.destination)

    // Play the click
    source.start(now)
    source.stop(now + duration)
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
