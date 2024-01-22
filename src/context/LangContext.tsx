import { createContext, useState } from 'react';

import {
  Lang,
  LangContextType,
  LangContextProviderProps,
} from '../models/models';

export const LangContext = createContext<LangContextType | null>(null);

export default function LangContextProvider({
  children,
}: LangContextProviderProps) {
  const [lang, setLang] = useState<Lang>('EN');

  return (
    <LangContext.Provider value={{ lang, setLang }}>
      {children}
    </LangContext.Provider>
  );
}
