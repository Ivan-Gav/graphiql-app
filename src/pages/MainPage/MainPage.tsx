// import Demo from '../../components/ui/demo/Demo';
import { Typography } from '@mui/material';
import { useText } from 'src/hooks/useText';

export default function MainPage() {
  const T = useText();

  return (
    <Typography variant="h1" mt={20}>
      {T.HI}
    </Typography>
    // <Demo />
  );
}
