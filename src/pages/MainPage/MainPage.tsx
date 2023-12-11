// import Demo from '../../components/ui/demo/Demo';
import { useLangContext } from '../../context/useLangContext';
import { T } from '../../constants/text';
import { Typography } from '@mui/material';

export default function MainPage() {
  const { lang } = useLangContext();

  return (
    <Typography variant="h1" mt={20}>
      {T.HI[lang]}
    </Typography>
    // <Demo />
  );
}
