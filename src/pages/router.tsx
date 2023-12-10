import React, { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

import RootLayout from '../layout/RootLayout';

const MainPage = lazy(() => import('./MainPage/MainPage'));
const SignInPage = lazy(() => import('./SignInPage/SignInPage'));
const SignUpPage = lazy(() => import('./SignUpPage/SignUpPage'));
const Page404 = lazy(() => import('./404/404'));

const Router = (): React.JSX.Element => (
  <Routes>
    <Route path="/" element={<RootLayout />}>
      <Route index element={<MainPage />} />
      <Route path="signin" element={<SignInPage />} />
      <Route path="signup" element={<SignUpPage />} />
      <Route path="*" element={<Page404 />} />
    </Route>
  </Routes>
);

export default Router;
