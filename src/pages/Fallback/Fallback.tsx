import { CssBaseline, Stack, ThemeProvider, Typography } from '@mui/material';
import theme from 'src/themes/theme';

type FallbackProps = {
  errorMessage?: string;
};

export default function Fallback(props: FallbackProps) {
  const { errorMessage } = props;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Stack
        sx={{ alignItems: 'center', justifyContent: 'center', height: '100vh' }}
      >
        {errorMessage ? (
          <>
            <Typography variant="h2">Following error has occured:</Typography>
            <Typography variant="h1">{errorMessage}</Typography>
          </>
        ) : (
          <Typography variant="h1">Something went wrong...</Typography>
        )}
      </Stack>
    </ThemeProvider>
  );
}
