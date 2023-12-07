import { CssBaseline, ThemeProvider, Typography } from '@mui/material';

import '@fontsource/noto-sans/200.css';
import '@fontsource/noto-sans/400.css';
import '@fontsource/noto-sans/600.css';
import '@fontsource/noto-sans/700.css';
import '@fontsource/noto-sans/900.css';
import theme from './themes/theme';
import Demo from './components/ui/demo/Demo';

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Typography variant="h1">Hello The Team!</Typography>
        <Demo />
      </ThemeProvider>
    </>
  );
}

export default App;
