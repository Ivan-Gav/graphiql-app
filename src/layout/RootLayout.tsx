import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header/Header';
import { Container } from '@mui/material';
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
      <Suspense fallback={<>Loading..</>}>
        <Outlet />
      </Suspense>
      <Footer />
    </Container>
  );
}
