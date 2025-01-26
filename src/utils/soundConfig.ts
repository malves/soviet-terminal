export const soundConfig = {
  keypress: {
    frequency: 440,
    duration: 150,
    type: 'square' as OscillatorType,
    volume: 0.15 // Reduced volume for keypress
  },
  error: {
    frequency: 200,
    duration: 300,
    type: 'sine' as OscillatorType,
    volume: 0.3
  },
  success: {
    frequency: 1200,
    duration: 100,
    type: 'sine' as OscillatorType,
    volume: 0.3
  }
};