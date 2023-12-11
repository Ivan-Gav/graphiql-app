export type LangContextProviderProps = {
  children: React.ReactNode;
};

export type Lang = 'EN' | 'RU';

export type LangContextType = {
  lang: Lang;
  setLang: React.Dispatch<React.SetStateAction<Lang>>;
};
