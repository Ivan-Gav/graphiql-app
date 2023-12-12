import { CssBaseline, ThemeProvider } from '@mui/material';

import '@fontsource/noto-sans/200.css';
import '@fontsource/noto-sans/400.css';
import '@fontsource/noto-sans/600.css';
import '@fontsource/noto-sans/700.css';
import '@fontsource/noto-sans/900.css';
import theme from './themes/theme';
import Router from './pages/router';
import { Provider } from 'react-redux';
import { store } from './store/store';

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Provider store={store}>
          <Router />
        </Provider>
      </ThemeProvider>
    </>
  );
}

export default App;
