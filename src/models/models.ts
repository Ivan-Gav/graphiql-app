import TEXT from 'src/constants/text';

type KeysOfText = keyof typeof TEXT.EN;

export type LangContextProviderProps = {
  children: React.ReactNode;
};

export type Lang = 'EN' | 'RU';

export type LangContextType = {
  lang: Lang;
  setLang: React.Dispatch<React.SetStateAction<Lang>>;
};

export type T = { [Key in KeysOfText]: string };
