import { useState, useEffect } from 'react';
import { playSounds } from '../utils/sounds';

const CORRECT_CODE = '1984';

export function useKeypad() {
  const [code, setCode] = useState<string>('');
  const [error, setError] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const handleNumberClick = async (number: string) => {
    if (code.length < 4) {
      await playSounds.keypress();
      const newCode = code + number;
      setCode(newCode);
      
      if (newCode.length === 4) {
        if (newCode === CORRECT_CODE) {
          await playSounds.success();
          setSuccess(true);
          setError(false);
        } else {
          await playSounds.error();
          setError(true);
          setTimeout(() => {
            setCode('');
            setError(false);
          }, 1000);
        }
      }
    }
  };

  const handleClear = async () => {
    await playSounds.keypress();
    setCode('');
    setError(false);
  };

  const handleClose = () => {
    setSuccess(false);
    setCode('');
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key >= '0' && e.key <= '9') {
        handleNumberClick(e.key);
      } else if (e.key === 'Backspace') {
        handleClear();
      } else if (e.key === 'Escape' && success) {
        handleClose();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [code, success]);

  return {
    code,
    error,
    success,
    handleNumberClick,
    handleClear,
    handleClose
  };
}