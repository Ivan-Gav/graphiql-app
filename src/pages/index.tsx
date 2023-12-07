import React, { Suspense } from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import PageError from './404/404';
import MainPage from './MainPage/MainPage';
import SignInPage from './SignInPage/SignInPage';
import SignUpPage from './SignUpPage/SignUpPage';

const Router = (): React.JSX.Element => (
  <Routes>
    <Route
      path=""
      element={
        <Suspense fallback={<>Loading..</>}>
          <>Header Component</>
          <Outlet />
          <>Footer Component</>
        </Suspense>
      }
    >
      <Route path="/" element={<MainPage />} />
      <Route path="/signin" element={<SignInPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="*" element={<PageError />} />
    </Route>
  </Routes>
);

export default Router;
