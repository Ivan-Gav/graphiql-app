import TEXT from 'src/constants/text';
import { useLangContext } from 'src/context/useLangContext';
import { T } from 'src/models/models';

export function useText() {
  const { lang } = useLangContext();
  const T: T = TEXT[lang];

  return T;
}
