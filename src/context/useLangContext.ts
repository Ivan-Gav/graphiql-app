import { useContext } from 'react';

import { LangContext } from './LangContext';

export function useLangContext() {
  const context = useContext(LangContext);
  if (!context) {
    throw new Error('useLangContext must be used within a LangContextProvider');
  }
  return context;
}
