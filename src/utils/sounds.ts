import { soundConfig } from './soundConfig';

// Simple sound player with basic beep sounds
const createBeep = (config: typeof soundConfig.keypress): { play: () => void } => {
  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  oscillator.type = config.type;
  oscillator.frequency.value = config.frequency;
  gainNode.gain.value = config.volume;

  return {
    play: () => {
      oscillator.start();
      gainNode.gain.setValueAtTime(config.volume, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + config.duration / 1000);
      
      setTimeout(() => {
        oscillator.stop();
        audioContext.close();
      }, config.duration);
    }
  };
};

export const playSounds = {
  keypress: () => {
    try {
      createBeep(soundConfig.keypress).play();
    } catch (e) {
      console.error('Error playing keypress sound:', e);
    }
  },
  error: () => {
    try {
      createBeep(soundConfig.error).play();
    } catch (e) {
      console.error('Error playing error sound:', e);
    }
  },
  success: () => {
    try {
      createBeep(soundConfig.success).play();
    } catch (e) {
      console.error('Error playing success sound:', e);
    }
  }
};