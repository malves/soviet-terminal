import React from 'react';
import { ShieldAlert, Lock, Unlock } from 'lucide-react';

interface SecurityKeypadProps {
  code: string;
  error: boolean;
  success: boolean;
  onNumberClick: (number: string) => void;
  onClear: () => void;
}

export function SecurityKeypad({ code, error, success, onNumberClick, onClear }: SecurityKeypadProps) {
  return (
    <div className={`
      relative border-2 p-8 bg-black shadow-lg transition-all duration-200
      ${error 
        ? 'border-red-500 shadow-[0_0_20px_rgba(255,0,0,0.5)] animate-shake' 
        : 'border-[#0f0] shadow-[0_0_15px_rgba(0,255,0,0.3)]'
      }
    `}>
      <div className="text-center mb-8">
        <ShieldAlert className={`mx-auto h-12 w-12 mb-4 ${error ? 'text-red-500' : 'text-[#0f0]'}`} />
        <h2 className={`text-2xl font-mono tracking-[0.2em] uppercase mb-2 ${error ? 'text-red-500' : 'text-[#0f0]'}`}>
          СИСТЕМА БЕЗОПАСНОСТИ
        </h2>
        <p className={error ? 'text-red-500' : 'text-[#0f0]'}>ВВЕДИТЕ КОД ДОСТУПА</p>
      </div>

      <div className={`
        bg-[#001100] border p-4 mb-6 font-mono text-4xl text-center tracking-[0.5em] h-16 
        flex items-center justify-center
        ${error ? 'border-red-500 bg-red-900/20' : 'border-[#0f0]'}
      `}>
        {code.split('').map((digit, index) => (
          <span key={index} className={`inline-block w-8 ${error ? 'text-red-500' : 'text-[#0f0]'}`}>
            {digit}
          </span>
        )).concat(Array(4 - code.length).fill('_').map((underscore, index) => (
          <span key={`empty-${index}`} className={`inline-block w-8 ${error ? 'text-red-500/50' : 'text-[#0f0]/50'}`}>
            {underscore}
          </span>
        )))}
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 'C', 0, '⏎'].map((number, index) => (
          <button
            key={index}
            onClick={() => {
              if (number === 'C') onClear();
              else if (number !== '⏎') onNumberClick(number.toString());
            }}
            className={`
              h-16 font-mono text-2xl border-2 transition-colors duration-200
              ${error 
                ? 'border-red-500 bg-red-900/20 text-red-500' 
                : 'border-[#0f0] bg-black hover:bg-[#0f0]/10 text-[#0f0]'
              }
              ${success ? 'bg-[#0f0]/20' : ''}
            `}
          >
            {number}
          </button>
        ))}
      </div>

      <div className="mt-4 text-center font-mono text-sm">
        {error && (
          <p className="text-red-500 flex items-center justify-center gap-2">
            <Lock className="w-4 h-4" /> НЕВЕРНЫЙ КОД
          </p>
        )}
        {success && (
          <p className="text-[#0f0] flex items-center justify-center gap-2">
            <Unlock className="w-4 h-4" /> ДОСТУП РАЗРЕШЕН
          </p>
        )}
      </div>
    </div>
  );
}