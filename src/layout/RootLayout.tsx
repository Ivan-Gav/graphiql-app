import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header/Header';
import { Box, Container } from '@mui/material';
import Footer from '../components/Footer/Footer';

export default function RootLayout() {
  return (
    <Container
      maxWidth="lg"
      disableGutters
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Header />
      <Box mt="auto" width="100%">
        <Suspense fallback={<>Loading..</>}>
          <Outlet />
        </Suspense>
      </Box>
      <Footer />
    </Container>
  );
}
