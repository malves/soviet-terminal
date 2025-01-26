import React, { useState, useEffect } from 'react';
import { SecurityKeypad } from './SecurityKeypad';
import { ClassifiedFile } from './ClassifiedFile';
import { useKeypad } from '../hooks/useKeypad';

export function AppContent() {
  const { 
    code, 
    error, 
    success, 
    handleNumberClick, 
    handleClear, 
    handleClose 
  } = useKeypad();

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        <SecurityKeypad
          code={code}
          error={error}
          success={success}
          onNumberClick={handleNumberClick}
          onClear={handleClear}
        />
      </div>

      {success && <ClassifiedFile onClose={handleClose} />}
    </div>
  );
}