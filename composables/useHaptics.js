export const useHaptics = () => {
  const isSupported = () => {
    return "navigator" in globalThis && "vibrate" in navigator;
  };

  const triggerHaptic = (type = "light", duration = null) => {
    // Check if running in browser environment
    if (typeof window === "undefined") return;
    // Check if the device is iOS
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

    // Web Vibration API (Android and some browsers)
    if (isIOS && isSupported()) {
      let pattern;

      switch (type) {
        case "light":
          pattern = duration || 10;
          break;
        case "medium":
          pattern = duration || 50;
          break;
        case "heavy":
          pattern = duration || 100;
          break;
        case "success":
          pattern = duration || [100, 50, 100];
          break;
        case "warning":
          pattern = duration || [50, 50, 50, 50, 50];
          break;
        case "error":
          pattern = duration || [200, 100, 200];
          break;
        case "selection":
          pattern = duration || 20;
          break;
        case "impact":
          pattern = duration || 75;
          break;
        default:
          pattern = duration || 50;
      }

      navigator.vibrate(pattern);
      return true;
    }

    // iOS Safari specific check for Haptic Feedback API
    if (window.DeviceMotionEvent && typeof DeviceMotionEvent.requestPermission === "function") {
      // This is iOS 13+ with haptic support
      // Note: iOS doesn't expose direct haptic API to web, but we can simulate with audio
      playHapticSound(type);
      return true;
    }

    // Fallback for other browsers
    return false;
  };

  const playHapticSound = (type) => {
    try {
      /* another option to test:
      // Create a hidden input element of type checkbox with the 'switch' attribute
      const input = document.createElement('input');
      input.type = 'checkbox';
      input.setAttribute('switch', '');
      input.style.display = 'none'; // Hide the element

      // Create a label for the input
      const label = document.createElement('label');
      label.appendChild(input);

      // Append the elements to the body
      document.body.appendChild(label);

      // Programmatically click the label to trigger the haptic feedback
      label.click();

      // Clean up by removing the elements from the DOM
      document.body.removeChild(label);
      */
      // Create a very short, low-volume audio context for haptic-like feedback
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      // Configure based on haptic type
      let frequency, duration, volume;

      switch (type) {
        case "light":
          frequency = 1000;
          duration = 0.01;
          volume = 0.1;
          break;
        case "medium":
          frequency = 800;
          duration = 0.05;
          volume = 0.15;
          break;
        case "heavy":
          frequency = 600;
          duration = 0.1;
          volume = 0.2;
          break;
        case "success":
          frequency = 1200;
          duration = 0.15;
          volume = 0.1;
          break;
        case "warning":
          frequency = 900;
          duration = 0.08;
          volume = 0.12;
          break;
        case "error":
          frequency = 500;
          duration = 0.2;
          volume = 0.15;
          break;
        default:
          frequency = 800;
          duration = 0.05;
          volume = 0.1;
      }

      oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
      gainNode.gain.setValueAtTime(0, audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(volume, audioContext.currentTime + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration);

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + duration);

      // Clean up
      setTimeout(
        () => {
          audioContext.close();
        },
        duration * 1000 + 100
      );
    } catch (error) {
      console.debug("Haptic audio fallback failed:", error);
    }
  };

  // Convenience methods for different haptic types
  const light = () => triggerHaptic("light");
  const medium = () => triggerHaptic("medium");
  const heavy = () => triggerHaptic("heavy");
  const success = () => triggerHaptic("success");
  const warning = () => triggerHaptic("warning");
  const error = () => triggerHaptic("error");
  const selection = () => triggerHaptic("selection");
  const impact = () => triggerHaptic("impact");

  // Custom duration methods
  const vibrate = (duration) => triggerHaptic("custom", duration);
  const pattern = (patternArray) => {
    if (isSupported()) {
      navigator.vibrate(patternArray);
      return true;
    }
    return false;
  };

  return {
    isSupported,
    triggerHaptic,
    light,
    medium,
    heavy,
    success,
    warning,
    error,
    selection,
    impact,
    vibrate,
    pattern,
  };
};
