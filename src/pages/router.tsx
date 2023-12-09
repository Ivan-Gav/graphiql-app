import { Container, Grid } from '@mui/material';
import React, { lazy, Suspense } from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import Header from '../components/Header/Header';

const MainPage = lazy(() => import('./MainPage/MainPage'));
const SignInPage = lazy(() => import('./SignInPage/SignInPage'));
const SignUpPage = lazy(() => import('./SignUpPage/SignUpPage'));
const Page404 = lazy(() => import('./404/404'));

const Router = (): React.JSX.Element => (
  <Routes>
    <Route
      path=""
      element={
        <Container>
          <Grid
            container
            flexDirection="column"
            justifyContent="space-between"
            minHeight="100vh"
          >
            <Header />
            <Suspense fallback={<main>Loading..</main>}>
              <Outlet />
            </Suspense>
            <>Footer Component</>
          </Grid>
        </Container>
      }
    >
      <Route path="/" element={<MainPage />} />
      <Route path="/signin" element={<SignInPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="*" element={<Page404 />} />
    </Route>
  </Routes>
);

export default Router;
