import React, { useState, useEffect } from 'react';
import { FileWarning, Skull, User, MapPin, Calendar, X } from 'lucide-react';

interface ClassifiedFileProps {
  onClose: () => void;
}

export function ClassifiedFile({ onClose }: ClassifiedFileProps) {
  const [showTranslation, setShowTranslation] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Alt') setShowTranslation(true);
    };
    
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'Alt') setShowTranslation(false);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-black/95 text-[#0f0] p-4 overflow-auto">
      <div className="max-w-2xl mx-auto space-y-8 font-mono">
        <button
          onClick={onClose}
          className="fixed top-4 right-4 p-2 text-[#0f0] hover:bg-[#0f0]/10 rounded-full transition-colors"
          aria-label="Close file"
        >
          <X className="w-6 h-6" />
        </button>

        <header className="border-2 border-[#0f0] p-4 text-center relative">
          <FileWarning className="absolute left-4 top-4 w-8 h-8" />
          <Skull className="absolute right-4 top-4 w-8 h-8" />
          <h1 className="text-3xl font-bold mb-2">
            {showTranslation ? "TOP SECRET" : "СОВЕРШЕННО СЕКРЕТНО"}
          </h1>
          <p className="text-sm">
            {showTranslation ? "CLEARANCE LEVEL: ALPHA" : "УРОВЕНЬ ДОПУСКА: АЛЬФА"}
          </p>
        </header>

        <section className="border-2 border-[#0f0] p-4">
          <h2 className="text-xl font-bold mb-4">
            {showTranslation ? "PERSONAL FILE" : "ЛИЧНОЕ ДЕЛО"}
          </h2>
          
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <User className="w-5 h-5" />
              <span>{showTranslation ? "Name: REDACTED" : "Имя: РЕДАКТИРОВАНО"}</span>
            </div>
            
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5" />
              <span>{showTranslation ? "Location: REDACTED" : "Местоположение: РЕДАКТИРОВАНО"}</span>
            </div>
            
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5" />
              <span>{showTranslation ? "Date: 12.04.1961" : "Дата: 12.04.1961"}</span>
            </div>
          </div>
        </section>

        <section className="border-2 border-[#0f0] p-4">
          <h2 className="text-xl font-bold mb-4">
            {showTranslation ? "FILE CONTENTS" : "СОДЕРЖАНИЕ ФАЙЛА"}
          </h2>
          
          <div className="space-y-4">
            <p>
              {showTranslation ? "[FILE START]" : "[НАЧАЛО ФАЙЛА]"}
            </p>
            
            <p>
              {showTranslation 
                ? "Comrades, today is a momentous day. Operation \"Vostok\" was successful. The first human has left Earth's atmosphere and returned safely."
                : "Товарищи, сегодня знаменательный день. Операция \"Восток\" прошла успешно. Первый человек покинул пределы земной атмосферы и благополучно вернулся."
              }
            </p>
            
            <p>
              {showTranslation
                ? "The flight lasted 108 minutes. The spacecraft completed one orbit around Earth. Maximum flight altitude was [REDACTED] kilometers."
                : "Полет продолжался 108 минут. Корабль совершил один виток вокруг Земли. Максимальная высота полета составила [РЕДАКТИРОВАНО] километров."
              }
            </p>
            
            <p>
              {showTranslation
                ? "Pilot's condition [REDACTED] is satisfactory. Medical indicators within normal range."
                : "Состояние пилота [РЕДАКТИРОВАНО] удовлетворительное. Медицинские показатели в пределах нормы."
              }
            </p>
            
            <p>
              {showTranslation
                ? "Further plans: [DATA DELETED]"
                : "Дальнейшие планы: [ДАННЫЕ УДАЛЕНЫ]"
              }
            </p>
            
            <p>
              {showTranslation ? "[END OF FILE]" : "[КОНЕЦ ФАЙЛА]"}
            </p>
          </div>
        </section>

        <footer className="text-center text-sm opacity-50">
          {showTranslation 
            ? "THIS DOCUMENT IS NOT SUBJECT TO DECLASSIFICATION"
            : "ДОКУМЕНТ РАССЕКРЕЧИВАНИЮ НЕ ПОДЛЕЖИТ"
          }
        </footer>
      </div>
    </div>
  );
}